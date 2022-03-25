<script>
    import { onMount } from 'svelte'
    import Drawer from 'svelte-drawer-component'
    import 'carbon-components-svelte/css/g100.css'
    import Paper from '@smui/paper'
    import List, { Item, Text, PrimaryText, SecondaryText, Meta } from '@smui/list'
    import TopAppBar from '@smui/top-app-bar';
    import { Search } from 'carbon-components-svelte'
    import fuzzy from '../helpers/fuzzy.js'
    import getheaders from '../helpers/headers.js'

    export let open = false
    export let selectedRow = {}
    let value = ''

    let products = []
    onMount(async () => {
        const response = await fetch('/products/__data.json')
        const json = await response.json()
        products = json.products
        console.table(products)
    })

    const itemStyle = (active) => ({ 
        square: true,
        style: `padding: 0px; border-bottom: 1px solid black; opacity: ${active ? 1 : 0.7};`,
        color: active ? 'primary' : 'secondary',
    })
    const metaStyle = { 
        style : 'display:flex; flex-direction: column; align-items: flex-end;'
    }

    $: value = value?.toUpperCase?.() ?? ''
    // $: headers = getheaders(products)
    $: rows = fuzzy(products, value, ['label4', 'label5', 'Description', 'id'])


</script>
<Drawer {open} size='40vw' placement='right' on:clickAway={() => open = false}>
    <TopAppBar>
        <Search bind:value expanded persistent size="xl" light style="font-size: 16px;"/>
    </TopAppBar>
    <List threeLine nonInteractive dense>
        {#each rows as row}
            <Paper  {...itemStyle(row.Active)}>
                <Item on:SMUI:action={() => {
                    selectedRow = row
                    open = false
                }}>
                    <Text>
                        <PrimaryText>{row.Description}</PrimaryText>
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
    <button on:click={() => open = false}>close</button>
</Drawer>
