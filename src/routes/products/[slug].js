import atria from '../../datasources/atria.js'
import minew from '../../datasources/minew.js'




const row = {
    // "LocationId": 2,
    "PLUCode": 1740,
    "Description": "LETTUCE - BUTTER",
    // "Barcode": "0220104",
    "StoreGroupPrices": [],
    "UnitPrice": 3.99,
    // "UnitCost": 0,
    // "DiscountType": 0,
    // "MarkdownType": 0,
    // "FirstLimit": 0,
    // "FirstValue": 0,
    // "SecondLimit": null,
    // "SecondValue": null,
    // "StartDate": null,
    // "EndDate": null,
    // "StartTime": null,
    // "EndTime": null,
    // "DaysOfWeek": 0
}


const fetched = new Map()

export const get = async ({ params, request }) => {
    const { slug } = params
    console.log('slug', slug)
    //TODO 
    if (slug === 'favicon.png') {
        return { redirect: '/', status: 302 };
    }

    const json = await atria.get(`/Items/${slug}`)
    console.log(json.PLUCode)
    const body = { product: json }

    const minewData = await minew.get(`/goods?page=1&size=1&storeId=123&fuzzy=${json.PLUCode}`)
    console.log(minewData)
    const mapped = minewData.rows.map((row) => ({ 
            id: row.id,
            label3: row.label3,
            label4: row.label4,
            label5: row.label5,
            label6: row.label6,
            label8: row.label8,
            label10: row.label10,
            label13: row.label13,
    }))[0]
    console.table(mapped)

    fetched.set(slug, mapped)
    console.table(fetched.get(slug))




    return { body }
}

const sample2 = {
    "id": "2062",
    "barcode": "",
    "qrcode": "",
    "label1": "",
    "label2": "",
    "label3": "1689",
    "label4": "ASPARAGUS",
    "label5": "",
    "label6": "4.99",
    "label7": "",
    "label8": "Organic",
    "label9": "",
    "label10": "each",
    "label11": "",
    "label12": "",
    "label13": "VEGETABLES",
    "label14": "",
    "label15": "",
    "label16": "",
    "label17": "",
    "label18": "",
    "label19": "",
    "label20": "",
    "label21": "",
    "label22": "",
    "label23": "",
    "label24": "",
    "label25": "",
    "label26": "",
    "label27": "",
    "label28": "",
    "label29": "",
    "label30": "",
    "label31": "",
    "label32": "",
    "label33": "",
    "label34": "",
    "label35": "",
    "label36": "",
    "label37": "",
    "label38": "",
    "label39": "",
    "label40": "",
    "label41": "",
    "label42": "",
    "label43": "",
    "label44": "",
    "label45": "",
    "label46": "",
    "label47": "",
    "label48": "",
    "label49": "",
    "label50": ""
}

export const put = async ({params, request}) => {
    console.log('put')
    const { slug } = params
    const data = await request.formData()
    const payload = Object.fromEntries(data.entries())
    payload["StoreGroupPrices"] = []
    console.log(payload)

    const minewData = { ...fetched.get(slug), label6: payload.UnitPrice }
    console.table(minewData)
    await minew.put('goods?storeId=123', minewData)
    await atria.put(`/Items/${slug}/Price`, payload)
    return {
        headers: { Location: '/products' },
        status: 302
    }
}
