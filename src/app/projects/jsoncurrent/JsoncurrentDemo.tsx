"use client";

import { useEffect, useReducer, useRef } from "react";
import posthog from "posthog-js";

import { Button } from "~/lib/client/components/Button";

import styles from "./page.module.scss";

type PatchOp = "add" | "append" | "complete";

interface ReportSection {
	heading?: string;
	body?: string;
}

interface ReportState {
	title?: string;
	sections?: ReportSection[];
}

interface DemoPatch {
	id: string;
	path: string;
	op: PatchOp;
	value: unknown;
}

type DemoPhase = "idle" | "running" | "paused" | "complete";

interface DemoStateValue {
	speed: number;
	phase: DemoPhase;
	cursorIndex: number;
	activeTokenIndex: number | null;
	emittedChars: number;
	tokenCount: number;
	patchCount: number;
	pathCount: number;
	patchFeed: DemoPatch[];
	renderState: ReportState;
	streamingPaths: string[];
	seenPaths: string[];
}

type DemoAction =
	| { type: "setSpeed"; speed: number }
	| { type: "togglePlayback" }
	| { type: "reset" }
	| { type: "tick" }
	| { type: "finish" };

type PanelKey = "token" | "patch" | "render";

const BOTTOM_THRESHOLD_PX = 16;

const SAMPLE_REPORT = {
	title: "Q2 2026 Executive Summary",
	sections: [
		{
			heading: "Revenue",
			body: "Total revenue reached $4.2M, up 31% quarter-over-quarter. Enterprise contracts drove the majority of growth, with three new Fortune 500 clients onboarded in June.",
		},
		{
			heading: "Product",
			body: "Shipped incremental JSON streaming protocol and Python backend support. Load times reduced by 60% following infrastructure migration to edge compute.",
		},
		{
			heading: "Outlook",
			body: "Q3 pipeline stands at $6.1M with high confidence. Hiring targets: 4 engineers, 2 in sales. ARR target of $18M by year end remains on track.",
		},
	],
} as const;

const SAMPLE_JSON = JSON.stringify(SAMPLE_REPORT, null, 2);
const TOKENS = tokenize(SAMPLE_JSON);
const PATCH_SEQUENCE = buildPatchSequence(SAMPLE_REPORT);
const PATCH_SCHEDULE = schedulePatches(TOKENS.length, PATCH_SEQUENCE);

const INITIAL_SPEED = 120;

function createInitialState(speed = INITIAL_SPEED): DemoStateValue {
	return {
		speed,
		phase: "idle",
		cursorIndex: 0,
		activeTokenIndex: null,
		emittedChars: 0,
		tokenCount: 0,
		patchCount: 0,
		pathCount: 0,
		patchFeed: [],
		renderState: {},
		streamingPaths: [],
		seenPaths: [],
	};
}

