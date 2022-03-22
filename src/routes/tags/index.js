import minew from '../../datasources/minew.js'
import translate from '../../translations.js'
import { appendFile } from 'fs'
// https://esl.minew.com:9090/V1/label?page=1&size=10&storeId=123

const fvGateway = 'AC233FC05828'
const ycap = 'ac233fd0b592'

export const get = async ({ params, request }) => {
    console.log('tags.index.js.get')

    const response = await minew.get(`/goods?page=1&size=999&storeId=123`)
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

    // return {}
    console.log(boundProducts.length)

    // const body = { tags: boundProducts }

    // return { body }

    const bindings = []
    await Promise.all(boundProducts.slice(35,39).map(async (row) => {
        const response = await getTagBinding(row.id)
        console.log(row.id)
        console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', response)
        // if (!response) return
        // if (!response.length) return
        response.forEach((data) => {
            console.log('fsdfsfds', data.mac)
            bindings.push({ macAddress: data.mac, id: row.id, pluCode: row.pluCode, description: `${row.label5} ${row.label4}`.trim() })
        })
        return response
    }))
    // preview(ycap)
    console.table('bindings', bindings)

    appendFile('./bindings.json', JSON.stringify(bindings), err => {
        if (err) {
            console.error(err)
            return
        }
    })


    return { body: { tags: bindings } }
} 

async function preview(macAddress) {
    console.log('preview', macAddress)
    const response = await minew.post(`/label/preview?storeId=123&mac=${macAddress}`)
    console.log('preview', response)
    if (response?.errcode == 10000330) return null
    const { id, label3, label4, label5 } = response.body
    console.log({ id, label3, label4, label5 } )
    const demoData = response.demoData
    return { id, label3, label4, label5 }
}



async function getTagBinding(pluCode = '2084') {
    console.log('minew getTagBinding', pluCode, `/TagBinging/label?storeId=123&ean13=${pluCode}`)

    const json = await minew.get(`/TagBinging/label?storeId=123&ean13=${pluCode}`)

    console.log(json.body.data[0])
    return json.body.data
}





