import puppeteer from 'puppeteer'
import Fetcher from './fetcher.js'
import { ATRIA_USERNAME, ATRIA_PASSWORD } from '$lib/env'

// TODO: remove credentials

const fetcher = new Fetcher(`https://atriacloud.wedderburn.com.au/75189`)
const cookie = login()

async function get(path) {
    const headers = { cookie: await cookie }
    const response = await fetcher.fetch('api/' + path, { headers })
    // console.log(response)
    return response.json()
}

async function login() {
    console.log('login')
    const browser = await puppeteer.launch({ headless: true })
    const [ page ] = await browser.pages()

    await page.goto(`${fetcher.root}/Account/Login/`)
    await page.waitForSelector('#UserName', { timeout: 1000 })
    await page.type('#UserName', ATRIA_USERNAME)
    await page.type('#Password', ATRIA_PASSWORD)
    await page.evaluate(() => document.querySelector('input[type=submit]').click())
    await page.waitForNavigation()

    const cookies = await page.cookies()
    const cookie = cookies.map(({ name, value }) => `${name}=${value}`).join('; ')

    // TODO: is await necessary here?
    await browser.close()
    return cookie
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
    return response
}

export default {
    login,
    get,
    put,
}
