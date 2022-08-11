<template>
    <div class="my-5">
        <h4 v-if="is_wrong" class="text-red-500 text-xl tracking-tight font-bold mb-3">{{ index }}. {{ question.question }}</h4>
        <h4 v-else class="text-slate-900 text-xl tracking-tight font-bold mb-3">{{ index }}. {{ question.question }}</h4>
        <div>
            <div v-for="(answer, index) in question.answers" :key="index">
                <input class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500" type="radio" :name="question.id + '-answer'" :id="question.id + answer" :value="answer">
                <label v-if="is_wrong && correct === answer" class="text-lg text-green-600 font-semibold px-2" :for="question.id + answer">{{ answer }}</label>
                <label v-else class="text-lg text-gray-500 px-2" :for="question.id + answer">{{ answer }}</label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['question', 'index', 'is_wrong', 'correct'],

        data() {
            return {

            }
        },

        methods: {

        }
    }
</script>
