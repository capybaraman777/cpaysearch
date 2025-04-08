import { useState, useEffect } from 'react'
import './App.css'
import './Cart.css'
import './responsive.css'
import { FaShoppingCart } from 'react-icons/fa'
import productsData from './products.json'
import Cart from './Cart'
// 使用public目錄下的圖片，GitHub Pages可以正確讀取

function App() {
  // 商品數據
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // 使用useEffect從JSON文件加載數據
  useEffect(() => {
    try {
      // 直接從導入的JSON文件設置商品數據
      setProducts(productsData)
      setLoading(false)
    } catch (err) {
      console.error('加載商品數據時出錯:', err)
      setError('無法加載商品數據，請稍後再試。')
      setLoading(false)
    }
  }, []) // 空依賴數組表示僅在組件掛載時執行一次

  // 購物車數據
  const [cart, setCart] = useState([])
  
  // 購物車顯示狀態
  const [isCartVisible, setIsCartVisible] = useState(true)
  
  // 搜索關鍵詞
  const [searchTerm, setSearchTerm] = useState('')

  // 處理搜索
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  // 過濾商品
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 添加商品到購物車
  const addToCart = (product) => {
    const identifier = product.barcode || product.name
    const existingItem = cart.find(item => (item.barcode || item.name) === identifier)
    
    if (existingItem) {
      setCart(cart.map(item => 
        (item.barcode || item.name) === identifier 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  // 從購物車移除商品
  const removeFromCart = (productId) => {
    const identifier = productId
    const existingItem = cart.find(item => (item.barcode || item.name) === identifier)
    
    if (existingItem.quantity === 1) {
      setCart(cart.filter(item => (item.barcode || item.name) !== identifier))
    } else {
      setCart(cart.map(item => 
        (item.barcode || item.name) === identifier 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ))
    }
  }

  // 購物車相關功能已移至Cart.jsx組件

  return (
    <div className="app-container">
      <header className="header">
        <h1>購物網站</h1>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="搜尋商品..." 
            value={searchTerm} 
            onChange={handleSearch} 
            className="search-input"
          />
        </div>
      </header>

      <div className="main-content">
        <div className="products-container">
          <h2>商品列表</h2>
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.barcode || product.name} className="product-card">
                {product.rating && <div className="product-badge">{product.rating} ★</div>}
                <img 
                   src={`/cpaysearch/${product.image}`} 
                  alt={product.name} 
                  className="product-image" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/cpaysearch/vite.svg'; // ✅ 加上 repo 名作為 base path
                  }}
                />
                <div className="product-content">
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">NT$ {product.price.toLocaleString()}</p>
                  <button 
                    className="add-to-cart-btn" 
                    onClick={() => addToCart(product)}
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Cart 
          cart={cart} 
          setCart={setCart} 
          isCartVisible={isCartVisible} 
          setIsCartVisible={setIsCartVisible} 
          addToCart={addToCart} 
          removeFromCart={removeFromCart} 
        />
      </div>
    </div>
  )
}

export default App
