import type { Metadata } from 'next'
import { notFound } from 'next/navigation';
import { getBlogPosts } from '@/app/db/blog';
import { formatDate } from '@/helpers/formatDate';

export async function generateMetadata({ params }): Promise<Metadata | undefined> {
    let post = getBlogPosts().find((post) => post.slug === params.slug);
    if (!post) {
        return notFound();
    }

    let { title, date, tags } = post.metadata;
    let ogImage = `https://leerob.io/og?title=${title}`;

    return {
        title,
        openGraph: {
            title,
            type: 'article',
            publishedTime: new Date(date).toISOString(),
            url: `https://carlosazaustre.es/${params.slug}`,
            images: [
                { url: ogImage }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            images: [ogImage]
        },
    };
}

export default function Post({ params }) {
    let post = getBlogPosts().find((post) => post.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <section>
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        headline: post.metadata.title,
                        datePublished: post.metadata.date,
                        dateModified: post.metadata.date,
                        description: post.metadata.summary,
                        image: post.metadata.image
                            ? `https://carlosazaustre.es${post.metadata.image}`
                            : `https://carlosazaustre.es/og?title=${post.metadata.title}`,
                        url: `https://carlosazaustre.es/${post.slug}`,
                        author: {
                            '@type': 'Person',
                            name: 'Carlos Azaustre',
                        },
                    }),
                }}
            />
            <h1>{post.metadata.title}</h1>
            <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {formatDate(post.metadata.date)}
                </p>
            </div>
            <article>
                {post.content}
            </article>
        </section>
    )
}

