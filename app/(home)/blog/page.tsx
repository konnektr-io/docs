import Link from "next/link";
import { blog } from "@/lib/source";
import { PathUtils } from "fumadocs-core/source";
import { ArrowRight } from "lucide-react";
// import BannerImage from "./banner.png";
// import Image from "next/image";

function getName(path: string) {
  return PathUtils.basename(path, PathUtils.extname(path));
}

export default function Page() {
  const posts = [...blog.getPages()].sort(
    (a, b) =>
      new Date(b.data.date ?? getName(b.path)).getTime() -
      new Date(a.data.date ?? getName(a.path)).getTime()
  );

  return (
    <main className="mx-auto w-full max-w-page px-6 py-12 md:py-24">
      <div className="flex flex-col items-center text-center mb-16 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Konnektr <span className="text-primary">Blog</span>
        </h1>
        <p className="text-lg md:text-xl text-fd-muted-foreground max-w-[800px] leading-relaxed">
          Product updates, technical insights, and digital twin ecosystem news.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className="group flex flex-col bg-fd-card rounded-[2rem] border p-8 transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
          >
            <div className="flex flex-col h-full">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full">Article</span>
                <p className="text-xs text-fd-muted-foreground font-medium">
                  {new Date(post.data.date ?? getName(post.path)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">{post.data.title}</h2>
              <p className="text-fd-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                {post.data.description}
              </p>
              <div className="mt-auto pt-6 border-t border-fd-border/50 flex items-center justify-between">
                <span className="text-xs font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                  Read more <ArrowRight className="h-3 w-3" />
                </span>
                {post.data.author && (
                   <span className="text-xs text-fd-muted-foreground">By {post.data.author}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
