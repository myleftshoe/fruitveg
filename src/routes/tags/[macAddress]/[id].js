import { mdiCookiePlusOutline } from '@mdi/js'
import { bind } from '../../../datasources/minew.js'



export const get = async ({ params, request }) => {
    const { macAddress, id } = params
    console.log(macAddress, id)
    console.log('pppppppppppppppp')
    await bind(macAddress, id)
    return { body: `requested bind macAddress [${macAddress}] to id [${id}]` }
}
