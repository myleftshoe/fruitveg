// import puppeteer from 'puppeteer'
import Fetcher from './fetcher.js'
import { ATRIA_COOKIE } from '$lib/env'

const fetcher = new Fetcher(`https://atriacloud.wedderburn.com.au/75189`)
const cookie = ATRIA_COOKIE

async function get(path) {
    const headers = { cookie: await cookie }
    const response = await fetcher.fetch('api/' + path, { headers })
    // console.log(response)
    return response.json()
}

async function put(path, body) {
    const headers = { 
        'content-type': 'application/json',
        cookie,
    }
    const response = await fetcher.fetch('api/' + path, { 
        method: 'PUT',
        headers, 
        body: JSON.stringify(body)
    })
    console.log(response.status)
//    send()
    return response
}

async function send() {
    await fetcher.fetch('Data/Send')
}

export default {
    get,
    put,
}
