<template>
	<ul>
		<li v-for="(test, index) in history" :key="index">
			<div class="relative pb-8">
				<span v-if="history.indexOf(test) != (history.length - 1)" class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"
				></span>
				<div class="relative flex space-x-3">
					<div>
						<span v-if="test.status === 'failed'" class="h-8 w-8 rounded-full bg-red-400 flex items-center justify-center ring-8 ring-white text-white font-bold">
							<XIcon class="h-5 w-5"></XIcon>
						</span>
						<span v-else-if="test.status === 'canceled'" class="h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center ring-8 ring-white text-white font-bold">
							<BanIcon class="h-5 w-5"></BanIcon>
						</span>
                        <span v-else class="h-8 w-8 rounded-full bg-green-400 flex items-center justify-center ring-8 ring-white text-white font-bold">
							<CheckIcon class="h-5 w-5"></CheckIcon>
						</span>
					</div>
					<div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
						<div>
							<p v-if="test.status === 'canceled'" class="text-sm font-medium text-gray-900">
								Tühistatsid {{ test.questions.length }} küsimusega testi sooritamise.
							</p>
							<p v-else class="text-sm font-medium text-gray-900">
								Lahendasid testi {{ test.questions.length }} küsimusega ning sul oli kokku {{ test.incorrects.length }} eksimust.
							</p>
						</div>
						<div class="text-right text-sm whitespace-nowrap text-gray-500">
							<p>{{ how_long_ago(test.created_at) }}</p>
						</div>
					</div>
				</div>
			</div>
		</li>
		<button v-if="history.length > 0" @click.prevent="clear_history" class="flex ml-auto text-gray-500 text-sm px-2 py-2 border-gray-300 border rounded-md">Kustuta ajalugu</button>
	</ul>
</template>

<script>
    import { DateTime } from 'luxon';
	import { CheckIcon, XIcon, BanIcon } from '@heroicons/vue/solid';

    export default {
		components: {
			CheckIcon, XIcon, BanIcon
		},

        methods: {
            how_long_ago(timestamp) {
                return DateTime.fromMillis(timestamp, {locale: 'et'}).toRelative();
            },

			clear_history() {
				this.$store.state.history = [];
				return localStorage.removeItem('test-history');
			}
        },

        computed: {
            history() {
                return this.$store.state.history;
            }
        }
    };
</script>
