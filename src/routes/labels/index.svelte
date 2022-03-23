<script context="module">
    import 'carbon-components-svelte/css/g100.css'
    import Paper from '@smui/paper'
    import List, { Item, Text, PrimaryText, SecondaryText, Meta } from '@smui/list'
    import TopAppBar from '@smui/top-app-bar';
    import { Search } from 'carbon-components-svelte'
    import fuzzy from '../../helpers/fuzzy.js'

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
    export let labels = []
    let selectedRow
    $: value = value?.toUpperCase?.() ?? ''
    $: rows = labels
        // $: rows = fuzzy(labels, value, ['label4', 'label5', 'Description', 'id'])
    $: console.log(value, rows.length)
</script>
<TopAppBar>
    <Search bind:value expanded persistent size="xl" light style="font-size: 16px;"/>
</TopAppBar>
<main>
    <List nonInteractive>
        {#each rows as row}
            <Paper>
                <Item on:SMUI:action={() => (selectedRow = row)} >
                    <Text>
                        <PrimaryText>{row.mac} </PrimaryText>
                        <SecondaryText>{row.correspond.gatewayMac || ''}</SecondaryText>
                    </Text>
                    <Meta {...metaStyle}>
                        <strong>{row.battery}%</strong>
                    </Meta>
                </Item>
            </Paper>
        {/each}
    </List>
</main>
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