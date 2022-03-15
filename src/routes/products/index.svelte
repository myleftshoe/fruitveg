<script context="module">
    import 'carbon-components-svelte/css/g100.css'
    import Paper, { Title, Subtitle, Content } from '@smui/paper'
    import List, { Item, Text, PrimaryText, SecondaryText, Meta } from '@smui/list'
    import TopAppBar from '@smui/top-app-bar';
    import { Search } from 'carbon-components-svelte'
    import { Tag } from "carbon-components-svelte";
    import fuzzy from '../../helpers/fuzzy.js'
    import getheaders from '../../helpers/headers.js'
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
    <Search bind:value expanded persistent size="xl" light/>
</TopAppBar>
<main>
    <List threeLine nonInteractive>
        {#each rows as row}
            <Paper  square  style="padding: 0px; border-bottom: 1px solid black" color={row.Active ? 'primary' : 'secondary'}>
                <Item on:SMUI:action={() => (selectedRow = row)} >
                    <Text>
                        <PrimaryText style="color:{row.Active ? 'var(--mdc-theme-on-primary)' : '#000b;'}">{row.Description}</PrimaryText>
                        <SecondaryText>{row.label5 || ''}</SecondaryText>
                        <SecondaryText>{row.label4 || ''}</SecondaryText>
                    </Text>
                    <Meta style="display:flex; flex-direction: column; align-items: flex-end; ">
                        <strong>{row.id}</strong>
                        <h4>$ {row.UnitPrice}</h4>
                        {row.unit || ''}
                    </Meta>
                </Item>
            </Paper>
        {/each}
    </List>
</main>
<EditDialog item={selectedRow}/>
<style>
    main { 
        position: absolute;
        top: 40px ;
        width: 100%
    }
    :root {
  --mdc-theme-primary: #ff7e00;
  --mdc-theme-secondary: #676778;
    }
</style>