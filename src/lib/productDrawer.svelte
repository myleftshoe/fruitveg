<script>
    import { onMount } from 'svelte'
    import { blur } from 'svelte/transition'
    import Paper from '@smui/paper'
    import List, { Item, Text, PrimaryText, SecondaryText, Meta } from '@smui/list'
    import IconButton from '@smui/icon-button'
    import fuzzy from '../helpers/fuzzy.js'
    import getheaders from '../helpers/headers.js'
    import products from './productStore'
    
    export let open = false
    export let selectedRow = {}
    let value = ''


    const itemStyle = (active) => ({ 
        square: true,
        style: `background-color: #a53; padding: 0px; border-bottom: 1px solid black; opacity: ${active ? 1 : 0.7};`,
        color: active ? 'primary' : 'secondary',
    })
    const metaStyle = { 
        style : 'display:flex; flex-direction: column; align-items: flex-end; justify-content: center; font-size:16px;',
    }

    $: value = value?.toUpperCase?.() ?? '';
    // $: headers = getheaders(products)
    $: rows = $products && fuzzy($products, value, ['label4', 'label5', 'Description', 'id'])
</script>
<container transition:blur on:click={() => open = false}>
    <row>
        <IconButton class="material-icons" style="color: white;" on:click={() => {}}>search</IconButton>
        <input name="search" bind:value>
    </row>
    <main>
        <List twoLine>
            {#each rows as row}
                <Paper  {...itemStyle(true)}>
                    <Item on:SMUI:action={() => {
                        selectedRow = row
                        open = false
                    }}>
                        <Text>
                            <PrimaryText>{row.name}</PrimaryText>
                            <SecondaryText>id: {row.id}, plucode: {row.plucode}</SecondaryText>
                        </Text>
                        <Meta {...metaStyle}>
                            <strong>${row.price}</strong>
                            {row.label10 || ''}
                        </Meta>
                    </Item>
                </Paper>
            {/each}
        </List>
    </main>
</container>
<style>
    main { 
        width: 100%;
        height: 100%;
    }
    p { 
        height: 40px;
    }
    container { 
        position: fixed;
        top:0px;
        left:0px;
        width: 100vw;
        height: 100vh;
        overflow: auto;
        box-shadow: 16px 16px 16px #000a;
        border-right: 1px solid black;
        z-index:1;
    }
    row {
        display: flex;
        align-items: center;
        justify-content: space-around;
        background: #000c;
        border-radius: 0px;
        border-bottom: 1px solid #000f;
        position: relative;
        position: sticky;
        position: -webkit-sticky;
        top: 0vh;
        /* margin:-10px; */
        box-shadow: 2px 4px 4px #0007;
        padding: 10px 5px 10px 20px; 
        transition: top .3s ease-out;
        z-index: 1;
    }
    input {
        background: none;
        border: none;
        margin: 0px;
        padding:0;
        outline-offset: 3px;
        font-size: 16px;
        font-family: monospace;
        color:white;
    }
    input[name="search"] {
        background: none;
        border: none;
        padding: 8px;
        font-size: 20px;
        font-weight: bold;
        color: orange;
    }
</style>