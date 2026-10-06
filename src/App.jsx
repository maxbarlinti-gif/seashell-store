import React, { useEffect, useState } from 'react'
import { supabase } from './supabase'
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
const [selectedCategory, setSelectedCategory] = useState(null)
    const [products, setProducts] = useState([])
 const [loading, setLoading] = useState(true)

const [adminEmail, setAdminEmail] = useState('')
const [adminPassword, setAdminPassword] = useState('')
const [isAdmin, setIsAdmin] = useState(false)

const [sellerForm, setSellerForm] = useState({
  product_name: '',
  category: '',
  description: '',
  price: '',
  sale_price: '',
  stock: '',
  weight_grams: '',
  image_url: '',
})
  useEffect(() => {
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading products:', error)
    } else {
      setProducts(data || [])
    }

    setLoading(false)
  }

  fetchProducts()
}, [])
  const loginAdmin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: adminEmail,
    password: adminPassword,
  })

  if (error) {
    alert('Login failed: ' + error.message)
    return
  }

  setIsAdmin(true)
  alert('Admin login successful!')
}
  const addToCart = (product) => {
    setCart((current) => [...current, product])
  }
const submitSellerProduct = async () => {
  if (
    !sellerForm.product_name ||
    !sellerForm.category ||
    !sellerForm.price ||
    !sellerForm.stock
  ) {
    alert('Please complete the required fields.')
    return
  }

  const { error } = await supabase
    .from('seller_products')
    .insert([
      {
        product_name: sellerForm.product_name,
        category: sellerForm.category,
        description: sellerForm.description || null,
        price: Number(sellerForm.price),
        sale_price: sellerForm.sale_price
          ? Number(sellerForm.sale_price)
          : null,
        stock: Number(sellerForm.stock),
        weight_grams: sellerForm.weight_grams
          ? Number(sellerForm.weight_grams)
          : 0,
        image_url: sellerForm.image_url || null,
        status: 'pending',
      },
    ])

  if (error) {
    console.error('Error submitting seller product:', error)
    alert('Failed to submit product. Please try again.')
    return
  }

  alert('Product submitted successfully! It is now waiting for approval.')

  setSellerForm({
    product_name: '',
    category: '',
    description: '',
    price: '',
    sale_price: '',
    stock: '',
    weight_grams: '',
    image_url: '',
  })
}
  return (
    <div className="app">
      <header className="header">
        <div className="brand">
  <img src="/ardas-logo.jpeg" alt="Ardas Ong Company" className="brand-logo" />
  <div className="brand-text">
    <span className="brand-name">ARDAS ONG</span>
    <span className="brand-tagline">WE SERVE YOU BETTER</span>
  </div>
</div>

     <nav>
  <a href="#home">Home</a>
  <a href="#shop">Shop</a>
  <a href="#about">About</a>
  <a href="#sell">Sell With Us</a>
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
  {!selectedCategory ? (
    <>
      <div className="section-heading">
        <p className="eyebrow">SHOP BY CATEGORY</p>
        <h2>Find what you need.</h2>
        <p>
          Explore our marketplace categories and discover products
          for your everyday needs.
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
                <button
                  className="explore-category"
                  onClick={() => setSelectedCategory(category.slug)}
                >
                  Explore Products →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  ) : (
    <div className="category-view">
      <button
        className="back-category"
        onClick={() => setSelectedCategory(null)}
      >
        ← Back to Categories
      </button>

      <div className="section-heading">
        <p className="eyebrow">EXPLORE PRODUCTS</p>
        <h2>
          {categories.find(
            (category) => category.slug === selectedCategory
          )?.name}
        </h2>
        <p>
          Discover products available in this category.
        </p>
      </div>

     <div className="category-products-grid">
  {loading ? (
    <p>Loading products...</p>
  ) : products.filter(
      (product) => product.category === selectedCategory
    ).length === 0 ? (
    <p>No products available in this category yet.</p>
  ) : (
    products
      .filter((product) => product.category === selectedCategory)
     .map((product) => (
  <div className="product-card" key={product.id}>
    {product.image_url && (
      <img src={product.image_url} alt={product.name} />
    )}

    <div className="product-card-content">
      <h3>{product.name}</h3>

      <p>{product.description}</p>

      <div className="product-bottom">
        <button className="explore-category">
          Explore Product →
        </button>
      </div>
    </div>
  </div>
))
  )}
</div>
    </div>
  )}
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

       <section className="sell-section" id="sell">
  <div>
    <p className="eyebrow">SELL WITH US</p>
    <h2>Become a Seller</h2>
  </div>

  <p>
    Have products to sell? Join Ardas Ong and introduce
    your products to customers through our marketplace.
  </p>

  <div className="seller-form">
    <h3>Submit Your Product</h3>

    <input
  type="text"
  placeholder="Product Name"
  value={sellerForm.product_name}
  onChange={(e) =>
    setSellerForm({
      ...sellerForm,
      product_name: e.target.value,
    })
  }
/>

    <select
  value={sellerForm.category}
  onChange={(e) =>
    setSellerForm({
      ...sellerForm,
      category: e.target.value,
    })
  }
>
      <option value="" disabled>
        Select Category
      </option>
      <option value="electronics">Electronics</option>
      <option value="smartphones">Smartphones</option>
      <option value="food">Food & Drinks</option>
      <option value="fashion">Fashion</option>
      <option value="home-living">Home & Living</option>
      <option value="handmade">Handmade</option>
      <option value="other">Other</option>
    </select>

<textarea
  placeholder="Product Description"
  rows="5"
  value={sellerForm.description}
  onChange={(e) =>
    setSellerForm({
      ...sellerForm,
      description: e.target.value,
    })
  }
/>

<input
  type="number"
  placeholder="Price"
  value={sellerForm.price}
  onChange={(e) =>
    setSellerForm({
      ...sellerForm,
      price: e.target.value,
    })
  }
/>

<input
  type="number"
  placeholder="Sale Price (optional)"
  value={sellerForm.sale_price}
  onChange={(e) =>
    setSellerForm({
      ...sellerForm,
      sale_price: e.target.value,
    })
  }
/>

<input
  type="number"
  placeholder="Stock"
  value={sellerForm.stock}
  onChange={(e) =>
    setSellerForm({
      ...sellerForm,
      stock: e.target.value,
    })
  }
/>

<input
  type="number"
  placeholder="Weight (grams)"
  value={sellerForm.weight_grams}
  onChange={(e) =>
    setSellerForm({
      ...sellerForm,
      weight_grams: e.target.value,
    })
  }
/>

<input
  type="url"
  placeholder="Product Image URL"
  value={sellerForm.image_url}
  onChange={(e) =>
    setSellerForm({
      ...sellerForm,
      image_url: e.target.value,
    })
  }
/>
    <button
  className="primary-button"
  type="button"
  onClick={submitSellerProduct}
>
  Submit Product
</button>
  </div>
</section>
        <section className="admin-login-section" id="admin">
  <div>
    <p className="eyebrow">ADMIN</p>
    <h2>Admin Login</h2>
  </div>

  {!isAdmin ? (
    <div className="admin-login-form">
      <input
        type="email"
        placeholder="Admin Email"
        value={adminEmail}
        onChange={(e) => setAdminEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Admin Password"
        value={adminPassword}
        onChange={(e) => setAdminPassword(e.target.value)}
      />

      <button
        className="primary-button"
        type="button"
        onClick={loginAdmin}
      >
        Login
      </button>
    </div>
  ) : (
    <div className="admin-welcome">
      <p>Admin login successful.</p>
    </div>
  )}
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
