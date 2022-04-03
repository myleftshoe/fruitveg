<script context="module">
    const localStorageId = 'fruitveg-localStorage'
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
    import { slide as transition } from 'svelte/transition'
    import Dialog, { Header, Title, Content, Actions } from '@smui/dialog'
    import Button from '@smui/button'
    import IconButton from '@smui/icon-button'
    import clipboard from '../helpers/clipboard.js'

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

    async function copyToClipboard() {
        const text = added
            .map(({name, qty, unit}) => `${qty} ${name}${unit && ` [${unit}]`}`)
            .join('\n')
        clipboard.copy(text)
        console.log(text)
        copied = true
        setTimeout(() => copied = false, 1500)
    }

    function handleKeyPress(e) {
        if ([' ', 'Enter'].includes(e.key)) {
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
                option.qty = frac
                option.unit = convert[e.key] || option.unit
                option = { ...option }
                return
            }
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

    const blankOption = {
        name: '',
        qty: '',
        unit: '',
    }

    let option = { ...blankOption }

    let items = browser && JSON.parse(localStorage.getItem(localStorageId)) || []

    let added = []

    function add(e) {
        added = [ { ...option }, ...added ]
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

    function handleNameFocus() {
        if (exists) {
            option.name = ''
            option.unit = ''
            option = {...option}
        }
        setDrawerContent('products')
    }

    function handleUnitClick(e, unit = '') {
        option.unit = unit
    }

    function handleOptionClick(e) {
        option.name = e.currentTarget.value
    }

    const doNothing = () => {}

    
    $: if (!items.length && $products.length) {   
            items = $products
                .map(({name}) => ({
                    name: name.toLowerCase(),
                    qty: '',
                    unit: '',
                })) || []
                console.table(items)
    }

    $: options = items.length && name && 
        items.filter((product) => product.name.includes(name.toLowerCase())) || 
        items.filter((product) => product.qty !== '')
    
    $: if (browser && document.activeElement === refs.name) {
        name = option.name
    }

    $: exists = !option.name || !option.qty || added.find(a => a.name === option.name)
</script>

<style>
    stocktake {
        align-self: flex-start;
        margin-left: 16px;
    }
    pre {
        font-size: .8em;
    }
    main {
        width: 50vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        /* background-color: red; */
        height: 100vh;
        gap: 2vh;
    }
    input {
        color: #777;
        font-size: 16px;
        border:none;
        border: 2px solid orange;
        border-radius: 8px;
        outline:none;
        background-color: transparent;
        padding: 16px;
    }
    input[name="name"] {
        width: 38vw;
    }
    input[name="qty"] {
        font-size: 2.8em;
        font-weight: bold;
        font-family: sans;
        width: 40%;
        height: 2.6ch;
        text-align: center;
        color:orange;
    }
    :global(body) {
        margin: 0;
    }
    drawer {
        position: fixed;
        width: 50%;
        top: 0;
        right: 0;
        height: 100%;  
        display:flex;
        flex-direction: column;
        gap: 20px;
        overflow: scroll;
        overflow-x: hidden;
        background-color: #7773;
    }
    qty {
        /* background: #7774; */
        display: flex;
        width:50vw;
        justify-content: space-around;
    }
    updown {
        display:flex;
        flex-direction: column;
        justify-content: space-between;
    }
    addremove {
        display: flex;
        flex-direction:row;
        width: 100%;
        justify-content: space-around;
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
<main>
    <IconButton size="button" class="material-icons" style="align-self: flex-start;" on:click={clear}>clear</IconButton>
    <qty>
        <input
            name="qty"
            bind:this={refs.qty}
            bind:value={option.qty}
            type="tel"
            step="any"
            on:keypress={handleKeyPress}
        >
        <updown>
            <IconButton class="material-icons" on:click={increment}>add</IconButton>
            <IconButton class="material-icons" on:click={decrement}>remove</IconButton>
        </updown>
    </qty>
    <input name="name" type="text" bind:this={refs.name} bind:value={option.name} on:focus={handleNameFocus} />
    <Button on:click={setDrawerContent('units')}>{option.unit === '[none]' ? '[unit]' : option.unit || '[unit]'}</Button>
    <addremove>
        <Button class="material-icons" disabled={!added.length} on:click={remove} style="font-weight: bold;">—</Button>
        <Button class="material-icons" disabled={exists} on:click={add}>add</Button>
    </addremove>
    <stocktake on:click={() => {refs.name.blur()}}>
        {#each added as item}
            <pre>{item.qty} {item.name} {item.unit}</pre>
        {/each}
    </stocktake>
    <drawer>
        <IconButton size="button" class="material-icons" style="align-self: flex-end;" on:click={setDrawerContent("more")}>more_vert</IconButton>
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
                <Button style="justify-content: flex-end;" value={item.name} on:click={handleOptionClick}><pre>{item.name}</pre></Button>
            {/each}
        {/if}
    </drawer>
</main>

