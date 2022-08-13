<template>
    <div class="container mx-auto px-8 lg:mt-48">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="col-span-2 text-center lg:text-left">
                <Header title="Liiklustestid" subtitle="Valmistu teooriaeksamiks täiesti tasuta."></Header>

                <div class="max-w-md mx-auto text-center lg:text-left lg:mx-0">
                    <label for="questions" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Küsimusi: {{ questions_count }}</label>
                    <input v-model="questions_count" id="questions" type="range" min="2" :max="(questions.length <= 25) ? questions.length : 25"  class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg dark:bg-gray-700">
                    <button @click="start" class="mt-5 px-4 py-3 font-semibold tracking-wide text-white text-xl bg-green-500 rounded-md hover:bg-green-600 transform duration-300">Alusta</button>
                </div>
            </div>
            <div class="mt-10 md:mt-16">
                <History></History>
            </div>
        </div>    
    </div>
</template>

<script>
    import questions from '@/assets/data.json';

    import History from '@/components/History.vue';
    import Header from '@/components/Header.vue';

    export default {
        components: {
            Header, History,
        },

        data() {
            return {
                questions_count: 2,
                questions: questions
            }
        },

        methods: {
            start() {
                this.$router.push({name: 'test', query: {questions: this.questions_count}});
            }
        }
    }
</script>
