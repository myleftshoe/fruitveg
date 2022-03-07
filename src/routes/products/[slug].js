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


export const get = async ({ params, request }) => {
    const { slug } = params
    console.log('slug', slug)
    //TODO 
    if (slug === 'favicon.png') {
        return { redirect: '/', status: 302 };
    }
    const json = await atria.get(`/Items/${slug}`)
    const body = { product: json }
    return { body }
}


export const put = async ({params, request}) => {
    console.log('put')
    const { slug } = params
    const data = await request.formData()
    const payload = Object.fromEntries(data.entries())
    payload["StoreGroupPrices"] = []
    console.log(payload)

    const json = await minew.put('goods?storeId=123')

    
    // await atria.put(`/Items/${slug}/Price`, payload)
    return {
        headers: { Location: '/products' },
        status: 302
    }
}
