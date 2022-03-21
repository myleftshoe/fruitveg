<script>
    // Inspired by https://svelte.dev/repl/810b0f1e16ac4bbd8af8ba25d5e0deff?version=3.4.2.
    import { flip } from 'svelte/animate'
    import { tick } from 'svelte'

    let tagGroups = [
        {
            name: 'MainFridge',
            tags: [
                { macAddress: 'MF4FC9X4D1', pluCode: '1001' },
                { macAddress: 'MF4FC9X4D2', pluCode: '1002' },
                { macAddress: 'MF4FC9X4D3', pluCode: '1003' },
                { macAddress: 'MF4FC9X4D4', pluCode: '1004' },
                { macAddress: 'MF4FC9X4D5', pluCode: '1005' },
                { macAddress: 'MF4FC9X4D6', pluCode: '1006' },
                { macAddress: 'MF4FC9X4D7', pluCode: '1007' },
                { macAddress: 'MF4FC9X4D8', pluCode: '1008' },
                { macAddress: 'MF4FC9X4D9', pluCode: '1009' },
                { macAddress: 'MF4FC9X4E0', pluCode: '1010' },
                { macAddress: 'MF4FC9X4E1', pluCode: '1011' },
                { macAddress: 'MF4FC9X4E2', pluCode: '1012' },
                { macAddress: 'MF4FC9X4E3', pluCode: '1013' },
                { macAddress: 'MF4FC9X4E4', pluCode: '1014' },
                { macAddress: 'MF4FC9X4E5', pluCode: '1015' },
                { macAddress: 'MF4FC9X4E6', pluCode: '1016' },
                { macAddress: 'MF4FC9X4E7', pluCode: '1017' },
                { macAddress: 'MF4FC9X4E8', pluCode: '1018' },
                { macAddress: 'MF4FC9X4E9', pluCode: '1019' },
            ]
        },
        {
            name: 'FruitTop', tags: [
                { macAddress: 'FT4FC9X4D1', pluCode: '2001' },
                { macAddress: 'FT4FC9X4D2', pluCode: '2002' },
                { macAddress: 'FT4FC9X4D3', pluCode: '2003' },
                { macAddress: 'FT4FC9X4D4', pluCode: '2004' },
                { macAddress: 'FT4FC9X4D5', pluCode: '2005' },
                { macAddress: 'FT4FC9X4D6', pluCode: '2006' },
                { macAddress: 'FT4FC9X4D7', pluCode: '2007' },
                { macAddress: 'FT4FC9X4D8', pluCode: '2008' },
                { macAddress: 'FT4FC9X4D9', pluCode: '2009' },
                { macAddress: 'FT4FC9X4E0', pluCode: '2010' },
            ]
        },
        {
            name: 'FruitMiddle', tags: [
                { macAddress: 'FM4FC9X4D1', pluCode: '3001' },
                { macAddress: 'FM4FC9X4D2', pluCode: '3002' },
                { macAddress: 'FM4FC9X4D3', pluCode: '3003' },
                { macAddress: 'FM4FC9X4D4', pluCode: '3004' },
                { macAddress: 'FM4FC9X4D5', pluCode: '3005' },
                { macAddress: 'FM4FC9X4D6', pluCode: '3006' },
                { macAddress: 'FM4FC9X4D7', pluCode: '3007' },
                { macAddress: 'FM4FC9X4D8', pluCode: '3008' },
                { macAddress: 'FM4FC9X4D9', pluCode: '3009' },
                { macAddress: 'FM4FC9X4E0', pluCode: '3010' },
            ]
        },
        {
            name: 'FruitBottom', tags: [
                { macAddress: 'FB4FC9X4D1', pluCode: '4001' },
                { macAddress: 'FB4FC9X4D2', pluCode: '4002' },
                { macAddress: 'FB4FC9X4D3', pluCode: '4003' },
                { macAddress: 'FB4FC9X4D4', pluCode: '4004' },
                { macAddress: 'FB4FC9X4D5', pluCode: '4005' },
                { macAddress: 'FB4FC9X4D6', pluCode: '4006' },
                { macAddress: 'FB4FC9X4D7', pluCode: '4007' },
                { macAddress: 'FB4FC9X4D8', pluCode: '4008' },
                { macAddress: 'FB4FC9X4D9', pluCode: '4009' },
                { macAddress: 'FB4FC9X4E0', pluCode: '4010' },
            ]
        },
    ]

    let hoveringOverBasket
    let float, floatRef

    function forceRerender() {
        tagGroups = [...tagGroups]
    }

    function dragStart(e, pluCode) {
        console.log(pluCode)
        e.dataTransfer.setData('text/plain', pluCode)
    }

    async function remove(e) {
        e.preventDefault()
        float = e.dataTransfer.getData('text/plain')
        console.log(floatRef)
        
        floatRef.style.top = "100px"
        floatRef.style.backgroundColor = '#00f';
        await tick()
        console.log('remove', float, e.target)
        hoveringOverBasket = null

        floatRef.style.left = e.clientX + 'px';
        floatRef.style.top = e.clientY + 'px';
    console.log(top)
    }

    function drop(e, toTag) {
        console.log(e)
        e.preventDefault()
        e.stopPropagation()
        const pluCode = e.dataTransfer.getData('text/plain')
        console.log('dropped', pluCode, toTag)
        float = toTag.pluCode
        toTag.pluCode = pluCode
        hoveringOverBasket = null
        forceRerender()
    }
    console.log(tagGroups)

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
        height:100vh;
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
        top:0;
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
                            on:dragstart={e => dragStart(e, tag.pluCode)}
                            on:drop={e => drop(e, tag)}
                        >
                            {tag.pluCode}
                        </li>
                    </div>
                {/each}
            </ul>
        </div>
    {/each}
</main>
    <float bind:this={floatRef} style={float && 'display: block;'} {float}
        draggable={true}
        on:dragstart={e => dragStart(e, float)}
    >
        {float}
    </float>
