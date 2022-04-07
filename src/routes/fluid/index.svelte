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
</script>
<script>
    import { browser } from '$app/env';
    import { tick } from 'svelte'
    import { crossfade, slide, blur as transition} from 'svelte/transition'
	import { quintOut } from 'svelte/easing'
    import { flip } from 'svelte/animate'
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
            // if (options.length === 1) {
            //     option.name = options[0].name
            // }
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




    const [send, receive] = crossfade({
        duration: d => Math.sqrt(d * 200),
        fallback(node, params) {
            // const style = getComputedStyle(node);
            // const transform = style.transform === 'none' ? '' : style.transform;
            // return {
            //     duration: 600,
            //     easing: quintOut,
            //     css: t => `
            //         transform: ${transform} scale(${t});
            //         opacity: ${t}
            //     `
            // };
        }
    });


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
        console.log({index})
        items[index] = { ...option }
        console.log(items[index])
        items = [...items]
            
        localStorage.setItem(localStorageId, JSON.stringify(items))

        option.name = name
        option.qty = ''
        option.unit = ''
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
        await tick()
        refs.name.select()
    }
    
    function handleNameBlur() {
        // open = false
    }

    function handleUnitClick(e, unit = '') {
        option.unit = unit
    }

    function handleUnitChange() {
        refs.qty.focus()
    }

    async function handleOptionClick(e, item) {
        option.name = item.name
        refs.qty.focus()
        // await tick()
        // refs.qty.select()
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
                })).filter((v1, i, a) => a.findIndex((v2) => v2.name === v1.name) === i) || []
                console.table(items)
    }
    let options = []
    let added = []
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
            items.filter((product) => product.name.includes(name.toLowerCase()) && product.qty === '') || 
            items.filter((product) => product.qty !== '')
            if (!options.length) 
                options = [...items]
        }
        added = items.filter(({qty}) => qty > 0)
        // resizeNameElement()
    }
    $: modifiedItems = [...items].filter(withQtys)
    $: if (refs.main) {
        refs.main.style.height = innerHeight && innerHeight + 'px' || ''
    }
</script>
<svelte:window bind:innerHeight/>
<main bind:this={refs.main}>
    <div style="background-color: #0f01; border-radius: 8px; box-shadow: inset 0px 0px 1px #0007;">
    {#each added as item, i (item.name)}
        <added in:receive="{{key: item.name}}" out:send="{{key: item.name}}" animate:flip>
            <Button 
                value={item.name} 
                on:click={(e) => handleOptionClick(e, item)} 
                style="color: black;"
            >
                <pre>{item.qty === 0 && '0' || item.qty && item.qty || ''} {item.name}{item.unit && ` [${item.unit}]`}</pre>
            </Button>
        </added>
    {/each}
    </div>
    <row on:click|stopPropagation>
        <input 
            name="name" 
            type="text"
            placeholder="type..."
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
            _on:input={handleQtyInput}
            _on:focus={handleQtyFocus} 
            _on:blur={handleQtyBlur} 
            _on:dblclick={handleQtyDblClick}
        >
        <select name="unit" id="unit" bind:value={option.unit} on:change={handleUnitChange} placeholder="test">
            <option value="" disabled>[unit]</option>
            {#each units as unit}
                <option value={unit}>{unit}</option>
            {/each}
        </select>
    </row>
    <div style="background-color: #f001; border-radius: 8px; box-shadow: inset 0px 0px 1px #0007;">
    {#each options as item, i (item.name)}
        <item in:receive="{{key: item.name}}" out:send="{{key: item.name}}" animate:flip={{duration: 200}}>
            <Button 
                value={item.name} 
                on:click={(e) => handleOptionClick(e, item)} 
                style="color: black;"
            >
                <pre>{item.name}</pre>
            </Button>
        </item>
    {/each}
    </div>
    <p>.</p>
    
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
        /* background-color: #fff; */
        /* overflow: hidden; */
    }
    main {
        position: fixed;
        top: 0vh;
        padding: 10px;
        width: calc( 100vw - 20px);
        /* height: 50vh; */
        overflow: scroll;
        overflow-x: visible;
        display:flex;
        flex-direction: column;
        gap: 4vh;
        /* border: 1px solid red; */
        /* background-color: #f00; */
    }
    topbar {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        display: flex;
        flex-direction: column;
        width:100%;
        justify-content: stretch;
        align-items: center;
        gap: 10px;
        background-color: #333;
        box-shadow: 0px 4px 8px #000a
    }
    pre {
        font-size: 12px;
        text-transform: lowercase;
    }
    row {
        display: flex;
        align-items: center;
        justify-content: space-around;
        background: #fa0;
        border-radius: 0px;
        position: relative;
        position: sticky;
        position: -webkit-sticky;
        top: 3vh;
        bottom: 50vh;
        margin:-10px;
        box-shadow: 4px 4px 4px #0007;
        box-shadow: 2px 4px 4px #0007;
        /* height: 3ch; */
        /* justify-content: stretch; */
        /* min-height: 12vh; */
        /* background-color:#f333 */
    }
    input {
        background: none;
        border: none;
        outline:none;
        padding: 12px 8px;
        font-size: 18px;
        font-family: monospace;
        font-weight: bold;
        /* color: orange; */

    }
    input[name="name"] {
        width: calc( 60vw - 20px);
        text-overflow: clip;
        text-transform: lowercase;
        /* background-color: red; */
        /* padding-right: 5px; */
        /* color:white;
        text-shadow: 2px 2px #000; */
        /* transition: max-width 0.1s linear; */
    }
    input[name="qty"] {
        width: 15vw;
        text-align: right;
        padding-left: 5px;
        padding-right: 0;
        /* background:  green; */
    }
    units {
        display:flex;
        flex-wrap: wrap;
        justify-content: space-around;
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
        /* box-shadow: 0 -20px 40px 50px #fff; */
    }
    added {
        display: flex;
        justify-content: flex-start;
    }
    item {
        display: flex;
        justify-content: flex-start;
        margin-left: 40px;
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
    select {
        border: none;
        outline:none;
        background: none;
        height: 40px;
        text-align: right;
        font-weight: bold;
    }
    p {
        color: transparent;
    }
</style>
