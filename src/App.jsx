import React, { useState } from 'react'
import marketplaceHero from './marketplace-products.png'
const categories = [
  {
    id: 1,
    name: 'Electronics',
    image: '/products/electronics.png',
    description: 'Headphones, laptops, cameras, gadgets, accessories & more.',
    slug: 'electronics',
  },
  {
    id: 2,
    name: 'Smartphones',
    image: '/products/smartphone.png',
    description: 'Smartphones, cases, chargers, accessories & more.',
    slug: 'smartphones',
  },
  {
    id: 3,
    name: 'Food & Drinks',
    image: '/products/food-drinks.png',
    description: 'Food, snacks, beverages and everyday favorites.',
    slug: 'food-drinks',
  },
  {
    id: 4,
    name: 'Fashion',
    image: '/products/fashion.png',
    description: 'Clothing, shoes, bags, accessories and everyday style.',
    slug: 'fashion',
  },
  {
    id: 5,
    name: 'Home & Living',
    image: '/products/home-living.png',
    description: 'Home essentials, decor, furniture and lifestyle products.',
    slug: 'home-living',
  },
  {
    id: 6,
    name: 'Handmade Crafts',
    image: '/products/handmade-crafts.png',
    description: 'Unique handmade creations, gifts, decor and artisan products.',
    slug: 'handmade-crafts',
  },
]
export default function App() {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart((current) => [...current, product])
  }

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
  <img src="/ardas-logo.jpeg" alt="Ardas Ong Company" className="brand-logo" />
  <div className="brand-text">
    <span className="brand-name">ARDAS ONG</span>
    <span className="brand-tagline">DISCOVER • SHOP • CONNECT</span>
  </div>
</div>

        <nav>
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#about">About</a>
        </nav>

        <div className="cart-button">
          Bag ({cart.length})
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
<p className="eyebrow">DISCOVER • SHOP • CONNECT</p>

<h1>
  Everything you need,
  <br />
  all in one place.
</h1>

<p className="hero-text">
  Discover great products from trusted sellers — from electronics
  and smartphones to food, drinks, snacks, fashion, crafts, and more.
</p>

<a className="primary-button" href="#shop">
  Explore Products
            </a>
          </div>

         <div className="hero-art">
  <img
   src={marketplaceHero}
    alt="Ardas Ong Marketplace products"
    className="marketplace-hero-image"
  />
</div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <p className="eyebrow">OUR COLLECTION</p>
            <h2>Made with nature in mind.</h2>
            <p>
              Each piece is carefully created to bring a little
              piece of the coast into your world.
            </p>
          </div>

          <div className="product-grid">
{categories.map((category) => (
  <article className="product-card" key={category.id}>
    <div className="product-image">
      <img src={category.image} alt={category.name} />
    </div>

    <div className="product-info">
      <h3>{category.name}</h3>
      <p>{category.description}</p>

      <div className="product-bottom">
        <button className="explore-category">
          Explore Products →
        </button>
      </div>
    </div>
  </article>
))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div>
            <p className="eyebrow">OUR STORY</p>
            <h2>Inspired by the sea.</h2>
          </div>

          <p>
            Ardas Ong celebrates the natural beauty of the coast
            through carefully handcrafted creations. Every piece
            is made with attention to detail and a love for
            nature-inspired design.
          </p>
        </section>
      </main>

      <footer>
        <strong>ARDAS ONG</strong>
        <p>Handmade treasures inspired by the sea.</p>
        <p>© {new Date().getFullYear()} Ardas Ong</p>
      </footer>
    </div>
  )
}
