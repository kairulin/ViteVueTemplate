import { computed, inject } from "vue";

export default function useButtonSize (size: string | null) {
    const _classes =  size ? `nibu-button__${size}` : void 0;
    const provideSize = inject('size', void 0);
    const sizeClass = computed(() => _classes ? _classes : provideSize ? provideSize : void 0);
    return {
        _size: sizeClass.value
    }
}