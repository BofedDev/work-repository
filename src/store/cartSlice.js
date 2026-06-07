import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
    try {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
        console.error('Ошибка загрузки корзины:', e);
        return [];
    }
};

const initialState = {
    items: loadCartFromStorage(),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    id: product.id,
                    title: product.title,
                    price: Number(product.price) || 0,
                    thumbnail: product.thumbnail || product.images?.[0] || '',
                    discountPercentage: Number(product.discountPercentage) || 0,
                    quantity: 1,
                });
            }
            saveCartToStorage(state.items); // ← сохраняем после изменения
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            saveCartToStorage(state.items);
        },

        increaseQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
                saveCartToStorage(state.items);
            }
        },

        decreaseQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                saveCartToStorage(state.items);
            }
        },

        clearCart: (state) => {
            state.items = [];
            saveCartToStorage([]);
        },
    },
});

const saveCartToStorage = (items) => {
    try {
        localStorage.setItem('cart', JSON.stringify(items));
    } catch (e) {
        console.error('Ошибка сохранения корзины:', e);
    }
};

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;