<script context="module">
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
    import { tick } from 'svelte'
    import { browser } from '$app/env';

    import { slide as transition } from 'svelte/transition'
    import List, { Item, Text, PrimaryText, SecondaryText, Meta } from '@smui/list'
    import Dialog, { Header, Title, Content, Actions } from '@smui/dialog'
    import Button from '@smui/button'
    import IconButton from '@smui/icon-button'

    import Autocomplete from '@smui-extra/autocomplete'
    import Select, { Option } from '@smui/select'
    import Paper from '@smui/paper'
    import Textfield from '@smui/textfield'
    import Icon from '@smui/textfield/icon'
    import products from '$lib/productStore'
    import clipboard from '../helpers/clipboard.js'


    import Drawer from './drawer.svelte'

    const refs = {
        form: null,
        qty: null,
        name: null,
        unit: null,
        hidden: null,
    }

    let fruits = ['Apple', 'Orange', 'Banana', 'Mango']
    let name = ''
    let unit = ''
    let qty = ''
    let textarea = ''

    let copied = false
    let warn = false

    async function copyToClipboard() {
        const text = items
            .filter((item) => item.qty !== '')
            .map(({name, qty, unit}) => `${qty} ${name}${unit && ` (${unit})`}`)
            .join('\n')
        clipboard.copy(text)
        console.log(text)
        copied = true
        setTimeout(() => copied = false, 1500)
    }


    function handleQtyClick(e) {
        if (e.key === ' ') {
            e.preventDefault()
            refs.name.focus()
        }
    }

    async function handleKeyPress(e, option) {
        console.log(e.key)
        if (e.key === 'Enter') {
            refs.name.focus()
            return
        }
        if (e.key === ' ') {
            e.preventDefault()
            e.target.blur()
            selectedItem = option
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
                focused.qty = frac
                focused.unit = convert[e.key] || focused.unit
                items = [...items]
                e.preventDefault()
                return
            }
            if (e.key === '9') {
                e.preventDefault()
                selectedItem = option
                return
            }
        }
        if (value.length > 1) {
            e.preventDefault()
            return
        }
    }

    function handleSelectChange(e) {
        console.log(e.target.value, name)
    }

    function handleNameFocus(e) {
        showItems = name.length > 0
    }

    let multiple = false

    async function next(e) {
        console.log('next')
        textarea = `${textarea}\n${qty} ${name} ${unit}` 
        refs.form.reset()
        name = "testset"
        unit = 'boxes'
        refs.qty.focus()
        // refs.qty.select()
    }

    function handleSubmit(e) {
        console.log('handle')
        const fields = refs.form.elements
        console.table(fields)
    }

    const blankOption = {
        name: '',
        qty: '',
        unit: '',
    }

    let option = { ...blankOption }
    let typed = ''
    let label = ''
    let showItems = false
    let selectedItem
    let focused
    const localStorageId = 'fruitveg-localStorage'

    let items = browser && JSON.parse(localStorage.getItem(localStorageId)) || []

    let added = []

    function add(e) {
        e.preventDefault()
        added = [  { ...option }, ...added ]
        // option = { ...blankOption }
        // option.name = typed
    }

    function remove(e) {
        e.preventDefault()
        added = added.slice(1)
        // option = { ...blankOption }
        // option.name = typed
    }


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


    $: selectedItem &&  console.log(selectedItem, browser, browser && document.activeElement)

    $: names = items.map(({name}) => name)

    $: if (browser && document.activeElement === refs.name) {
        console.log('fsfdssdfsdfsfsdf')
         name = option.name
    }

</script>

