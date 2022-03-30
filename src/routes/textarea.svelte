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
    import Icon from '@smui/textfield/icon'
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
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    pre {
        flex-grow: 1;
        font-size: 1.5em;
    }
    form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 2vh;
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
        font-size: 1.8em;
        font-weight: bold;
        font-family: mono;
        width: 4ch;
        height: 2.6ch;
        text-align: center;
        border-radius: 8px;
        color:darkorange;
    }
    header {
        position: sticky;
        top:0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #7777;
        z-index:101;
        margin-bottom: 40px;
    }
    :global(body) {
        margin: 0;
    }
</style>
<header>
    <Textfield bind:value={name} style="width:100%; padding:16px;">
        <Icon class="material-icons" slot="trailingIcon">close</Icon>
    </Textfield>
</header>
<main>
    <form>
        {#each options as option}
            <Item nonInteractive style="display:flex; gap: 20px;">
                <input
                    name="qty"
                    bind:value={option.qty}
                    id="qty"
                    type="number"
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
    </form>
</main>
<Button>close</Button>