function demoReducer(
	state: DemoStateValue,
	action: DemoAction
): DemoStateValue {
	switch (action.type) {
		case "setSpeed": {
			return { ...state, speed: action.speed };
		}

		case "togglePlayback": {
			if (state.phase === "running") {
				return {
					...state,
					phase: "paused",
				};
			}

			if (state.phase === "complete") {
				return {
					...createInitialState(state.speed),
					phase: "running",
					activeTokenIndex: 0,
				};
			}

			return {
				...state,
				phase: "running",
				activeTokenIndex: state.cursorIndex,
			};
		}

		case "reset": {
			return createInitialState(state.speed);
		}

		case "tick": {
			if (state.cursorIndex >= TOKENS.length) {
				return state;
			}

			const token = TOKENS[state.cursorIndex] ?? "";
			const scheduled = PATCH_SCHEDULE.get(state.cursorIndex) ?? [];
			let nextRenderState = state.renderState;
			const nextStreamingPaths = new Set(state.streamingPaths);
			const nextSeenPaths = new Set(state.seenPaths);
			let nextPathCount = state.pathCount;

			for (const patch of scheduled) {
				if (patch.op !== "complete") {
					if (!nextSeenPaths.has(patch.path)) {
						nextSeenPaths.add(patch.path);
						nextPathCount += 1;
					}

					nextStreamingPaths.add(patch.path);
					nextRenderState = applyPatch(nextRenderState, patch);
				} else {
					nextStreamingPaths.delete(patch.path);
				}
			}

			const nextCursorIndex = state.cursorIndex + 1;

			return {
				...state,
				emittedChars: state.emittedChars + token.length,
				tokenCount: state.tokenCount + 1,
				patchCount: state.patchCount + scheduled.length,
				pathCount: nextPathCount,
				patchFeed: [...state.patchFeed, ...scheduled].slice(-80),
				renderState: nextRenderState,
				streamingPaths: [...nextStreamingPaths],
				seenPaths: [...nextSeenPaths],
				cursorIndex: nextCursorIndex,
				activeTokenIndex:
					nextCursorIndex < TOKENS.length ? nextCursorIndex : null,
			};
		}

		case "finish": {
			return {
				...state,
				phase: "complete",
				activeTokenIndex: null,
				emittedChars: SAMPLE_JSON.length,
				streamingPaths: [],
			};
		}
	}
}

