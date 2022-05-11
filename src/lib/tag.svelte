<script>
    import demoData from '$lib/stores/demoData.json'
    import products from '$lib/stores/product.json'
    console.log(JSON.stringify(demoData, null, 2))

    const data = demoData[0]

    const { height, width } = data.size
    const text = Object.entries(data.text)
    const dollar = data.icons?.icon1 

    const product = products[1]
    console.log(text)

    let innerWidth
    $: scale = innerWidth/width
</script>
<svelte:window bind:innerWidth/>
    <tag style="height: {height}px; width: {width}px; transform: scale({scale < 1 ? scale : 1});">
        {#each text as [label, style], i}
            <span style="
                top: {style.y}px; 
                left: {style.x}px; 
                color: {style.color};
                font-size: {style['font-size']}px; 
                font-weight: {style.bold ? 'bold': 'normal'}; 
                font-family: {style["font-family"]};
            ">
                {#if (style['effect'] === 'minitail-up')}
                    {product[label].split('.')[0]}.
                    <sup>{product[label].split('.')[1]}</sup>
                {:else}
                    {product[label] ?? ''}
                {/if}
            </span>
        {/each}
        <span style="
            top: {dollar.y}px; 
            left: {dollar.x}px;
            font-size: {dollar['font-size']}px; 
            color: {dollar.color};
        ">$</span>
    </tag>
<style>
    main {
        display: grid;
        place-content: center;
    }
    tag { 
        display: grid;
        position: relative;
        background-color: white;
        /* border: 2px solid black; */
        box-shadow: 0px 0px 1px 1px black inset;
        transform-origin: center top;
        transition: transform 0.1s ease-out;
    }
    span { 
        position: absolute;
    }
    sup { 
        font-size: .6em;
    }
    :global(body) {
        margin: 0;
        padding: 0;
    }
</style>