import { getDictionary } from '@/lib/i18n/get-dictionary';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Locale } from '@/lib/i18n/locales';
import { notFound } from 'next/navigation';

interface BlogPageProps {
  params: { locale: Locale; slug: string };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const dictionary = await getDictionary(params.locale);
  const post = dictionary.sections.blog.items.find((item) => item.slug === params.slug);
  if (!post) {
    notFound();
  }
  return (
    <div className="bg-background-light py-20 dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          locale={params.locale}
          items={[
            { label: dictionary.navigation.blog, href: `/${params.locale}/blog` },
            { label: post.title }
          ]}
        />
        <article className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <header>
            <p className="text-xs uppercase tracking-wide text-secondary">{post.readingTime}</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-white">{post.title}</h1>
            <time dateTime={post.date} className="mt-4 block text-sm text-slate-500 dark:text-slate-400">
              {new Date(post.date).toLocaleDateString(params.locale)}
            </time>
          </header>
          <section className="prose prose-slate mt-8 max-w-none dark:prose-invert">
            <p>
              {post.excerpt}
            </p>
            <h2>Standart Karşılaştırması</h2>
            <p>
              ISO 1940-1 G sınıfları ve AGMA Q13 toleransları arasında çapraz referans tabloları sağlayarak balans ve dişli üretimi KPI’larını hizalıyoruz.
            </p>
            <h2>Ölçülebilir Çıktılar</h2>
            <ul>
              <li>PPM &lt; 60 ve OTD %99,7</li>
              <li>SPC kontrol planları ve MSA izlenebilirliği</li>
              <li>HRC 58-63 sertlik doğrulaması</li>
            </ul>
            <p>
              Daha fazla veri görmek için RFQ formu üzerinden örnek rapor talep edebilirsiniz.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
