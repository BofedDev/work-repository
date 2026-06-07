import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '@store/cartSlice';

const CartItem = ({ item, showDivider }) => {
    const dispatch = useDispatch();

    const discountedPrice = (item.price * (1 - (item.discountPercentage || 0) / 100)).toFixed(2);

    return (
        <>
            <div style={styles.row}>
                <img
                    src={item.thumbnail || 'https://via.placeholder.com/100'}
                    alt={item.title}
                    style={styles.image}
                />
                <div style={styles.info}>
                    <div style={styles.titleRow}>
                        <p style={styles.title}>{item.title}</p>
                        <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            style={styles.removeBtn}
                        >✕</button>
                    </div>
                    <p style={styles.price}>${discountedPrice}</p>
                    <div style={styles.qtyRow}>
                        <button onClick={() => dispatch(decreaseQuantity(item.id))} style={styles.qtyBtn}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => dispatch(increaseQuantity(item.id))} style={styles.qtyBtn}>+</button>
                    </div>
                </div>
            </div>
            {showDivider && <hr style={styles.divider} />}
        </>
    );
};

export default CartItem;

//Styles

const styles = {
    row: {
        display: 'flex',
        gap: '16px',
        padding: '16px 0',
    },
    image: {
        width: 100,
        height: 100,
        objectFit: 'contain',
        borderRadius: 12,
        background: '#F0EEED',
        padding: 4,
    },
    info: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    },
    titleRow: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    title: {
        margin: 0,
        fontWeight: 700,
    },
    removeBtn: {
        background: 'none',
        border: 'none',
        color: 'red',
        cursor: 'pointer',
        fontSize: 18,
    },
    price: {
        margin: 0,
        fontWeight: 700,
    },
    qtyRow: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
    },
    qtyBtn: {
        cursor: 'pointer',
    },
    divider: {
        opacity: 0.2,
    },
};