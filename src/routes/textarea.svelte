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
    let items = []
    let selectedItem

    $: if (!items.length && $products.length) {   
            items = $products
                .map(({name}) => ({
                    name: name.toLowerCase(),
                    qty: '',
                    unit: '---',
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
        flex-direction: column;
        align-items: center;
        background-color: #7773;
        border-radius: 8px;
    }
    tab {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 20%;
        right:0;
        height: 15vh;
        width: 64px;
        background-color: #7777;
        border-radius: 8px 0 0 8px;
    }
    sup {
        font-variant: small-caps;
        font-family: mono;
        font-weight: bold;
    }
</style>
{#if selectedItem}
    <Drawer bind:item={selectedItem} on:change={() => {
        console.log('change')
        items=[...items]
    }}/>
{/if}
<main>
    <search>
        <input 
            name="name" 
            bind:this={refs.name}
            bind:value={name} 
            placeholder="stocktake"
            size="11"
        />
        <!-- <IconButton class="material-icons" slot="trailingIcon" on:click={() => {
            name = ''
        }}>close</IconButton> -->
    </search>
    <form>
        {#each options as option, index (option)}
            <Item nonInteractive style="display:flex; gap: 20px; overflow: hidden; height: 100%;">
                <qtyunit>
                    <input
                        name="qty"
                        bind:value={option.qty}
                        id="qty"
                        type="text"
                        min="0"
                        max="99"
                        step="1"
                        on:keypress={(e) => handleKeyPress(e, option)}
                        on:focus={(e) => {
                            e.target.type="number"
                        }}
                        on:blur={(e) => {
                            e.target.type="text"
                        }}
                    />
                    <sup>{option.unit}</sup>
                </qtyunit>
                <pre value={option.name} on:click={(e) => {
                    if (selectedItem) {
                        items = [...items]
                        selectedItem = null
                        return

                    }
                    name = ''
                    refs.name.scrollIntoView({behavior: "smooth"})
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
    {#if !options.length}
        <nothingtosee transition>
            <pre>---</pre>
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
<!-- <tab>
tab
</tab> -->