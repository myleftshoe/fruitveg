import atria from '../../datasources/atria.js'
import minew from '../../datasources/minew.js'

// const mapper = ({ LocationId, DepartmentName, LocationName, FormatName, Uom, HasDiscount, HasSchedule, HasStorePrice, StockItem, IsSubItem, ...rest }, i) => ({ id: i, ...rest})
const mapper = ({ItemCode, PLUCode, Description, UnitPrice, Active, unit}) => ({id: PLUCode, ItemCode, Description, UnitPrice, unit, Active })
const filter = `(indexof(MainGroupName,%20%27FRUIT%20%26%20VEG%27)%20ne%20-1)`

export const get = async (event) => {
    const _atriaData = await atria.get(`/Items/Summary?$top=999&$orderby=Description%20asc&$filter=${filter} `)
    const atriaData = [..._atriaData]

    // const _minewData = await minew.get(`/goods?page=1&size=9&storeId=123&fuzzy=VEGETABLES`)
    const _minewData = await minew.get(`/goods?page=1&size=999&storeId=123`)
    // console.table(_minewData.rows)
    const minewData = _minewData.rows.filter(row => ['FRUIT', 'VEGETABLES'].includes(row.label13)).map(row => ({
        id: row.id,
        plucode: row.label3,
        label4: row.label4,
        label5: row.label5,
        name: `${row.label5} ${row.label4}`.trim(),
        price: row.label6,
        label8: row.label8,
        label9: row.label9,
        unit: row.label10,
        label11: row.label11,
        label13: row.label13,
        // status: translate(row.status),
    }))

    const products = atriaData.map(t1 => ({...t1, ...minewData.find(t2 => t2.plucode === t1.PLUCode.toString())})).map(mapper)
    // console.table(merged)

    const body = { products }
    return { body }
}

