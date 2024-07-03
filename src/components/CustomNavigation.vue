<template>
    <div class="nav">
        <CustomNavList :nav-list="navRoutes" :index="true" :intent="'primary'" :hover="'primary'" :before="'primary'" :after="'primary'"/>
    </div>
</template>
<script setup lang="ts">
import CustomNavList from './CustomNavList.vue'
import navRoutes from '@/utils/generateRoutes';
</script>