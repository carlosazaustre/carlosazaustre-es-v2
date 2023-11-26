import Link from 'next/link'
import { getBlogPosts } from '@/app/db/blog'

export default function Page() {
  let allBlogPosts = getBlogPosts();
  console.log(allBlogPosts);

  return (
    <section>
      <h1>Carlos Azaustre</h1>
      {allBlogPosts
      .sort((a, b) => {
        if (new Date(a.metadata.date) > new Date(b.metadata.date)) {
          return -1
        }
        return 1
      })
      .map((post) => (
        <Link key={post.slug} href={`/${post.slug}`}>
          <div className="w-full flex flex-col mb-4">
            <p className="font-semibold text-neutral-900 tracking-tight">
              {post.metadata.title}
            </p>
            <p className="text-neutral-500 text-sm">
              {post.metadata.date}
            </p>
          </div>
        </Link>
      ))
    }
    </section>
  )
}