<style>
    main {
        align-self: flex-start;
        margin-left: 16px;
    }
    pre {
        /* flex-grow: 1; */
        font-size: .8em;
    }
    form {
        width: 50vw;
        /* padding: 16px; */
        display: flex;
        flex-direction: column;
        align-items: center;;
        justify-content: flex-start;
        /* background-color: red; */
        height: 100vh;
        gap: 2vh;
    }
    input, select {
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
    float {
        position: fixed;
        bottom: 40px;
        padding: 16px;
        gap: 32px;
        right: 40px;
        background-color: #7773;
        border-radius: 40px;
        display:flex;
        flex-direction: column;
    }
    stickybottom {
        position: fixed;
        top:0;
        background-color: #777d;
        width: 100%;
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content:flex-end;
        height: 17vh;
    }
    buttons {
        width:calc( 100% - 8px );
    }

    select {  
        padding: 16px;
        width: 48vw;
    }
    products {
        position: fixed;
        width: 50%;
        top: 0;
        right: 0;
        height: 100%;  
        display:flex;
        flex-direction: column;
        overflow: scroll;
        overflow-x: hidden;
        background-color: #7773;
        /* padding: 16px; */
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
        /* align-items: space-between; */
    }

</style>
<Dialog bind:open={warn} on:SMUIDialog:closed={null} slot="over" surface$style="width: 600px; max-width: calc(100vw - 32px); padding: 8px;">
    <!-- <Title>Start new stocktake?</Title> -->
    <Content>
        Clear current stocktake and start a new one?
    </Content>
    <Actions>
        <Button on:click={() => {
            items.length = 0
            if (browser) {
                localStorage.removeItem(localStorageId)
                items = []
            }
        }}
        >
            start new
        </Button>
        <Button defaultAction>cancel</Button>
    </Actions>
</Dialog>
<form>
<p></p>
    <qty>
        <input
            name="qty"
            bind:this={refs.qty}
            bind:value={option.qty}
            type="tel"
            step="any"
            on:focus={() => {
                focused = option
            }}
            on:keypress={(e) => handleKeyPress(e, option)}
        >
        <updown>
            <IconButton class="material-icons" on:click={ (e) => { 
                e.preventDefault()
                option.qty++ 
            }}>add</IconButton>
            <IconButton class="material-icons" on:click={ (e) => { 
                e.preventDefault()
                option.qty-- 
            }}>remove</IconButton>
        </updown>
    </qty>

    <input name="name" type="text" bind:this={refs.name} bind:value={option.name} on:keydown={(e) => {
        typed = e.target.value
        if (e.key.match(/[a-z]/i)) {
                typed = typed + e.key
        }
    }}/>
    <select
        name="unit"
        bind:this={refs.unit}
        bind:value={option.unit}
        combobox
        options={units}
        on:focus={() => {
            console.log('fff')
            multiple=true
        }}
                    on:blur={() => {
            console.log('bbb')
            multiple=false
        }}
    >
        {#each units as unit}
            <option>{unit}</option>
        {/each}
    </select>
<addremove>
    <Button class="material-icons" disabled={!added.length} on:click={remove} style="font-weight: bold;">—</Button>
    <Button class="material-icons" disabled={
        !option.name || !option.qty || added.find(a => a.name === option.name)
    } on:click={add}>add</Button>
</addremove>
<main on:click={() => {refs.name.blur()}}>
    {#each added as item}
        <pre>{item.qty} {item.name} {item.unit}</pre>
    {/each}
</main>


<products>
<p></p>
<input name="name" type="text" bind:value={name} style="align-self:center; width: 70%; display: none;"/>
    {#each options as item}
        <Button style="justify-content: flex-end" value={item.name} on:click={(e) => {
            e.preventDefault()
            console.log(e.currentTarget)
            option.name = e.currentTarget.value
        }}><pre>{item.name}</pre></Button>
    {/each}
</products>
</form>
<buttons>
    <!-- <message style="opacity: {copied ? 1 : 0}">copied!</message> -->
    <IconButton class="material-icons" size="button" on:click={() => { 
        warn = true 
        console.log(document.activeElement)

    }} 
        style="position: fixed; bottom: 20px; left: 130px; background-color:#7773; border-radius: 50%;"
    >replay</IconButton>
    <IconButton class="material-icons" size="button" on:click={copyToClipboard} 
        style="position: fixed; bottom: 20px; left: 20px; background-color:#7773; border-radius: 50%;"
    >{copied ? "check": "content_copy" }</IconButton>
</buttons>
