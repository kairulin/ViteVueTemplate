<template>
    <container>
        <nav>
            <Navigation />
        </nav>
        <aside>aside</aside>
        <main>main</main>
        <footer>footer</footer>
    </container>
</template>
<script setup lang="ts">
import Navigation from './Navigation.vue';
</script>
<style scoped>
container {
    display: grid;
    grid-template-rows: 70px 1fr 70px;
    /* grid-template-columns: 1fr 4fr 1fr; */
    grid-template-columns: 200px 1fr 1fr;
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
    background-color: #040d4c;
    /* Light Gray */
    color: black;
    /* padding: 20px; */
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
