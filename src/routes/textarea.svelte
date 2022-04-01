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
        setTimeout(() => copied = false, 1250)
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


    let label = ''
    let showItems = false
    let selectedItem
    let focused
    const localStorageId = 'fruitveg-localStorage'

    let items = browser && JSON.parse(localStorage.getItem(localStorageId)) || []


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

</script>

<style>
    main {
        /* width:100vw; */
        display: flex;
        flex-direction: column;
        align-items: center;
        /* margin-top: 22vh; */
    }
    pre {
        flex-grow: 1;
        font-size: 1.5em;
    }
    form {
        width:100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 2vh;
        /* padding: 16px; */
    }
    input {
        border: none;
        outline:none;
        background: none;
    }
    input[name="name"] {
        /* width:100%;  */
        /* padding:16px; */
        color:#7777;
        flex-grow: 1;
        font-size: 2.8em;
        font-weight: bold;
        font-family: courier;
        /* color: white; */
        text-align: center;
        text-transform: lowercase;
        text-decoration: underline;
        text-decoration-color: orange;       
        /* background-color: #7777 */
        /* text-shadow: 3px 3px 8px #000f; */
        text-decoration-thickness: 5px;
        text-underline-offset: 0.2em;
    }
    input[name="name"]::placeholder {
        text-decoration: underline;
        text-decoration-color: orange;
    }
    input[name="qty"] {
        /* background-color: #7773; */
        font-size: 1.8em;
        font-weight: bold;
        font-family: sans;
        width: 4ch;
        height: 2.6ch;
        text-align: center;
        /* border-radius: 8px; */
        margin-bottom: -12px;
        color:darkorange;
    }
    :global(body) {
        margin: 0;
    }
    search {
        display: flex;
        height: 18vh;
        width:100%;
        /* align-items: stretch; */
        justify-content: flex-end;
    }
    nothingtosee {
        /* background-color: #fa07;
        border-radius: 8px; */
        padding: 32px;
    }
    qtyunit {
        display: flex;
        height: 3.8em;
        flex-direction: column;
        align-items: center;
        background-color: #7773;
        border-radius: 8px;
    }
    sup {
        font-family: monospace;
        font-weight: bold;
    }
    footer {
        margin-top: 10vh;
        margin-bottom: 10vh;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10vh;
    }
    message {
        /* text-transform: uppercase; */
        transition: opacity .25s ease-in-out;
        color: orangered;
        font-family: arial;
        /* font-size: small; */
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
        bottom:0;
        background-color: #7773;
        width: 100%;
    }

</style>
{#if selectedItem}
    <Drawer bind:item={selectedItem} on:change={() => {
        console.log('change')
        const convert = { 
            '12': '1/2',
            '14': '1/4',
            '24': '2/4',
            '13': '1/3',
            '23': '2/3',
        }
        if (['bin', 'shelf', 'trolley'].includes(selectedItem.unit)) {
            selectedItem.qty = convert[selectedItem.qty]
        }
        if (selectedItem.unit === '[none]')
            selectedItem.unit = ''
        items=[...items]
        selectedItem = null
    }}/>
{/if}
<main on:click={() => {refs.name.blur()}}>
    <form id="mainform">
        {#each options as option}
            <Item nonInteractive style="display:flex; gap: 20px; overflow: hidden; height: 100%;">
                <qtyunit>
                    <input
                        form="mainform" 
                        name="qty"
                        bind:value={option.qty}
                        type="tel"
                        step="any"
                        on:focus={() => focused = option}
                        on:keypress={(e) => handleKeyPress(e, option)}
                    />
                    <sup>{option.unit}</sup>
                </qtyunit>
                <pre value={option.name} on:click|stopPropagation={(e) => {
                    refs.name.blur()
                    if (focused) {
                        selectedItem = focused
                        focused = null
                        return
                    }
                    if (selectedItem) {
                        items = [...items]
                        selectedItem = null
                        return
                    }
                    refs.name.focus()
                }}>{option.name}</pre>
                <!-- <select
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
                </select> -->
            </Item>
        {/each}
    </form>
</main>
<footer on:click={() => {refs.name.blur()}}>
    {#if !options.length}
        {#if !options.length}
            <nothingtosee transition>
                <pre>by IKEA</pre>
            </nothingtosee>
        {/if}
    {:else if !options.some(({qty}) => qty == '')}
                <message style="opacity: {copied ? 1 : 0}">copied!</message>

        <Button variant="raised" on:click={copyToClipboard}>copy to clipboard</Button>
        <Button color="secondary" on:click={() => { warn = true }}>start over</Button>
    {/if}
</footer>


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
<!-- <float>
    <IconButton class="material-icons" on:click={async () => { 
        refs.name.blur()
        await tick()
        refs.name.focus()
        name = ''
    }}>home</IconButton>
</float> -->
<!-- <fab>
    <IconButton class="material-icons">search</IconButton>
</fab> -->

<!-- {#if showUnits}
<units transition:transition>
    <Paper>
        <wrap>
        {#each units as unit}
            <Button on:click={() => showUnits = false}>{unit}</Button>
        {/each}
        </wrap>
    </Paper>
</units>
{/if} -->
<!-- <tab>
tab
</tab> -->
<stickybottom>
    <search on:click|stopPropagation>
        <input 
            name="name" 
            bind:this={refs.name}
            bind:value={name} 
            placeholder="stöktayk"
            on:focus={() => {
                browser && localStorage.setItem(localStorageId, JSON.stringify(items))
                refs.name.select()
                selectedItem = null
            }}
            size="11"
        />
        <!-- <IconButton class="material-icons" slot="trailingIcon" on:click={() => {
            name = ''
        }}>close</IconButton> -->
    </search>
</stickybottom>