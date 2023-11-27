import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high';
import { TweetComponent } from './TweetComponent';
import { YouTubeComponent } from './YouTubeComponent';
import { SpotifyPlayerComponent } from './SpotifyPlayerComponent';

/**
 * Converts a text into a slug format.
 * @param text - The text to be slugified.
 * @returns The slugified text.
 */
function _slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with '-'
        .replace(/&/g, '-and-') // Replace '&' with 'and'
        .replace(/[^\w-]+/g, '') // Remove all non-word chars except for '-'
        .replace(/\-\-+/g, '-'); // Replace multiple '-' with single '-'
}

/**
 * CustomLink component.
 *
 * @param {any} props - The props for the CustomLink component.
 * @returns {JSX.Element} The rendered CustomLink component.
 */
function CustomLink(props: any) {
    let href = props.href;

    if (href.startsWith('/')) {
        return (
            <Link href={href} {...props}>
               {props.children}
            </Link>
        );
    }

    if (href.startsWith('#')) {
        return (
            <a {...props} />
        );
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

/**
 * Renders a table component.
 *
 * @param data - The data object containing headers and rows.
 * @returns The rendered table component.
 */
function Table({ data } : { data: any} ) {
    let headers = data.headers.map((header: string, index: number) => (
        <th key={index}>{header}</th>
    ));
    let rows = data.rows.map((row: any, index: number) => (
        <tr key={index}>
            {row.map((cell: string, cellIndex: number) => (
                <td key={cellIndex}>{cell}</td>
            ))}
        </tr>
    ));

    return (
        <table className="table-auto hover:table-fixed">
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

/**
 * Renders an image with rounded corners.
 * @param {object} props - The component props.
 * @param {string} props.alt - The alternative text for the image.
 * @returns {JSX.Element} The rounded image component.
 */
function RoundedImage(props: any) {
    return (
        <Image
            alt={props.alt}
            className="rounded-lg"
            {...props}
        />
    );
}

/**
 * Renders a code block with syntax highlighting.
 *
 * @param children - The code to be highlighted.
 * @param props - Additional props to be passed to the code element.
 * @returns The rendered code block.
 */
function Code ({ children, ...props }: { children: string, props: any }) {
    let codeHTML = highlight(children);

    return (
        <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
    );
}

/**
 * Creates a heading component with the specified level.
 * @param level - The level of the heading (1-6).
 * @returns A React component that renders a heading element with the specified level.
 */
function createHeading(level: number) {
    // eslint-disable-next-line react/display-name
    return ({ children }: { children: string }) => {
        const slug = _slugify(children as string);

        return React.createElement(
            `h${level}`,
            { id: slug },
            [
                React.createElement('a', {
                    href: `#${slug}` ,
                    key: `link-${slug}`,
                    className: 'anchor'
                }),
            ],
            children
        );
    }
}

let components = {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    Image: RoundedImage,
    a: CustomLink,
    StaticTweet: TweetComponent,
    YouTube: YouTubeComponent,
    code: Code,
    Table,
    SpotifyPlayer: SpotifyPlayerComponent
}

export function CustomMDX(props: any) {
    return (
        <MDXRemote
            {...props}
            components={{ ...components, ...(props.components || {} ) }}
        />
    );
}