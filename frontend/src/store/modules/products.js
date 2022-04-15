import axios from 'axios'

const state = {
    products: [],
    cart: [],
    errorMessage: null
}

const getters = {
    allProducts: state =>  state.products.filter( product => product.stock > 0),
    cartProducts: state => state.cart,
    getErrorMessage: state =>  state.errorMessage
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
    }
}

const mutations = {
    SET_PRODUCTS: (state, products) => (state.products = products),
    SET_ERROR: (state, error) => (state.errorMessage = error),
    PUSH_PRODUCT_TO_CART: (state, productItem) => (state.cart.push (productItem)),
    INCREMENT_ITEM_QTY_CART: (state, cartItem) => cartItem.stock++,
    DECREMENT_PRODUCT_INVENTORY: (state, product) => product.stock--
}

export default {
    state,
    getters,
    actions, 
    mutations
}