export function JsoncurrentDemo() {
	const [state, dispatch] = useReducer(demoReducer, undefined, () =>
		createInitialState()
	);
	const tokenPanelRef = useRef<HTMLDivElement | null>(null);
	const patchPanelRef = useRef<HTMLDivElement | null>(null);
	const renderPanelRef = useRef<HTMLDivElement | null>(null);
	const autoPinRef = useRef<Record<PanelKey, boolean>>({
		token: true,
		patch: true,
		render: true,
	});

	useEffect(() => {
		if (state.phase !== "running") {
			return;
		}

		if (state.cursorIndex >= TOKENS.length) {
			dispatch({ type: "finish" });
			return;
		}

		const timer = window.setTimeout(
			() => dispatch({ type: "tick" }),
			state.speed + Math.random() * (state.speed * 0.3)
		);

		return () => window.clearTimeout(timer);
	}, [state.phase, state.cursorIndex, state.speed]);

	const updateAutoPin = (key: PanelKey, element: HTMLDivElement | null) => {
		if (!element) {
			return;
		}

		const isNearBottom =
			element.scrollHeight - element.scrollTop - element.clientHeight <=
			BOTTOM_THRESHOLD_PX;
		autoPinRef.current[key] = isNearBottom;
	};

	useEffect(() => {
		if (!autoPinRef.current.token || !tokenPanelRef.current) {
			return;
		}

		tokenPanelRef.current.scrollTop = tokenPanelRef.current.scrollHeight;
	});

	useEffect(() => {
		if (!autoPinRef.current.patch || !patchPanelRef.current) {
			return;
		}

		patchPanelRef.current.scrollTop = patchPanelRef.current.scrollHeight;
	});

	useEffect(() => {
		if (!autoPinRef.current.render || !renderPanelRef.current) {
			return;
		}

		renderPanelRef.current.scrollTop = renderPanelRef.current.scrollHeight;
	});

	const currentToken =
		state.activeTokenIndex !== null
			? (TOKENS[state.activeTokenIndex] ?? "")
			: "";
	const emitted = SAMPLE_JSON.slice(0, state.emittedChars);
	const remaining =
		state.activeTokenIndex !== null
			? SAMPLE_JSON.slice(state.emittedChars + currentToken.length)
			: "";
	const statusLabel =
		state.phase === "idle"
			? "idle"
			: state.phase === "running"
				? "streaming..."
				: state.phase === "paused"
					? `paused · ${state.patchCount} patches`
					: `complete · ${state.patchCount} patches`;
	const primaryActionLabel =
		state.phase === "running"
			? "Pause"
			: state.phase === "paused"
				? "Resume"
				: state.phase === "complete"
					? "Run again"
					: "Run";

	return (
		<div className={styles.demoShell}>
			<div className={styles.demoHeader}>
				<div>
					<p className={styles.demoBrand}>
						json<span>current</span>
					</p>
				</div>
				<div className={styles.demoBadge}>live demo</div>
			</div>

			<div className={styles.demoHero}>
				<h3 className={styles.demoTitle}>
					Stream <strong>structured JSON</strong> incrementally, patch by patch,
					as it generates.
				</h3>
				<p className={styles.demoText}>
					Watch raw tokens arrive on the left. Each structured patch lands in
					the middle. The assembled interface updates on the right without
					waiting for the final response.
				</p>
			</div>

			<div className={styles.controls}>
				<Button
					onClick={() => {
						const nextPhase =
							state.phase === "running"
								? "paused"
								: state.phase === "complete"
									? "running"
									: "running";
						posthog.capture("demo_playback_toggled", {
							from_phase: state.phase,
							to_phase: nextPhase,
						});
						dispatch({ type: "togglePlayback" });
					}}
					className={styles.controlButton}
				>
					{primaryActionLabel}
				</Button>
				<Button
					onClick={() => {
						posthog.capture("demo_reset");
						dispatch({ type: "reset" });
					}}
					disabled={state.phase === "idle" && state.patchCount === 0}
					variant="secondary"
					className={styles.controlButton}
				>
					Reset
				</Button>
				<label className={styles.speedControl}>
					<span className={styles.speedLabel}>Speed</span>
					<select
						className={styles.speedSelect}
						value={state.speed}
						onChange={event => {
							posthog.capture("demo_speed_changed", {
								speed: Number(event.target.value),
							});
							dispatch({ type: "setSpeed", speed: Number(event.target.value) });
						}}
					>
						<option value={60}>Fast</option>
						<option value={120}>Normal</option>
						<option value={250}>Slow</option>
					</select>
				</label>
			</div>

			<div className={styles.demoGrid}>
				<div className={styles.panel}>
					<div className={styles.panelHeader}>
						<span
							className={`${styles.dot} ${state.phase === "running" ? styles.live : ""}`}
						/>
						<span className={styles.panelLabel}>raw token stream</span>
					</div>
					<div
						className={styles.panelBody}
						ref={tokenPanelRef}
						onScroll={event => updateAutoPin("token", event.currentTarget)}
					>
						<div className={styles.tokenStream}>
							{state.tokenCount === 0 && state.phase === "idle" ? (
								<span className={styles.empty}>tokens will appear here...</span>
							) : (
								<>
									<span className={styles.emitted}>{emitted}</span>
									<span className={styles.currentToken}>{currentToken}</span>
									<span className={styles.pending}>
										{remaining.slice(0, 120)}
										{remaining.length > 120 ? "..." : ""}
									</span>
									{state.phase === "running" && (
										<span className={styles.cursor} />
									)}
								</>
							)}
						</div>
					</div>
				</div>

				<div className={styles.panel}>
					<div className={styles.panelHeader}>
						<span
							className={`${styles.dot} ${state.phase === "running" ? styles.live : ""}`}
						/>
						<span className={styles.panelLabel}>patches</span>
					</div>
					<div
						className={styles.panelBody}
						ref={patchPanelRef}
						onScroll={event => updateAutoPin("patch", event.currentTarget)}
					>
						<div className={styles.patchFeed}>
							{state.patchFeed.length === 0 ? (
								<span className={styles.empty}>waiting...</span>
							) : (
								state.patchFeed.map(patch => (
									<div
										key={patch.id}
										className={`${styles.patchRow} ${styles[patch.op]}`}
									>
										<span className={styles.patchPath}>
											{patch.path || "(root)"}
										</span>
										<span className={styles.patchSeparator}>·</span>
										<span className={styles.patchOp}>{patch.op}</span>
										{patch.op !== "complete" && (
											<span className={styles.patchValue}>
												{formatPatchValue(patch.value)}
											</span>
										)}
									</div>
								))
							)}
						</div>
					</div>
					<div className={styles.legend}>
						<div className={styles.legendItem}>
							<span className={`${styles.legendDot} ${styles.add}`} />
							add
						</div>
						<div className={styles.legendItem}>
							<span className={`${styles.legendDot} ${styles.append}`} />
							append
						</div>
						<div className={styles.legendItem}>
							<span className={`${styles.legendDot} ${styles.complete}`} />
							complete
						</div>
					</div>
				</div>

				<div className={styles.panel}>
					<div className={styles.panelHeader}>
						<span
							className={`${styles.dot} ${state.phase === "running" ? styles.live : ""}`}
						/>
						<span className={styles.panelLabel}>assembled output</span>
					</div>
					<div
						className={styles.panelBody}
						ref={renderPanelRef}
						onScroll={event => updateAutoPin("render", event.currentTarget)}
					>
						<div className={styles.rendered}>
							{state.renderState.title || state.renderState.sections?.length ? (
								<>
									<div
										className={`${styles.renderTitle} ${state.streamingPaths.includes("title") ? styles.streaming : ""}`}
									>
										{state.renderState.title || (
											<span className={styles.placeholder}>—</span>
										)}
									</div>
									{(state.renderState.sections ?? []).map((section, index) => (
										<div
											key={
												SAMPLE_REPORT.sections[index]?.heading ??
												section.heading ??
												section.body ??
												"section"
											}
											className={styles.renderSection}
										>
											<div
												className={`${styles.renderHeading} ${state.streamingPaths.includes(`sections[${index}].heading`) ? styles.streaming : ""}`}
											>
												{section.heading || (
													<span className={styles.skeletonLine} />
												)}
											</div>
											{section.body ? (
												<div
													className={`${styles.renderBody} ${state.streamingPaths.includes(`sections[${index}].body`) ? styles.streaming : ""}`}
												>
													{section.body}
												</div>
											) : (
												<div className={styles.skeletonGroup}>
													<span className={styles.skeletonLine} />
													<span
														className={`${styles.skeletonLine} ${styles.short}`}
													/>
												</div>
											)}
										</div>
									))}
								</>
							) : (
								<span className={styles.empty}>assembling...</span>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className={styles.statusBar}>
				<div className={styles.stat}>
					patches <strong>{state.patchCount}</strong>
				</div>
				<div className={styles.stat}>
					tokens <strong>{state.tokenCount}</strong>
				</div>
				<div className={styles.stat}>
					paths <strong>{state.pathCount}</strong>
				</div>
				<div className={styles.stat}>{statusLabel}</div>
			</div>
		</div>
	);
}

function tokenize(input: string): string[] {
	const tokens: string[] = [];
	let cursor = 0;

	while (cursor < input.length) {
		const size = 2 + Math.floor(Math.random() * 5);
		tokens.push(input.slice(cursor, cursor + size));
		cursor += size;
	}

	return tokens;
}

function buildPatchSequence(report: typeof SAMPLE_REPORT): DemoPatch[] {
	const patches: DemoPatch[] = [];
	let patchIndex = 0;

	const makePatch = (path: string, op: PatchOp, value: unknown): DemoPatch => ({
		id: `patch-${patchIndex++}`,
		path,
		op,
		value,
	});

	pushStringPatches(patches, "title", report.title, makePatch);
	patches.push(makePatch("sections", "add", []));

	report.sections.forEach((section, index) => {
		const sectionPath = `sections[${index}]`;
		patches.push(makePatch(sectionPath, "add", {}));
		pushStringPatches(
			patches,
			`${sectionPath}.heading`,
			section.heading,
			makePatch
		);
		pushStringPatches(patches, `${sectionPath}.body`, section.body, makePatch);
		patches.push(makePatch(sectionPath, "complete", section));
	});

	patches.push(makePatch("sections", "complete", report.sections));

	return patches;
}

function pushStringPatches(
	patches: DemoPatch[],
	path: string,
	value: string,
	makePatch: (path: string, op: PatchOp, value: unknown) => DemoPatch
) {
	const chunks = chunkString(value);

	if (chunks.length === 0) {
		patches.push(makePatch(path, "add", ""));
		patches.push(makePatch(path, "complete", value));
		return;
	}

	patches.push(makePatch(path, "add", chunks[0]));

	for (const chunk of chunks.slice(1)) {
		patches.push(makePatch(path, "append", chunk));
	}

	patches.push(makePatch(path, "complete", value));
}

function chunkString(value: string): string[] {
	const chunks: string[] = [];
	const sizes = [12, 16, 10, 18, 14];
	let cursor = 0;
	let index = 0;

	while (cursor < value.length) {
		const size = sizes[index % sizes.length];
		chunks.push(value.slice(cursor, cursor + size));
		cursor += size;
		index += 1;
	}

	return chunks;
}

function schedulePatches(
	tokenCount: number,
	patches: DemoPatch[]
): Map<number, DemoPatch[]> {
	const scheduled = new Map<number, DemoPatch[]>();
	const lastTokenIndex = Math.max(tokenCount - 1, 0);
	const lastPatchIndex = Math.max(patches.length - 1, 1);

	patches.forEach((patch, index) => {
		const tokenIndex = Math.min(
			lastTokenIndex,
			Math.floor((index / lastPatchIndex) * lastTokenIndex)
		);
		const bucket = scheduled.get(tokenIndex) ?? [];
		bucket.push(patch);
		scheduled.set(tokenIndex, bucket);
	});

	return scheduled;
}

function applyPatch(state: ReportState, patch: DemoPatch): ReportState {
	const nextState = JSON.parse(JSON.stringify(state)) as Record<
		string,
		unknown
	>;
	const keys = parsePath(patch.path);

	if (keys.length === 0) {
		return state;
	}

	if (patch.op === "add") {
		deepSet(nextState, keys, patch.value);
	} else if (patch.op === "append") {
		const currentValue = deepGet(nextState, keys);
		deepSet(
			nextState,
			keys,
			`${typeof currentValue === "string" ? currentValue : ""}${String(patch.value)}`
		);
	}

	return nextState as ReportState;
}

function parsePath(path: string): Array<string | number> {
	return path.split(".").flatMap(segment => {
		const nestedArrayMatch = segment.match(/^(\w+)\[(\d+)\]$/);
		if (nestedArrayMatch) {
			return [nestedArrayMatch[1], Number(nestedArrayMatch[2])];
		}

		const arrayMatch = segment.match(/^\[(\d+)\]$/);
		if (arrayMatch) {
			return [Number(arrayMatch[1])];
		}

		return [segment];
	});
}

function deepGet(
	target: Record<string, unknown>,
	keys: Array<string | number>
): unknown {
	let current: unknown = target;

	for (const key of keys) {
		if (current == null || typeof current !== "object") {
			return undefined;
		}
		current = (current as Record<string, unknown>)[String(key)] as unknown;
	}

	return current;
}

function deepSet(
	target: Record<string, unknown>,
	keys: Array<string | number>,
	value: unknown
) {
	let current: Record<string, unknown> | unknown[] = target;

	for (let index = 0; index < keys.length - 1; index += 1) {
		const key = keys[index];
		const nextKey = keys[index + 1];
		const record = current as Record<string, unknown>;

		if (record[String(key)] == null) {
			record[String(key)] =
				typeof nextKey === "number"
					? ([] as unknown[])
					: ({} as Record<string, unknown>);
		}

		current = record[String(key)] as Record<string, unknown> | unknown[];
	}

	(current as Record<string, unknown>)[String(keys.at(-1))] = value;
}

function formatPatchValue(value: unknown): string {
	if (typeof value === "string") {
		return value.length > 24 ? `"${value.slice(0, 24)}..."` : `"${value}"`;
	}

	if (value === null) {
		return "null";
	}

	if (Array.isArray(value)) {
		return "[]";
	}

	if (typeof value === "object") {
		return "{}";
	}

	return String(value);
}
