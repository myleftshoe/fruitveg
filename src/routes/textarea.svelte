<script>
    import { tick } from 'svelte'
    import { fade as transition } from 'svelte/transition'
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

    let showUnits = false


    function handleQtyClick(e) {
        if (e.key === ' ') {
            e.preventDefault()
            refs.name.focus()
        }
    }

    function handleKeyPress(e) {
        console.log(e.key)
        if (e.key === 'Enter') {
            refs.name.focus()
            return
        }
        if (e.key === ' ') {
            showUnits = true;
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
        width:100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 2vh;
        padding: 16px;
    }
    input {
        border: none;
        outline:none;
        background: none;
    }
    input[name="name"] {
        font-size: 3em;
        font-weight: bold;
        font-family: arial;
        color: white;
        text-align: center;
        text-transform: lowercase;
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
        position: fixed;
        bottom:0;
        height: 20vh;
        display: flex;
        align-items: center;
        /* justify-content: space-between; */
        background-color: #7777;
        z-index:101;
        /* margin-bottom: 40px; */
    }
    :global(body) {
        margin: 0;
    }
    fab {
        position: fixed;
        top: 40vh;
        right: 16px;
    }
    units {
        /* background-color: #7773; */
        position: fixed;
        top: 20%;
        right : 12%;
        width: 60%;
    }
    wrap {
        display: flex;
        flex-wrap:wrap;
        justify-content: space-between;
        align-items: flex-start;
        gap: 16px;
    }
</style>
<header>
    <input 
        name="name" 
        bind:this={refs.name}
        bind:value={name} 
        style="width:100%; padding:16px;"
        on:focus={()=> {
            name=''
        }}
    />
    <Icon class="material-icons" slot="trailingIcon">close</Icon>
</header>
<main>
    <form >
        {#each options as option}
            <Item nonInteractive style="display:flex; gap: 20px;">
                <input
                    name="qty"
                    bind:value={option.qty}
                    id="qty"
                    type="number"
                    min="0"
                    max="99"
                    step="1"
                    on:keypress={handleKeyPress}
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
<!-- <fab>
    <IconButton class="material-icons">search</IconButton>
</fab> -->

{#if showUnits}
<units transition:transition>
    <Paper>
        <wrap>
        {#each units as unit}
            <Button on:click={() => showUnits = false}>{unit}</Button>
        {/each}
        </wrap>
    </Paper>
</units>
{/if}