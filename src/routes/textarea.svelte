<script>
    import { tick } from 'svelte'
    import { slide as transition } from 'svelte/transition'
        import List, { Item, Text, PrimaryText, SecondaryText, Meta } from '@smui/list'
        import Button from '@smui/button'
    import IconButton from '@smui/icon-button'

    import Autocomplete from '@smui-extra/autocomplete'
    import Select, { Option } from '@smui/select'
    import Paper from '@smui/paper'
    import Textfield from '@smui/textfield'
    import products from '$lib/productStore'

    const refs = {
        form: null,
        qty: null,
        name: null,
        unit: null,
    }

    let fruits = ['Apple', 'Orange', 'Banana', 'Mango']
    let units = [
        'bags',
        'boxes',
        'crates',
        'tubs',
        'bin',
        'shelf',
        'trolley',
        'nets',
        'sacks'
    ]
    let name = ''
    let unit = ''
    let qty = ''
    let textarea = ''

    function handleQtyClick(e) {
        if (e.key === ' ') {
            e.preventDefault()
            refs.name.focus()
        }
    }

    function handleKeyPress(e) {
        console.log(e.key)
        if (e.key === 'Enter') {
            refs.form.submit()
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

    let showItems = false
    let items = []

    $: if (!items.length && $products.length) {   
            items = $products
                .map(({name}) => ({
                    name: name.toLowerCase(),
                    qty: '',
                    unit: '',
                })) || []
                console.table(items)
    }
                

    $: options = items.filter((product) => product.name.includes(name.toLowerCase()))



</script>

<style>
    /* :global(body) {
        margin:10px;
    } */
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        /* background-color:green;
        border-radius: 32px; */
        padding: 16px;
    }
    form {
        display:flex;
        gap: 5vw;
    }
    textarea {
        border: none;
        outline: none;
        resize: none;
        width:100%;
        height: 100%;
        background: none;
        /* background-color: #0002;
        border-radius: 16px;
        padding: 16px; */
        font-family: monospace;
    }
    hr {
        flex-basis: 5vh;
        visibility: hidden;
    }
    select {
        border: none;
        background: none;
    }
    select:focus {
        background-color:red;
        width: 100vw;
    }
    pre {
        flex-grow: 1;
    }
    items { 
        width: 100%;
        background-color: #7773;
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
    }

    item { 
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        gap: 10vw;
        border-bottom: 1px solid black;
    }
    form {
        display: flex;
        flex-direction: column;
    }
    input {
        border: none;
        outline:none;
        background: none;
    }
    input[name="name"] {
        font-size: 2em;
        text-align: left;
        text-transform: lowercase;
        border-bottom: 2px solid orange;
        background: none;
        width: 100%;
    }
    input[name="qty"] {
        background-color: #7773;
        font-size: 1.5em;
        width: 3ch;
        text-align: center;
        padding: 4px;
        border-radius: 8px;
    }
    header {
        position: sticky;
        top:0;
        display: flex;
        gap: 16px;
        background-color: white;
        border-radius: 8px;
        z-index:101;
    }
</style>

<main>
    <header>
        <input
            name="name"
            bind:this={refs.name}
            bind:value={name}
        />
        <IconButton class="material-icons">close</IconButton>
    </header>
        {#each options as option}
            <Item style="display:flex; gap: 16px; width: 100%;">
                <input
                    name="qty"
                    bind:value={option.qty}
                    id="qty"
                    type="tel"
                />
                <pre value={option.name}>{option.name}</pre>
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
</main>
<Button>close</Button>
