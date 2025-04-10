import { useState } from 'react';
import { FaShoppingCart, FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
import './Cart.css';

function Cart({ cart, setCart, isCartVisible, setIsCartVisible, addToCart, removeFromCart }) {
  // 計算購物車總金額
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <>
      {!isCartVisible && (
        <div className="cart-toggle-button" onClick={() => setIsCartVisible(true)}>
          <FaShoppingCart />
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </div>
      )}

      {isCartVisible && (
        <div className="cart-container">
          <div className="cart-header">
            <FaShoppingCart className="cart-icon" />
            <h2>購物車</h2>
            <button className="cart-close-btn" onClick={() => setIsCartVisible(false)}>
              <FaTimes />
            </button>
          </div>
          {cart.length === 0 ? (
            <p>購物車是空的</p>
          ) : (
            <>
              <ul className="cart-items">
                {cart.map(item => (
                 <li key={item.barcode || item.name} className="cart-item">
                 <div className="cart-item-image">
                   <img
                     src={`/cpaysearch/${item.image}`}
                     alt={item.name}
                     onError={(e) => {
                       e.target.onerror = null;
                       e.target.src = '/cpaysearch/vite.svg';
                     }}
                   />
                 </div>
                 <div className="cart-item-details">
                   <div className="cart-item-info">
                     <h3>{item.name}</h3>
                     <p>單價: ${item.price}</p>
                   </div>
                   <div className="cart-item-quantity">
                     <button onClick={() => removeFromCart(item.barcode || item.name)}><FaMinus /></button>
                     <span>{item.quantity}</span>
                     <button onClick={() => addToCart(item)}><FaPlus /></button>
                     <button className="delete-btn" onClick={() => removeFromCart(item.barcode || item.name)}>刪除</button>
                   </div>
                   <div className="cart-item-subtotal">
                     <br></br>小計: <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                     <button className="edit-btn">修改</button>
                     
                   </div>
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
      )}
    </>
  );
}

export default Cart;