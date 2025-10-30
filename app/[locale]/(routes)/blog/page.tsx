import { getDictionary } from '@/lib/i18n/get-dictionary';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Locale } from '@/lib/i18n/locales';
import Link from 'next-intl/link';

export default async function BlogPage({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);
  const posts = dictionary.sections.blog.items;
  return (
    <div className="bg-background-light py-20 dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <Breadcrumbs locale={params.locale} items={[{ label: dictionary.navigation.blog }]} />
        <header className="mt-6 max-w-3xl">
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{dictionary.navigation.blog}</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{dictionary.sections.blog.subtitle}</p>
        </header>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <div>
                <p className="text-xs uppercase tracking-wide text-secondary">{post.readingTime}</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{post.title}</h2>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{post.excerpt}</p>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString(params.locale)}</time>
                <Link href={`/${params.locale}/blog/${post.slug}`} className="font-semibold text-primary" prefetch>
                  {dictionary.sections.blog.read}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
