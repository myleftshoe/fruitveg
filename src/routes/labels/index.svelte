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

    function dragStart(event, groupIndex, tagIndex) {
        console.log(event)

        // The data we want to make available when the element is dropped
        // is the index of the item being dragged and
        // the index of the basket from which it is leaving.
        const data = { groupIndex, tagIndex }
        event.dataTransfer.setData('text/plain', JSON.stringify(data))
    }

    function drop(event, groupIndex) {
        event.preventDefault()
        const json = event.dataTransfer.getData('text/plain')
        const data = JSON.parse(json)

        // Remove the item from one basket.
        // Splice returns an array of the deleted elements, just one in this case.
        const [item] = tagGroups[data.groupIndex].tags.splice(data.tagIndex, 1)

        // Add the item to the drop target basket.
        tagGroups[groupIndex].tags.push(item)
        tagGroups = tagGroups

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
                on:drop={event => drop(event, groupIndex)}
                ondragover="return false"
            >
                {#each group.tags as tag, tagIndex (tag.macAddress)}
                    <div class="item" animate:flip={{ duration: 300 }}>
                        <li
                            {tag}
                            draggable={true}
                            on:dragstart={event => dragStart(event, groupIndex, tagIndex)}
                        >
                            {tag.pluCode}
                        </li>
                    </div>
                {/each}
            </ul>
        </div>
    {/each}
</main>
