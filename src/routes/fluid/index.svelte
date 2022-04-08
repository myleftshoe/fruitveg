<script context="module">
    const localStorageId = 'fruitveg-fluid'
    const units = [
        '',
        'bags',
        'boxes',
        'crates',
        'tubs',
        'trays',
        'bin',
        'shelf',
        'trolley',
        'nets',
        'sacks',
        'pcs'
    ]
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
    import { browser } from '$app/env';
    import { tick } from 'svelte'
    import { slide, blur as transition} from 'svelte/transition'
	import { quintOut } from 'svelte/easing'
    import { flip } from 'svelte/animate'
    import List, { Item, Text, PrimaryText, SecondaryText, Meta } from '@smui/list'
    import Dialog, { Header, Title, Content, Actions } from '@smui/dialog'
    import Button from '@smui/button'
    import IconButton from '@smui/icon-button'
    import Fab, { Icon } from '@smui/fab'
    import clipboard from '../../helpers/clipboard.js'

    import products from '$lib/productStore'

    const refs = {
        main: null,
        row: null,
        name: null,
        qty: null,
        unit: null,
    }

    let name = ''

    let complete = false
    let copied = false
    let warn = false


    const withQtys = (item) => item.qty?.toString().trim() || '' !== ''

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

    function handleNameKeyPress(e) {
        if (e.key === 'Enter') {
            // if (options.length === 1) {
            //     option.name = options[0].name
            // }
            refs.qty.focus()
        }
    }

    function handleQtyKeyPress(e) {
        console.log('handleQtyKeyPress', e.key, e.code)
        if (['Enter'].includes(e.key)) {
            e.preventDefault()
            add()
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
                option.qty = frac
                option.unit = convert[e.key] || option.unit
                option = { ...option }
                return
            }
        }
        if (value.length > 1 && e.key !== ' ') {
            option.qty = option.qty + e.key
            refs.name.focus()
        }
        if (value.length > 1) {
            return
        }
    }

    function increment() {
        option.qty++
    }

    function decrement() {
        if (option.qty < '1') {
            option.qty = ''
            return
        }
        option.qty--
    }

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    const blankOption = {
        name: '',
        qty: '',
        unit: '',
    }
    let option = { ...blankOption }

    let items = browser && JSON.parse(localStorage.getItem(localStorageId)) || []

    function add() {
        // if (option.name.length < 3) return
        if (option.name.trim() === '') {
            refs.name.select()
            return
        }
        if (option.qty === 0) {
            option.qty = '0'
            return
        }
        if (!option.qty) {
            option.qty = ''
            // refs.qty.select()
            return
        }

        const index = items.findIndex(({name}) => name === option.name)
        if (index > -1) {
            items[index] = { ...option }
            console.log(items[index])
        }
        else {
            items.push({...option}) 
        }

        items = [...items]
        localStorage.setItem(localStorageId, JSON.stringify(items))

        option.name = name
        option.qty = ''
        option.unit = ''

        option = { ...option }
        refs.name.focus()
    }

    function remove() {
    }

    function clear() {
        option = { ...blankOption }
    }

    function startNew() {
        items.length = 0
        clear()
        browser && localStorage.removeItem(localStorageId)
        complete = false
    }

    async function handleQtyFocus() {
        await tick()
        refs.qty.select()
    }

    async function handleQtyBlur(e) {
        console.log(e?.relatedTarget, refs.row)
        if (e.relatedTarget === refs.name) {
            await tick()
            option = { ...blankOption }
            name = ''
            return
        }
        add()
    }

    async function handleNameFocus() {
        // await tick()
        // refs.name.select()
    }
    
    async function handleUnitChange(e) {
        await tick()
        refs.qty.focus()
    }

    async function handleOptionClick(e, item) {
        e.stopPropagation()
        e.preventDefault()
        if (option.name) add()
        option = item
        await tick()
        refs.qty.select()
    }

    function handleStartClick() {
        refs.name.focus()
    }

    const doNothing = () => {}

    let innerHeight

    $: if (!items.length && $products.length) {   
            items = $products
                .map(({name}) => ({
                    name: name.toLowerCase(),
                    qty: '',
                    unit: '',
                })).filter((v1, i, a) => a.findIndex((v2) => v2.name === v1.name) === i) || []
                console.table(items)
    }
    let options = []
    $: if (options) {
        if (browser && document.activeElement === refs.name && !options.map(({name}) => name).includes(option.name)) {
            console.log('setting name to' , option,name)
            name = option.name
        }
        if (related.has(name)) {
            const relatedItems = related.get(name).split(',')
            options = items.filter(({name}) => relatedItems.find(r => name.includes(r) && !name.includes(exclude.get(r))))
        }
        else {
            options = items.length && name && 
            items.filter((item) => item.name.includes(name.toLowerCase()))  || []
        }
        if (!options.length && !name)
            options = items.filter(withQtys)
    }
