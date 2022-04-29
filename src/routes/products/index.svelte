<script context="module">
    // import 'carbon-components-svelte/css/g100.css'
    import Paper from '@smui/paper'
    import List, { Item, Text, PrimaryText, SecondaryText, Meta } from '@smui/list'
    import IconButton from '@smui/icon-button'
    import TopAppBar from '@smui/top-app-bar';
    // import { Search } from 'carbon-components-svelte'
    import fuzzy from '../../helpers/fuzzy.js'
    import getheaders from '../../helpers/headers.js'

    const itemStyle = (active) => ({ 
        square: true,
        style: `padding: 0px; border-bottom: 1px solid black; opacity: ${active ? 1 : 0.7};`,
        color: active ? 'primary' : 'secondary',
    })
    const metaStyle = { 
        style : 'display:flex; flex-direction: column; align-items: flex-end;'
    }
</script>

<script>
    import EditDialog from '$lib/edit.svelte'
    export let products = []
    let selectedRow
    let refs = {}
    $: value = value?.toUpperCase?.() ?? ''
    $: headers = getheaders(products)
    $: rows = fuzzy(products, value, ['label4', 'label5', 'Description', 'id'])
    $: { 
        const ItemCodeHeader = headers.find(({key}) => key === 'ItemCode')
        ItemCodeHeader.empty = true
        ItemCodeHeader.sort = false
    }
    $: console.log(value)
</script>
<searchbar>
    <!-- <Search bind:value expanded persistent size="xl" light style="font-size: 16px;"/> -->
        <IconButton class="material-icons" style="color: white;" on:click={() => refs.name.focus()}>search</IconButton>
        <input name="search" bind:value bind:this={refs.name}>    
</searchbar>
<main>
    <List threeLine nonInteractive>
        {#each rows as row}
            <Paper  {...itemStyle(row.Active)}>
                <Item on:SMUI:action={() => (selectedRow = row)} >
                    <Text>
                        <PrimaryText>{row.Description} {row.status} {row.Active}</PrimaryText>
                        <SecondaryText>{row.label5 || ''}</SecondaryText>
                        <SecondaryText>{row.label4 || ''}</SecondaryText>
                    </Text>
                    <Meta {...metaStyle}>
                        <strong>{row.id}</strong>
                        <h4>$ {row.UnitPrice}</h4>
                        {row.label10 || ''}
                    </Meta>
                </Item>
            </Paper>
        {/each}
    </List>
</main>
<EditDialog bind:item={selectedRow} on:close={(e) => { 
    const item = e.detail
    const r = rows.findIndex((row) => row.id === item.id)
    rows[r] = item
}}/>
<style>
    main { 
        /* background-color: black; */
        position: absolute;
        top: 70px ;
        width: 100%
    }
    searchbar {
        /* width:100%; */
        display: flex;
        align-items: center;
        justify-content: center;
        background: #000f;
        border-radius: 0px;
        border-bottom: 1px solid #000f;
        position: sticky;
        position: -webkit-sticky;
        top: 0vh;
        /* margin:-10px; */
        box-shadow: 2px 4px 4px #0007;
        padding: 10px 5px 10px 0px; 
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
    :root {
        --mdc-theme-primary: #ff7e00;
        --mdc-theme-secondary: #676778;
    }
        :global(html) { 
        background-color: #444; 
    }
    :global(body) { 
        background-color: transparent; 
        margin:0;
        scroll-snap-type: y mandatory;
    }
</style>