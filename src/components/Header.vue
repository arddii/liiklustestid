<template>
    <div>
        <h1 class="text-4xl sm:text-6xl lg:text-7xl leading-none font-extrabold tracking-tight text-gray-900 mt-10 mb-8 sm:mt-14 sm:mb-10">{{ title }}</h1>
        <p class="text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11 text-gray-500">{{ subtitle }}</p>
    </div>
</template>

<script>
    export default {
        props: ['title', 'subtitle'],
    }
</script>