</script>
<svelte:window bind:innerHeight/>
<main bind:this={refs.main}>
    <row on:click|stopPropagation bind:this={refs.row}>
        <input 
            name="name" 
            type="text"
            placeholder="type..."
            autocapitalize="none"
            bind:this={refs.name} 
            bind:value={option.name} 
            on:focus={handleNameFocus} 
            on:keypress={handleNameKeyPress}
            on:change={() => console.log('onchange')}
        />
        <input
            name="qty"
            bind:this={refs.qty}
            bind:value={option.qty}
            type="number"
            step="1"
            min="0"
            max="99"
            on:keypress={handleQtyKeyPress}
            _on:focus={handleQtyFocus} 
            on:blur={handleQtyBlur} 
        >
        <select name="unit" id="unit" bind:this={refs.unit} bind:value={option.unit}>
            <option value="" disabled>[unit]</option>
            {#each units as unit}
                <option value={unit} on:click={handleUnitChange}>{unit}</option>
            {/each}
        </select>
    </row>
    <!-- <br/> -->
    <!-- <div style="background-color: #f001; border-radius: 8px; box-shadow: inset 0px 0px 1px #0007;"> -->
    <List dense style="height: calc( 100vh - 95px ); overflow-y: scroll; overflow-x: visible;">
        {#each options as item, i (item.name)}
            <item style="outline: {option === item ? '3px solid orange' : ''}">
                <Item on:SMUI:action={(e) => handleOptionClick(e, item)}>
                    <Text>
                        <pre>{item.name}</pre>
                    </Text>
                    <Meta>
                        <pre>{item.qty === 0 && '0' || item.qty && item.qty || ''}{item.unit && ` ${item.unit}`}</pre>
                    </Meta>
                </Item>
            </item>
        {/each}
    </List>
    <p>.</p>
</main>
<footer>
</footer>
<!-- <fab>
    <Fab on:click={handleFabClick}>
        <Icon class="material-icons">menu</Icon>
    </Fab>
</fab> -->
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
        top: 0vh;
        padding: 10px;
        width: calc( 100vw - 20px);
        /* height: 50vh; */
        /* overflow: scroll; */
        /* overflow-x: visible; */
        display:flex;
        flex-direction: column;
        gap: 4vh;
        /* border: 1px solid red; */
        /* background-color: #f00; */
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
        /* bottom: 90vh; */
        margin:-10px;
        box-shadow: 2px 4px 4px #0007;
        padding: 10px 5px 10px 20px; 
        transition: top .3s ease-out;
        z-index: 1;
    }
    input {
        background: none;
        border: none;
        /* outline:none; */
        /* padding: 20px 8px; */
        font-size: 20px;
        font-family: monospace;
        font-weight: bold;
        color: orange;
    }
    input[name="name"] {
        width: 60vw;
        text-overflow: clip;
        text-transform: lowercase;
    }
    input[name="qty"] {
        width: 15vw;
        text-align: right;
        padding-left: 5px;
        padding-right: 5px;
    }
    select {
        border: none;
        /* outline:none; */
        background: none;
        height: 40px;
        text-align: right;
        font-weight: bold;
        font-size: 12px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: #bbb;
    }
    item { 
        overflow:visible;
        margin-left:3px;
        margin-right: 3px;
        display: block;
        outline-color: #777;
        transition: outline-color .25s ease-out ;
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
    fab {
        position: fixed;
        right: 32px;
        bottom: 32px;
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
</style>
