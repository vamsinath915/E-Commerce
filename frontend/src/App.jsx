import { useEffect, useState } from "react";
import "./App.css";

const categories = [
  { name: "Electronics", icon: "💻" },
  { name: "Mobiles", icon: "📱" },
  { name: "Fashion", icon: "👗" },
  { name: "Home & Living", icon: "🛋️" },
  { name: "Beauty", icon: "💄" },
  { name: "Sports", icon: "👟" },
  { name: "Books", icon: "📚" },
  { name: "Toys", icon: "🧸" },
  { name: "Grocery", icon: "🥦" },
  { name: "Cars & Bikes", icon: "🚗" },
];

const API_URL = "http://localhost:8080/api/products";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState([]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // GET PRODUCTS FROM SPRING BOOT
  // =========================================================

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Backend returned status ${response.status}`
          );
        }

        return response.json();
      })
      .then((data) => {
        console.log(
          "Products received from Spring Boot:",
          data
        );

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
          setError(
            "Invalid product data received from backend."
          );
        }
      })
      .catch((err) => {
        console.error(
          "Backend connection error:",
          err
        );

        setError(
          "Unable to connect to the backend. Make sure Spring Boot is running on port 8080."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // =========================================================
  // NORMALIZE PRODUCT DATA
  // =========================================================

  const normalizedProducts = products.map((product) => {
    const price = Number(product.price || 0);

    const oldPrice = Number(
      product.oldPrice ||
        product.originalPrice ||
        product.mrp ||
        price
    );

    const discount =
      product.discount ||
      (oldPrice > price
        ? `${Math.round(
            ((oldPrice - price) / oldPrice) * 100
          )}% OFF`
        : "");

    return {
      ...product,

      id: product.id,

      name: product.name || "Product",

      category: product.category || "General",

      price: price,

      oldPrice: oldPrice,

      discount: discount,

      rating: Number(product.rating || 4.5),

      reviews: product.reviews || "0",

      image:
        product.imageUrl ||
        product.image ||
        product.imageURL ||
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    };
  });

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredProducts = normalizedProducts.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // =========================================================
  // ADD TO CART
  // =========================================================

  const addToCart = (product) => {
    setCartCount((count) => count + 1);

    console.log("Added to cart:", product);
  };

  // =========================================================
  // WISHLIST
  // =========================================================

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  // =========================================================
  // CATEGORY CLICK
  // =========================================================

  const selectCategory = (categoryName) => {
    setSearch(categoryName);
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="app">

      {/* =====================================================
          TOP BAR
      ====================================================== */}

      <div className="top-bar">
        <div>
          <span>AI-Powered Recommendations</span>

          <span className="divider">|</span>

          <span>
            Free delivery on orders above ₹999
          </span>
        </div>

        <div className="top-right">
          <span>📍 Deliver to Hyderabad</span>

          <span>Track Order</span>

          <span>Help</span>
        </div>
      </div>

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="header">

        <div className="brand">
          <span className="brand-icon">
            🛒
          </span>

          <span>
            Shop<span>Smart</span>
          </span>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button>
            🔍
          </button>
        </div>

        <div className="header-actions">

          <div className="header-action">
            <span>♙</span>

            <small>
              Login
            </small>
          </div>

          <div className="header-action">
            <span>♡</span>

            <small>
              Wishlist
            </small>
          </div>

          <div className="header-action cart-action">
            <span>🛒</span>

            <small>
              Cart
            </small>

            <b>
              {cartCount}
            </b>
          </div>

        </div>

      </header>

      {/* =====================================================
          CATEGORY NAVIGATION
      ====================================================== */}

      <nav className="category-nav">

        <div className="all-categories">
          ☰ &nbsp; All Categories
        </div>

        {categories.map((category) => (
          <span
            key={category.name}
            onClick={() =>
              selectCategory(category.name)
            }
          >
            {category.name}
          </span>
        ))}

      </nav>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main>

        {/* =================================================
            HERO
        ================================================== */}

        <section className="hero">

          <div className="hero-main">

            <div className="hero-content">

              <p>
                NEW ARRIVALS
              </p>

              <h1>
                Latest Laptops
                <br />
                for a Smarter You
              </h1>

              <h3>
                High performance laptops for work,
                study and gaming with AI-powered
                recommendations.
              </h3>

              <button
                className="shop-button"
                onClick={() =>
                  document
                    .getElementById("products")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                Shop Now →
              </button>

            </div>

            <div className="hero-image">

              <img
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85"
                alt="Laptop"
              />

              <div className="offer">
                <span>
                  Up to
                </span>

                <strong>
                  40%
                </strong>

                <span>
                  OFF
                </span>
              </div>

            </div>

          </div>

          <div className="hero-side">

            <div className="side-card phone-card">

              <div>
                <h2>
                  Best Selling
                </h2>

                <h1>
                  Smartphones
                </h1>

                <p>
                  Top brands. Great prices.
                </p>

                <a href="#products">
                  Shop Now →
                </a>
              </div>

              <div className="side-icon">
                📱
              </div>

            </div>

            <div className="side-card audio-card">

              <div className="side-icon">
                🎧
              </div>

              <div>
                <h2>
                  Premium Audio
                </h2>

                <h1>
                  Experience
                </h1>

                <p>
                  Headphones, Earbuds & more
                </p>

                <a href="#products">
                  Shop Now →
                </a>
              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            CATEGORIES
        ================================================== */}

        <section className="categories">

          {categories.map((category) => (
            <div
              className="category-item"
              key={category.name}
              onClick={() =>
                selectCategory(category.name)
              }
            >

              <div className="category-circle">
                {category.icon}
              </div>

              <span>
                {category.name}
              </span>

            </div>
          ))}

        </section>

        {/* =================================================
            PRODUCTS
        ================================================== */}

        <section
          className="products-section"
          id="products"
        >

          <div className="section-title">

            <h2>
              Featured Products
            </h2>

            <a href="#products">
              View All →
            </a>

          </div>

          {/* LOADING */}

          {loading && (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                fontSize: "18px",
              }}
            >
              Loading products...
            </div>
          )}

          {/* ERROR */}

          {!loading && error && (
            <div
              style={{
                textAlign: "center",
                padding: "30px",
                color: "red",
              }}
            >

              <p>
                {error}
              </p>

              <button
                onClick={() =>
                  window.location.reload()
                }
              >
                Retry
              </button>

            </div>
          )}

          {/* NO PRODUCTS */}

          {!loading &&
            !error &&
            filteredProducts.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                }}
              >

                <h3>
                  No products found
                </h3>

                <p>
                  Try another search.
                </p>

              </div>
            )}

          {/* PRODUCT GRID */}

          {!loading &&
            !error &&
            filteredProducts.length > 0 && (

              <div className="product-grid">

                {filteredProducts.map(
                  (product) => (

                    <div
                      className="product-card"
                      key={product.id}
                    >

                      {/* IMAGE */}

                      <div className="product-image">

                        <img
                          src={product.image}
                          alt={product.name}
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80";
                          }}
                        />

                        {/* WISHLIST */}

                        <button
                          className={`wishlist ${
                            wishlist.includes(
                              product.id
                            )
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            toggleWishlist(
                              product.id
                            )
                          }
                        >
                          {wishlist.includes(
                            product.id
                          )
                            ? "♥"
                            : "♡"}
                        </button>

                      </div>

                      {/* PRODUCT DETAILS */}

                      <div className="product-details">

                        <p className="product-category">
                          {product.category}
                        </p>

                        <h3>
                          {product.name}
                        </h3>

                        {/* RATING */}

                        <div className="rating">

                          <span>
                            ★★★★★
                          </span>

                          <b>
                            {product.rating}
                          </b>

                          <small>
                            ({product.reviews})
                          </small>

                        </div>

                        {/* PRICE */}

                        <div className="price-row">

                          <strong>
                            ₹
                            {product.price.toLocaleString(
                              "en-IN"
                            )}
                          </strong>

                          {product.oldPrice >
                            product.price && (
                            <del>
                              ₹
                              {product.oldPrice.toLocaleString(
                                "en-IN"
                              )}
                            </del>
                          )}

                          {product.discount && (
                            <span className="discount">
                              {product.discount}
                            </span>
                          )}

                        </div>

                        {/* ADD CART */}

                        <button
                          className="add-cart"
                          onClick={() =>
                            addToCart(product)
                          }
                        >
                          🛒 Add to Cart
                        </button>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

        </section>

        {/* =================================================
            AI RECOMMENDATIONS
        ================================================== */}

        <section className="ai-section">

          <div className="ai-header">

            <div className="ai-title">

              <span className="sparkle">
                ✦
              </span>

              <div>

                <h2>
                  AI Recommendations for You
                </h2>

                <p>
                  Based on your browsing and shopping
                  history
                </p>

              </div>

            </div>

            <a href="#products">
              View All →
            </a>

          </div>

          <div className="recommendations">

            {normalizedProducts
              .slice(0, 5)
              .map((product) => (

                <div
                  className="recommendation-card"
                  key={product.id}
                >

                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80";
                    }}
                  />

                  <div>

                    <h4>
                      {product.name}
                    </h4>

                    <strong>
                      ₹
                      {product.price.toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                  </div>

                </div>

              ))}

          </div>

        </section>

      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer>

        <div className="footer-brand">
          🛒 ShopSmart
        </div>

        <p>
          AI-powered shopping made simple.
        </p>

        <div className="footer-links">

          <span>
            About
          </span>

          <span>
            Contact
          </span>

          <span>
            Privacy
          </span>

          <span>
            Terms
          </span>

        </div>

        <div className="copyright">
          © 2026 ShopSmart. All rights reserved.
        </div>

      </footer>

    </div>
  );
}

export default App;