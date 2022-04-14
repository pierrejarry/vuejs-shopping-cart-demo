import axios from 'axios'

const state = {
    products: [],
    errorMessage: null
}

const getters = {
    allProducts: state =>  state.products.filter( product => product.stock > 0),
    getErrorMessage: state =>  state.errorMessage
}

const actions = {
    async fetchProducts({ commit }) {
        try {
            const response = await axios.get('http://localhost:3000/grocery')
            commit('SET_PRODUCTS', response.data);
        }
        catch (error) {
            commit('SET_ERROR', error);
        }
    },
}

const mutations = {
    SET_PRODUCTS: (state, products) => (state.products = products),
    SET_ERROR: (state, error) => (state.errorMessage = error)
}

export default {
    state,
    getters,
    actions, 
    mutations
}