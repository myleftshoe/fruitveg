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

    async function copyToClipboard() {
        const text = added
            .map(({name, qty, unit}) => `${qty} ${name}${unit && ` [${unit}]`}`)
            .join('\n')
        clipboard.copy(text)
        console.log(text)
        copied = true
        setTimeout(() => copied = false, 1500)
    }

    function handleNameKeyPress(e) {
        if (e.key === 'Enter') {
            add()
        }


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

    const blankOption = {
        name: '',
        qty: '',
        unit: '',
    }

    let option = { ...blankOption }

    let items = browser && JSON.parse(localStorage.getItem(localStorageId)) || []

    let added = []

    function add(e) {
        // if (option.name.length < 3) return
        if (option.qty.trim() === '') {
            refs.qty.select()
            return
        }
        if (option.name.trim() === '') {
            refs.name.select()
            return
        }
        added = [ ...added, { ...option } ]
        option = { ...blankOption }
        refs.qty.focus()
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
        drawerContent = 'products'
        // if (exists) {
        //     option.name = ''
        //     option.unit = ''
        //     option = {...option}
        // }
    }

    function handleUnitClick(e, unit = '') {
        option.unit = unit
    }

    function handleOptionClick(e) {
        option.name = e.currentTarget.value
        refs.name.focus()
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

    let options = []
    $: if (options) {
        if (browser && document.activeElement === refs.name && !options.map(({name}) => name).includes(option.name)) {
            name = option.name
        }
        options = items.length && name && 
        items.filter((product) => product.name.includes(name.toLowerCase())) || 
        items.filter((product) => product.qty !== '')
    
    }

    $: exists = !option.name || !option.qty || added.find(a => a.name === option.name)
</script>

<style>
    stocktake {
        width: 100%;
        outline: none;
        /* align-self: flex-start; */
        /* background-color: yellow; */
    }
    pre {
        font-size: 12px;
    }
    main {
        --margin: 10px;
        margin: var(--margin);
        margin-top: calc( 5 * var(--margin) );
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        /* background-color: red; */
        /* height: calc( 100vh - 6 * var(--margin) ); */
        gap: 2vh;
    }
    form {
        display: flex;
        width:100%;
        border-bottom: 1px solid orange;
        /* padding: 20px; */
    }
    input {
        background: none;
        border: none;
        outline:none;
        font-size: 16px;
        font-family: monospace;
        color: #777;
    }
    input:focus {
    }
    input[name="name"] {
        flex-grow: 1;
    }
    input[name="qty"] {
        width: 3ch;
        text-align: right;
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
    copyToClipboard {
        display:flex;
        width:100%;
        position: absolute;
        bottom: 60px;
        justify-content: center;
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
    <stocktake contenteditable="true" on:click={() => {refs.name.blur()}} on:input={() => console.log('fffff')}>
        {#each added as item}
            <pre>{item.qty} {item.name} {item.unit}</pre>
        {/each}
    </stocktake>
    <form on:submit|preventDefault>
        <input
            name="qty"
            bind:this={refs.qty}
            bind:value={option.qty}
            type="tel"
            step="any"
            on:keypress={handleKeyPress}
        >
        <input 
            name="name" 
            type="text" 
            bind:this={refs.name} 
            bind:value={option.name} 
            on:focus={handleNameFocus} 
            on:keypress={handleNameKeyPress}
            on:click={() => {
                if ((option.qty + option.name).trim() === '')
                    refs.qty.focus()
            }}
        />
    </form>
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
{#if added.length}
    <copyToClipboard transition:transition>
        <Button variant="raised" class="material-icons" size="button" on:click={copyToClipboard}>copy to clipboard</Button>
    </copyToClipboard>
{/if}
