import { useState } from 'react'
import './App.css'
import { FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa'

function App() {
  // 商品數據
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: '筆記型電腦', 
      price: 30000, 
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
      description: '高效能商務筆電，搭載最新處理器和高解析度螢幕',
      rating: 4.8
    },
    { 
      id: 2, 
      name: '智能手機', 
      price: 15000, 
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
      description: '最新旗艦智能手機，配備高畫質相機和長效電池',
      rating: 4.7
    },
    { 
      id: 3, 
      name: '無線耳機', 
      price: 2000, 
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: '高音質無線耳機，具備主動降噪功能和長效電池',
      rating: 4.5
    },
    { 
      id: 4, 
      name: '無線滑鼠', 
      price: 800, 
      image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      description: '人體工學設計無線滑鼠，精準定位和舒適握感',
      rating: 4.3
    },
    { 
      id: 5, 
      name: '機械鍵盤', 
      price: 1200, 
      image: 'https://images.unsplash.com/photo-1595225476474-57ff36594559?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
      description: 'RGB背光機械鍵盤，提供絕佳打字體驗和遊戲性能',
      rating: 4.6
    },
    { 
      id: 6, 
      name: '曲面顯示器', 
      price: 8000, 
      image: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: '27吋曲面顯示器，高刷新率和廣色域，適合專業設計和遊戲',
      rating: 4.9
    },
    { 
      id: 7, 
      name: '智能手錶', 
      price: 5500, 
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
      description: '多功能智能手錶，支援健康監測和運動追蹤',
      rating: 4.4
    },
    { 
      id: 8, 
      name: '藍牙音箱', 
      price: 1800, 
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1036&q=80',
      description: '便攜式防水藍牙音箱，音質清晰且電池續航力強',
      rating: 4.2
    }
  ])

  // 購物車數據
  const [cart, setCart] = useState([])
  
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
    const existingItem = cart.find(item => item.id === product.id)
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  // 從購物車移除商品
  const removeFromCart = (productId) => {
    const existingItem = cart.find(item => item.id === productId)
    
    if (existingItem.quantity === 1) {
      setCart(cart.filter(item => item.id !== productId))
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ))
    }
  }

  // 計算購物車總金額
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0)

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
              <div key={product.id} className="product-card">
                <div className="product-badge">{product.rating} ★</div>
                <img src={product.image} alt={product.name} className="product-image" />
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

        <div className="cart-container">
          <div className="cart-header">
            <FaShoppingCart className="cart-icon" />
            <h2>購物車</h2>
          </div>
          {cart.length === 0 ? (
            <p>購物車是空的</p>
          ) : (
            <>
              <ul className="cart-items">
                {cart.map(item => (
                  <li key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-info">
                      <h3>{item.name}</h3>
                      <p>NT$ {item.price} x {item.quantity}</p>
                    </div>
                    <div className="cart-item-actions">
                      <button onClick={() => removeFromCart(item.id)}><FaMinus /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => addToCart(item)}><FaPlus /></button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <p>總計: NT$ {totalPrice}</p>
                <button className="checkout-btn">結帳</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
