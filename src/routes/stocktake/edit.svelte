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
    function next(e) {
        selectedRow = rows[rows.indexOf(selectedRow) + 1]
        qty_ref.focus()
    }
    function prev(e) {
        selectedRow = rows[rows.indexOf(selectedRow) - 1]
    }
    function handleKeyPress(e) {
        if (e.target.value.length > 2) {
            e.target.value = '0'
            e.preventDefault()
        }

    }

    let qty_ref

    $: open = Boolean(selectedRow)
</script>

<style>
    main {
        position: fixed;
        top:0;
        left:0;
        height:50%;
        width:100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content:flex-start;
        transition: background-color 0.3s ease;
    }
    hidden {
        display: none;
    }
    horzflex {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width:100%;
    }
    vertflex {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-center;
        width:100%;
    }
</style>

<Dialog fullscreen bind:open on:SMUIDialog:closed={handleClose} style="height: 50vh">
{#if selectedRow}
    <main 
        _style="background-color:var({parseInt(selectedRow.qty) >= 0 || selectedRow.notes ? '--mdc-theme-primary' : ''});"
    >
        <!-- <div style="align-self: flex-end; margin:4px;">
            <IconButton
                style="color: #000d;"
                class="material-icons"
                type="button"
                on:click={() => (open = false)}>
                close
            </IconButton>
        </div> -->
        <Content style="display:flex; flex-direction: column; align-items: center; gap: 3%;">
            <Title style={parseInt(selectedRow.qty) >= 0 || selectedRow.notes ? 'color: var(--mdc-theme-primary)' : ''}>{selectedRow.Description}</Title>
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
            <horzflex>
                <IconButton touch class="material-icons" on:click={prev} style="">arrow_back_ios</IconButton>
                <vertflex>
                    <Textfield
                        bind:this={qty_ref}
                        label="Quantity"
                        input$type="tel"
                        style="width: 50%;"
                        input$step=1
                        input$min=0
                        input$max=999
                        input$style='text-align:center;'
                        input$id="qty"
                        input$name="qty"
                        input$tabindex="0"
                        bind:value={selectedRow.qty}
                        on:keypress={handleKeyPress}
                    />
                    <Textfield
                        label="Unit"
                        input$style='text-align:center;'
                        style="width: 50%;"
                        input$id="unit"
                        input$name="unit"
                        bind:value={selectedRow.unit}
                    />
                    </vertflex>
                <IconButton touch class="material-icons" on:click={next}>arrow_forward_ios</IconButton>
            </horzflex>
        </Content>
    </main>
{/if}
</Dialog>
