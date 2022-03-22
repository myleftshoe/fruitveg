<script>
    // Inspired by https://svelte.dev/repl/810b0f1e16ac4bbd8af8ba25d5e0deff?version=3.4.2.
    import { flip } from 'svelte/animate'
    import { tick } from 'svelte'
    import { tagStore } from '$lib/stores/tagStore'


    const products = [
        {
            "macAddress": "AC233FD0A2EA",
            "id": "2001",
            "pluCode": "1638",
            "description": "BANANAS"
        },
        {
            "macAddress": "AC233FD0A0BA",
            "id": "2001",
            "pluCode": "1638",
            "description": "BANANAS"
        },
        {
            "macAddress": "AC233FD09F50",
            "id": "2003",
            "pluCode": "1640",
            "description": "PINK LADY APPLES"
        },
        {
            "macAddress": "AC233FD09F4D",
            "id": "2004",
            "pluCode": "9114",
            "description": "GALA APPLES"
        },
        {
            "macAddress": "AC233FD0A29F",
            "id": "2004",
            "pluCode": "9114",
            "description": "GALA APPLES"
        },
        {
            "macAddress": "AC233FD0A2EC",
            "id": "2004",
            "pluCode": "9114",
            "description": "GALA APPLES"
        },
        {
            "macAddress": "AC233FD0A3D7",
            "id": "2002",
            "pluCode": "1639",
            "description": "GRANNY SMITH APPLES"
        },
        {
            "macAddress": "AC233FD0A08F",
            "id": "2002",
            "pluCode": "1639",
            "description": "GRANNY SMITH APPLES"
        },
        {
            "macAddress": "AC233FD0A2AC",
            "id": "2000",
            "pluCode": "1637",
            "description": "APPLE BAGS"
        },
        {
            "macAddress": "AC233FD0A474",
            "id": "2000",
            "pluCode": "1637",
            "description": "APPLE BAGS"
        },
        {
            "macAddress": "AC233FD09EFF",
            "id": "2000",
            "pluCode": "1637",
            "description": "APPLE BAGS"
        },
        {
            "macAddress": "AC233FD0A134",
            "id": "2000",
            "pluCode": "1637",
            "description": "APPLE BAGS"
        },
        {
            "macAddress": "AC233FD0A2B6",
            "id": "2000",
            "pluCode": "1637",
            "description": "APPLE BAGS"
        },
        {
            "macAddress": "AC233FD0A2C4",
            "id": "2006",
            "pluCode": "9116",
            "description": "RED SENSATION PEARS"
        },
        {
            "macAddress": "AC233FD09F3E",
            "id": "2005",
            "pluCode": "9115",
            "description": "GOLDEN DEL APPLES"
        },
        {
            "macAddress": "AC233FD0A263",
            "id": "2005",
            "pluCode": "9115",
            "description": "GOLDEN DEL APPLES"
        },
        {
            "macAddress": "AC233FD12649",
            "id": "2008",
            "pluCode": "1645",
            "description": "BANANAS"
        },
        {
            "macAddress": "AC233FD0A48F",
            "id": "2012",
            "pluCode": "1649",
            "description": "BLUEBERRIES PUNNETS"
        },
        {
            "macAddress": "AC233FD0A47D",
            "id": "2012",
            "pluCode": "1649",
            "description": "BLUEBERRIES PUNNETS"
        },
        {
            "macAddress": "AC233FD09B31",
            "id": "2007",
            "pluCode": "1644",
            "description": "HASS AVOCADO"
        },
        {
            "macAddress": "AC233FD0A268",
            "id": "2007",
            "pluCode": "1644",
            "description": "HASS AVOCADO"
        },
        {
            "macAddress": "AC233FD0A36C",
            "id": "2007",
            "pluCode": "1644",
            "description": "HASS AVOCADO"
        },
        {
            "macAddress": "AC233FD09F9D",
            "id": "2017",
            "pluCode": "1671",
            "description": "SMALL AVOCADOS HASS"
        },
        {
            "macAddress": "AC233FD06B45",
            "id": "2020",
            "pluCode": "1754",
            "description": "APRICOTS"
        },
        {
            "macAddress": "AC233FD0A0FF",
            "id": "2019",
            "pluCode": "1683",
            "description": "WHOLE ROCKMELON"
        },
        {
            "macAddress": "AC233FD0A45D",
            "id": "2013",
            "pluCode": "1651",
            "description": "FUJI APPLES"
        },
        {
            "macAddress": "AC233FD0A345",
            "id": "2013",
            "pluCode": "1651",
            "description": "FUJI APPLES"
        },
        {
            "macAddress": "AC233FD069FD",
            "id": "2025",
            "pluCode": "1675",
            "description": "YELLOW NECTARINE"
        },
        {
            "macAddress": "AC233FD0A11C",
            "id": "2025",
            "pluCode": "1675",
            "description": "YELLOW NECTARINE"
        },
        {
            "macAddress": "AC233FD0A313",
            "id": "2027",
            "pluCode": "1658",
            "description": "GREEN GRAPES"
        },
        {
            "macAddress": "AC233FD09F52",
            "id": "2027",
            "pluCode": "1658",
            "description": "GREEN GRAPES"
        },
        {
            "macAddress": "AC233FD0A10F",
            "id": "2029",
            "pluCode": "1660",
            "description": "PEACHES CLINGSTONE"
        },
        {
            "macAddress": "AC233FD09B2B",
            "id": "2032",
            "pluCode": "1663",
            "description": "LEMONS"
        },
        {
            "macAddress": "AC233FD0A33B",
            "id": "2032",
            "pluCode": "1663",
            "description": "LEMONS"
        },
        {
            "macAddress": "AC233FD0692E",
            "id": "2032",
            "pluCode": "1663",
            "description": "LEMONS"
        },
        {
            "macAddress": "AC233FD09B32",
            "id": "2026",
            "pluCode": "1657",
            "description": "HONEYDEW MELON"
        },
        {
            "macAddress": "AC233FD0A071",
            "id": "2026",
            "pluCode": "1657",
            "description": "HONEYDEW MELON"
        },
        {
            "macAddress": "AC233FD0A167",
            "id": "2026",
            "pluCode": "1657",
            "description": "HONEYDEW MELON"
        },
        {
            "macAddress": "AC233FD09F49",
            "id": "2028",
            "pluCode": "1659",
            "description": "CRIMSON GRAPES"
        },
        {
            "macAddress": "AC233FD0A22C",
            "id": "2028",
            "pluCode": "1659",
            "description": "CRIMSON GRAPES"
        },
        {
            "macAddress": "AC233FD0A201",
            "id": "2028",
            "pluCode": "1659",
            "description": "CRIMSON GRAPES"
        },
        {
            "macAddress": "AC233FD0A055",
            "id": "2037",
            "pluCode": "1668",
            "description": "LOOSE ORANGES"
        },
        {
            "macAddress": "AC233FD09B38",
            "id": "2036",
            "pluCode": "1667",
            "description": "WHITE NECTARINES"
        },
        {
            "macAddress": "AC233FD0A30E",
            "id": "2036",
            "pluCode": "1667",
            "description": "WHITE NECTARINES"
        },
        {
            "macAddress": "AC233FD0A3F4",
            "id": "2033",
            "pluCode": "1664",
            "description": "LIMES"
        },
        {
            "macAddress": "AC233FD099A5",
            "id": "2033",
            "pluCode": "1664",
            "description": "LIMES"
        },
        {
            "macAddress": "AC233FD0A2EF",
            "id": "2038",
            "pluCode": "1669",
            "description": "ORANGE NETS"
        },
        {
            "macAddress": "AC233FD09FD7",
            "id": "2038",
            "pluCode": "1669",
            "description": "ORANGE NETS"
        },
        {
            "macAddress": "AC233FD09EE6",
            "id": "2038",
            "pluCode": "1669",
            "description": "ORANGE NETS"
        },
        {
            "macAddress": "AC233FD09D44",
            "id": "2038",
            "pluCode": "1669",
            "description": "ORANGE NETS"
        },
        {
            "macAddress": "AC233FD09D4A",
            "id": "2038",
            "pluCode": "1669",
            "description": "ORANGE NETS"
        },
        {
            "macAddress": "AC233FD0A0AC",
            "id": "2039",
            "pluCode": "1684",
            "description": "MANGOES"
        },
        {
            "macAddress": "AC233FD0A31A",
            "id": "2039",
            "pluCode": "1684",
            "description": "MANGOES"
        },
        {
            "macAddress": "AC233FD0A235",
            "id": "2039",
            "pluCode": "1684",
            "description": "MANGOES"
        },
        {
            "macAddress": "AC233FD0A39B",
            "id": "2039",
            "pluCode": "1684",
            "description": "MANGOES"
        },
        {
            "macAddress": "AC233FD0A4A2",
            "id": "2050",
            "pluCode": "1677",
            "description": "MEDJOOL DATES"
        },
        {
            "macAddress": "AC233FD09FD0",
            "id": "2040",
            "pluCode": "7421",
            "description": "DRAGONFRUIT"
        },
        {
            "macAddress": "AC233FD0A133",
            "id": "2048",
            "pluCode": "1675",
            "description": "PACKHAM PEARS"
        },
        {
            "macAddress": "AC233FD0A2AA",
            "id": "2047",
            "pluCode": "1674",
            "description": "BEURRE BOSC PEARS"
        },
        {
            "macAddress": "AC233FD0A2A2",
            "id": "2047",
            "pluCode": "1674",
            "description": "BEURRE BOSC PEARS"
        },
        {
            "macAddress": "AC233FD0A109",
            "id": "2047",
            "pluCode": "1674",
            "description": "BEURRE BOSC PEARS"
        },
        {
            "macAddress": "AC233FD0A457",
            "id": "2049",
            "pluCode": "1676",
            "description": "NASHI PEARS"
        },
        {
            "macAddress": "AC233FD0A465",
            "id": "2049",
            "pluCode": "1676",
            "description": "NASHI PEARS"
        },
        {
            "macAddress": "AC233FD0A011",
            "id": "2049",
            "pluCode": "1676",
            "description": "NASHI PEARS"
        },
        {
            "macAddress": "AC233FD0A12C",
            "id": "2055",
            "pluCode": "1685",
            "description": "STRAWBERRY PUNNETS"
        },
        {
            "macAddress": "AC233FD0A4C4",
            "id": "2051",
            "pluCode": "1678",
            "description": "PINEAPPLE"
        },
        {
            "macAddress": "AC233FD0A2A3",
            "id": "2058",
            "pluCode": "7420",
            "description": "BLOOD PLUMS"
        },
        {
            "macAddress": "AC233FD0A497",
            "id": "2059",
            "pluCode": "8536",
            "description": "WATERMELON"
        },
        {
            "macAddress": "AC233FD0996F",
            "id": "2059",
            "pluCode": "8536",
            "description": "WATERMELON"
        },
        {
            "macAddress": "AC233FD0A397",
            "id": "2059",
            "pluCode": "8536",
            "description": "WATERMELON"
        },
        {
            "macAddress": "AC233FD09FFE",
            "id": "2220",
            "pluCode": "1646",
            "description": "BANANAS"
        },
        {
            "macAddress": "AC233FD09B8E",
            "id": "2220",
            "pluCode": "1646",
            "description": "BANANAS"
        },
        {
            "macAddress": "AC233FD09FFC",
            "id": "2220",
            "pluCode": "1646",
            "description": "BANANAS"
        },
        {
            "macAddress": "AC233FD09B93",
            "id": "2220",
            "pluCode": "1646",
            "description": "BANANAS"
        },
        {
            "macAddress": "AC233FD09FFD",
            "id": "2220",
            "pluCode": "1646",
            "description": "BANANAS"
        },
        {
            "macAddress": "AC233FD09B8C",
            "id": "2220",
            "pluCode": "1646",
            "description": "BANANAS"
        }
    ]

    let tagGroups = [
        // {
        //     name: 'MainFridge',
        //     tags: [
        //         { macAddress: 'MF4FC9X4D1', pluCode: '1001' },
        //         { macAddress: 'MF4FC9X4D2', pluCode: '1002' },
        //         { macAddress: 'MF4FC9X4D3', pluCode: '1003' },
        //         { macAddress: 'MF4FC9X4D4', pluCode: '1004' },
        //         { macAddress: 'MF4FC9X4D5', pluCode: '1005' },
        //         { macAddress: 'MF4FC9X4D6', pluCode: '1006' },
        //         { macAddress: 'MF4FC9X4D7', pluCode: '1007' },
        //         { macAddress: 'MF4FC9X4D8', pluCode: '1008' },
        //         { macAddress: 'MF4FC9X4D9', pluCode: '1009' },
        //         { macAddress: 'MF4FC9X4E0', pluCode: '1010' },
        //         { macAddress: 'MF4FC9X4E1', pluCode: '1011' },
        //         { macAddress: 'MF4FC9X4E2', pluCode: '1012' },
        //         { macAddress: 'MF4FC9X4E3', pluCode: '1013' },
        //         { macAddress: 'MF4FC9X4E4', pluCode: '1014' },
        //         { macAddress: 'MF4FC9X4E5', pluCode: '1015' },
        //         { macAddress: 'MF4FC9X4E6', pluCode: '1016' },
        //         { macAddress: 'MF4FC9X4E7', pluCode: '1017' },
        //         { macAddress: 'MF4FC9X4E8', pluCode: '1018' },
        //         { macAddress: 'MF4FC9X4E9', pluCode: '1019' }
        //     ]
        // },
        {
            name: 'FruitTop',
            tags: [
                { macAddress: 'AC233FD0A0FF', pluCode: '1683' },
                { macAddress: 'AC233FD0A474', pluCode: '1637' },
                { macAddress: 'AC233FD09EFF', pluCode: '1637' },
                { macAddress: 'AC233FD0A2AC', pluCode: '1637' },
                { macAddress: 'AC233FD0A2EF', pluCode: '2008' },
                { macAddress: 'AC233FD09FD7', pluCode: '2009' },
                { macAddress: 'FT4FC9X4E0', pluCode: '2010' }
            ]
        },
        {
            name: 'FruitMiddle',
            tags: [
                { macAddress: 'FM4FC9X4D1', pluCode: '3001' },
                { macAddress: 'FM4FC9X4D2', pluCode: '3002' },
                { macAddress: 'FM4FC9X4D3', pluCode: '3003' },
                { macAddress: 'FM4FC9X4D4', pluCode: '3004' },
                { macAddress: 'FM4FC9X4D5', pluCode: '3005' },
                { macAddress: 'FM4FC9X4D6', pluCode: '3006' },
                { macAddress: 'FM4FC9X4D7', pluCode: '3007' },
                { macAddress: 'FM4FC9X4D8', pluCode: '3008' },
                { macAddress: 'FM4FC9X4D9', pluCode: '3009' },
                { macAddress: 'FM4FC9X4E0', pluCode: '3010' }
            ]
        },
        {
            name: 'FruitBottom',
            tags: [
                {
                    macAddress: 'AC233FD09F3E',
                    id: '2005',
                    pluCode: '9115',
                    description: 'GOLDEN DEL APPLES'
                },
                {
                    macAddress: 'AC233FD0A263',
                    id: '2005',
                    pluCode: '9115',
                    description: 'GOLDEN DEL APPLES'
                },
                {
                    macAddress: 'AC233FD0A45D',
                    id: '2013',
                    pluCode: '1651',
                    description: 'FUJI APPLES'
                },
                {
                    macAddress: 'AC233FD0A345',
                    id: '2013',
                    pluCode: '1651',
                    description: 'FUJI APPLES'
                },
                {
                    macAddress: 'AC233FD0A457',
                    id: '2049',
                    pluCode: '1676',
                    description: 'NASHI PEARS'
                },
                {
                    macAddress: 'AC233FD0A2C4',
                    id: '2006',
                    pluCode: '9116',
                    description: 'RED SENSATION PEARS'
                },
                {
                    macAddress: 'AC233FD0A3F4',
                    id: '2033',
                    pluCode: '1664',
                    description: 'LIMES'
                },
                {
                    macAddress: 'AC233FD09B2B',
                    id: '2032',
                    pluCode: '1663',
                    description: 'LEMONS'
                },
                {
                    macAddress: 'AC233FD0A33B',
                    id: '2032',
                    pluCode: '1663',
                    description: 'LEMONS'
                },
                {
                    "macAddress": "AC233FD0A055",
                    "id": "2037",
                    "pluCode": "1668",
                    "description": "LOOSE ORANGES"
                },
            ]
        }
    ]

    let hoveringOverBasket
    let float, floatRef

    let tags = new Map()

    const { unsubscribe } = tagStore.subscribe(value => {
        tags = new Map(value)
        forceRerender()
    })


    function forceRerender() {
        tagGroups = [...tagGroups]
    }

    function dragStart(e, id) {
        console.log(id)
        e.dataTransfer.setData('text/plain', id)
    }

    async function remove(e) {
        e.preventDefault()
        float = e.dataTransfer.getData('text/plain')
        console.log(floatRef)

        floatRef.style.top = '100px'
        floatRef.style.backgroundColor = '#00f'
        await tick()
        console.log('remove', float, e.target)
        hoveringOverBasket = null

        floatRef.style.left = e.clientX + 'px'
        floatRef.style.top = e.clientY + 'px'
        console.log(top)
    }

    async function bind(macAddress, id) {
        const response = fetch(`./${macAddress}/${id}`)
        console.log('bind', response)
    }

    function drop(e, toTag) {
        console.log(e)
        e.preventDefault()
        e.stopPropagation()
        const id = e.dataTransfer.getData('text/plain')
        console.log('dropped', id, toTag)
        float = toTag.id
        bind(toTag.macAddress, id)
        // TODO: on success only
        const product = products.find(product => product.id == id)
        toTag.id = product.id
        toTag.pluCode = product.pluCode
        toTag.description = product.description
        hoveringOverBasket = null
        forceRerender()
    }
    console.log(tagGroups)

    $: tags && console.log([...tags.values()])
