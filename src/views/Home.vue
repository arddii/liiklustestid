<template>
    <div class="container mx-auto px-8 mt-48">
        <div class="text-center">
            <Header title="Liiklustestid" subtitle="Valmistu teooriaeksamiks täiesti tasuta."></Header>

            <div class="max-w-md mx-auto text-center">
                <label for="questions" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Küsimusi: {{ questions }}</label>
                <input v-model="questions" id="questions" type="range" min="2" max="25" class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg dark:bg-gray-700">
                <button @click="start" class="mt-5 px-4 py-3 font-semibold tracking-wide text-white text-xl bg-green-500 rounded-md hover:bg-green-600 transform duration-300">Alusta</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header.vue';

    export default {
        components: {
            Header,
        },

        data() {
            return {
                questions: 2
            }
        },

        methods: {
            start() {
                this.$router.push({name: 'test', query: {questions: this.questions}});
            }
        }
    }
</script>
