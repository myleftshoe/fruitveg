<script>
    // Inspired by https://svelte.dev/repl/810b0f1e16ac4bbd8af8ba25d5e0deff?version=3.4.2.
    import { flip } from 'svelte/animate'
    import { slide } from 'svelte/transition'
    import { tick } from 'svelte'
import IconButton, { Icon } from '@smui/icon-button';
    import tags from './tagStore'
    import ProductDrawer from '$lib/productDrawer.svelte'
    
    let tagGroups = [
        {
            name: 'MainFridge',
            tags: [
                { macAddress: 'AC233FD0A38F', id: '2098' }, // lebq
                { macAddress: 'AC233FD0A290', id: '1013' }, // green beans
                { macAddress: 'AC233FD0A3A4', id: '1002' }, // beetroot
                // { macAddress: 'AC233FD0A39C', id: '1003' }, // beetroot
                // { macAddress: 'AC233FD0A39D', id: '1004' }, // cauli
                // { macAddress: 'AC233FD0A489', id: '1005' }, // cauii
                // { macAddress: 'AC233FD09FBE', id: '1006' }, // broc
                // { macAddress: 'AC233FD09FB5', id: '1007' }, // broc
                // { macAddress: 'AC233FD09FBA', id: '1008' }, // carrrots
                // { macAddress: 'AC233FD0A034', id: '1009' }, // carrrots
                // { macAddress: 'AC233FD0A1CF', id: '1010' }, // carrrots
                // { macAddress: 'AC233FD0A142', id: '1011' }, // carrots
                // { macAddress: 'AC233FD09F07', id: '1012' }, // carrots
                // { macAddress: 'AC233FD09F52', id: '1016' }, // crimson grapes
                // { macAddress: 'AC233FD0A22C', id: '1017' }, // greep grapes
                // { macAddress: 'AC233FD0A201', id: '1018' }, // green grapes
                // { macAddress: 'AC233FD0A0AC', id: '1014' }, // mangoes
                // { macAddress: 'AC233FD0A235', id: '1015' }, // mandoes
                // { macAddress: 'AC233FD0A39B', id: '1019' } // mangoes
            ]
        },
        {
            name: 'FruitTop',
            tags: [
                { macAddress: 'AC233FD0A0FF', id: '2019' },
                { macAddress: 'AC233FD0A134', id: '2000' },
                { macAddress: 'AC233FD0A2B6', id: '2000' },
                // { macAddress: 'AC233FD0A2AC', id: '2000' },
                // { macAddress: 'AC233FD09D4A', id: '2038' },
                // { macAddress: 'AC233FD09D44', id: '2038' },
            ]
        },
        {
            name: 'FruitMiddle',
            tags: [
                { macAddress: 'AC233FD0A29F', id: '2004' },
                { macAddress: 'AC233FD0A2EC', id: '3002' },
                { macAddress: 'AC233FD0A2A2', id: '2047' },
                { macAddress: 'AC233FD0A30E', id: '2036' },
                { macAddress: 'AC233FD0A11C', id: '2025' },
            ]
        },
        {
            name: 'FruitBottom',
            tags: [ 
                { macAddress: 'AC233FD0A08F', id: '2002' },
                { macAddress: 'AC233FD0A263', id: '2005' },
                // { macAddress: 'AC233FD0A45D', id: '2013' },
                // { macAddress: 'AC233FD0A345', id: '2013' },
                // { macAddress: 'AC233FD0A465', id: '2049' },
                // { macAddress: 'AC233FD0A2C4', id: '2006' },
                // { macAddress: 'AC233FD099A5', id: '2033' },
                // { macAddress: 'AC233FD0692E', id: '2032' },
                // { macAddress: 'AC233FD0A33B', id: '2032' },
                // { macAddress: 'AC233FD0A055', id: '2037' },
            ]
        }
    ]


    let hoveringOverBasket
    let float = 'id,ADD'
    let floatRef

    function getDescription(mac) {
        const tag = tags && tags.get(mac.toUpperCase()) || {}
        return tag.Description || '???'
    }

    function dragStart(e, info) {
        console.log('llllllll', info)
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

    async function drop(e, tag) {
        console.log(e)
        e.preventDefault()
        e.stopPropagation()
        const [id, Description] = e.dataTransfer.getData('text/plain').split(',')
        console.log('dropped', tag.macAddress, id, Description)
        const _tags = new Map($tags)
        const toTag = _tags.get(tag.macAddress.toUpperCase())
        float = `${toTag.id},${toTag.Description}`
        console.log({float})
        console.log(JSON.parse(JSON.stringify(toTag)))
        await bind(toTag.macAddress, id)
        // TODO: on success only
        _tags.set(tag.macAddress.toUpperCase(), { ...toTag, id, Description })
        tags.update(value => new Map(_tags))
        console.log('dropped', id, toTag)
        hoveringOverBasket = null
        // tags.set(toTag.macAddress, { ...toTag })
        // tags = new Map(tags)
    }
    // console.log(tagGroups)
    // $: otags = Array.from(tags).map(([k, v]) => ({ k, v }))

    let open = false
    let selectedRow = {}

    $: console.log({selectedRow})
    $: if (selectedRow.id) {
        float = selectedRow.id && `${selectedRow.id},${selectedRow.Description}`
        selectedRow = null
    }
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
        top: 50%;
        left:25%;
        height: 50px;
        width: 75px;
        color: #fff;
        background-color: #ff3e00;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-family: 'Roboto Condensed';
        font-weight: 500;
        text-transform: lowercase;
        /* overflow: hidden; */
        box-shadow: 4px 4px 4px #0009;
        border-radius: 7px;
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
                            on:dragstart={e => dragStart(e, `${$tags.get(tag.macAddress)?.id},${$tags.get(tag.macAddress)?.Description}`)}
                            on:drop={e => drop(e, tag)}
                        >
                            {$tags.get(tag.macAddress)?.Description || '-'}
                        </li>
                    </div>
                {/each}
            </ul>
        </div>
    {/each}
    <!-- <button on:click={() => open = !open}>open</button> -->
</main>
<float {float}
    bind:this={floatRef}
    draggable={true}
    on:dragstart={e => dragStart(e, float)}
    on:click={() => open = true}
>
    {float.split(',')[1]}
        <!-- <Icon class="material-icons">add</Icon> -->
</float>
<ProductDrawer bind:open bind:selectedRow/>
