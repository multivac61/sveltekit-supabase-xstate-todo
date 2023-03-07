import { createMachine, interpret } from 'xstate'

export const counterMachine = createMachine(
	{
		/** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEkA5AQQGEAVMgNQFEBiOgeQHEuAZZgNoAGALqJQABwD2sXABdcU-OJAAPRAFYATABoQAT0QAOAIwkALEY0A2AOwmh1oY-MmAzAF8PetFjyFSWgYWEhoOAFUKBgouVkoaACVmAFlmKOExJBBpWQUlFXUEIwBOEjdrYttipzchLSNzW2s9QwRy6xJTW1stcw0HPtsNcy8fDBwCYhIgpmZQiKjKWIARZkSUtLoMlRz5RWUswoBaCpITE2tzIR7zSstilsR2zpNuoXNLur6tW1GQXwmAWm9Fm80i0ViSQAyswtqIdjI9vlDogfm4SLYhBpbG4jEJXtdiq9Hgg+mY6kYtCZKRUTP0jNY-gD-FMZiEwuCluxuHxBPCsrs8gdQIUfmZilpevV7G5qsUsSSbFoSNo3L0bI4tPKTF5vCB8FIIHAVMzJkQEbl9gVEEcLhozhcrjc7iUSScSM5PbYGvjhpStEzxizSJQ2cwLUjhWonpUSJVrBojG5Zc4rsmSWmVbjrFo3DZzAWGoG-GbgcFwwLEULrQhba8HZ9nbZ7iSfqVk1ohHmsQzcyM9aagWGwYsYhHqyiEMV7dSu+Z6tjzLUcxm7HGTBLtPO6c2jL9dUA */
		predictableActionArguments: true,
		preserveActionOrder: true,
		initial: 'INACTIVE',
		context: {
			count: 0,
		},
		states: {
			INACTIVE: {
				id: 'INACTIVE',
				on: { TOGGLE: 'ACTIVE' },
			},
			ACTIVE: {
				initial: 'COUNTING',
				states: {
					COUNTING: {
						on: {
							INCREMENT: {
								actions: 'increment',
							},
							DECREMENT: {
								actions: 'decrement',
							},
							RESET: {
								target: '#INACTIVE',
								actions: 'reset',
							},
							TOGGLE: '#INACTIVE',
						},
					},
				},
			},
		},
		tsTypes: {} as import('./machine.typegen').Typegen0,
		schema: {
			// The events this machine handles
			events: {} as
				| { type: 'TOGGLE' }
				| { type: 'INCREMENT' }
				| { type: 'DECREMENT' }
				| { type: 'RESET' },
		},
	},
	{
		actions: {
			increment: (context) => {
				context.count += 1
			},
			decrement: (context) => {
				context.count -= 1
			},
			reset: (context) => {
				context.count = 0
			},
		},
	}
)

export const toggleService = interpret(counterMachine)
	.onTransition((state) => console.log(state.context.count))
	.start()
