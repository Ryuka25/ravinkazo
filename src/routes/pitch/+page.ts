import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(307, 'https://youtu.be/1hLk692QYzI');
}
