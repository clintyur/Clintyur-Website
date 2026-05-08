import { MOCK_RECIPES } from '@/lib/mock-data'

export default function RecipesPage() {
  const recipes = MOCK_RECIPES.map((recipe, index) => ({
    id: recipe.id,
    slug: recipe.slug,
    num: String(index + 1).padStart(2, '0'),
    name: recipe.title,
    tags: recipe.tags,
  }))

  return (
    <div>
      {/* Book hero */}
      <section className="book-hero">
        <div className="book-hero-img">
          <image-slot></image-slot>
        </div>
        <div className="book-hero-info">
          <div className="book-meta">
            <span>Recipes</span>
            <span>Collection</span>
          </div>
          <h1 className="book-title">Recipes <span className="it">tested</span> at home</h1>
          <p className="book-desc">
            Every recipe here has been tested multiple times. They work, they're clear, and they're designed to help you cook with confidence.
          </p>
        </div>
      </section>

      {/* Ticker */}
      <div className="ticker">
        <div className="ticker-track">
          <span>Tested Recipes</span>
          <span className="sep"></span>
          <span>Clear Instructions</span>
          <span className="sep"></span>
          <span>Home Kitchen</span>
          <span className="sep"></span>
          <span>Tested Recipes</span>
          <span className="sep"></span>
          <span>Clear Instructions</span>
          <span className="sep"></span>
          <span>Home Kitchen</span>
          <span className="sep"></span>
        </div>
      </div>

      {/* Recipe grid */}
      <section className="container" style={{ padding: 'clamp(72px, 10vw, 140px) 0' }}>
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <a key={recipe.id} href={`/recipes/${recipe.slug}`} className="recipe">
              <div className="recipe-img">
                <image-slot></image-slot>
              </div>
              <p className="recipe-num">№ {recipe.num}</p>
              <h3 className="recipe-name">{recipe.name}</h3>
              <div className="recipe-tags">
                {recipe.tags.map((tag) => (
                  <span key={tag} className="recipe-tag">{tag}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
