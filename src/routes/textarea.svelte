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
        hidden: null,
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

    async function handleKeyPress(e) {
        console.log(e.key)
        if (e.key === 'Enter') {
            refs.name.focus()
            return
        }
        if (e.key === ' ') {
            e.preventDefault()
            showUnits = true
            e.target.blur()
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
                

    $: options = name && 
        items.filter((product) => product.name.includes(name.toLowerCase())) || 
        items.filter((product) => product.qty !== '')



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
        flex-grow: 1;
        font-size: 2.8em;
        font-weight: bold;
        font-family: courier;
        /* color: white; */
        text-align: center;
        text-transform: lowercase;
        /* background-color: #7777 */
        /* text-shadow: 3px 3px 8px #000f; */
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
        top:0;
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
        top: 0;
        /* right : 12%; */
        width: 100%;
    }
    wrap {
        display: flex;
        flex-wrap:wrap;
        justify-content: space-between;
        align-items: flex-start;
        padding: 8px;
    }
    search {
        display: flex;
        height: 18vh;
        width:100%;
        /* align-items: stretch; */
        justify-content: flex-end;
    }
    nothingtosee {
        margin-top: 10vh;
        background-color: #fa07;
        border-radius: 8px;
        padding: 32px;
    }
</style>
<header>
    {#if showUnits}
    <wrap>
        {#each units as unit}
            <Button on:click={() => showUnits = false}>{unit}</Button>
        {/each}
        </wrap>
    {:else}
    {/if}
</header>
<main>
    <search>
        <input 
            name="name" 
            bind:this={refs.name}
            bind:value={name} 
            placeholder="stoktayk"
            size="11"
        />
        <IconButton class="material-icons" slot="trailingIcon" on:click={() => {
            name = ''
        }}>close</IconButton>
    </search>
    <form>
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
                <pre value={option.name} on:click={() => {
                    name = ''
                    refs.name.focus()
                    refs.name.scrollIntoView(true)
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
    {#if !options.length}
        <nothingtosee>
            <i>Nothing to see here</i>
        </nothingtosee>
    {/if}
</main>
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