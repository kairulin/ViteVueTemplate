import { computed, inject } from "vue";

export default function useButtonSize (props: any) {
    const size = computed(() => props.large ? "large" : props.small ? "small" : props.middle ? "middle" : null);
    const _classes =  size.value ? `nibu-button__${size.value}` : void 0;
    const provideSize = inject('size', void 0);
    const sizeClass = computed(() => _classes ? _classes : provideSize ? provideSize : void 0);
    return {
        _size: sizeClass.value
    }
}