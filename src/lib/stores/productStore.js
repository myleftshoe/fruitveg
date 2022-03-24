import { readable } from 'svelte/store'
import minew from '../../datasources/minew.js'
import translate from '../../translations.js'

export const productStore = readable([], async (set) => {
    console.log('productStore.set')

    const response = await minew.get(`/goods?page=1&size=9999&storeId=123`)
    const products = response.rows
        .filter(row => ['FRUIT']
        .includes(row.label13))
        .map(row => ({
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
        }))
        .filter(row => row.status === 'bound')
        .map(row => [row.id, { ...row}])
    console.log('gggggggggggggggggggggg', products.length)
    set(new Map(products))
})


