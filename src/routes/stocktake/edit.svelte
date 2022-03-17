<script>
    import Dialog, { Header, Title, Content, Actions } from '@smui/dialog'
    import List, {
        Item,
        Text,
        PrimaryText,
        SecondaryText,
        Meta
    } from '@smui/list'
    import Button, { Group, Label } from '@smui/button'
    import IconButton, { Icon } from '@smui/icon-button'
    import Textfield from '@smui/textfield'

    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    export let selectedRow = null
    export let rows = []

    function handleClose() {
        console.log('handleClose')
        selectedRow.qty = Number(selectedRow.qty) || '' 
        selectedRow = null
        dispatch('close')

    }
    function handleSubmit() {
        console.log('handleSubmit')
    }
    function next() {
        selectedRow = rows[rows.indexOf(selectedRow) + 1]
    }
    function prev() {
        selectedRow = rows[rows.indexOf(selectedRow) - 1]
    }
    function handleKeyPress(e) {
        if (e.target.value.length > 2) {
            e.target.value = '0'
            e.preventDefault()
        }

    }

    $: open = Boolean(selectedRow)
</script>

<style>
    main {
        display: flex;
        height: 100%;
        min-height: 70vh;
        flex-direction: column;
        transition: background-color 0.3s ease;
    }
    hidden {
        display: none;
    }
    prev {
        position: fixed;
        left:32px;
        bottom: 20%;
    }
    next {
        position: fixed;
        bottom: 20%;
        right: 32px;
    }
</style>

<Dialog fullscreen bind:open on:SMUIDialog:closed={handleClose}>
    {#if selectedRow}
            <main style="background-color:var({parseInt(selectedRow.qty) >= 0 || selectedRow.notes ? '--mdc-theme-primary' : '--mdc-theme-secondary'});">
                <div style="align-self: flex-end; margin:4px;">
                    <IconButton
                        style="color: #000d;"
                        class="material-icons"
                        type="button"
                        on:click={() => (open = false)}>
                        close
                    </IconButton>
                </div>
                <Content style="display:flex; flex-direction: column; align-items: center; gap: 3%;">
                    <Title>{selectedRow.Description}</Title>
                    <hidden>
                        <input
                            type="text"
                            id="PLUCode"
                            name="PLUCode"
                            bind:value={selectedRow.id} />
                        <input
                            type="text"
                            id="Description"
                            name="Description"
                            bind:value={selectedRow.Description} />
                    </hidden>
                    <Textfield
                        textarea
                        label="Notes"
                        input$id="notes"
                        input$name="notes"
                        style="width: 100%;"
                        bind:value={selectedRow.notes}
                    />
                    <Textfield
                        label="Quantity"
                        input$type="number"
                        input$step=1
                        input$min=0
                        input$max=999
                        input$style='font-size:4ch; text-align:center;'
                        input$id="qty"
                        input$name="qty"
                        bind:value={selectedRow.qty}
                        on:keypress={handleKeyPress}
                    />
                    <Textfield
                        label="Unit"
                        input$style='text-align:center;'
                        input$id="unit"
                        input$name="unit"
                        bind:value={selectedRow.unit}
                    />
                </Content>
            </main>
        <prev>
            <IconButton touch class="material-icons" on:click={prev} style="">arrow_back_ios</IconButton>
        </prev>
        <next>
            <IconButton touch class="material-icons" on:click={next}>arrow_forward_ios</IconButton>
        </next>
    {/if}
</Dialog>
