'use client'

import type { Metadata } from 'next'

// This is simplified - in production you'd fetch real recipe data
const RECIPES = [
  { id: '1', num: '01', name: 'Simple Pasta', tags: ['pasta', 'weeknight'] },
  { id: '2', num: '02', name: 'Roasted Chicken', tags: ['chicken', 'dinner'] },
  { id: '3', num: '03', name: 'Fresh Salad', tags: ['vegetarian', 'quick'] },
  { id: '4', num: '04', name: 'Bread Baking', tags: ['baking', 'weekend'] },
  { id: '5', num: '05', name: 'Chocolate Cake', tags: ['dessert', 'special'] },
  { id: '6', num: '06', name: 'Summer Risotto', tags: ['rice', 'vegetables'] },
]

export default function RecipesPage() {
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
          {RECIPES.map((recipe) => (
            <a key={recipe.id} href={`/recipes/${recipe.id}`} className="recipe">
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
