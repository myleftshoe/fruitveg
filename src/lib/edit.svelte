<script>
    import Dialog, { Header, Title, Content, Actions } from '@smui/dialog'
    import List, { Item, Text, PrimaryText, SecondaryText, Meta } from '@smui/list'
    import Button, { Group, Label } from '@smui/button'
    import IconButton, { Icon } from '@smui/icon-button'
    import Textfield from '@smui/textfield'
    import { mdiPlus, mdiMinus } from '@mdi/js'
    import { Svg } from '@smui/common/elements'
    import Money, { split } from '$lib/money.svelte'

    export let item = {
        label5: '',
        label4: '',
        UnitPrice: 0,
        unit: ''
    }



    const getCents = price => (price % 1).toFixed(2) * 100

    function incUnitPrice() {
        item.UnitPrice = parseFloat(++item.UnitPrice).toFixed(2)
    }

    function decUnitPrice() {
        --item.UnitPrice
        if (item.UnitPrice < 1) {
            item.UnitPrice = 0.99
        }
        item.UnitPrice = parseFloat(item.UnitPrice).toFixed(2)
    }

    function changeCents(e) {
        let [dollars, cents] = split(item.UnitPrice)
        cents = cents === '99' ? '00' : cents === '00' ? '50' : '99'
        item.UnitPrice = Number(`${dollars}.${cents}`)
        e.target.style.setProperty('--cents', `"${cents}"`)
    }

    function handleSubmit(e) {
        const request = new Request(`/products/${item.ItemCode}?_method=PUT`, { 
            method: 'POST', 
            body: new FormData(e.target),
        });
        fetch(request)
    }
    let checked = false

    $: open = Boolean(item.id)
    $: console.log(item)
</script>

<style>
    plucode {
        position: absolute;
        top: 16px;
        left:16px;
        font-size: smaller;
        color: #000b;
    }
    form {
        height: 100%;
    }
    main {
        display:flex;
        height:100%;
        background-color: #ff00;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    esl {
        display:flex;
        flex-direction: column;
        border: 3px solid #000b;
        border-radius: 18px;
        padding: 18px;
        padding-top: 0px;
        background-color: #fffd;
    }
    controls {
        display:flex;
        flex-direction: column;
        gap: 4ch;
        /* border:1px solid #0004; */
        border-radius:5px;
    }
    hidden {
        display: none;
    }
    price {
        justify-content: space-between;
        display:flex;
        flex-direction: row;
        align-items: center;
    }
</style>

<Dialog fullscreen bind:open on:SMUIDialog:closed={() => (item = {})}>
    <form method="post" action={`/products/${item.ItemCode}?_method=PUT`} on:submit|preventDefault={handleSubmit}>
        <main style="min-height: 50vh; background-color:var({item.Active ? '--mdc-theme-primary' : '--mdc-theme-secondary'});">
            <plucode>{item.id}</plucode>
            <div style="align-self: flex-end; margin:4px;">
                <IconButton action="close" style="color: #000d;" class="material-icons" type="button" on:click={() => open = false}>close</IconButton>
            </div>
            <Content style="display: flex; flex-direction: column; justify-content: space-around;">        
                <Title style="display:flex; flex-direction: column; align-items: center;">
                    {item.Description}
                </Title>
                <hidden>
                    <input
                        type="text"
                        id="PLUCode"
                        name="PLUCode"
                        bind:value={item.id} />
                    <input
                        type="text"
                        id="Description"
                        name="Description"
                        bind:value={item.Description} />
                    <input
                        type="text"
                        id="UnitPrice"
                        name="UnitPrice"
                        bind:value={item.UnitPrice} />
                    <input
                        type="text"
                        id="isWeighed"
                        name="isWeighed"
                        bind:value={item.isWeighed} />
                </hidden>
                <esl>
                    <Textfield
                        input$id="label5"
                        input$name="label5"
                        bind:value={item.label5} />
                    <Textfield
                        input$id="label4"
                        input$name="label4"
                        bind:value={item.label4} />
                </esl>
                <price>
                    <controls>
                        <IconButton class="material-icons" size="normal" variant="outlined" type="button" on:click={incUnitPrice}>
                            <Icon component={Svg} viewBox="0 0 24 24">
                                <path fill="currentColor" d={mdiPlus} />
                            </Icon>
                        </IconButton>
                        <IconButton class="material-icons" size="normal" variant="outlined" type="button" on:click={decUnitPrice}>
                            <Icon component={Svg} viewBox="0 0 24 24">
                                <path fill="currentColor" d={mdiMinus} />
                            </Icon>
                        </IconButton>
                    </controls>
                    <Money value={item.UnitPrice}/>
                    <Textfield bind:value={item.unit} style="flex-basis:20%" invalid/>
                </price>
            </Content>
            <Actions>
                <Button type="submit" variant="unelevated" color="secondary">
                    <Label>Save</Label>
                </Button>
            </Actions>
        </main>
    </form>
</Dialog>
