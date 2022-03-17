<script>
    import { tick } from 'svelte';
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
        const { unit } = selectedRow
        console.log(qty_ref)
        const qty = qty_ref.value
        selectedRow.qty = parseInt(qty) || ''
        const _unit = qty.split(' ')[1] || ''
        selectedRow.unit = _unit.trim() || unit
        selectedRow = null
        dispatch('close')

    }
    function handleSubmit() {
        console.log('handleSubmit')
    }
    async function next(e) {
        selectedRow = rows[rows.indexOf(selectedRow) + 1] || rows.slice(-1)[0]
        await tick()
        qty_ref.select()
    }
    async function prev(e) {
        selectedRow = rows[rows.indexOf(selectedRow) - 1] || rows[0]
        await tick()
        qty_ref.select()
    }
    function handleKeyPress(e) {
        // if (e.target.value.length > 2) {
        //     e.target.value = '0'
        //     e.preventDefault()
        // }
    }

    let qty_ref

    $: open = Boolean(selectedRow)
    $: isFirst = selectedRow === rows[0]
    $: isLast = selectedRow === rows.slice(-1)[0]
</script>

<style>
    main {
        position: fixed;
        top:0;
        left:0;
        height:50vh;
        width:100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content:flex-start;
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
    input {
        border: none;
        outline:none;
        background-color: transparent;
        color: white;
    }
    units {
        transform: scale(.8);
        display:flex;
    }
    hr {
        width:100%;
        height: 1px;
        color:#fff1; 
    }
    #qty {
        font-size: 5ch;
    }
    #notes {
        font-size: 2ch;
        width: 100%; 
        border:none;
        background-color: #7770;
        /* border-radius: 16px; */
        padding: 16px;
        color:#fffd;
        font-family: arial; 
    }
</style>

<Dialog fullscreen bind:open on:SMUIDialog:closed={handleClose} style="height: 50vh; width: 100vw;">
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
        <Content style="display:flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 3%;">
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
            <horzflex>
                <IconButton disabled={isFirst} touch class="material-icons" on:click={prev} tabindex="-1">arrow_back_ios</IconButton>
                <vertflex>
                    <input
                        bind:this={qty_ref}
                        label="Quantity"
                        type="number"
                        style="width: 80%; text-align:center; color: #777;"
                        id="qty"
                        name="qty"
                        placeholder="0"
                        bind:value={selectedRow.qty}
                        on:keypress={handleKeyPress}
                        on:focus={(e) => {e.target.select()}}
                    />
                    <!-- <Textfield
                        label="Unit"
                        input$style='text-align:center;'
                        style="width: 50%;"
                        input$id="unit"
                        input$name="unit"
                        bind:value={selectedRow.unit}
                    /> -->
                </vertflex>
                <IconButton disabled={isLast} touch class="material-icons" on:click={next} tabindex="-1">arrow_forward_ios</IconButton>
            </horzflex>
            <units>
                {#each ['boxes', 'tubs', 'crates', 'nets', 'sacks'] as unit}
                    <Button 
                        color={selectedRow.unit === unit ? "primary" : "secondary"} 
                        on:click={() => selectedRow.unit = unit} >
                        {unit}
                    </Button>
                {/each}
            </units>
            <textarea 
                id="notes"
                name="notes"
                rows=1
                placeholder="Notes"
                bind:value={selectedRow.notes}
                style="text-align: {selectedRow.notes.length ? 'left' : 'center'};"
            />
        </Content>
    </main>
{/if}
</Dialog>