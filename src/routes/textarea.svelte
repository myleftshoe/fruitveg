<script>
    import { tick } from 'svelte'
    import Autocomplete from '@smui-extra/autocomplete'
    import Select, { Option } from '@smui/select'
    import Paper from '@smui/paper'
    import Textfield from '@smui/textfield'

    const refs = {
        form: null,
        qty: null,
        name: null,
        unit: null,
    }

    let fruits = ['Apple', 'Orange', 'Banana', 'Mango']
    let units = [
        '',
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
            next()
        }
    }

    async function next(e) {
        console.log('next')
        textarea = `${textarea}\n${qty} ${name} ${unit}` 
        refs.form.reset()
        name = "testset"
        unit = 'boxes'
        refs.qty.focus()
        // refs.qty.select()
    }
</script>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        height:100vh;
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
        /* background-color: #0002;
        border-radius: 16px;
        padding: 16px; */
        font-family: monospace;
    }
    hr {
        flex-basis: 5vh;
        visibility: hidden;;
    }
    select {
        border: none;
        background: none;
    }
</style>
<main>
<h2>Stocktake</h2>
    <form bind:this={refs.form}>
        <Textfield
            name="qty"
            bind:this={refs.qty}
            bind:value={qty}
            input$id="qty"
            input$type="number"
            input$min="1"
            input$max="999"
            on:keypress={handleQtyClick}
            style="width: 6ch;"
        />
        <!-- <input bind:this={nameRef} id="name" type="text" /> -->
        <Autocomplete
            name="name"
            bind:this={refs.name}
            bind:value={name}
            combobox
            options={fruits}
            on:keydown={handleKeyPress}
        />
        <select
            name="unit"
            bind:this={refs.unit}
            bind:value={unit}
            combobox
            options={units}
            style="width: 10ch;"
            on:change={next}
        >
            {#each units as unit}
                <option value={unit}>{unit}</option>
            {/each}
        </select>
    </form>
    <hr>
    <textarea 
        disabled
        bind:this={refs.textarea} 
        bind:value={textarea} 
    />
</main>
