import { readable } from 'svelte/store'
// import { RateLimit } from "async-sema"
import { Semaphore } from "@shopify/semaphore"
import minew from '../../datasources/minew.js'
import translate from '../../translations.js'

// const limit = RateLimit(5)

const semaphore = new Semaphore(5)

export const tagStore = readable([], async (set) => {
    console.log('tagStore.set')

    const response = await minew.get(`/goods?page=1&size=9999&storeId=123`)
    const boundProducts = response.rows.filter(row => ['FRUIT'].includes(row.label13)).map(row => ({
        id: row.id,
        pluCode: row.label3,
        label4: row.label4,
        label5: row.label5,
        name: `${row.label5} ${row.label4}`.trim(),
        price: row.label6,
        label8: row.label8,
        label9: row.label9,
        label10: row.label10,
        label11: row.label11,
        label13: row.label13,
        status: translate(row.status) || row.status,
    })).filter(row => row.status === 'bound')

    console.log(boundProducts.length)

    const bindings = new Map()

    
    for (const product of boundProducts) {
        const response = await getTagBinding(product.id)
        console.log(product.id)
        console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', response)
        response.forEach((data) => {
            console.log('fsdfsfds', data.mac)
            bindings.set(data.mac, { macAddress: data.mac, id: product.id, pluCode: product.pluCode, description: `${product.label5} ${product.label4}`.trim() })
        })
        set(new Map(bindings))

    }

})


async function getTagBinding(pluCode = '2084') {
    const permit = await semaphore.acquire()
    console.log('minew getTagBinding', pluCode, `/TagBinging/label?storeId=123&ean13=${pluCode}`)
    permit.release()

    const json = await minew.get(`/TagBinging/label?storeId=123&ean13=${pluCode}`)

    console.log(json.body.data[0])
    return json.body.data
}

