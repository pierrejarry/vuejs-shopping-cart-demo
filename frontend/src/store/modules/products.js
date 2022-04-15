import axios from 'axios'

const state = {
    products: [],
    cart: [],
    errorMessage: null
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
                id: product.id,
                image_url: product.image_url,
                stock: 1,
                productName: product.productName,
                price: product.price,
                productDescription: product.productDescription,
                favorite: product.favorite 
            }

            try {
                await axios.patch(`http://localhost:3000/grocery/${product.id}`, productItem);
                if (!cartItem) {
                    commit('PUSH_PRODUCT_TO_CART', productItem);
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

    async incrementItemQuantityCart ({commit}, product) {
        const cartItem = state.cart.find( item => item.id === product.id);
        const productItem = state.products.find( item => item.id === product.id);
        
        commit('INCREMENT_ITEM_QTY_CART', cartItem);
        commit('DECREMENT_PRODUCT_INVENTORY', productItem);

        await axios.patch(`http://localhost:3000/grocery/${product.id}`, 
            {
                stock: productItem.stock 
            }
        );
    },

    async decrementItemQuantityCart ({commit}, product) {
        const cartItem = state.cart.find( item => item.id === product.id);
        const productItem = state.products.find( item => item.id === product.id);

        commit('DECREMENT_ITEM_QTY_CART', cartItem);
        commit('INCREMENT_PRODUCT_INVENTORY', productItem);

        await axios.patch(`http://localhost:3000/grocery/${product.id}`, 
            {
                stock: productItem.stock 
            }
        );

        // Remove item from Cart
        if (cartItem.stock == 0) {
            const index = state.cart.indexOf(cartItem);
            if (index > -1) {
                state.cart.splice(index, 1);
              }
        }
    }
}

const mutations = {
    SET_PRODUCTS: (state, products) => (state.products = products),
    SET_ERROR: (state, error) => (state.errorMessage = error),
    PUSH_PRODUCT_TO_CART: (state, productItem) => (state.cart.push (productItem)),
    INCREMENT_ITEM_QTY_CART: (state, cartItem) => cartItem.stock++,
    DECREMENT_ITEM_QTY_CART: (state, cartItem) => cartItem.stock--,
    INCREMENT_PRODUCT_INVENTORY: (state, product) => product.stock++,
    DECREMENT_PRODUCT_INVENTORY: (state, product) => product.stock--
}

export default {
    state,
    getters,
    actions, 
    mutations
}