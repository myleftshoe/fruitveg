<script context="module">
    // import 'carbon-components-svelte/css/g100.css'
    import Paper from '@smui/paper'
    import List, { Item, Text, PrimaryText, SecondaryText, Meta } from '@smui/list'
    import IconButton, {Icon} from '@smui/icon-button'
    import Textfield from '@smui/textfield'
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
    import AppBar from '$lib/appbar.svelte'
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
<!-- <AppBar>
        <IconButton class="material-icons" style="color: white;" on:click={() => refs.name.focus()}>search</IconButton>
        <input name="search" bind:value bind:this={refs.name}>    
</AppBar> -->
<TopAppBar>
    <Textfield bind:this={refs.name} bind:value variant="filled" square style="border-radius: 0; display:flex; align-items: center;" on:focus={() => showEventGuard = true}>
        <Icon class="material-icons" slot="leadingIcon" style="padding: 16px; color: #777;">search</Icon>
    </Textfield>
    <!-- <Search bind:value expanded persistent size="xl" light style="font-size: 16px;"/> -->
</TopAppBar>
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
        top: 48px ;
        width: 100%
    }
    :root {
        --mdc-theme-primary: #ff7e0090;
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