import atria from '../../datasources/atria.js'

const mapper = ({PLUCode, ItemCode, Description}) => ({id: PLUCode, ItemCode, Description, qty: '', notes:'' })
const filter = `(MainGroupName%20eq%20%27FRUIT%20%26%20VEG%27)%20and%20(Active%20eq%20true)`

export const get = async (event) => {
    console.log('get')
    const _atriaData = await atria.get(`/Items/Summary?$top=999&$orderby=Description%20asc&$filter=${filter} `)
    const atriaData = [..._atriaData]

    const products = atriaData.map(mapper)
    console.log(products.length, 'items')

    const body = { products }
    return { body }
}

/*
((ItemCode ne null and indexof(ItemCode, 'FRUIT & VEG') ne -1) or (Description ne null and indexof(Description, 'FRUIT & VEG') ne -1) or (MainGroupName ne null and indexof(MainGroupName, 'FRUIT & VEG') ne -1) or (SubGroupName ne null and indexof(SubGroupName, 'FRUIT & VEG') ne -1) or (LocationName ne null and indexof(LocationName, 'FRUIT & VEG') ne -1) or (FormatName ne null and indexof(FormatName, 'FRUIT & VEG') ne -1)) and (Active eq true)
*/
/*
$top=100&$orderby=Description%20asc&$filter=((ItemCode%20ne%20null%20and%20indexof(ItemCode,%20%27FRUIT%20%26%20VEG%27)%20ne%20-1)%20or%20(Description%20ne%20null%20and%20indexof(Description,%20%27FRUIT%20%26%20VEG%27)%20ne%20-1)%20or%20(MainGroupName%20ne%20null%20and%20indexof(MainGroupName,%20%27FRUIT%20%26%20VEG%27)%20ne%20-1)%20or%20(SubGroupName%20ne%20null%20and%20indexof(SubGroupName,%20%27FRUIT%20%26%20VEG%27)%20ne%20-1)%20or%20(LocationName%20ne%20null%20and%20indexof(LocationName,%20%27FRUIT%20%26%20VEG%27)%20ne%20-1)%20or%20(FormatName%20ne%20null%20and%20indexof(FormatName,%20%27FRUIT%20%26%20VEG%27)%20ne%20-1))%20and%20(Active%20eq%20true)
*/