/*----------------------------------------------------------------

preview = {
    errcode: 200,
    body: {
        id: '2084',
        barcode: '',
        qrcode: '',
        label1: '',
        label2: '',
        label3: '1708',
        label4: 'CAPSICUM',
        label5: 'YELLOW',
        label6: '19.99',
        label7: '',
        label8: 'Organic',
        label9: '',
        label10: '/kg',
        label11: 'VIC',
        label12: '',
        label13: 'VEGETABLES',
        label14: '',
        label15: '',
        label16: '',
        label17: '',
        label18: '',
        label19: '',
        label20: '',
        label21: '',
        label22: '',
        label23: '',
        label24: '',
        label25: '',
        label26: '',
        label27: '',
        label28: '',
        label29: '',
        label30: '',
        label31: '',
        label32: '',
        label33: '',
        label34: '',
        label35: '',
        label36: '',
        label37: '',
        label38: '',
        label39: '',
        label40: '',
        label41: '',
        label42: '',
        label43: '',
        label44: '',
        label45: '',
        label46: '',
        label47: '',
        label48: '',
        label49: '',
        label50: '',
        photo1: null,
        photo2: null,
        photo3: null,
        photo4: null,
        photo5: null,
        status: '已绑定',
        createTime: 1647860328479,
        updateTime: 1644741925600,
        msg: null
    },
    map: {
        demoData: '{"inch":2.13,"size":{"width":250,"height":122},"transpose":0,"rgbtype":2,"text":{"label4":{"x":5,"y":5,"font-size":16,"font-family":"WqyBitmapSong_AlibabaPuhui","align":"left","bold":true,"prefix":false,"color":"black"},"label5":{"x":5,"y":30,"font-size":16,"font-family":"WqyBitmapSong_AlibabaPuhui","align":"left","bold":true,"prefix":false,"color":"black"},"label3":{"x":5,"y":77,"font-size":12,"font-family":"WqyBitmapSong_AlibabaPuhui","align":"left","bold":false,"prefix":false,"color":"black"},"label6":{"x":148,"y":80,"font-size":35,"font-family":"WqyBitmapSong_AlibabaPuhui","align":"left","bold":false,"prefix":false,"color":"red","effect":"minitail-up"},"label7":{"x":5,"y":56,"font-size":12,"font-family":"WqyBitmapSong_AlibabaPuhui","align":"left","bold":false,"prefix":false,"color":"black"},"label10":{"x":231,"y":106,"font-size":11,"font-family":"WqyBitmapSong_AlibabaPuhui","align":"left","bold":false,"prefix":false,"color":"red"}},"grapcodes":{"barcode":{"type":"code128","x":3,"y":98,"color":"black","layer":"mono","barwidth":1,"barheight":20}},"icons":{"icon1":{"x":121,"y":73,"font-size":30,"align":"left","color":"red","content":"icofont-dollar"}}}',
        mac: 'AC233FD0B591'
    }
}

Single with correspond =   {
    uuid: '9b161d4050b511eb94ba0242c0a89003',
    mac: 'ac233fd0b591',
    screenSize: '0008',
    type: '1',
    activekey: '',
    password: null,
    battery: 100,
    lastupdate: 1647857517000,
    heartbeat: '58128153',
    firmware: '1.0.30',
    hardware: '0002',
    software: null,
    protocolStack: null,
    manufacturer: 'Minew',
    temperature: 21,
    chip: '01',
    rssi: -61,
    peripheral: '0000',
    createTime: 1610002648000,
    updateTime: 1647857517000,
    storeId: 123,
    deviceType: null,
    correspond: {
        id: '620c9901124436beb06ce0bf',
        gatewayMac: 'AC233FC05828',
        mac: 'ac233fd0b591',
        screenSize: null,
        createTime: 1647857518072
    }
}

Response = {
    "pageNum": 1,
    "pageSize": 10,
    "size": 10,
    "startRow": 0,
    "endRow": 9,
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
        {
            "uuid": "2390e75c8ee911ecb3b00242c0a89006",
            "mac": "ac233fd09d66",
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
            "uuid": "2390e8558ee911ecb3b00242c0a89006",
            "mac": "ac233fd09f6a",
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
            "uuid": "2390e9298ee911ecb3b00242c0a89006",
            "mac": "ac233fd09f7c",
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
            "updateTime": 1644989311000,
            "storeId": 123,
            "deviceType": null,
            "correspond": null
        },
        {
            "uuid": "2390e9ff8ee911ecb3b00242c0a89006",
            "mac": "ac233fd09f7f",
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
            "updateTime": 1644989311000,
            "storeId": 123,
            "deviceType": null,
            "correspond": null
        },
        {
            "uuid": "2390eb078ee911ecb3b00242c0a89006",
            "mac": "ac233fd09fa0",
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
            "updateTime": 1644989311000,
            "storeId": 123,
            "deviceType": null,
            "correspond": null
        },
        {
            "uuid": "2390ec5a8ee911ecb3b00242c0a89006",
            "mac": "ac233fd09fa6",
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
            "updateTime": 1644989311000,
            "storeId": 123,
            "deviceType": null,
            "correspond": null
        },
        {
            "uuid": "2390ed538ee911ecb3b00242c0a89006",
            "mac": "ac233fd09fcd",
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
            "updateTime": 1644989311000,
            "storeId": 123,
            "deviceType": null,
            "correspond": null
        },
        {
            "uuid": "2390ee0c8ee911ecb3b00242c0a89006",
            "mac": "ac233fd09fd6",
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
            "updateTime": 1644989311000,
            "storeId": 123,
            "deviceType": null,
            "correspond": null
        }
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