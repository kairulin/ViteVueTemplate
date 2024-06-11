import { describe, it, expect, afterEach } from 'vitest'
import { render,screen, cleanup } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import Button from '../Button.vue'

afterEach(cleanup)
describe('Button', () => {
  it('renders button', () => {
    const wrapper = mount(Button, { slots: {default:'Primary'}})
    expect(wrapper.text()).toContain('Primary')
  })
  it('renders button not disabled', () => {
    const text = 'Primary';
    render(Button, {
        slots:{
            default: text
        },
        props: {
          disabled: false,
        },
    })
    const button = screen.getByTestId('cvaButton');
    expect(button).toHaveProperty('disabled', false); 
  })
  it('renders button disabled', () => {
    const text = 'Primary';
    render(Button, {
        slots:{
            default: text
        },
        props: {
            disabled: true
        },
    })
    const button = screen.getByTestId('cvaButton');
    expect(button).toHaveProperty('disabled', true); 
  })
  it('render button is danger', () => {
    const text = 'Danger';
    render(Button, {
        slots:{
            default: text
        },
        props: {
            intent: 'danger'
        },
    })
    const button = screen.getByTestId('cvaButton');
    const classList = button.getAttribute('class');
    expect(classList).toContain('bg-red-600');
  })
  it('render button is loading', () => {
    const text = 'Loading';
    const wrapper = mount(Button, {
        slots: {default:text},
        props: {loading: true}
    })
    expect(wrapper.find('span').isVisible()).toBe(true)
  })
})
