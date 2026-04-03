import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const blogImages = [
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&h=400&fit=crop',
];

export default function Blog() {
  const { t } = useTranslation();
  const posts = t('blog.posts', { returnObjects: true });

  return (
    <section className="section bg-[var(--bg-section-alt)]">
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--content-pad)]">
        <p className="font-sans font-medium text-sm tracking-[0.15em] uppercase text-terra-400 mb-3">{t('blog.sectionLabel')}</p>
        <h2 className="font-cormorant font-semibold mb-12" style={{ fontSize: 'var(--fs-h2)' }}>{t('blog.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <Link key={i} to={`/blog/${post.slug}`} className="group rounded-[var(--radius-xl)] overflow-hidden bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:shadow-lg transition-all duration-300">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={blogImages[i]} alt={post.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-6">
                <span className="font-sans text-xs text-terra-400 bg-terra-500/10 px-2.5 py-1 rounded-full">{post.category}</span>
                <h3 className="font-cormorant font-semibold text-xl mt-3 mb-2 group-hover:text-terra-400 transition-colors">{post.title}</h3>
                <p className="font-sans text-sm text-[var(--text-muted)] mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs text-[var(--text-disabled)]">{post.date}</span>
                  <span className="font-sans text-sm text-terra-400 group-hover:translate-x-1 transition-transform">{t('blog.readMore')}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
