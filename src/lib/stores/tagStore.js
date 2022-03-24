import { readable } from 'svelte/store'
import { Semaphore } from "@shopify/semaphore"
import minew from '../../datasources/minew.js'
import translate from '../../translations.js'


import { get } from 'svelte/store'

import { productStore } from '$lib/stores/productStore'


const semaphore = new Semaphore(5)

export const tagStore = readable([], async (set) => {
    console.log('tagStore')

    const products = get(productStore)
    console.log(products.size)

    const bindings = new Map()


    const tags = await minew.get(`/label?page=1&size=999&storeId=123`)
    // console.log(tags.list.length)
    const labels = tags.list.filter(tag => tag.correspond?.gatewayMac === 'AC233FC05922')
    console.log('labels', labels.length)

    console.log('***********tags', labels)

    for (const [key, product] of products) {
        const response = await getTagBinding(product.id)
        console.log(product.id)
        // console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', response)
        response.forEach((data) => {
            if (data.mac === 'AC233FD09EFF')
                console.log('fsdfsfds', data)
            if (labels.find(label => label.mac.toLowerCase() === data.mac.toLowerCase())) 
                bindings.set(data.mac, { macAddress: data.mac, id: product.id, pluCode: product.pluCode, description: `${product.label5} ${product.label4}`.trim() })
        })
        set(new Map(bindings))

    }

})


async function getTagBinding(id = '2084') {
    const permit = await semaphore.acquire()
    console.log('minew getTagBinding', id, `/TagBinging/label?storeId=123&ean13=${id}`)
    permit.release()

    const json = await minew.get(`/TagBinging/label?storeId=123&ean13=${id}`)

    // console.log(json.body.data[0])
    return json.body.data
}

