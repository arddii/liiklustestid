<template>
    <div class="container mx-auto px-8 lg:mt-48 lg:mb-48 mb-10">
        <Header :title="questions_count + ' küsimust'" :subtitle="'Sul võib olla maksimaalselt ' + calculate_max_wrong_answers() + ' valet vastust.'"></Header>
        
        <div class="mt-16">
            <form @submit.prevent="submit">
                <Question v-for="(question, index) in generated_questions" :key="index" :question="question" :index="index + 1" :is_wrong="wrongs.includes(question)" :correct="question.correct"></Question>
                <div class="flex gap-x-5">
                    <button v-if="!submitted" type="submit" class="mt-5 px-4 py-3 font-semibold tracking-wide text-white text-xl bg-green-500 rounded-md hover:bg-green-600 transform duration-300">Kontrolli</button>
                    <button v-if="!submitted" @click.prevent="cancel" class="mt-5 px-4 py-3 font-semibold tracking-wide text-white text-xl bg-yellow-500 rounded-md hover:bg-yellow-600 transform duration-300">Tühista</button>
                </div>
            </form>
        </div>

        <button @click="this.$router.push({name: 'home'})" v-if="submitted" class="mt-5 px-4 py-3 font-semibold tracking-wide text-white text-xl bg-yellow-500 rounded-md hover:bg-yellow-600 transform duration-300">Proovi uuesti</button>
    </div>
</template>

<script>
    import questions from '@/assets/data.json';

    import Question from '@/components/Question.vue';
    import Header from '@/components/Header.vue';

    export default {
        components: {
            Question, Header
        },

        data() {
            return {
                questions_count: this.$route.query.questions,
                generated_questions: [],
                wrongs: [],
                max_incorrect: 1,
                submitted: false,
            }
        },

        created() {
            this.generate_questions();
        },

        methods: {
            calculate_max_wrong_answers() {
                return this.max_incorrect;
            },

            generate_questions() {
                const shuffled = questions.sort(() => 0.5 - Math.random());
                return this.generated_questions = shuffled.slice(0, this.questions_count);
            },

            submit(event) {
                const data = new FormData(event.target);

                if (Array.from(data.keys()).length == this.questions_count) {
                    for (let [index, value] of data) {
                        let id = index.split('-')[0];

                        for (let question of questions) {
                            if (question.id === Number(id)) {
                                if (question.correct !== value) {
                                    this.wrongs.push(question);
                                }
                            }
                        }
                    }

                    let summary = {
                        status: this.wrongs.length > this.calculate_max_wrong_answers() ? 'failed' : 'finished',
                        questions: this.generated_questions,
                        incorrects: this.wrongs,
                        created_at: Date.now()
                    }

                    this.$store.dispatch('add_to_history', summary);

                    this.submitted = true;
                }
            },

            cancel() {
                let summary = {
                    status: 'canceled',
                    questions: this.generated_questions,
                    incorrects: this.wrongs,
                    created_at: Date.now()
                }

                this.$store.dispatch('add_to_history', summary);

                this.$router.push({name: 'home'});
            }
        },

        computed: {

        }
    }
</script>
