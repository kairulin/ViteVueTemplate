import { onMounted, onUnmounted, ref, watchEffect } from "vue";

export default function useWindowSize() {
    const isClient = typeof window === 'object';
    const width = ref(isClient ? window.innerWidth : 0);
    const height = ref(isClient ? window.innerHeight : 0);  
    const updateSize = () => {
        width.value = window.innerWidth;
        height.value = window.innerHeight;
    };
    onMounted(() => {
        if(!isClient) return;
        window.addEventListener('resize', updateSize);
    });
    onUnmounted(() => {
        window.removeEventListener('resize', updateSize);
    });
    return {
        width,
        height
    };   
}