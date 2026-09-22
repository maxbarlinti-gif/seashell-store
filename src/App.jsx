import React, { useState } from 'react'
import marketplaceHero from './marketplace-products.png'
const sampleProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    image: '/products/electronics.png',
    description: 'Comfortable wireless headphones for music, work, and everyday use.',
    price: 49,
  },
  {
    id: 2,
    name: 'Smartphone',
    category: 'Smartphones',
    image: '/products/smartphone.png',
    description: 'Modern smartphone with a sleek design and essential everyday features.',
    price: 299,
  },
  {
    id: 3,
    name: 'Food & Drinks',
    category: 'Food & Drinks',
    image: '/products/food-drinks.png',
    description: 'A selection of popular food and refreshing drinks for everyday needs.',
    price: 12,
  },
  {
    id: 4,
    name: 'Fashion Collection',
    category: 'Fashion',
    image: '/products/fashion.png',
    description: 'Modern fashion essentials combining comfort, style, and versatility.',
    price: 35,
  },
  {
    id: 5,
    name: 'Home & Living',
    category: 'Home & Living',
    image: '/products/home-living.png',
    description: 'Useful and stylish products to make your home more comfortable.',
    price: 25,
  },
  {
    id: 6,
    name: 'Handmade Crafts',
    category: 'Crafts',
    image: '/products/handmade-crafts.png',
    description: 'Unique handmade creations crafted with care and creativity.',
    price: 19,
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
            {sampleProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
  <img src={product.image} alt={product.name} />
</div>

                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>

                  <div className="product-bottom">
                    <strong>${product.price}.00</strong>

                    <button onClick={() => addToCart(product)}>
                      Add to Bag
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
