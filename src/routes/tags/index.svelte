<script>
    // Inspired by https://svelte.dev/repl/810b0f1e16ac4bbd8af8ba25d5e0deff?version=3.4.2.
    import { flip } from 'svelte/animate'
    import { tick } from 'svelte'
    import { tagStore } from '$lib/stores/tagStore'



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
                { macAddress: 'AC233FD0A0FF', id: '2019' },
                { macAddress: 'AC233FD0A134', id: '2000' },
                { macAddress: 'AC233FD0A2B6', id: '2000' },
                { macAddress: 'AC233FD0A2AC', id: '2000' },
                { macAddress: 'AC233FD09D4A', id: '2038' },
                { macAddress: 'AC233FD09D44', id: '2038' },
                { macAddress: 'FT4FC9X4E0', id: '2010' }
            ]
        },
        {
            name: 'FruitMiddle',
            tags: [
                { macAddress: 'AC233FD0A29F', id: '2004' },
                { macAddress: 'AC233FD0A2EC', id: '3002' },
                { macAddress: 'FM4FC9X4D3', id: '3003' },
                { macAddress: 'AC233FD0A2A2', id: '2047' },
                { macAddress: 'FM4FC9X4D5', id: '3005' },
                { macAddress: 'AC233FD0A30E', id: '2036' },
                { macAddress: 'AC233FD0A11C', id: '2025' },
                { macAddress: 'FM4FC9X4D8', id: '3008' },
                { macAddress: 'FM4FC9X4D9', id: '3009' },
                { macAddress: 'FM4FC9X4E0', id: '3010' }
            ]
        },
        {
            name: 'FruitBottom',
            tags: [ 
                { macAddress: 'AC233FD0A08F', id: '2002' },
                { macAddress: 'AC233FD0A263', id: '2005' },
                { macAddress: 'AC233FD0A45D', id: '2013' },
                { macAddress: 'AC233FD0A345', id: '2013' },
                { macAddress: 'AC233FD0A465', id: '2049' },
                { macAddress: 'AC233FD0A2C4', id: '2006' },
                { macAddress: 'AC233FD099A5', id: '2033' },
                { macAddress: 'AC233FD0692E', id: '2032' },
                { macAddress: 'AC233FD0A33B', id: '2032' },
                { macAddress: 'AC233FD0A055', id: '2037' },
            ]
        }
    ]

    export let products = []


    let hoveringOverBasket
    let float, floatRef

    let tags = new Map()

    const { unsubscribe } = tagStore.subscribe(value => { 
        tags = new Map(value)
    })

    function dragStart(e, info) {
        console.log(info)
        e.dataTransfer.setData('text/plain', info)
    }

    async function remove(e) {
        e.preventDefault()
        float = e.dataTransfer.getData('text/plain')
        console.log(float)
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
        const response = await fetch(`tags/${macAddress}/${id}`)
        console.log('bind', response)
    }

    async function drop(e, toTag) {
        console.log(e)
        e.preventDefault()
        e.stopPropagation()
        const [id, descripiton] = e.dataTransfer.getData('text/plain').split(',')
        console.log('dropped', id, toTag)
        float = `${toTag.id},${toTag.descripiton}`
        await bind(toTag.macAddress, id)
        // TODO: on success only
        const product = products.get(toTag.id)
        toTag.id = product.id
        toTag.pluCode = product.pluCode
        toTag.description = product.description
        console.log('dropped', id, toTag)
        hoveringOverBasket = null
        tags.set(toTag.macAddress, { ...toTag })
        tags = new Map(tags)
    }
    // console.log(tagGroups)

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
        display: flex;
        align-items: center;
        /* justify-content: center; */
        margin-right: 10px;
        padding: 5px;
        width: calc( 100vw / 20 );
        height: 80%;
        font-size: 12px;
        font-family: 'Roboto Condensed';
        font-weight: 500;
        text-transform: lowercase;
        justify-self: center;
        overflow: hidden;
    }
    li:hover {
        background: orange;
        color: white;
    }
    ul {
        border: solid lightgray 1px;
        display: flex; /* required for drag & drop to work when .item display is inline */
        /* height: 40px; needed when empty */
        padding: 10px;
    }
    main {
        /* background-color: #0f07; */
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
                            draggable={true}
                            on:dragstart={e => dragStart(e, `${tag.id},${tag.description || 'loading...'}`)}
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
<float {float}
    bind:this={floatRef}
    style={float && 'display: block;'}
    draggable={true}
    on:dragstart={e => dragStart(e, float)}
>
    {float?.split(',')[1]}
</float>
