import vercel from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: vercel(['chrome-aws-lambda']),
		methodOverride: {
			allowed: ['PUT', 'PATCH', 'DELETE']
		},
		vite: {
            define: {
                'process.env': process.env,
            },
        },
	}
};

export default config;
