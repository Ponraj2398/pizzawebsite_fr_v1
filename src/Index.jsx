import React, { useEffect, useState } from 'react';
import './App.css'; // Import your component-specific CSS file
import img from '../src/images/pizzahutimg1.jpg'

const IndexComponent = () => {
    const [cart, setCart] = useState([]);
    const [additems, setItems] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:8080/product/getadmindata`)
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
            })
            .catch((err) => { console.error(err); })
    }, [])

    const addToCart = (a) => {
        const existingCartItem = cart.find(item => item.id === a.id);

        if (existingCartItem) {
            // existingCartItem.quantity += 1;
            setCart(prevCart => prevCart.map(item =>
                item.id === a.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            const numericPrice = parseFloat(a.price.replace('Rs.', ''));
            setCart(prevCart => [
                ...prevCart,
                {
                    ...a,
                    quantity: 1,
                    price: numericPrice,
                },
            ]);
        }
    };

    const increaseQuantity = (id) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            );
            
            // If the item with the specified ID doesn't exist in the cart, add it with quantity 1
            if (!prevCart.some((item) => item.id === id)) {
                // Fetch the item details from the additems array based on the ID
                const newItem = additems.find((item) => item.id === id);
                
                if (newItem) {
                    const numericPrice = parseFloat(newItem.price.replace('Rs.', ''));
                    updatedCart.push({
                        ...newItem,
                        quantity: 1,
                        price: numericPrice,
                    });
                }
            }
            return updatedCart;
        });
    };

    const decreaseQuantity = (id) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) =>
            item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
        );
            return updatedCart;
        });
    };

    const calculateItemTotal = (cartItem) => {
        if (!cartItem || cartItem.price == null || cartItem.quantity == null) {
            return 0;
        }
        return cartItem.price * cartItem.quantity;
    };

    const computedItemTotal = cart.map(cartItem => calculateItemTotal(cartItem));

    const subtotal = cart.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0);

    const gst = (subtotal * 0.05).toFixed(2);

    const deliveryCharges = 5;

    const overallTotal = (parseFloat(subtotal) + parseFloat(gst) + deliveryCharges).toFixed(2);

    return (
        <div>
            <input type="checkbox" id="cart" />
            <label htmlFor="cart" className="label-cart">
                <i className="bi bi-cart3" style={{ color: '#fecb40', fontSize: '25px' }}></i>
            </label>
            {/* Dashboard */}
            <div className="dashborad" style={{ backgroundColor: '#fecb40' }}>
                <div className="dashborad-items">
                    <img src={img} alt="#" className="img-fluid" />
                    <div className="dashboard-text">
                        <h1><span>50% OFF</span><br /> Tasty Food <br /> On Your Hand</h1>
                    </div>
                </div>
                <h3 className="dashboard-title">Recommended Food For You</h3>
                <div className="dashboard-menu">
                    <a href="#">Favorites</a>
                    <a href="#">Best Seller</a>
                    <a href="#">Near Me</a>
                    <a href="#">Promotion</a>
                    <a href="#">Top Rated</a>
                    <a href="#">All</a>
                </div>
                <div className="dashboard-content">
                    {
                        Array.isArray(additems) && additems.slice(0, 100).map((a, index) => (
                            <div key={a.id}>
                                <div key={index} className="dashboard-menus" style={{ backgroundColor: 'black' }}>
                                    <img src={a.image} alt="#" className="img-fluid dash-image" style={{ overflow: 'hidden', width: '400px', height: '150px' }} />
                                    <div className="details">
                                        <h5>{a.name}<span>{a.price}</span></h5>
                                        <p><strong className="box-pizza">BOX PIZZA</strong> {a.description}</p>
                                        <p className="time"><i className="bi bi-clock-fill"></i> 15-20mints</p>
                                        <button onClick={() => addToCart(a, index)} className="btn btn-danger">Add Item</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* Order dashboard */}
            <div className="dashboard-order">
                <h3>Order-Menu</h3>
                <div className="order-address">
                    <p>Address Delivery</p>
                    <h4>130 Kalavasal Byepass Road, Madurai-05</h4>
                </div>
                <div className="order-time">
                    <i className="bi bi-clock-fill"></i> 30 mins <i className="bi bi-geo-alt-fill"> 2 km</i>
                </div>
                <div className="order-wrapper">
                    {cart.map((cartItem, index) => (
                        <div key={cartItem.id} className="order-card">
                            <img src={cartItem.image} className="order-img" alt="#" />
                            <div className="order-details">
                                <p>{cartItem.name}</p>
                                <div>
                                    <button className="btn btn-danger w-25" onClick={() => decreaseQuantity(cartItem.id)}>-</button>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span>{cartItem.quantity}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button className="btn btn-danger w-25" onClick={() => increaseQuantity(cartItem.id)}>+</button>
                                </div>
                            </div>
                            <span className="order-price">Rs.{calculateItemTotal(cartItem)}</span>
                        </div>
                    ))}
                </div>
                <hr className="divider" />
                <div className="order-total">
                    <p>Subtotal <span>Rs.{subtotal}</span></p>
                    <p>Tax (5%) <span>Rs.{gst}</span></p>
                    <p>Delivery Charges <span>Rs.{deliveryCharges}</span></p>
                    <div className="promo">
                        <input type="text" className="input-promo" name="floatingInput" id="floatingInput" placeholder="Apply Voucher" />
                        <button className="button-promo">Find Promo</button>
                    </div>
                    <hr className="divider" />
                    <p>Total <span>Rs.{overallTotal}</span></p>
                </div>
                <button className="checkout">Checkout</button>
            </div>
        </div>
    );
};

export default IndexComponent;
