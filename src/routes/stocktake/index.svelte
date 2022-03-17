<script context="module">
    import 'carbon-components-svelte/css/g100.css'
    import Paper from '@smui/paper'
    import List, { Item, Text, PrimaryText, SecondaryText, Meta } from '@smui/list'
    import TopAppBar from '@smui/top-app-bar';
    import { Search } from 'carbon-components-svelte'
    import fuzzy from '../../helpers/fuzzy.js'
    import getheaders from '../../helpers/headers.js'

    const itemStyle = (active) => ({ 
        square: true,
        style: `padding: 0px; border-bottom: 1px solid black; opacity: ${active ? 1 : 0.7}; transition: background-color 0.3s ease; `,
        color: active ? 'primary' : 'secondary',
    })
    const metaStyle = { 
        style: 'text-align: center;',
    }
</script>

<script>
    import EditDialog from './edit.svelte'
    export let products = []
    let selectedRow
    $: value = value?.toUpperCase?.() ?? ''
    $: headers = getheaders(products)
    $: rows = fuzzy(products, value, ['Description', 'id'])
    $: { 
        const ItemCodeHeader = headers.find(({key}) => key === 'ItemCode')
        ItemCodeHeader.empty = true
        ItemCodeHeader.sort = false
    }
    $: console.log(value)
</script>
<TopAppBar>
    <Search bind:value expanded persistent size="xl" light style="font-size: 16px;"/>
</TopAppBar>
<main>
    <List threeLine nonInteractive>
        {#each rows as row}
            <Paper  {...itemStyle(row.qty || row.notes)}>
                <Item on:SMUI:action={() => (selectedRow = row)}>
                    <Text>
                        <PrimaryText>{row.Description}</PrimaryText>
                        <SecondaryText>{row.notes}</SecondaryText>
                    </Text>
                    <Meta {...metaStyle}>
                        <!-- <strong>{row.id}</strong> -->
                        <h4>{row.qty}</h4>
                        {row.unit || 'boxes'}
                    </Meta>
                </Item>
            </Paper>
        {/each}
    </List>
</main>
<EditDialog bind:selectedRow bind:rows/>
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