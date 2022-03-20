<script>
    // Inspired by https://svelte.dev/repl/810b0f1e16ac4bbd8af8ba25d5e0deff?version=3.4.2.
    import { flip } from 'svelte/animate'

    const tagGroups = [
        {
            name: 'MainFridge',
            tags: [
                {
                    macAddress: 'AD4FC9X4D1',
                    pluCode: '2000'
                },
                {
                    macAddress: 'AD4FC9X4D2',
                    pluCode: '2001'
                },
                {
                    macAddress: 'AD4FC9X4D3',
                    pluCode: '2002'
                }
            ]
        },
        {
            name: 'FruitTop',
            tags: [
                {
                    macAddress: 'AD4FC9X4E1',
                    pluCode: '3000'
                },
                {
                    macAddress: 'AD4FC9X4E2',
                    pluCode: '3001'
                },
                {
                    macAddress: 'AD4FC9X4E3',
                    pluCode: '3001'
                }
            ]
        }
    ]

    let hoveringOverBasket

    function dragStart(e, tag) {
        console.log(tag)
        const data = { }
        e.dataTransfer.setData('text/plain', tag.pluCode)
    }

    function drop(e, toTag) {
        console.log(e)
        e.preventDefault() 
        const pluCode = e.dataTransfer.getData('text/plain')
        console.log('dropped', pluCode, toTag)
        hoveringOverBasket = null
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
        touch-action: none;
        font-size: 12px;
        text-transform: uppercase;
        color: #000f;
        font-family: arial;
        font-weight: bold;
    }
</style>

<main>
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
                            on:dragstart={e => dragStart(e, tag)}
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
