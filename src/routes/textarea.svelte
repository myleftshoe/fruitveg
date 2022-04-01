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
        added = [ ...added, { ...option } ]
        option = { ...blankOption }
        option.name = typed
        refs.qty.focus()
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


    $: console.log(selectedItem)

    $: names = items.map(({name}) => name)

</script>

<style>
    main {
        /* width:100vw; */
        display: flex;
        margin: 16px;
        margin-top: 20vh;
        flex-direction: column;
        align-items: flex-start;
        /* margin-top: 22vh; */
    }
    pre {
        flex-grow: 1;
        font-size: 1.5em;
    }
    form {
        width:100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 2vh;
        /* padding: 16px; */
    }
    input, select {
        border: 2px solid orange;
        border-radius: 8px;
        outline:none;
        background-color: transparent;
    }
    input[name="qty"] {
        font-size: 1.8em;
        font-weight: bold;
        font-family: sans;
        width: 4ch;
        height: 2.6ch;
        text-align: center;
        margin-bottom: -12px;
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
    }

</style>
<main on:click={() => {refs.name.blur()}}>
    {#each added as item}
        <pre>{item.qty} {item.name} {item.unit}</pre>
    {/each}
</main>



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
<float>
    <IconButton class="material-icons" on:click={async () => { 
        refs.name.blur()
        await tick()
        refs.name.focus()
        name = ''
    }}>search</IconButton>
</float>
<stickybottom>
    <form>
        <input
            name="qty"
            bind:this={refs.qty}
            bind:value={option.qty}
            type="tel"
            step="any"
            on:focus={() => focused = option}
            on:keypress={(e) => handleKeyPress(e, option)}
        />
        <Autocomplete  options={names} bind:value={option.name} on:keydown={(e) => {
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
    </form>
    <IconButton class="material-icons" disabled={!option.name || !option.qty} on:click={add}>add</IconButton>
</stickybottom>

<buttons>
    <!-- <message style="opacity: {copied ? 1 : 0}">copied!</message> -->
    <IconButton class="material-icons" size="button" on:click={() => { warn = true }} 
        style="position: fixed; bottom: 20px; right: 130px; background-color:#7773; border-radius: 50%;"
    >replay</IconButton>
    <IconButton class="material-icons" size="button" on:click={copyToClipboard} 
        style="position: fixed; bottom: 130px; right: 20px; background-color:#7773; border-radius: 50%;"
    >{copied ? "check": "content_copy" }</IconButton>
</buttons>
