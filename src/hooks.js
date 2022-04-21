import { parse } from "cookie"

import { COOKIE } from '$lib/env'


export async function getSession({ request }) {
    const cookies = parse(request.headers.get("cookie") || "")
    return {
        authenticated: cookies.hasOwnProperty(COOKIE),
    }
}