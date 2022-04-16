<script context="module">
    import { browser } from '$app/env';
    import { tick } from 'svelte'
    import { fade } from 'svelte/transition'
    import List, { Item, Meta } from '@smui/list'
    import Menu from '@smui/menu'
    import Dialog, { Header, Title, Content, Actions } from '@smui/dialog'
    import Button from '@smui/button'
    import IconButton from '@smui/icon-button'
    import clipboard from '../../helpers/clipboard.js'

    const localStorageId = 'fruitveg-fluid2'
    const units = [ '[none]', 'bags', 'boxes', 'crates', 'tubs', 'trays', 'bin', 'shelf', 'trolley', 'nets', 'sacks', 'pcs' ]
    const related = new Map([
        ['out', 'potato,tomato,garlic,onion,pumpkin,banana,avo'], 
        ['leafy', 'kale,silver,chard'], 
        ['salad', 'salad,spin,roq,april,ceres,sprout,shoot'],
        ['root', 'ginger,turmeric,dates,beet,daikon,turnip,swede'],
        ['cruc', 'broc,cauli,cabb'],
        ['zucc', 'caps,zuc,cucum,leb'],
        ['citrus', 'orange,lemon,lime']
    ])
    const exclude = new Map()
    exclude.set('onion', 'spring')
</script>

<script>
    import products from '$lib/productStore'

    const refs = { }

    let name = ''
    let complete = false
    let copied = false
    let warn = false

    const withQtys = (item) => item.qty?.toString().trim() || '' !== ''
    const alpha = (prop) => (a, b) => a[prop].localeCompare(b[prop])

    async function copyToClipboard() {
        const text = items.filter(withQtys)
            .map(({name, qty, unit}) => `${qty} ${name}${unit && ` [${unit}]`}`)
            .join('\n')
        clipboard.copy(text)
        console.log(text)
        copied = true
        setTimeout(() => copied = false, 1500)
    }

    function handleFabClick(e) {
        complete = true
    }

    const blankOption = { name: '', qty: '', unit: '', }
    let option = { ...blankOption }

    let items = browser && JSON.parse(localStorage.getItem(localStorageId)) || []

    async function add() {
        console.log(name)

        const index = items.findIndex(item => item.name === name)
        if (index > -1) {
            items[index] = { ...option }
            console.log(items[index])
        }
        else {
            items.push({ name, qty: '', unit: '' }) 
        }

        items = [...items]
        localStorage.setItem(localStorageId, JSON.stringify(items))

        option = { name, qty: '', unit: '' }
        // refs.name.focus()
        await tick() 
        const qtyElement = refs.list.querySelector(`[id="${name}"]`)
        console.log(qtyElement)
        qtyElement.focus()

    }

    function remove() {
    }

    function clear() {
        option = { ...blankOption }
    }

    function startNew() {
        items = []
        clear()
        browser && localStorage.removeItem(localStorageId)
        complete = false
    }

    async function handleSearchKeyPress(e) {
        if (e.key === 'Enter') {
            add()
        }
    }
    
    async function handleSearchFocus() {
        option = { ...blankOption }
        name = ''
    }

    async function handleQtyKeyPress(e, item) {
        console.log('handleQtyKeyPress', e.key, e.code, e.target.value)
        if (['Enter'].includes(e.key)) {
            e.preventDefault()
            refs.name.focus()
            return
        }
        const value = e.target.value
        if (value.length === 2) {
            const convert = {
                '12': '1/2',
                '14': '1/4',
                '24': '1/2',
                '34': '3/4',
                '13': '1/3',
                '23': '2/3',
                '0': 'bin',
                '1': 'shelf',
            }
            const frac = convert[value]
            if (frac && ['0','1'].includes(e.key)) {
                e.preventDefault()
                item.qty = frac
                item.unit = convert[e.key] || item.unit
                items = [ ...items ]
                return
            }
        }
        if (value.length > 2) {
            e.preventDefault()
            return
        }
    }
    
    async function handleItemClick(e, item) {
        console.log('handleItemClick', item)
        if (item === option ) return
        option = item
        const qtyElement = e.target.parentElement.querySelector('[name="qty"]')
        // await tick()
        qtyElement.select()
    }


    $: if (!items.length && $products.length) {   
        items = $products
            .map(({name}) => ({ name: name.toLowerCase(), qty: '', unit: '' }))
            .filter((v1, i, a) => a.findIndex((v2) => v2.name === v1.name) === i) || []
        console.table(items)
    }
    let options = []
    $: if (options) {
        // if (browser && document.activeElement === refs.name 
        //     // && !options.map(({name}) => name).includes(option.name)
        // ) {
        //     console.log('setting name to' , option, name)
        //     name = option.name
        // }
        if (related.has(name)) {
            const relatedItems = related.get(name).split(',')
            options = items.filter(({name}) => relatedItems.find(r => name.includes(r) && !name.includes(exclude.get(r))))
        }
        else {
            options = items.length && name && items.filter((item) => {
                if (name.length === 1 ) return item.name.split(' ').some(word => word.startsWith(name))
                return item.name.includes(name.toLowerCase())
            })
            .sort((a,b) => a.name.search(name) > b.name.search(name) ? 1 : -1) || []
        }
        if (!options.length && !name)
            options = items.filter(withQtys).sort(alpha('name'))
    }
    $: update = items
