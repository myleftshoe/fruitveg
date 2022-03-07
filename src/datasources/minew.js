import Fetcher from './fetcher.js'

// TODO: remove credentials

const fetcher = new Fetcher(`https://esl.minew.com:9090/V1`)
const token = await login()

const sample = {
    "id": "2117",
    // "barcode": "",
    // "qrcode": "",
    // "label1": "",
    // "label2": "",
    "label3": "1742",
    "label4": "LETTUCE",
    "label5": "BUTTER",
    "label6": "4.99",
    // "label7": "",
    "label8": "Organic",
    // "label9": "",
    "label10": "each",
    // "label11": "",
    // "label12": "",
    "label13": "VEGETABLES",
    // "label14": "",
    // "label15": "",
    // "label16": "",
    // "label17": "",
    // "label18": "",
    // "label19": "",
    // "label20": "",
    // "label21": "",
    // "label22": "",
    // "label23": "",
    // "label24": "",
    // "label25": "",
    // "label26": "",
    // "label27": "",
    // "label28": "",
    // "label29": "",
    // "label30": "",
    // "label31": "",
    // "label32": "",
    // "label33": "",
    // "label34": "",
    // "label35": "",
    // "label36": "",
    // "label37": "",
    // "label38": "",
    // "label39": "",
    // "label40": "",
    // "label41": "",
    // "label42": "",
    // "label43": "",
    // "label44": "",
    // "label45": "",
    // "label46": "",
    // "label47": "",
    // "label48": "",
    // "label49": "",
    // "label50": ""
}

async function get(path) {
    const headers = { 'Authorization': `Bearer ${token}` } 
    const response = await fetcher.fetch(path, { headers })
    return response.json()
}
    
async function put(path, payload) {
    const headers = { 
        "content-type": 'application/json',
        "Authorization": `Bearer ${token}` 
    }
    const options = { 
        method: 'PUT', 
        headers, 
        body: JSON.stringify(sample) 
    }
    const response = await fetcher.fetch(path, options)
    console.log(await response.json())
}

async function login() {
    const payload = {
        "username": "***REMOVED***",
        "password": "***REMOVED***"
    }
    const response = await fetcher.fetch(`/pc/Login`, {
        method: 'POST',
        body: JSON.stringify(payload)
    })
    const json = await response.json()
    return json.body.token
}

export default {
    login,
    get,
    put,
}