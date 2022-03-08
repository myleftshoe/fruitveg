import Fetcher from './fetcher.js'
import { ATRIA_USERNAME, ATRIA_PASSWORD } from '$lib/env'


// TODO: remove credentials

const fetcher = new Fetcher(`https://atriacloud.wedderburn.com.au/75189`)
const cookie = '__RequestVerificationToken_Lzc1MTg50=ZCqmFKmcWvhe6vTjmhxnyotIJqc9R40J9ugSZdUHnN2wVcKzZlC0xJ7qk8xqD-EohEI2opRytap822CIHIZ7ACV2vTpNZqjX-YRTA086ibA1; wedderburn.helm=Vg3ymYjACaWX3hOvjKZEWzyNyWedVs4hY4G4oXIJ0fnjgcpgPFPu56bsi1cjeRtmIG0PSytYkIbvdxLWQ6EKQZqV78DDvguN4NbJcvP53QnCoLIiRDVQ-r-1HLA3TrJ_zixVXbiB9gpfVim-htTiWe0cFOy-hdyHLtLwOCvMiprBe6fzik1jgSK2iF3QMhtBeumkS4fUHTvL0hghRN5WBNNWbVHx5vmgEie8_3aMUn_FxGHGKSvDYiyGIn3t_4hUWUzRO3mcgrzW8NnYpFV6MvFVYwCWj9MSeLOOEeKBF97mAFEZOesRAk0VvKGeGxacf1PXi1gqdYtmrCUitmXsWfTuSj68zCnkn6QnhAq4uqY5i4rSoLubc7r1AEgz2aVPOBiHeEEAtCWyj91nSfpYGCIWI23vDABG9i_U7N_J_xQqPe6tSUY2tYd2ZEduu2BQ1kiRM8Cs52JzWm9nhYSf_1FlQwLU9vPyRrfCOPX4kCq2Zyux1QK-ObpnBZnNb8pfkE9i2im33wPiKy6gp2ztW2LLnLhoQ7l77PH0NW3wO-0'

async function get(path) {
    const headers = { cookie: await cookie }
    const response = await fetcher.fetch('api/' + path, { headers })
    // console.log(response)
    return response.json()
}

async function put(path, body) {
    const headers = { 
        'content-type': 'application/json',
        cookie,
    }
    const response = await fetcher.fetch('api/' + path, { 
        method: 'PUT',
        headers, 
        body: JSON.stringify(body)
    })
    console.log(response.status)
    return response
}

export default {
    get,
    put,
}
