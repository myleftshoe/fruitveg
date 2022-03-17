import atria from '../../datasources/atria.js'

const mapper = ({PLUCode, ItemCode, Description}) => ({id: PLUCode, ItemCode, Description, qty: 0, unit: '', notes:'' })
const filter = `(indexof(MainGroupName,%20%27FRUIT%20%26%20VEG%27)%20ne%20-1)`

export const get = async (event) => {
    const _atriaData = await atria.get(`/Items/Summary?$top=999&$orderby=Description%20asc&$filter=${filter} `)
    const atriaData = [..._atriaData]

    const products = atriaData.map(mapper)
    // console.table(merged)

    const body = { products }
    return { body }
}

