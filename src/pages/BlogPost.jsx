import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/layout/PageTransition';

const blogImages = [
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=1200&h=600&fit=crop',
];

export default function BlogPost() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const posts = t('blog.posts', { returnObjects: true });
  const post = posts.find(p => p.slug === slug);
  const gradIndex = posts.findIndex(p => p.slug === slug);

  if (!post) {
    return (
      <PageTransition>
        <main id="main-content" className="pt-[var(--nav-height)] min-h-screen flex items-center justify-center">
          <div className="text-center px-6">
            <h2 className="font-cormorant font-semibold mb-4" style={{ fontSize: 'var(--fs-h2)' }}>Article Not Found</h2>
            <Link to="/blog" className="font-sans text-terra-400 hover:text-terra-300 transition-colors">← Back to Blog</Link>
          </div>
        </main>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <main id="main-content" className="pt-[var(--nav-height)]">
        <article className="max-w-3xl mx-auto px-[var(--content-pad)] py-16">
          <Link to="/blog" className="inline-flex items-center gap-2 font-sans text-sm text-terra-400 hover:text-terra-300 transition-colors mb-8">
            ← Back to Blog
          </Link>

          <div className="aspect-[16/9] rounded-[var(--radius-xl)] overflow-hidden mb-10">
            <img src={blogImages[gradIndex]} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
          </div>

          <span className="font-sans text-xs text-terra-400 bg-terra-500/10 px-3 py-1.5 rounded-full">{post.category}</span>

          <h1 className="font-cormorant font-semibold mt-4 mb-6" style={{ fontSize: 'var(--fs-h1)', lineHeight: '1.15' }}>{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 font-sans text-sm text-[var(--text-muted)] mb-12 pb-8 border-b border-[var(--border-subtle)]">
            <span>{post.author}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
            <span>{post.readTime}</span>
          </div>

          <div className="font-sans text-[var(--text-secondary)] leading-relaxed space-y-6" style={{ fontSize: 'var(--fs-body-lg)' }}>
            {post.content.map((block, i) =>
              block.type === 'heading' ? (
                <h2 key={i} className="font-cormorant font-semibold text-[var(--text-primary)] mt-10 mb-4" style={{ fontSize: 'var(--fs-h3)' }}>{block.text}</h2>
              ) : (
                <p key={i}>{block.text}</p>
              )
            )}
          </div>

          <div className="mt-16 pt-8 border-t border-[var(--border-subtle)]">
            <Link to="/blog" className="inline-flex items-center gap-2 font-sans text-terra-400 hover:text-terra-300 transition-colors">← Back to Blog</Link>
          </div>
        </article>
      </main>
    </PageTransition>
  );
}
