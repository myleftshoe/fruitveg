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
        selectedRow = null
        rows = [...rows]
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

    $: open = Boolean(selectedRow)
</script>

<style>
    plucode {
        font-size: smaller;
        color: #000b;
    }
    main {
        display: flex;
        height: 100%;
        min-height: 70vh;
        background-color: #ff00;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
    }
    hidden {
        display: none;
    }
    prev {
        position: fixed;
        bottom: 20%;
    }
    next {
        position: fixed;
        bottom: 20%;
        right: 0;
    }
</style>

<Dialog  bind:open on:SMUIDialog:closed={handleClose}>
    {#if selectedRow}
            <main style="background-color:var({selectedRow.qty ? '--mdc-theme-primary' : '--mdc-theme-secondary'}); transition: background-color 0.3s ease;">
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
                        style="width: 100%;"
                        helperLine$style="width: 100%;"
                        textarea
                        bind:value={selectedRow.notes}
                        label="notes"
                    />
                    <Textfield
                        type="number"
                        input$style='font-size:4ch; text-align:center;'
                        input$id="qty"
                        input$name="qty"
                        bind:value={selectedRow.qty}
                    />
                    <Textfield
                        input$style='text-align:center;'
                        input$id="unit"
                        input$name="unit"
                        bind:value={selectedRow.unit}
                    />
                </Content>
            </main>
        <prev>
            <IconButton class="material-icons" on:click={prev}>arrow_back_ios</IconButton>
        </prev>
        <next>
            <IconButton class="material-icons" on:click={next}>arrow_forward_ios</IconButton>
        </next>
    {/if}
</Dialog>
