<script context="module">
    // import 'carbon-components-svelte/css/g100.css'
    import Paper from '@smui/paper'
    import List, { Item, Text, PrimaryText, SecondaryText, Meta } from '@smui/list'
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
<TopAppBar>
    <!-- <Search bind:value expanded persistent size="xl" light style="font-size: 16px;"/> -->
</TopAppBar>
<main>
    <List threeLine nonInteractive>
        {#each rows as row}
            <Paper  {...itemStyle(row.Active)}>
                <Item on:SMUI:action={() => (selectedRow = row)} >
                    <Text>
                        <PrimaryText>{row.Description} {row.status} </PrimaryText>
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
        background-color: black;
        position: absolute;
        top: 40px ;
        width: 100%
    }
    :root {
        --mdc-theme-primary: #ff7e00;
        --mdc-theme-secondary: #676778;
    }
</style>