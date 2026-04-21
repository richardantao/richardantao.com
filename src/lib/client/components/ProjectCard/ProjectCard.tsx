"use client";
import Link from "next/link";
import clsx from "clsx";
import posthog from "posthog-js";

import { Tag, type TagColor } from "../Tag";

import styles from "./ProjectCard.module.scss";

export interface ProjectTag {
	label: string;
	color: TagColor;
}

export interface Project {
	slug: string;
	name: string;
	iconLabel: string; // short display label for the icon box
	iconVariant?: "blue" | "indigo";
	description: string;
	tags: ProjectTag[];
	externalHref?: string;
}

interface ProjectCardProps {
	project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
	const {
		slug,
		name,
		iconLabel,
		iconVariant = "blue",
		description,
		tags,
		externalHref,
	} = project;

	const handleCardClick = () => {
		posthog.capture("project_card_clicked", {
			project_name: name,
			project_slug: slug,
		});
	};

	const handleExternalLinkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		if (externalHref) {
			posthog.capture("project_external_link_clicked", {
				project_name: name,
				project_slug: slug,
				href: externalHref,
			});
			window.open(externalHref, "_blank", "noopener,noreferrer");
		}
	};

	return (
		<Link
			href={`/projects/${slug}`}
			className={styles.card}
			aria-label={`View ${name} project`}
			onClick={handleCardClick}
		>
			<div
				className={clsx(styles.icon, iconVariant === "indigo" && styles.indigo)}
			>
				{iconLabel}
			</div>
			<h3 className={styles.name}>{name}</h3>
			<p className={styles.description}>{description}</p>
			<div className={styles.tags}>
				{tags.map(t => (
					<Tag key={t.label} color={t.color}>
						{t.label}
					</Tag>
				))}
			</div>
			<div className={styles.meta}>
				{externalHref ? (
					<button
						type="button"
						className={styles.externalLink}
						onClick={handleExternalLinkClick}
						aria-label={`Visit ${name} external link`}
					>
						<span className={styles.arrow} aria-hidden="true">
							→
						</span>
					</button>
				) : (
					<span className={styles.arrow} aria-hidden="true">
						→
					</span>
				)}
			</div>
		</Link>
	);
}
