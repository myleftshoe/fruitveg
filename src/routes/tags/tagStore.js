import { writable } from 'svelte/store'
import { Semaphore } from "@shopify/semaphore"
// import { RateLimit } from 'async-sema'
import minew from '../../datasources/minew.js'


const macs = [
    'AC233FD0A38F',
    'AC233FD0A290',
    'AC233FD0A100',
    'AC233FD0A39C',
    'AC233FD0A3A4',
    'AC233FD0A39D',
    'AC233FD0A489',
    'AC233FD09FB5',
    'AC233FD09FBE',
    'AC233FD09FBA',
    'AC233FD0A034',
    'AC233FD0A1CF',
    'AC233FD0A142',
    'AC233FD09F07',
    'AC233FD09F52',
    'AC233FD0A22C',
    'AC233FD0A201',
    'AC233FD0A0AC',
    'AC233FD0A235',
    'AC233FD0A0FF',
    'AC233FD0A134',
    'AC233FD0A2B6',
    'AC233FD0A2AC',
    'AC233FD09D4A',
    'AC233FD09D44',
    'AC233FD09F97',
    'AC233FD0A202',
    'AC233FD09D46',
    'AC233FD09D4C',
    'AC233FD0A263',
    'AC233FD0A08F',
    'AC233FD0A133',
    'AC233FD0A2A2',
    'AC233FD0A30E',
//    '????????????',
    'AC233FD0A11C',
    'AC233FD0A132',
    'AC233FD0A2B1',
    'AC233FD09A82',
    'AC233FD0A2EC',
    'AC233FD0A29F',
    'AC233FD0A345',
    'AC233FD0A45D',
    'AC233FD0A011',
    'AC233FD0A2C4',
    'AC233FD099A5',
    'AC233FD0692E',
    'AC233FD0A33B',
    'AC233FD0A055',
    'AC233FD09B29',
    'AC233FD09B2C',
    'AC233FD09B27'
]

// const rateLimit = RateLimit(2)
const semaphore = new Semaphore(3)


export default writable(new Map(), (set) => {
    (async function asyncWrapper() {
        const token = await minew.login()
        console.log('tagStore')
        let tags = new Map()
        macs.forEach(async mac => {
            const preview = await fetchPreview(mac, token)
            tags.set(mac, { ...preview })
            console.log(tags.size)
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
    console.log({ id, label3, label4, label5, label6 })
    // const demoData = response.demoData
    return { macAddress, id, label3, label4, label5, label6, Description: `${label5} ${label4}`.trim() }
}

