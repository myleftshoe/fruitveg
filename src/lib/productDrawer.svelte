<script>
    import { onMount } from 'svelte'
    import { fade as transition } from 'svelte/transition'
    // import 'carbon-components-svelte/css/g100.css'
    import Paper from '@smui/paper'
    import List, { Item, Text, PrimaryText, SecondaryText, Meta } from '@smui/list'
    import TopAppBar from '@smui/top-app-bar';
    // import { Search } from 'carbon-components-svelte'
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
        style : 'display:flex; flex-direction: column; align-items: flex-end;'
    }

    $: value = value?.toUpperCase?.() ?? '';
    // $: headers = getheaders(products)
    $: rows = $products && fuzzy($products, value, ['label4', 'label5', 'Description', 'id'])
</script>
<container on:click={() => open = false}>
    <TopAppBar>
        <!-- <Search bind:value expanded persistent size="xl" light style="font-size: 16px;"/> -->
    </TopAppBar>
    <p></p>
    <main transition>
        <List twoLine>
            {#each rows as row}
                <Paper  {...itemStyle(true)}>
                    <Item on:SMUI:action={() => {
                        selectedRow = row
                        open = false
                    }}>
                        <Text>
                            <PrimaryText>{row.name}</PrimaryText>
                            <SecondaryText>{row.id}</SecondaryText>
                        </Text>
                        <Meta {...metaStyle}>
                            <strong>{row.plucode}</strong>
                            <h4>$ {row.price}</h4>
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
        background-color: #0007;
        overflow: auto;
    }
</style>