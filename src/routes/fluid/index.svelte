<script context="module">
    const localStorageId = 'fruitveg-fluid'
    const units = [
        '[none]',
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
</script>
<script>
    import { browser } from '$app/env';
    import { tick } from 'svelte'
    import { slide, blur as transition} from 'svelte/transition'
    import Dialog, { Header, Title, Content, Actions } from '@smui/dialog'
    import Button from '@smui/button'
    import IconButton from '@smui/icon-button'
    import Fab, { Icon } from '@smui/fab'
    import clipboard from '../../helpers/clipboard.js'

    import products from '$lib/productStore'

    const refs = {
        main: null,
        qty: null,
        name: null,
        unit: null,
        hidden: null,
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

    function handleQtyDblClick() {
        if (!option.name) return
        drawerContent = 'units'
        setTimeout(() => drawerContent = '', 3000)
    }

    function handleNameKeyPress(e) {
        if (e.key === 'Enter') {
            if (options.length === 1) {
                option.name = options[0].name
            }
            refs.qty.focus()
        }
    }

    async function handleQtyInput(e) {
        console.log('handleQtyInput')
        // if (option.qty) {
        //     drawerContent = 'units'
        // }
    }


    function handleQtyKeyPress(e) {
        console.log('handleQtyKeyPress', e.key, e.code)
        if ([' ', 'Enter'].includes(e.key)) {
            e.preventDefault()
            add()
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
        refs.name.placeholder = !option.name && 'type...' || ''
        console.log('here', drawerContent, options.length)
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

    const blankOption = {
        name: '',
        qty: '',
        unit: '',
    }

    let option = { ...blankOption }

    let items = browser && JSON.parse(localStorage.getItem(localStorageId)) || []

    let added = []

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
        if (index > -1)
            items[index] = { ...option }
        else
            items = [ ...items, { ...option }]
            
        localStorage.setItem(localStorageId, JSON.stringify(items))

        option.name = name
        option.qty = ''
        option.unit = ''
        refs.name.select()
    }

    function remove() {
        added = added.slice(1)
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

    let drawerContent = 'products'
    const setDrawerContent = (name = 'products') => (e) => { drawerContent = name }

    async function handleQtyFocus() {
        // drawerContent = 'units'
        await tick()
        refs.qty.select()
    }

    function handleQtyBlur() {
        add()
    }

    async function handleNameFocus() {
        drawerContent = 'products'
        refs.name.placeholder = !option.name && 'type...' || ''
        await tick()
        refs.name.select()
    }
    
    function handleNameBlur() {
        refs.name.placeholder = ''
    }

    function handleUnitClick(e, unit = '') {
        option.unit = unit
    }

    async function handleOptionClick(e, item) {
        option = item
        await tick()
        refs.qty.select()
    }

    function handleStartClick() {
        refs.name.focus()
    }

    function resizeNameElement() {
        const length = option.name.length 
        if (refs.name) {
            if (length > 20)
                refs.name.style.maxWidth = '20ch'
            else if (length > 16)
                refs.name.style.maxWidth = `${length}ch`
            else
                refs.name.style.maxWidth = '16ch'
        }
    }        

    const doNothing = () => {}

    let innerHeight
    
    $: if (!items.length && $products.length) {   
            items = $products
                .map(({name}) => ({
                    name: name.toLowerCase(),
                    qty: '',
                    unit: '',
                })) || []
                console.table(items)
    }
    let options = []
    let modifiedItems = []
    $: if (options) {
        if (browser && document.activeElement === refs.name && !options.map(({name}) => name).includes(option.name)) {
            console.log('setting name to' , option,name)
            name = option.name
        }
        if (related.has(option.name)) {
            const relatedItems = related.get(option.name).split(',')
            options = items.filter(({name}) => relatedItems.find(r => name.includes(r)))
        }
        else {
            options = items.length && name && 
            items.filter((product) => product.name.includes(name.toLowerCase())) || 
            items.filter((product) => product.qty !== '')
        }
        resizeNameElement()
    }
    $: modifiedItems = [...items].filter(withQtys)
    $: console.table(modifiedItems) 
    $: if (refs.main) {
        refs.main.style.height = innerHeight && innerHeight + 'px' || ''
    }
</script>
<svelte:window bind:innerHeight/>
<topbar>
    <row>
        <input 
            name="name" 
            type="text" 
            autocapitalize="none"
            bind:this={refs.name} 
            bind:value={option.name} 
            on:focus={handleNameFocus} 
            on:blur={handleNameBlur} 
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
            on:input={handleQtyInput}
            on:focus={handleQtyFocus} 
            on:blur={handleQtyBlur} 
            on:dblclick={handleQtyDblClick}
        >
    </row>
    {#if drawerContent === 'units'}
        <expanded transition:slide>
            <units>
                {#each units as unit}
                    <Button style="font-size:10px;" data-value={unit} on:click={(e) => handleUnitClick(e, unit)}>{unit}</Button>
                {/each}
            </units>
        </expanded>
    {/if}
</topbar>
<main bind:this={refs.main}>
    {#if options.length}
        <div in:transition>
            {#each options as item}
                <item style={`background-color: ${item.name === option.name && '#ffa50055' || 'transparent'}`}>
                    <Button 
                        value={item.name} 
                        on:click={(e) => handleOptionClick(e, item)} 
                        style="width: 100%; display: flex; justify-content: space-between; color: black;"
                    >
                        <pre>{item.name}</pre>
                        <pre>{item.qty === 0 && '0' || item.qty && item.qty || ''} {item.unit}</pre>
                    </Button>
                </item>
            {/each}
        </div>
    {:else if !option.name && !option.qty && !option.unit && browser && document.activeElement !== refs.name}
        <start transition:transition>
            <Button class="material-icons" on:click={handleStartClick}>start</Button>
        </start>
    {/if}
</main>
<footer>
</footer>
<fab>
    <Fab on:click={handleFabClick}>
        <Icon class="material-icons">menu</Icon>
    </Fab>
</fab>
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
        /* padding: 10px; */
        background-color: #fff;
    }
    main {
        position: fixed;
        top: 12vh;
        margin: 10px;
        width: calc( 100vw - 20px);
        height: calc( 100vh - 20px - 17.5vh - 2.5vh);
        overflow: scroll;

    }
    topbar {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        display: flex;
        flex-direction: column;
        width:100%;
        justify-content: center;
        align-items: center;
        gap: 10px;
        background-color: #333;
        box-shadow: 0px 4px 8px #000a
    }
    row {
        display: flex;
        min-height: 12vh;
        background-color:#333
    }
    pre {
        font-size: 12px;
        text-transform: lowercase;
    }
    input {
        background: none;
        border: none;
        outline:none;
        font-size: 24px;
        font-family: monospace;
        color: orange;

    }
    input[name="name"] {
        max-width: 16ch;
        text-overflow: clip;
        text-transform: lowercase;
        transition: max-width 0.1s linear;
    }
    input[name="qty"] {
        width: 4ch;
        text-align: right;
    }
    units {
        display:flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    start {
        display:flex;
        width:100%;
        justify-content: center;
    }
    start {
        position: fixed;
        width: 100vw;
        height:100vh;
        top:0;
        left:0;
        display:flex;
        align-items: center;
        justify-content: center;
        background: none;
    }
    footer {
        position: fixed;
        bottom: 0;
        height: 1px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        /* background-color: red; */
        box-shadow: 0 -20px 40px 50px #fff;
    }
    item {
        display: flex;
        justify-content: space-between;
        transition: background-color .35s ease;
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
</style>
