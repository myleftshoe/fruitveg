<script>
    import { tick } from 'svelte'
    import Autocomplete from '@smui-extra/autocomplete'
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
    let value = ''
    let textarea = ''

    function handleQtyClick(e) {
        if (e.key === ' ') refs.name.focus()
    }

    function next(e) {
        console.log(e.key)
        if (e.key !== 'Enter') return
        textarea = `${textarea}\n${qty} ${name} ${unit}` 
        qty = ''
        name = ''
        unit = ''
        refs.form.reset()
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
        /* background-color: #0002;
        border-radius: 16px;
        padding: 16px; */
        font-family: monospace;
    }
    hr {
        flex-basis: 5vh;
        visibility: hidden;;
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
            input$type="tel"
            input$min="1"
            input$max="99"
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
            on:keydown={next}
        />
        <Autocomplete
            name="unit"
            bind:this={refs.unit}
            bind:value={unit}
            combobox
            options={units}
            style="width: 10ch;"
            on:keydown={next}
        />
    </form>
    <hr>
    <Paper style="flex:1; align-self: stretch;">
    <textarea 
        bind:this={refs.textarea} 
        bind:value={textarea} 
    />
    </Paper>
</main>
