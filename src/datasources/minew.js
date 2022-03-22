import Fetcher from './fetcher.js'
import { MINEW_USERNAME, MINEW_PASSWORD } from '$lib/env'

// TODO: remove credentials

const fetcher = new Fetcher(`https://esl.minew.com:9090/V1`)
let token = login()


async function get(path) {
    let headers = { 'Authorization': `Bearer ${await token}` } 
    let response = await fetcher.fetch(path, { headers })
    let json = await response.json()
    if (json.errcode == '10000100') {
        token=login()
        headers = { 'Authorization': `Bearer ${await token}` } 
        response = await fetcher.fetch(path, { headers })
        json = await response.json()
    }
    return json
}

async function post(path, payload) {
    const headers = { 
        "content-type": 'application/json',
        "Authorization": `Bearer ${await token}` 
    }
    const options = { 
        method: 'POST', 
        headers, 
        body: JSON.stringify(payload) 
        // body: JSON.stringify(sample) 
    }
    const response = await fetcher.fetch(path, options)
    const json = await response.json()
    return json
}

async function put(path, payload) {
    const headers = { 
        "content-type": 'application/json',
        "Authorization": `Bearer ${await token}` 
    }
    const options = { 
        method: 'PUT', 
        headers, 
        body: JSON.stringify(payload) 
        // body: JSON.stringify(sample) 
    }
    const response = await fetcher.fetch(path, options)
    console.log(await response.json())
}

async function login() {
    console.log('*** MINEW LOGIN ***')
    const payload = {
        "username": MINEW_USERNAME,
        "password": MINEW_PASSWORD
    }
    const response = await fetcher.fetch(`/pc/Login`, {
        method: 'POST',
        body: JSON.stringify(payload)
    })
    const json = await response.json()
    return json.body.token
}


async function bind(macAddress = "ac233fd0b591", pluCode = 2084) {
    console.log('minew bind!!!!', macAddress, pluCode)
    return
    const path = 'label/save'
    const payload = {
        "mac": macAddress,
        "only": pluCode,
        "storeId": "123",
        "templets": [
            {
                "demoId": "ae7ed1bb2d724c07a0076bef6d075120",
                "demoName": "Barcode Product",
                "templateType": "1",
                "effect": true,
                "mac": macAddress
            }
        ]
    } 
    const headers = { 
        "content-type": 'application/json',
        "Authorization": `Bearer ${await token}` 
    }
    const options = { 
        method: 'POST', 
        headers, 
        body: JSON.stringify(payload) 
        // body: JSON.stringify(sample) 
    }
    const response = await fetcher.fetch(path, options)
    console.log(await response.json())
}


export default { get, post, put, bind }
export { bind }