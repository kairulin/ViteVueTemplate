import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import NibuButton from '../index.tsx';
import {BaseLoading} from '../../icons/loading/index.tsx'
import { EnvelopeIcon } from '@heroicons/vue/20/solid';

describe('NibuButton.vue', () => {
    it('renders red button', () => {
        const wrapper = mount(NibuButton,{props:{bg:'red'}})
        expect(wrapper.exists()).toBe(true);
        const buttonElement = wrapper.element as HTMLElement;
        const buttonColor = buttonElement.style.getPropertyValue('--nibu-button-color');
        expect(buttonColor).toBe('red');
    })
    it('render text button', () => {
        const wrapper = mount(NibuButton,{props:{text:true}})
        const buttonElement = wrapper.element as HTMLElement;
        const buttonColor = buttonElement.style.getPropertyValue('--nibu-button-color');
        expect(buttonColor).toBe('none');
    })
    it('render button with left icon', () => {
        const wrapper = mount(NibuButton, {slots:{default:'Primary',leftIcon:EnvelopeIcon}})

        const leftIconWrapper = wrapper.find('[id="nibu-left-icon"]');
        expect(leftIconWrapper.exists()).toBe(true);
    })
    it('render button with right icon', () => {
        const wrapper = mount(NibuButton, {slots:{default:'Primary',rightIcon:EnvelopeIcon}})

        const rightIconWrapper = wrapper.find('[id="nibu-right-icon"]');
        expect(rightIconWrapper.exists()).toBe(true);
    })
    it('render button with left icon, right icon', () => {
        const wrapper = mount(NibuButton, {slots:{default:'Primary',rightIcon:EnvelopeIcon, leftIcon:EnvelopeIcon}})

        const rightIconWrapper = wrapper.find('[id="nibu-right-icon"]');
        const leftIconWrapper = wrapper.find('[id="nibu-left-icon"]');
        expect(rightIconWrapper.exists()).toBe(true);
        expect(leftIconWrapper.exists()).toBe(true);
    })
    it('button loading', () => {
        const wrapper = mount(NibuButton, {props:{loading:true}})
        expect(wrapper.findComponent(BaseLoading).exists()).toBe(true);
    })
})