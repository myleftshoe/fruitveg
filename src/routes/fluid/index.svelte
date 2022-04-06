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
</script>
<script>
    import { browser } from '$app/env';
    import { tick } from 'svelte'
    import { fade as transition } from 'svelte/transition'
    import Dialog, { Header, Title, Content, Actions } from '@smui/dialog'
    import Button from '@smui/button'
    import IconButton from '@smui/icon-button'
    import clipboard from '../../helpers/clipboard.js'

    import products from '$lib/productStore'

    const refs = {
        qty: null,
        name: null,
        unit: null,
        hidden: null,
    }

    let name = ''

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

    function handleNameKeyPress(e) {
        if (e.key === 'Enter') {
            if (options.length === 1) {
                option.name = options[0].name
            }
            refs.qty.focus()
        }
    }

    function handleKeyPress(e) {
        console.log(e.key, e.code)
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
        added.length = 0
        clear()
        browser && localStorage.removeItem(localStorageId)
    }

    let drawerContent = 'products'
    const setDrawerContent = (name = 'products') => (e) => { drawerContent = name }

    async function handleQtyFocus() {
        drawerContent = 'products'
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

    const doNothing = () => {}

    let ripple = false
    
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
        console.log('a', options.length)
        options = items.length && name && 
        items.filter((product) => product.name.includes(name.toLowerCase())) || 
        items.filter((product) => product.qty !== '')
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
    $: modifiedItems = [...items].filter(withQtys)
    $: console.log('here2', drawerContent, options.length, name)
    $: console.table(modifiedItems) 

</script>

<style>
    pre {
        font-size: 12px;
        text-transform: lowercase;
    }
    topbar {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        display: flex;
        width:100%;
        justify-content: center;
        height: 11vh;
        gap: 10px;
        background-color: #333;
        box-shadow: 0px 4px 8px #000a
    }
    input {
        background: none;
        border: none;
        outline:none;
        font-size: 24px;
        font-family: monospace;
        color: orange;
        /* text-decoration: underline; */
        /* border-bottom: 2px solid orange; */

    }
    input[name="name"] {
        max-width: 16ch;
        text-overflow: clip;
        transition: max-width 0.1s linear;
    }
    input[name="qty"] {
        width: 4ch;
        text-align: right;
    }
    :global(body) {
        margin:0;
        background-color: #fff;
    }
    main {
        position: fixed;
        width: calc(100% - 40px);
        top: 10vh;
        right: 0;
        display:flex;
        height: 90vh;
        flex-direction: column;
        overflow: scroll;
        padding-left: 20px;
        padding-right: 20px;
        background-color: #fff;
        padding-bottom: 20vh;
    }
    units {
        display:flex;
        flex-wrap: wrap;
        justify-content: space-around;
        gap:20px;
    }
    more {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height:100%;
    }
    section {
        display:flex;
        flex-direction: column;
        gap: 20px;
        align-items: center;
    }
    copied {
        position: absolute;
        bottom: 40px;
    }
    start, copyToClipboard {
        display:flex;
        width:100%;
        /* position: absolute; */
        /* bottom: 60px; */
        justify-content: center;
    }
    footer {
        position: fixed;
        bottom:0;
        height: 40px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #7773;
    }
    item {
        display: flex;
        justify-content: space-between;
        transition: background-color .35s ease;
    }

</style>
<Dialog bind:open={warn} on:SMUIDialog:closed={null} slot="over" surface$style="width: 600px; max-width: calc(100vw - 32px); padding: 8px;">
    <!-- <Title>Start new stocktake?</Title> -->
    <Content>
        Clear current stocktake and start a new one?
    </Content>
    <Actions>
        <Button on:click={startNew}>start new</Button>
        <Button defaultAction>cancel</Button>
    </Actions>
</Dialog>
<topbar>
    <input 
        name="name" 
        type="text" 
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
        on:keypress={handleKeyPress}
        on:focus={handleQtyFocus} 
        on:blur={handleQtyBlur} 
    >
</topbar>
<main>
    {#if options.length}
        <!-- <IconButton size="button" class="material-icons" style="align-self: flex-end;" on:click={setDrawerContent("more")}>more_vert</IconButton> -->
        <p></p>
        {#if drawerContent === 'units'}
            <units>
                {#each units as unit}
                    <Button style="font-size:10px;" data-value={unit} on:click={(e) => handleUnitClick(e, unit)}>{unit}</Button>
                {/each}
            </units>
        {:else if drawerContent === 'more'}
            <more>
                <section>
                    <Button class="material-icons" size="button" on:click={doNothing}>outside stock</Button>
                    <Button class="material-icons" size="button" on:click={doNothing}>coolibah</Button>
                    <Button class="material-icons" size="button" on:click={doNothing}>zuccs, cukes, caps</Button>
                </section>
                <section>
                    <Button class="material-icons" size="button" on:click={() => { warn = true }}>start over</Button>
                    <Button class="material-icons" size="button" on:click={copyToClipboard}>copy to clipboard</Button>
                    {#if copied}
                        <copied transition:transition>
                            <Button disabled style="color:darkorange; font-size: .8em">copied!</Button>
                        </copied>
                    {/if}
                </section>
            </more>
        {:else}
            <input name="name" type="text" bind:value={name} style="align-self:center; width: 70%; display: none;"/>
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
        {/if}
        {#if !options.some(({qty}) => qty === '')}
            <copyToClipboard transition:transition>
                <Button variant="raised" class="material-icons" size="button" on:click={copyToClipboard}>copy to clipboard</Button>
            </copyToClipboard>
        {/if}
    {:else if !option.name && !option.qty && !option.unit}
        <start transition:transition>
            <Button class="material-icons" on:click={handleStartClick}>start</Button>
        </start>
    {/if}
</main>
<!-- <footer>
    {added.length}    
</footer> -->
