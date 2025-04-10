import { useState } from 'react';
import { FaShoppingCart, FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
import './Cart.css';

function Cart({ cart, setCart, isCartVisible, setIsCartVisible, addToCart, removeFromCart }) {
  const totalPrice = cart.reduce((total, item) => total + (item.subtotal || item.price * item.quantity), 0);

  const handleEditSubtotal = (itemId, currentSubtotal) => {
    const userInput = prompt("請輸入新的小計金額：", currentSubtotal);
    if (userInput === null) return; // 使用者按取消
    const newSubtotal = parseFloat(userInput);
    if (isNaN(newSubtotal) || newSubtotal < 0) {
      alert("請輸入有效的數字！");
      return;
    }

    const updatedCart = cart.map(item =>
      (item.barcode || item.name) === itemId
        ? { ...item, subtotal: newSubtotal }
        : item
    );
    setCart(updatedCart);
  };

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
                {cart.map(item => {
                  const itemId = item.barcode || item.name;

                  return (
                    <li key={itemId} className="cart-item">
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
                          <p>售價: ${item.price}</p>
                          </div>
                        <div className="cart-item-quantity">
                          <button onClick={() => removeFromCart(itemId)}><FaMinus /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => addToCart(item)}><FaPlus /></button>
                          <button className="delete-btn" onClick={() => removeFromCart(itemId)}>刪除</button>
                        </div>
                        <div className="cart-item-subtotal">
                          <br />
                          小計: <strong>${(item.subtotal || item.price * item.quantity).toFixed(2)}</strong>
                          <button
                            className="edit-btn"
                            onClick={() => handleEditSubtotal(itemId, item.subtotal || item.price * item.quantity)}
                          >
                            修改
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="cart-total">
                <p>總計: NT$ {totalPrice.toFixed(2)}</p>
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
