import { writable } from 'svelte/store'
import { Semaphore } from "@shopify/semaphore"
// import { RateLimit } from 'async-sema'
import minew from '../../datasources/minew.js'


const macs = [
    'AC233FD0A0FF',
    'AC233FD0A134',
    'AC233FD0A2B6',
    'AC233FD0A2AC',
    'AC233FD09D4A',
    'AC233FD09D44',
    'AC233FD0A29F',
    'AC233FD0A2EC',
    // 'AC233FD0A2A2',
    // 'AC233FD0A30E',
    // 'AC233FD0A11C',
    // 'AC233FD0A08F',
    // 'AC233FD0A263',
    // 'AC233FD0A45D',
    // 'AC233FD0A345',
    // 'AC233FD0A465',
    // 'AC233FD0A2C4',
    // 'AC233FD099A5',
    // 'AC233FD0692E',
    // 'AC233FD0A33B',
    // 'AC233FD0A055',
    // 'AC233FD0A38F', ///// leb q
    // 'AC233FD09FBE', 'AC233FD09FB5', ////// brocolli
    // 'AC233FD09FBA', 'AC233FD0A034', 'AC233FD0A1CF', 'AC233FD0A142', 'AC233FD09F07', // /////CARROTS
    // 'AC233FD0A39D', 'AC233FD0A489', ///// cauli
    // 'AC233FD0A290',// //green beans
    // 'AC233FD0A3A4', 'AC233FD0A39C', ////// beetroot
    // 'AC233FD09F52', //// crimson grapes
    // 'AC233FD0A22C', 'AC233FD0A201', //// green grapes
    // 'AC233FD0A0AC', 'AC233FD0A235', 'AC233FD0A39B' // mangoes
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
    const permit = await semaphore.acquire()
    const response = await minew.post(`/label/preview?storeId=123&mac=${macAddress}`)
    await wait(1000)
    permit.release()
    // console.log('preview', response)
    if (response?.errcode == 10000330) return null
    if (!response.body) return null
    const { id, label3, label4, label5 } = response.body
    console.log({ id, label3, label4, label5 })
    const demoData = response.demoData
    return { macAddress, id, label3, Description: `${label5} ${label4}`.trim() }
}

