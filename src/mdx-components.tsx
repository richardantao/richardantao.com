import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./mdx-components.module.scss";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;
type ImageProps = ComponentPropsWithoutRef<"img">;

const components = {
	h1: (props: HeadingProps) => <h1 className={styles.h1} {...props} />,
	h2: (props: HeadingProps) => <h2 className={styles.h2} {...props} />,
	h3: (props: HeadingProps) => <h3 className={styles.h3} {...props} />,
	h4: (props: HeadingProps) => <h4 className={styles.h4} {...props} />,
	p: (props: ParagraphProps) => <p className={styles.paragraph} {...props} />,
	ol: (props: ListProps) => <ol className={styles.orderedList} {...props} />,
	ul: (props: ListProps) => <ul className={styles.unorderedList} {...props} />,
	li: (props: ListItemProps) => <li className={styles.listItem} {...props} />,
	em: (props: ComponentPropsWithoutRef<"em">) => (
		<em className={styles.emphasis} {...props} />
	),
	strong: (props: ComponentPropsWithoutRef<"strong">) => (
		<strong className={styles.strong} {...props} />
	),
	a: ({ href, children, ...props }: AnchorProps) => {
		const className = styles.link;
		if (href?.startsWith("/")) {
			return (
				<Link href={href} className={className} {...props}>
					{children}
				</Link>
			);
		}
		if (href?.startsWith("#")) {
			return (
				<a href={href} className={className} {...props}>
					{children}
				</a>
			);
		}
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className={className}
				{...props}
			>
				{children}
			</a>
		);
	},
	code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
		return (
			<code className={styles.code} {...props}>
				{children}
			</code>
		);
	},
	img: ({ alt = "", src, width, height, ...props }: ImageProps) => (
		<Image
			className={styles.image}
			src={src as string}
			alt={alt}
			width={1600}
			height={900}
			sizes="(min-width: 768px) 100vw, 100vw"
			{...props}
		/>
	),
	table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
		<table className={styles.table}>
			<thead>
				<tr>
					{data.headers.map(header => (
						<th key={header} className={styles.tableHeader}>
							{header}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.rows.map(row => {
					const rowKey = row.join("|__|");

					return (
						<tr key={rowKey} className={styles.tableRow}>
							{row.map(cell => (
								<td key={`${rowKey}|--|${cell}`} className={styles.tableCell}>
									{cell}
								</td>
							))}
						</tr>
					);
				})}
			</tbody>
		</table>
	),
	blockquote: (props: BlockquoteProps) => (
		<blockquote className={styles.blockquote} {...props} />
	),
};

declare global {
	type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
	return components;
}
