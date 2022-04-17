import { writable } from 'svelte/store'
import { Semaphore } from "@shopify/semaphore"
// import { RateLimit } from 'async-sema'
import minew from '../../datasources/minew.js'
import { browser } from '$app/env'; 

let macs = []

export function setMacs(arrayOfMacs = []) {
    macs = [...arrayOfMacs]
}

// const rateLimit = RateLimit(2)
const semaphore = new Semaphore(3)


export default writable(new Map(), (set) => {
    if (!browser) return
    (async function asyncWrapper() {
        const token = await minew.login()
        console.log('tagStore')
        let tags = new Map()
        macs.forEach(async mac => {
            const preview = await fetchPreview(mac, token)
            tags.set(mac, { ...preview })
            // console.log(tags.size)
            set(new Map(tags))
        })
    })()
})

const wait = (ms) => new Promise(r => setTimeout(r, ms))

async function fetchPreview(macAddress, token) {
    console.log('preview', macAddress)
    // await wait(2000)
    // const permit = await semaphore.acquire()
    let response
    try {
        response = await minew.get(`label/query?storeId=123&mac=${macAddress}`, token)
    } catch (error) {
        return null
    }
    // permit.release()
    // console.log('preview', response)
    if (response?.errcode == 10000330) return null
    if (!response.body) return null
    const { id, label3, label4, label5, label6 } = response.body.goods
    // console.log({ id, label3, label4, label5, label6 })
    // const demoData = response.demoData
    return { macAddress, id, label3, label4, label5, label6, Description: `${label5} ${label4}`.trim() }
}

