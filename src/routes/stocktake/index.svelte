<script context="module">
    import { browser } from '$app/env';
    import 'carbon-components-svelte/css/g100.css'
    import Dialog, { Header, Title, Content, Actions } from '@smui/dialog'
    import Paper from '@smui/paper'
    import List, { Item, Text, PrimaryText, SecondaryText, Meta } from '@smui/list'
    import TopAppBar from '@smui/top-app-bar';
    import Fab, { Icon } from '@smui/fab';
    import Button from '@smui/button'
    import { Search } from 'carbon-components-svelte'
    import fuzzy from '../../helpers/fuzzy.js'
    import getheaders from '../../helpers/headers.js'
    import clipboard from '../../helpers/clipboard.js'

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

    const _products = JSON.stringify(products)
    
    products = browser && JSON.parse(localStorage.getItem('fruitveg')) || products
    
    let selectedRow
    let complete = false
    let copied = false
    let warn = false
    let text = ''

    function handleFabClick(e) {
        complete = true
    }

    async function copyToClipboard() {
        text = rows.filter(({qty, notes}) => Boolean(qty || notes)).map(({qty, unit, Description, notes }) => `${`${qty} ${unit}`.trim() || '-'} ${Description}${notes && `\n  (${notes})`}`.trim()).join("\n")
        clipboard.copy(text)
        copied = true
        setTimeout(() => copied = false, 1250)
    }

    function startOver() { 
        console.log('start over')
        products = JSON.parse(_products)
        if (browser) {
            localStorage.removeItem('fruitveg')
            localStorage.setItem('fruitveg', _products)
        }
        complete = false
    }


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
                        {row.unit}
                    </Meta>
                </Item>
            </Paper>
        {/each}
    </List>
</main>
<fab>
    <Fab on:click={handleFabClick}>
        <Icon class="material-icons">check</Icon>
    </Fab>
</fab>
<EditDialog bind:selectedRow bind:rows on:close={() => {
    rows = [...rows]
    browser && localStorage.setItem('fruitveg', JSON.stringify(products))
}}/>
<Dialog bind:open={complete} on:SMUIDialog:closed={null} scrimClickAction="" escapeKeyAction="" >
    <menuDialog>
        <Title>Fruit & Veg Stocktake</Title>
        <buttons>
            <message style="opacity: {copied ? 1 : 0}">copied!</message>
            <Button on on:click={copyToClipboard} >copy to clipboard</Button>
            <Button color="secondary" on:click={() => warn = true}>start new</Button>
            <Button color="secondary" on:click={() => complete = false}>continue editing</Button>
        </buttons>
    </menuDialog>
    <Dialog bind:open={warn} on:SMUIDialog:closed={null} slot="over" surface$style="width: 600px; max-width: calc(100vw - 32px); padding: 8px;">
        <!-- <Title>Start new stocktake?</Title> -->
        <Content>
            Clear current stocktake and start a new one?
        </Content>
        <Actions>
            <Button on:click={startOver}>start new</Button>
            <Button defaultAction>cancel</Button>
        </Actions>
    </Dialog>
</Dialog>
<style>
    message {
        /* text-transform: uppercase; */
        transition: opacity .25s ease-in-out;
        color: var(--mdc-theme-primary);
        font-family: arial;
        /* font-size: small; */
    }
    buttons {
        display:flex;
        flex-direction: column;
        align-items: center;
        gap: 2ch;
    }
    menuDialog {
        min-height: 50vh;
        display:flex; 
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2ch;
    }
    main { 
        background-color: black;
        position: absolute;
        top: 40px ;
        width: 100%
    }
    fab {
        position: fixed;
        right: 32px;
        bottom: 32px;
    }
    :root {
        --mdc-theme-primary: #ff7e00;
        --mdc-theme-secondary: #676778;
    }
</style>