</script>

<style>
    .hovering {
        border-color: orange;
    }
    .item {
        display: inline; /* required for flip to work */
    }
    li {
        background-color: lightgray;
        cursor: pointer;
        display: inline-block;
        margin-right: 10px;
        padding: 10px;
    }
    li:hover {
        background: orange;
        color: white;
    }
    ul {
        border: solid lightgray 1px;
        display: flex; /* required for drag & drop to work when .item display is inline */
        height: 40px; /* needed when empty */
        padding: 10px;
    }
    main {
        background-color: #0f07;
        height: 100vh;
        touch-action: none;
        font-size: 12px;
        text-transform: uppercase;
        color: #000f;
        font-family: arial;
        font-weight: bold;
    }
    float {
        /* display: none; */
        position: absolute;
        top: 0;
        height: 50px;
        width: 50px;
        background-color: #f00;
    }
</style>

<main ondragover="return false" on:drop={remove}>
    {#each tagGroups as group, groupIndex (group.name)}
        <div animate:flip>
            <b>{group.name}</b>
            <ul
                class:hovering={hoveringOverBasket === group.name}
                on:dragenter={() => (hoveringOverBasket = group.name)}
                on:dragleave={() => (hoveringOverBasket = null)}
                ondragover="return false"
            >
                {#each group.tags as tag, tagIndex (tag.macAddress)}
                    <div class="item" animate:flip={{ duration: 300 }}>
                        <li
                            {tag}
                            draggable={true}
                            on:dragstart={e => dragStart(e, tag.id)}
                            on:drop={e => drop(e, tag)}
                        >
                            {tags.get(tag.macAddress)?.description}
                        </li>
                    </div>
                {/each}
            </ul>
        </div>
    {/each}
</main>
<float
    bind:this={floatRef}
    style={float && 'display: block;'}
    {float}
    draggable={true}
    on:dragstart={e => dragStart(e, float)}
>
    {float}
</float>
