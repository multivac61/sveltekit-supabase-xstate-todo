import { fail, redirect } from '@sveltejs/kit'
import { auth } from '$lib/server/auth'
import type { PageServerLoad, Actions } from './$types'

// if the user exists, redirect authenticated users to the profile page.
export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate()
	if (session) throw redirect(302, '/')
	return {}
}

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData()
		const username = form.get('username')
		const password = form.get('password')

		if (typeof username !== 'string' || typeof password !== 'string') {
			return fail(400, {message: 'Invalid form data, values cannot be empty'})
		}

		try {
			const user = await auth.createUser({
				key: {
					providerId: 'username',
					providerUserId: username,
					password,
				},
				attributes: {
					username,
				},
			})
			const session = await auth.createSession(user.userId)
			locals.setSession(session)
		} catch {
			return fail(400, { message: 'Username already in use' })
		}
	},
}
