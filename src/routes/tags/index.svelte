<script>
    // Inspired by https://svelte.dev/repl/810b0f1e16ac4bbd8af8ba25d5e0deff?version=3.4.2.
    import { flip } from 'svelte/animate'
    import { slide } from 'svelte/transition'
    import { tick } from 'svelte'
    import IconButton, { Icon } from '@smui/icon-button';
    import tags from './tagStore'
    import Tag from './tag.svelte'

    // import ProductDrawer from '$lib/productDrawer.svelte'
    
    let tagGroups = [
        {
            name: 'Main Fridge', // 19
            tags: [
                { macAddress: 'AC233FD0A38F', id: '1723' }, // lebq
                { macAddress: 'AC233FD0A290', id: '1692' }, // green beans
                { macAddress: 'AC233FD0A100', id: '1695' }, // butter beans
                { macAddress: 'AC233FD0A39C', id: '1697' }, // beet
                { macAddress: 'AC233FD0A3A4', id: '1697' }, // beet
                { macAddress: 'AC233FD0A39D', id: '1772' }, // cauii
                { macAddress: 'AC233FD0A489', id: '1772' }, // cauii
                { macAddress: 'AC233FD09FB5', id: '1688' }, // baby broc
                { macAddress: 'AC233FD09FBE', id: '1698' }, // broc
                { macAddress: 'AC233FD09FBA', id: '1698' }, // broc
                { macAddress: 'AC233FD0A034', id: '1698' }, // broc
                { macAddress: 'AC233FD0A1CF', id: '1711' }, // carrrots
                { macAddress: 'AC233FD0A142', id: '1711' }, // carrrots
                { macAddress: 'AC233FD09F07', id: '1711' }, // carrrots
                { macAddress: 'AC233FD09F52', id: '1658' }, // green grapes
                { macAddress: 'AC233FD0A22C', id: '1659' }, // crimson grapes
                { macAddress: 'AC233FD0A201', id: '1659' }, // crimson grapes
                { macAddress: 'AC233FD0A0AC', id: '1684' }, // mangoes
                { macAddress: 'AC233FD0A235', id: '1684' }, // mangoes
            ]
        },
        {
            name: 'Fruit Top', // 10        

            tags: [
                { macAddress: 'AC233FD0A0FF', id: '1683' }, // Rock
                { macAddress: 'AC233FD0A134', id: '1637' }, // AB
                { macAddress: 'AC233FD0A2B6', id: '1637' }, // AB
                { macAddress: 'AC233FD0A2AC', id: '1637' }, // AB
                { macAddress: 'AC233FD09D4A', id: '1669' }, // ON
                { macAddress: 'AC233FD09D44', id: '1669' }, // ON 
                { macAddress: 'AC233FD09F97', id: '1779' }, // Basil
                { macAddress: 'AC233FD0A202', id: '1779' }, // Basil
                { macAddress: 'AC233FD09D46', id: '1775' }, // Cherry Tom
                { macAddress: 'AC233FD09D4C', id: '1775' }, // Cherry Tom
            ]
        },
        {
            name: 'Fruit Middle', // 10 

            tags: [
                { macAddress: 'AC233FD0A263', id: '9115' }, // Gold Del
                { macAddress: 'AC233FD0A08F', id: '1639' }, // Granny
                { macAddress: 'AC233FD0A133', id: '1675' }, // Packham
                { macAddress: 'AC233FD0A2A2', or: 'AC233FD0A109', id: '1674' }, // Beurre Bosc 
                { macAddress: 'AC233FD0A30E', id: '1667' }, // White Nect
                { macAddress: '????????????', id: '7420' }, // plum TODO
                { macAddress: 'AC233FD0A11C', id: '7420' }, // plum
                { macAddress: 'AC233FD0A132', id: '????' }, // Ruby Grapefruit
                { macAddress: 'AC233FD0A2B1', id: '1773' }, // round
                { macAddress: 'AC233FD09A82', id: '1773' }, // round
            ]
        },
        {
            name: 'Fruit Bottom', // 13  
            tags: [ 
                { macAddress: 'AC233FD0A2EC', id: '9114' }, // Gala
                { macAddress: 'AC233FD0A29F', id: '9114' }, // Gala
                { macAddress: 'AC233FD0A345', id: '1651' }, // Fuji
                { macAddress: 'AC233FD0A45D', id: '7824' }, // Cox Pippin
                { macAddress: 'AC233FD0A011', id: '1676' }, // Nashi
                { macAddress: 'AC233FD0A2C4', id: '9116' }, // Red Sensation 
                { macAddress: 'AC233FD099A5', id: '1664' }, // Lime
                { macAddress: 'AC233FD0692E', id: '1663' }, // Lemon
                { macAddress: 'AC233FD0A33B', id: '1663' }, // Lemon
                { macAddress: 'AC233FD0A055', id: '1668' }, // Oranges
                { macAddress: 'AC233FD09B29', id: '1749' }, // red
                { macAddress: 'AC233FD09B2C', id: '2132' }, // brown
                { macAddress: 'AC233FD09B27', id: '2132' }, // brown
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
        const json = e.dataTransfer.getData('text/plain')
        float = JSON.parse(json)
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

        const data = e.dataTransfer.getData('text/plain')
        const product = JSON.parse(data) 

        console.log('dropped', tag.macAddress, product)
        const _tags = new Map($tags)
        const toTag = _tags.get(tag.macAddress.toUpperCase())
        float = {...toTag}
        console.log({float})
        console.log(JSON.parse(JSON.stringify(toTag)))
        await bind(toTag.macAddress, product.id)
        // TODO: on success only
        _tags.set(tag.macAddress.toUpperCase(), { ...toTag, ...product })
        tags.update(value => new Map(_tags))
        console.log('dropped', product.id, toTag)
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
        // float = selectedRow.id && `${selectedRow.id},${selectedRow.Description}`
        selectedRow = null
    }
</script>

<style lang="scss">
    .hovering {
        border-color: orange;
    }
    .item {
        display: inline; /* required for flip to work */
    }
    li {
        display: inline-flex;
    }
    ul {
        /* display: flex; /* required for drag & drop to work when .item display is inline */
        display: flex;
        /* height: 40px; needed when empty */
        padding: 0;
        gap: 20px;
    }
    main {
        touch-action: none;
        font-size: 16px;
        color: #000f;
        font-family: arial;
        font-weight: bold;
    }
    float {
        /* display: none; */
        position: absolute;
        top: 50%;
        left:25%;
        box-shadow: 8px 8px 16px #000d;
        border-radius: 7px;
    }
    :global(html) { 
        background-color: #333; 
    }
    :global(body) { 
        background-color: transparent; 
    }
</style>
<main ondragover="return false" on:drop={remove}>
    {#each tagGroups as group, groupIndex (group.name)}
        <div animate:flip>
            <p style="color: #fff; margin-top: 10vh;">{group.name}</p>
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
                            on:dragstart={e => dragStart(e, JSON.stringify($tags.get(tag.macAddress)))}
                            on:drop={e => drop(e, tag)}
                        >
                            <Tag product={$tags.get(tag.macAddress)}/>
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
    on:dragstart={e => dragStart(e, JSON.stringify(float))}
    on:click={() => open = true}
>
    <Tag product={float} 
        style="border: 10px solid red; background-color: orange;"
    />
        <!-- <Icon class="material-icons">add</Icon> -->
</float>
<!-- <ProductDrawer bind:open bind:selectedRow/> -->
