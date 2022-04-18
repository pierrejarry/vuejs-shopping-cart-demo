import { shallowMount } from '@vue/test-utils'
import App from '@//App.vue'
import ProductList from '@/components/ProductList.vue'
import Cart from '@/components/Cart.vue'

describe('App.vue', () => {
  it('renders ProductList component', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.findComponent(ProductList).isVisible()).toBe(true);
  });

  it('renders Cart component', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.findComponent(Cart).isVisible()).toBe(true);
  });
})
