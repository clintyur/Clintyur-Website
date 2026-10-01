import Image from 'next/image'
import Link from 'next/link'

export function PreviewGrid() {
  const previews = [
    {
      id: 'recipes',
      href: '/recipes',
      name: 'Recipe Stash',
      num: '01',
      desc: 'Explore curated recipes tested in my kitchen',
      image: '/images/recipe-short-ribs.jpg',
      alt: 'Braised short ribs plated with sauce',
    },
    {
      id: 'shop',
      href: '/shop',
      name: 'Shop',
      num: '02',
      desc: 'Cookware and goods carefully selected',
      image: '/images/wagyu-prep.jpg',
      alt: 'Cookware and knives laid out on a prep counter',
    },
    {
      id: 'about',
      href: '/about',
      name: 'About',
      num: '03',
      desc: 'Learn about the story and the vision',
      image: '/images/clint-kitchen-line.jpg',
      alt: 'Clint working the line in the kitchen',
    },
  ]

  return (
    <section className="container section">
      <div className="section-head">
        <div>
          <div className="eyebrow"><span className="dot"></span>Explore</div>
          <h2 className="section-title">What's <span className="it">here</span></h2>
        </div>
      </div>

      <div className="preview-grid">
        {previews.map((preview) => (
          <Link key={preview.id} href={preview.href} className="preview">
            <div className="preview-img">
              <Image
                src={preview.image}
                alt={preview.alt}
                width={1200}
                height={1600}
                sizes="(max-width: 880px) 100vw, 33vw"
              />
            </div>
            <div className="preview-meta">
              <h3 className="preview-name">{preview.name}</h3>
              <span className="preview-num">№ {preview.num}</span>
            </div>
            <p className="preview-desc">{preview.desc}</p>
            <span className="preview-cta">Explore →</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
