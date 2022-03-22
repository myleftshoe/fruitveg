import { bind } from '../../../datasources/minew.js'



export const get = async ({ params, request }) => {
    const { macAddress, pluCode } = params
    console.log(macAddress, pluCode)
    await bind(macAddress, pluCode)
    return { body: `requested bind macAddress [${macAddress}] to pluCode [${pluCode}]` }
}