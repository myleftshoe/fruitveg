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

    const qtyButtons = [0x00BC, 0x00BD, 0x00BE, 0x2153, 0x2154].map(charCode => String.fromCharCode(charCode))
    const unitButtons = ['boxes', 'tubs', 'crates', 'trays', 'nets', 'sacks', 'bin']

    function handleClose() {
        console.log('handleClose')
        selectedRow = null
        lastFocusedElement = null
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
        // if (e.target.value.length === 2) {
        //     unit_ref.focus()
        //     unit_ref.select()
        //     e.preventDefault()
        // }
    }

    const handleUnitButtonClick = (text) => (e) => {
        selectedRow.unit = text
        if (lastFocusedElement === notes_ref) {
            selectedRow.notes = `${selectedRow.notes.trim()} ${text}`
            notes_ref.focus()
            return
        }
        qty_ref.focus()
    }

    const handleQtyButtonClick = (text) => (e) => {
        selectedRow.qty = text
        if (lastFocusedElement === notes_ref) {
            selectedRow.notes = `${selectedRow.notes.trim()} ${text}`
            notes_ref.focus()
            return
        }
        qty_ref.focus()
        // qty_ref.select()
    }

    let qty_ref, unit_ref, notes_ref
    let lastFocusedElement

    $: open = Boolean(selectedRow)
    $: isFirst = selectedRow === rows[0]
    $: isLast = selectedRow === rows.slice(-1)[0]
</script>

<style>
    main {
        position: fixed;
        top:0;
        left:0;
        height: 75vh;
        width:100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content:flex-start;
        gap: 0ch;
    }
    hidden {
        display: none;
    }
    horzflex {
        display: flex;
        flex-basis: 100%;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 2ch;
    }
    vertflex {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-center;
        width:100%;
        gap: 1ch;
    }
    input {
        border: none;
        outline:none;
        background-color: transparent;
        color: #777;
    }
    units {
        transform: scale(.70);
        display:flex;
        flex-wrap: nowrap;
    }
    qtys {
        /* transform: scale(.8); */
        display:flex;
    }
    #qty {
        font-size: 5ch;
        text-align: center;
        color: #777; 
        width: 100%;
    }
    #unit {
        font-size: 16px;
        font-variant: small-caps;
        text-align: center;
        /* text-transform: uppercase; */
        font-family: arial;
        color:var(--mdc-theme-primary)
    }
    #notes {
        font-size: 16px;
        width: 75%; 
        border: 1px solid #7777 ;
        background-color: #7770;
        /* border-radius: 16px; */
        padding: 16px;
        color:#777;
        font-family: arial; 
    }
</style>

<Dialog fullscreen bind:open on:SMUIDialog:closed={handleClose} style="height: 100vh; width: 100vw;">
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
                        type="text"
                        maxlength="2" 
                        size="2"
                        pattern="[0-9]*"
                        inputmode=numeric
                        id="qty"
                        name="qty"
                        placeholder="0"
                        bind:value={selectedRow.qty}
                        on:focus={(e) => {
                            e.target.select()
                            lastFocusedElement = e.target
                        }}
                        on:keypress={handleKeyPress}
                    />
                    <input
                        bind:this={unit_ref}
                        bind:value={selectedRow.unit}
                        id="unit"
                        name="unit"
                        type="text"
                        placeholder="[unit]"
                        size="20"
                        maxlength="20" 
                        pattern="[a-z]*"
                        onkeydown="return /[a-z]/i.test(event.key)"
                        on:focus={(e) => {
                            e.target.select()
                            lastFocusedElement = e.target
                        }}
                    />
                </vertflex>
                <IconButton disabled={isLast} touch class="material-icons" on:click={next} tabindex="-1">arrow_forward_ios</IconButton>
            </horzflex>
            <qtys>
                {#each qtyButtons as text}
                    <Button color="secondary" on:click={handleQtyButtonClick(text)} >
                        {text}
                    </Button>
                {/each}
            </qtys>
            <units>
                {#each unitButtons as text}
                    <Button color="secondary" on:click={handleUnitButtonClick(text)} >
                        {text}
                    </Button>
                {/each}
            </units>
            <textarea 
                bind:this={notes_ref}
                bind:value={selectedRow.notes}
                id="notes"
                name="notes"
                rows=6
                placeholder="NOTES"
                style="text-align: {selectedRow.notes.length ? 'left' : 'center'};"
                on:focus={(e) => {
                    lastFocusedElement = e.target
                }}

            />
        </Content>
        <Actions>
            <Button>close</Button>
        </Actions>
    </main>
{/if}
</Dialog>