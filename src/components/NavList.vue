<template>
    <ul class="menu">
        <li v-for="(nav) in navList" :key="nav.name">
            <a class="w-full">
                {{ nav.name }}
            </a>
            <label v-if="nav.children.length > 0">
                <input type="checkbox">
                <i class="fa-solid fa-angle-down"></i>
            </label>
            <template v-if="nav.children.length > 0">
                <NavList :nav-list="nav.children" />
            </template>
        </li>
    </ul>
</template>
<script setup lang="ts">
import NavList from './NavList.vue'

defineProps<{
    navList: RouteConfig[]
}>()
</script>
<style scoped>
.menu li ul {
    position: absolute;
    top: 100%;
    left: 0;
    width: 250px;
    margin: 0;
    padding: 0;
    background-color: #ffffff22;
    text-align: left;
    display: none;
}

li:hover>ul {
    display: block;
}

.menu ul li {
    text-align: left;
    display: block;
}

.menu ul ul {
    left: 100%;
    top: 0;
}

input {
    display: none;
}

@media only screen and (max-width: 767px) {
    input {
        display: none;
    }

    li {
        display: block;
        position: unset;
        border-bottom: 2px solid #384857;
        font-weight: 500;
    }

    .menu {
        width: 100%;
        text-align: left;
    }

    .menu li:hover {
        background-color: unset !important;
        border-left: 10px solid #5bb299;
    }

    .menu label {
        display: block;
        float: right;
    }

    .menu label i {
        display: block;
        transition: .5s;
        margin-right: 0;
    }

    label:has(input:checked)~ul {
        max-height: 50vh;
    }

    .menu li ul {
        width: 100%;
        max-height: 0;
        position: unset;
        background-color: unset;
        display: block;
        overflow: hidden;
        transition: 1.5s;
        opacity: 1;
        border-left: 1px solid #ffffff22;
    }

    li li:hover {
        border-left: unset !important;
    }

    li li {
        border-bottom: 0;
        padding: 10px 10px 10px 50px;
        position: relative;
        color: #7f91a1;
    }

    li li::before {
        position: absolute;
        top: 20px;
        left: 0;
        width: 30px;
        height: 100%;
        content: '';
        border-top: 1px solid #ffffff22;
    }

    li li::after {
        position: absolute;
        top: 18px;
        left: 30px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        content: '';
        background: #ffffff22;
    }

    label input:checked~i {
        transform: rotate(180deg);
    }
}
</style>