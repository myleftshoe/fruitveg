import { v4 as uuidv4 } from 'uuid'
import { serialize } from 'cookie'
import { goto } from '$app/navigation'
import { COOKIE, AUTHCODE } from '$lib/env'
import { wait } from '$lib/wait'

export async function post({ params, request }) {

    const data = await request.formData()
    const pin = data.get('pin')
    console.log(pin)
    await wait(5000)
    // ⚠️ CAUTION: Do not store a plain passwords. Use proper hashing and salting.
    // TODO
    if (pin == AUTHCODE) {
        return {
            status: 302,
            headers: {
                'Location': "/tags",
                'Set-Cookie': serialize(COOKIE, '', // uuidv4(), 
                {
                    path: '/',
                    httpOnly: true,
                    sameSite: 'strict',
                    // secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 24 * 7, // one week
                }),
            },
            body: {
                message: 'Successfully signed in',
            },
        };
    }

    return {
        status: 401,
        body: {
            message: `Incorrect pin ${pin},${AUTHCODE}`,
        },
    };

}
