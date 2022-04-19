import { readable } from 'svelte/store'
import minew from '../datasources/minew.js'
import translate from '../translations.js'
import { alpha } from '$lib/sort'


export default readable([], (set) => {
    (async function asyncWrapper() {
        console.log('productStore')
        const token = await minew.login()
        const response = await minew.get(`/goods?page=1&size=9999&storeId=123`, token)
        const products = response.rows
            .filter(row => ['FRUIT', 'VEGETABLES'].includes(row.label13))
            .map(row => ({
                id: row.id,
                plucode: row.label3,
                label4: row.label4.trim(),
                label5: row.label5.trim(),
                label6: row.label6,
                name: `${row.label4.trim()} ${row.label5.trim()}`.trim(),
                price: row.label6,
                label8: row.label8,
                label9: row.label9,
                label10: row.label10,
                label11: row.label11,
                label13: row.label13,
                status: translate(row.status) || row.status,
            }))
            .filter(row => row.status === 'bound')
            .sort(alpha("name"))
    
        // console.table(products)
        set(products)
    })()
})

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

