import axios from 'axios'

const state = {
    products: []
}

const getters = {
    allProducts: (state) =>  state.products.filter( product => product.stock > 0)
}

const actions = {
    async fetchProducts({ commit }) {
        try {
            const response = await axios.get('http://localhost:3000/grocery')
            commit('SET_PRODUCTS', response.data);
        }
        catch (error) {
            console.log(error)
        }
    },
}

const mutations = {
    SET_PRODUCTS: (state, products) => (state.products = products),
}

export default {
    state,
    getters,
    actions, 
    mutations
}