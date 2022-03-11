<script context="module">
    import 'carbon-components-svelte/css/white.css'
    import List, { Item, Text, PrimaryText, SecondaryText, Meta } from '@smui/list'
    import Dialog, { Title, Content, Actions } from '@smui/dialog'
    import Button, { Label } from '@smui/button'
    import Textfield from '@smui/textfield'
    import TopAppBar, { Row, Section } from '@smui/top-app-bar';
    import {
        DataTable,
        Toolbar,
        ToolbarContent,
        ToolbarSearch,
        Link,
    } from 'carbon-components-svelte'
    import fuzzy from '../../helpers/fuzzy.js'
    import getheaders from '../../helpers/headers.js'
</script>

<script>
    import EditDialog from '$lib/edit.svelte'
    export let products = []
    let selectedRow
    $: value = value?.toUpperCase?.() ?? ''
    $: headers = getheaders(products)
    $: rows = fuzzy(products, value)
    $: { 
        const ItemCodeHeader = headers.find(({key}) => key === 'ItemCode')
        ItemCodeHeader.empty = true
        ItemCodeHeader.sort = false
    }
    $: console.log(value)
</script>
<TopAppBar>
    <Toolbar>
        <ToolbarContent>
            <ToolbarSearch bind:value expanded persistent/>
        </ToolbarContent>
    </Toolbar>
</TopAppBar>
<main>
<List threeLine>
    {#each rows as row}
        <Item on:SMUI:action={() => (selectedRow = row)}>
            <Text>
                <PrimaryText>{row.Description}</PrimaryText>
                <SecondaryText>{row.label5 || ''}</SecondaryText>
                <SecondaryText>{row.label4 || ''}</SecondaryText>
            </Text>
            <Meta>
                <div>
                    <h4>{row.UnitPrice}</h4>
                    <pre>{row.unit || ''}</pre>
                </div>
            </Meta>
        </Item>
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
    div {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        align-content: center;
    }
</style>