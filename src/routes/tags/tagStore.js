import { writable } from 'svelte/store'
import { Semaphore } from "@shopify/semaphore"
// import { RateLimit } from 'async-sema'
import minew from '../../datasources/minew.js'


const macs = [
    'AC233FD0A38F',
    'AC233FD0A290',
    // 'AC233FD0A100',
    // 'AC233FD0A39C',
    // 'AC233FD0A3A4',
    // 'AC233FD0A39D',
    // 'AC233FD0A489',
    // 'AC233FD09FB5',
    // 'AC233FD09FBE',
    // 'AC233FD09FBA',
    // 'AC233FD0A034',
    // 'AC233FD0A1CF',
    // 'AC233FD0A142',
    // 'AC233FD09F07',
    // 'AC233FD09F52',
    // 'AC233FD0A22C',
    // 'AC233FD0A201',
    // 'AC233FD0A0AC',
    // 'AC233FD0A235'
]

// const rateLimit = RateLimit(2)
const semaphore = new Semaphore(3)


export default writable(new Map(), (set) => {
    console.log('tagStore')
    let tags = new Map()
    macs.forEach(async mac => {
        const preview = await fetchPreview(mac)
        tags.set(mac, { ...preview })
        console.log(tags.size)
        set(new Map(tags))
    })
})

const wait = (ms) => new Promise(r => setTimeout(r, ms))

async function fetchPreview(macAddress) {
    console.log('preview', macAddress)
    // await wait(2000)
    const permit = await semaphore.acquire()
    const response = await minew.get(`label/query?storeId=123&mac=${macAddress}`)
    permit.release()
    // console.log('preview', response)
    if (response?.errcode == 10000330) return null
    if (!response.body) return null
    const { id, label3, label4, label5 } = response.body.goods
    console.log({ id, label3, label4, label5 })
    // const demoData = response.demoData
    return { macAddress, id, label3, Description: `${label5} ${label4}`.trim() }
}

