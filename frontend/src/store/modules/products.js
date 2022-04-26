import axios from 'axios'

const state = {
    products: [],
    cart: [],
    errorMessage: null,
    favorites: []
}

const getters = {
    allProducts: state =>  state.products.filter( product => product.stock > 0),
    cartProducts: state => state.cart,
    getErrorMessage: state =>  state.errorMessage,
    cartTotal: (state, getters) => {
        let total = 0;
        getters.cartProducts.forEach(product => {
            total += product.price * product.stock
        })
        return total
    },
    allFavorites: (state) => state.favorites.map ( favItem => {
        const product = state.products.find ( product => product.id === favItem.id)
        return {
            id: product.id,
            image_url: product.image_url,
            productName: product.productName,
            price: product.price,
            stock: product.stock,
            favorite: product.favorite
        }
    })
}

const actions = {
    async fetchProducts({ commit }) {
        const response = await axios.get('http://localhost:3000/grocery')
        commit('SET_PRODUCTS', response.data);
    },

    async addProductToCart ({ commit }, product) {
        if ( product.stock > 0) {
            const cartItem = state.cart.find( item => item.id === product.id);
            
            const productItem = {
                ...product,
                stock: product.stock - 1
            }

            const newCartItem = {
                ...product,
                stock: 1
            }

            try {
                await axios.patch(`http://localhost:3000/grocery/${product.id}`, productItem);
                if (!cartItem) {
                    commit('PUSH_PRODUCT_TO_CART', newCartItem);
                } else {
                    commit('INCREMENT_ITEM_QTY_CART', cartItem);
                }
                commit('DECREMENT_PRODUCT_INVENTORY', product);
            }
            catch (error) {
                commit('SET_ERROR', error);
            }
        }
    },
    async incrementItemQuantityCart ({commit}, productId) {
        const cartItem = state.cart.find( item => item.id === productId);
        const productItem = state.products.find( item => item.id === productId);

        try {
            await axios.patch(`http://localhost:3000/grocery/${productId}`, 
                {
                    stock: productItem.stock - 1
                }
            );

            commit('INCREMENT_ITEM_QTY_CART', cartItem);
            commit('DECREMENT_PRODUCT_INVENTORY', productItem);
        }
        catch (error) {
            state.errorMessage = null;
            commit('SET_ERROR', error);
        }
    },
    async decrementItemQuantityCart ({commit}, productId) {
        const cartItem = state.cart.find( item => item.id === productId);
        const productItem = state.products.find( item => item.id === productId);

        try {
            await axios.patch(`http://localhost:3000/grocery/${productId}`, 
                {
                    stock: productItem.stock + 1
                }
            );
            commit('DECREMENT_ITEM_QTY_CART', cartItem);
            commit('INCREMENT_PRODUCT_INVENTORY', productItem);
        }
        catch(error) {
            state.errorMessage = null;
            commit('SET_ERROR', error);
        }
        
        // Remove item from Cart
        if (cartItem.stock == 0) {
            const index = state.cart.indexOf(cartItem);
            if (index > -1) {
                state.cart.splice(index, 1);
              }
        }
    },
    async addRemoveProductFromFavorites ({ commit }, product) {
        if ( product.stock > 0) {
            let productFav = state.products.find(item => {
                return item.id === product.id
            });
            let isFav = 0;

            if (productFav.favorite === 0) {
                isFav = 1
                commit('PUSH_PRODUCT_TO_FAV', productFav);
                // Update State
                commit('PRODUCT_ADD_FAV', productFav);
            } else {
                
                const index = state.favorites.indexOf(product);
                commit('REMOVE_PRODUCT_TO_FAV', index);
                // Update State
                commit('PRODUCT_REMOVE_FAV', productFav);
            }

            await axios.patch(`http://localhost:3000/grocery/${product.id}`, 
                {
                    favorite: isFav 
                }
            );
        }
    },

    async getFavorites({ commit }) {
        const response = await axios.get('http://localhost:3000/grocery?favorite=1');
        commit('SET_FAVORITES', response.data);
    }
}

const mutations = {
    SET_PRODUCTS: (state, products) => (state.products = products),
    SET_ERROR: (state, error) => (state.errorMessage = error),
    PUSH_PRODUCT_TO_CART: (state, productItem) => (state.cart.push (productItem)),
    INCREMENT_ITEM_QTY_CART: (state, cartItem) => cartItem.stock++,
    DECREMENT_ITEM_QTY_CART: (state, cartItem) => cartItem.stock--,
    INCREMENT_PRODUCT_INVENTORY: (state, product) => product.stock++,
    DECREMENT_PRODUCT_INVENTORY: (state, product) => product.stock--,
    PUSH_PRODUCT_TO_FAV: (state, productFav) => (state.favorites.push (productFav)),
    REMOVE_PRODUCT_TO_FAV: (state, index) => (state.favorites.splice(index, 1)),
    SET_FAVORITES: (state, products) => (state.favorites = products),
    PRODUCT_ADD_FAV: (state, productFav) => (productFav.favorite = 1),
    PRODUCT_REMOVE_FAV: (state, productFav) => (productFav.favorite = 0)
}

export default {
    state,
    getters,
    actions, 
    mutations
}