<template>
    <ul class="w-full">
        <li v-for="(nav) in list" :key="nav.name" :class="navClass" @click.stop="handleShow(nav)">
            <div class="flex items-center" >
                <a class="flex w-full" v-if="childrenLength(nav.children)">
                    {{ nav.nickname }}
                </a>
                <router-link class="flex w-full" :to="nav.path" v-else>
                    {{ nav.nickname }}
                </router-link>
                <i class="fa-solid fa-angle-down duration-500" :class="{
                    [`transform rotate-180 duration-500`]: childrenShow
                }" v-if="childrenLength(nav.children)" />
            </div>
            <transition name="slide" v-if="childrenLength(nav.children)">
                <CustomNavList :nav-list="nav.children" :index="false" :intent="'secondary'" :before="'secondary'"
                :after="'secondary'" :hover="'primary'" v-show="nav.show" />

            </transition>
        </li>
    </ul>
</template>
<script setup lang="ts">
import { cva } from 'class-variance-authority';
import { computed, ref } from 'vue';
import CustomNavList from './CustomNavList.vue'
const props = withDefaults(defineProps<{
    navList: RouteConfig[],
    index: Boolean,
    intent: 'primary' | 'secondary',
    hover: 'primary' | 'secondary',
    before: 'primary' | 'secondary',
    after: 'primary' | 'secondary',
}>(), {
    intent: 'primary',
    hover: 'primary',
    before: 'primary',
    after: 'primary'
})
const list = ref(props.navList)
const childrenLength = (children: RouteConfig[]) => {
    return children.length > 0
}
const childrenShow = ref(false)

const handleShow = (nav: RouteConfig) => {
    if (nav.children.length > 0) {
        nav.show = !nav.show
        // childrenShow.value = !childrenShow.value
    }
}

const navClass = computed(() => {
    const intentValue = props.intent as 'primary' | 'secondary';
    const hoverValue = props.hover as 'primary' | 'secondary';
    const beforeValue = props.before as 'primary' | 'secondary';
    const afterValue = props.after as 'primary' | 'secondary';
    return cva(`cursor-pointer relative p-4`,
        {
            variants: {
                intent: {
                    primary: `bg-[#3d5060]`,
                    secondary: `bg-[#000]`,
                },
                hover: {
                    primary: `${props.index && "border-b-2 border-b-[#384857] hover:border-l-8 hover:border-l-[#5bb299]"}`,
                    secondary: `${props.index && "border-b-2 border-b-[#f8fafc] hover:border-l-8 hover:border-l-[#f8fafc]"}`,
                },
                before: {
                    primary: `${!props.index && `before:border-t-[1px] before:border-t-[#ffffff22] before:content-[''] before:w-[30px] before:absolute before:top-[27px] before:left-0 before:h-full pl-12 border-l-2 border-l-[#ffffff22]`}`,
                    secondary: `${!props.index && `before:border-t-[1px] before:border-t-[#fff] before:content-[''] before:w-[30px] before:absolute before:top-[27px] before:left-0 before:h-full pl-12 border-l-2 border-l-[#fff]`}`,
                },
                after: {
                    primary: `${!props.index && `after:bg-[#ffffff22] after:content-[''] after:w-[5px] after:h-[5px] after:absolute after:top-[25px] after:left-[30px] after:rounded-full`}`,
                    secondary: `${!props.index && `after:bg-[#fff] after:content-[''] after:w-[5px] after:h-[5px] after:absolute after:top-[25px] after:left-[30px] after:rounded-full`}`,

                }
            }
        }
    )
        (
            {
                intent: intentValue,
                hover: hoverValue,
                before: beforeValue,
                after: afterValue
            }
        );
})
</script>
<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: max-height 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
    max-height: 0;
    overflow: hidden;
}

.slide-enter-to,
.slide-leave-from {
    max-height: 500px;
    /* Adjust based on your expected maximum height */
    overflow: hidden;
}
</style>