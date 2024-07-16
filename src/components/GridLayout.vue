<template>
    <div class="layout">
        <nav>
            header
            <!-- <Navigation /> -->
        </nav>
        <aside>
            aside
            <CustomNavigation />
        </aside>
        <main>
            <select v-model="webStyle">
                <option value="light">lightmode</option>
                <option value="dark">darkmode</option>
            </select>
            <p>現在網頁寬：{{width}}、高{{height}}</p>
            <!-- <CustomVirtualScroll/> -->
            <!-- <UseVirtualHook /> -->
            <!-- <VirtualTable /> -->
            <!-- <CarouselCard/> -->
             <!-- <CustomTree :data="[]"/> -->
             <router-view />
        </main>
        <footer>footer</footer>
    </div>
</template>
<script setup lang="ts">
// import Navigation from './Navigation.vue';
import CustomNavigation from './CustomNavigation.vue';
import CustomVirtualScroll from './CustomVirtualScroll.vue';
import UseVirtualHook from './UseVirtualHook.vue';
import VirtualTable from './VirtualTable.vue';
import CustomTree from './CustomTree.vue';
import { ref } from 'vue';
// import CarouselCard from './CarouselCard.vue';
import useWindowSize from '@/hooks/useWindowSize.ts';
const { width, height } = useWindowSize();
const value = ref('123')
const webStyle = ref('light')
</script>
<style scoped>
.layout {
    display: grid;
    grid-template-rows: 70px 1fr 70px;
    /* grid-template-columns: 1fr 4fr 1fr; */
    grid-template-columns: 250px 1fr 1fr;
    grid-template-areas:
        "nav nav nav"
        "aside main main"
        "footer footer footer";
    height: 100vh;
}

/* @media only screen and (max-width: 767px) {
    container {
        grid-template-areas:
            "nav nav nav"
            "aside main main"
            "footer footer footer";
    }

} */

nav {
    grid-area: nav;
    background-color: #4CAF50;
    /* Green */
    color: white;
    text-align: center;
    display: flex;
    /* width: 80%; */
    /* margin: 0 10%; */
    /* padding: 20px; */
}

aside {
    grid-area: aside;
    background-color: #2196F3;
    /* Blue */
    color: white;
    /* padding: 20px; */
}

main {
    grid-area: main;
    /* background-color: #040d4c; */
    /* Light Gray */
    background: var(--background);
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    overflow: auto;

    /* padding: 20px; */
    &:has(option[value="dark"]:checked) {
        --background: black;
        --text-color: white;
        --select-background: white;
        --select-text-color: black;
        /* select {
            color: initial !important;
        } */
    }
}
select {
    background: var(--select-background);
    color: var(--select-text-color);
    width: max-content;
    border-radius: 5px;
    padding: 3px 5px;
}
footer {
    grid-area: footer;
    background-color: #555;
    /* Dark Gray */
    color: white;
    text-align: center;
    /* padding: 20px; */
}
</style>
