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

    export let item = {}

    let copy = null
    let submitted = false

    function handleClose() {
        const detail = submitted ? copy : item
        dispatch('close', detail)
        item = {}
        copy = null
        submitted = false
    }

    function handleSubmit(e) {
        return
        const request = new Request(`/products/${copy.ItemCode}?_method=PUT`, {
            method: 'POST',
            body: new FormData(e.target)
        })
        fetch(request)
        item = copy
        item.label4 = item.label4.toUpperCase()
        item.label5 = item.label5.toUpperCase()
        submitted = true
        open = false
    }
    $: console.log(copy)
    $: {
        if (item.id && copy === null) {
            copy = { 
                id: '',
                Description: '',
                UnitPrice: 0,
                isWeighed: false,
                ...item 
            }
        }
    }
    $: open = Boolean(copy)
</script>

<style>
    plucode {
        font-size: smaller;
        color: #000b;
    }
    form {
        height: 100%;
        touch-action: none;
    }
    main {
        display: flex;
        height: 100%;
        min-height: 50vh;
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

<Dialog fullscreen bind:open on:SMUIDialog:closed={handleClose}>
    {#if copy}
        <form method="post" on:submit|preventDefault={handleSubmit}>
            <main style="background-color:var({copy.Active ? '--mdc-theme-primary' : '--mdc-theme-secondary'});">
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
                    <plucode>{copy.id}</plucode>
                    <Title>{copy.Description}</Title>
                    <hidden>
                        <input
                            type="text"
                            id="PLUCode"
                            name="PLUCode"
                            bind:value={copy.id} />
                        <input
                            type="text"
                            id="Description"
                            name="Description"
                            bind:value={copy.Description} />
                    </hidden>
                    <Textfield
                        style="width: 100%;"
                        helperLine$style="width: 100%;"
                        textarea
                        bind:value={copy.notes}
                        label="notes"
                    />
                    <Textfield
                        type="number"
                        input$style='font-size:4ch; text-align:center;'
                        input$id="qty"
                        input$name="qty"
                        bind:value={copy.qty}
                    />
                    <Textfield
                        input$style='text-align:center;'
                        input$id="unit"
                        input$name="unit"
                        bind:value={copy.unit}
                    />
                    <Button
                        type="submit"
                        variant="unelevated"
                        color="secondary">
                        <Label>Save</Label>
                    </Button>
                </Content>
            </main>
        </form>
        <prev>
            <IconButton class="material-icons">arrow_back_ios</IconButton>
        </prev>
        <next>
            <IconButton class="material-icons">arrow_forward_ios</IconButton>
        </next>
    {/if}
</Dialog>
