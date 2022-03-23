import minew from '../../datasources/minew.js'
import translate from '../../translations.js'

// const mapper = ({ LocationId, DepartmentName, LocationName, FormatName, Uom, HasDiscount, HasSchedule, HasStorePrice, StockItem, IsSubItem, ...rest }, i) => ({ id: i, ...rest})
const mapper = ({ItemCode, PLUCode, Description, UnitPrice, Active, label10, label4, label5, isWeighed, status}) => ({id: PLUCode, ItemCode, Description, label4, label5, UnitPrice, label10, Active, isWeighed, status })
const filter = `(indexof(MainGroupName,%20%27FRUIT%20%26%20VEG%27)%20ne%20-1)`

export const get = async (event) => {
    // const _minewData = await minew.get(`/goods?page=1&size=9&storeId=123&fuzzy=VEGETABLES`)
    const response = await minew.get(`/label?page=1&size=999&storeId=123`)
    // console.table(response.rows)
    // const minewData = _minewData.rows.filter(row => ['FRUIT', 'VEGETABLES'].includes(row.label13)).map(row => ({
    //     id: row.id,
    //     plucode: row.label3,
    //     label4: row.label4,
    //     label5: row.label5,
    //     name: `${row.label5} ${row.label4}`.trim(),
    //     price: row.label6,
    //     label8: row.label8,
    //     label9: row.label9,
    //     label10: row.label10,
    //     label11: row.label11,
    //     label13: row.label13,
    //     status: translate(row.status) || row.status,
    // })).filter(row => row.status === 'bound')

    console.log(response.list.length)

    const labels = response.list.filter(tag => tag.correspond?.gatewayMac === 'AC233FC05922')
    console.log(labels.length)

    return { body: { labels } }
}

/* Sample 


{
    "pageNum": 1,
    "pageSize": 500,
    "size": 500,
    "startRow": 0,
    "endRow": 499,
    "total": 940,
    "pages": 1,
    "list": [
        {
            "uuid": "2390e2128ee911ecb3b00242c0a89006",
            "mac": "ac233fd06a3c",
            "screenSize": null,
            "type": "0",
            "activekey": "",
            "password": null,
            "battery": 100,
            "lastupdate": null,
            "heartbeat": null,
            "firmware": null,
            "hardware": null,
            "software": null,
            "protocolStack": null,
            "manufacturer": null,
            "temperature": 0.0,
            "chip": null,
            "rssi": null,
            "peripheral": null,
            "createTime": 1644989251000,
            "updateTime": 1644989310000,
            "storeId": 123,
            "deviceType": null,
            "correspond": null
        },
        {
            "uuid": "2390e6458ee911ecb3b00242c0a89006",
            "mac": "ac233fd06a68",
            "screenSize": null,
            "type": "0",
            "activekey": "",
            "password": null,
            "battery": 100,
            "lastupdate": null,
            "heartbeat": null,
            "firmware": null,
            "hardware": null,
            "software": null,
            "protocolStack": null,
            "manufacturer": null,
            "temperature": 0.0,
            "chip": null,
            "rssi": null,
            "peripheral": null,
            "createTime": 1644989251000,
            "updateTime": 1644989310000,
            "storeId": 123,
            "deviceType": null,
            "correspond": null
        },
    ],
    "prePage": 0,
    "nextPage": 0,
    "isFirstPage": true,
    "isLastPage": true,
    "hasPreviousPage": false,
    "hasNextPage": false,
    "navigatePages": 8,
    "navigatepageNums": [
        1
    ],
    "navigateFirstPage": 1,
    "navigateLastPage": 1,
    "firstPage": 1,
    "lastPage": 1
}        
*/