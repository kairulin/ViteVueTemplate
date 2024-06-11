<template>
    <component :is="as" :disabled="disabled" :class="buttonClass" data-testid="cvaButton">
        <svg v-if="loading" class="animate-spin h-5 w-5 absolute" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
        </svg>
        <component :is="leftIcon" v-if="!loading" :class="['w-5 h-5 mr-2', loading && 'invisible']" />
        <span :class="[loading && 'invisible']">
            <slot />
        </span>
        <component :is="rightIcon" v-if="!loading" :class="['w-5 h-5 ml-2', loading && 'invisible']" />
    </component>
</template>
<script setup lang="ts">
import { cva } from 'class-variance-authority';
import { computed } from 'vue';
const props = defineProps({
    leftIcon: Object,
    rightIcon: Object,
    loading: Boolean,
    disabled: Boolean,
    as: {
        type: [String, Object],
        default: 'button'
    },
    intent: {
        type: String,
        validator: (val: string) => ['primary', 'secondary', 'danger'].includes(val),
        default: 'secondary'
    }
});

const buttonClass = computed(() => {
    const intentValue = props.intent as "primary" | "secondary" | "danger";
    return cva("inline-flex items-center justify-center text-sm rounded min-h-[32px] px-3 py-0.5 font-semibold ",
        {
            variants: {
                intent: {
                    primary: "bg-black text-white hover:bg-gray-800",
                    secondary: "bg-black/5 hover:bg-black/10",
                    danger: "bg-red-600 text-white hover:bg-red-500",
                    text: "text-gray-700 hover:bg-black/5"
                },
                disabled: {
                    true: "!bg-gray-100 !text-gray-400 cursor-not-allowed"
                }
            }
        }
    )(
        {
            intent: intentValue,
            disabled: props.disabled,
        });
})
</script>