</script>
<main bind:this={refs.main}>
    <row on:click|stopPropagation bind:this={refs.row}>
        <input 
            name="search" 
            type="text"
            placeholder="type..."
            autocapitalize="none"
            bind:this={refs.name} 
            bind:value={name} 
            on:focus={handleSearchFocus} 
            on:keypress={handleSearchKeyPress}
            on:change={() => console.log('onchange')}
        />
        {#if name.length}
            <IconButton class="material-icons" style="color: white; opacity: {name.length < 3 ? .3 : 1};" disabled={name.length < 3} on:click={add}>add</IconButton>
        {:else}
            <IconButton class="material-icons" style="color: white;" on:click={handleFabClick}>more_vert</IconButton>
        {/if}
    </row>
    <list bind:this={refs.list}>
        <List style="height: calc( 100vh - 90px ); overflow-y: scroll; overflow-x: visible; background: #0f00">
            {#each options as item}
                <item>
                    <Item on:SMUI:action={(e) => handleItemClick(e, item)} activated={option === item}
                        style="display:flex; justify-content: space-between; width: calc( 100% - 33px ); gap:10px;"
                    >
                        <input 
                            disabled={option !== item}
                            name="name" 
                            type="text"
                            autocapitalize="none"
                            bind:value={item.name} 
                            style={`${option.name === item.name && "pointer-events: auto; color: red;"}`}
                        />
                        <itemmeta>
                            {#if option === item || item.unit.length}
                                <select in:fade name="unit" id="unit" bind:value={item.unit}>
                                    <option value="" disabled>[unit]</option>
                                    {#each units as unit}
                                        <option value={unit}>{unit}</option>
                                    {/each}
                                </select>
                            {/if}
                            <input 
                                name="qty"
                                id={item.name}
                                bind:value={item.qty}
                                type="tel"
                                step="1"
                                min="0"
                                max="99"
                                on:keypress={(e) => handleQtyKeyPress(e, item)}
                            >
                        </itemmeta>
                    </Item>
                </item>
            {/each}
            {#if !items.find(withQtys) && !options.length && !name.length}
                <p transition:fade style="height: 65vh; color:black; text-align: center;">
                    <code><u>magic words:</u></code><br><br>
                    {#each [...related.keys()] as key}
                        <code>{key}</code><br>
                    {/each}
                    <br>
                    <code><u>magic numbers:</u></code><br><br>
                    <code>120 = 1/2 bin</code><br>
                    <code>130 = 1/3 bin</code><br>
                    <code>230 = 2/3 bin</code><br>
                    <code>140 = 1/4 bin</code><br>
                    <code>340 = 3/4 bin</code><br>
                </p>
            {/if}
        </List>
    </list>
</main>
<footer>
</footer>
<Dialog bind:open={complete} on:SMUIDialog:closed={null} scrimClickAction={() => complete = false} escapeKeyAction="" >
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
        <Content>
            Clear current stocktake and start a new one?
        </Content>
        <Actions>
            <Button on:click={startNew}>start new</Button>
            <Button defaultAction>cancel</Button>
        </Actions>
    </Dialog>
</Dialog>


<style>
    :global(body) {
        margin:0;
    }
    main {
        position: fixed;
        top: 10px;
        padding: 0px;
        width: calc( 100vw - 0px);
        display:flex;
        flex-direction: column;
        gap: 3vh;
    }
    pre {
        font-size: 12px;
        text-transform: lowercase;
    }
    row {
        display: flex;
        align-items: center;
        justify-content: space-around;
        background: #000c;
        border-radius: 0px;
        position: relative;
        position: sticky;
        position: -webkit-sticky;
        top: 1vh;
        margin:-10px;
        box-shadow: 2px 4px 4px #0007;
        padding: 10px 5px 10px 20px; 
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
    }
    input[name="search"] {
        background: none;
        border: none;
        padding: 8px;
        font-size: 20px;
        font-weight: bold;
        color: orange;
    }
    input[name="name"] {
        text-overflow: clip;
        text-transform: lowercase;
        pointer-events: none;
        width: 67%;
        /* background: #f003; */
    }
    input[name="name"]:disabled {
        color:black;
        opacity:1;
    }
    input[name="name"][disabled] {
        color:black;
        opacity:1;
    }
    input[name="qty"] {
        /* outline: none; */
        color: #777;
        font-weight: bold;
        width: 30%;
        text-align: center;
    }
    itemmeta {
        display:flex;
        justify-content: flex-end;
        align-items: center;
        width:30%;
        /* background: #0f03 */
    }
    select {
        outline: none;
        appearance: none;
        border: none;
        background: none;
        color: gray;
        text-align: center;
        font-weight: 500;
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        opacity: 1;
        transition: flex-basis .3s ease;
        width:60%;
        /* background: transparent url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>') no-repeat;
        background-position: right 0px top 50%; */
    }
    item { 
        overflow:visible;
        display: block;
    }
    item:nth-child(even) { background: #7773 }
    footer {
        position: fixed;
        bottom: 0;
        height: 1px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    menuDialog {
        min-height: 50vh;
        display:flex; 
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2ch;
    }
    buttons {
        display:flex;
        flex-direction: column;
        align-items: center;
        gap: 2ch;
    }
    p {
        color: transparent;
    }
    message { 
        color: red;
        font-family: monospace;
        font-weight: bold;
    }
</style>
