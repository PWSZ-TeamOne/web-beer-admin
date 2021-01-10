import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Login from '@/components/Login'
import VueRouter from 'vue-router'
import flash from 'vue-flash-message';

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(flash)

const wrapper = shallowMount(Login, { localVue })
wrapper.setData({ email: 'email', password: 'password' })

describe('Login Front Tests', () => {
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('wrapper has button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })

  test('login button is visible', () => {
    expect(wrapper.find('.btn-lg').isVisible()).toBe(true)
  })

  test('login button exist', () => {
    const button = wrapper.find('#login');
    expect(button.exists()).toBe(true);
  })

  test('login button has text', () => {
    const button = wrapper.find('#login');
    expect(button.text()).toBe('Sign In');
  })

  test('wraper is div', () => {
    expect(wrapper.is('div')).toBe(true)
  })

  test('wraper check email data', () => {
    expect(wrapper.vm.email).toBe('email')
  })

  test('wraper check password data', () => {
    expect(wrapper.vm.password).toBe('password')
  })

})
