<script>
    import List, {
        Item,
        Text,
        PrimaryText,
        SecondaryText,
        Meta
    } from '@smui/list'
    import Dialog, { Header, Title, Content, Actions } from '@smui/dialog'
    import Button, { Group, Label } from '@smui/button'
    import Textfield from '@smui/textfield'
    import { mdiPlus, mdiMinus } from '@mdi/js'
    import IconButton, { Icon } from '@smui/icon-button'
    import { Svg } from '@smui/common/elements'

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
        let cents = getCents(item.UnitPrice)
        console.log(e.target.style.getPropertyValue('--cents'))
        switch (cents) {
            case 99: 
                cents = 0
                break
            case 0:
                cents = 50
                break
            default: 
                cents = 99
        }
        console.log(cents)
        const dollars = Math.trunc(item.UnitPrice)
        item.UnitPrice = Number(`${dollars}.${cents}`)
        e.target.style.setProperty('--cents', `"${cents.toString().padStart(2, '0')}"`)
        console.log(item.UnitPrice)
    }


    let checked = false

    $: open = Boolean(item.id)
    $: console.log(item)
    $: dollars = Math.trunc(item.UnitPrice)
    $: cents = getCents(item.UnitPrice).toString().padStart(2, '0')
</script>

<style>
    esl {
        display:flex;
        flex-direction: column;
        border: 3px solid #000b;
        border-radius: 18px;
        padding: 18px;
        padding-top: 0px;
        background-color: #fff;
    }
    controls {
        display:flex;
        flex-direction: column;
        gap: 4ch;
        /* border:1px solid #0004; */
        border-radius:5px;
    }
    main {
        display:flex;
        height:100%;
        background-color: #ff00;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    input {
        border: none; outline: none; background-color: #f000;
    }
    hidden {
        display: none;
    }
    price {
        /* background-color: #00f5; */
        /* padding: 16px; */
        justify-content: space-between;
        display:flex;
        /* gap: 16px; */
        flex-direction: row;
        align-items: center;
    }
    dollars {
        display:flex;
        /* flex: 3ch 0 0; */
        font-weight: 600; 
        justify-content: center;
        min-width: 2ch;
        margin: 18px;
        /* padding: 0 0 0 4px; */
        font-size: 72px;
        /* background-color: #0f03; */
        font-family: none;
    }
    dollars::before {
        /* background-color: #f002; */
        font-size: 40px;
        font-weight: lighter;
        text-align: center;
        transform: translateY(-50%) translateX(-20%);
        /* width: 2ch; */
        content: '$';
    }
    dollars::after {
        background-color: #f002;
        margin-left: 16px;
        font-size: 32px;
        font-weight: lighter;
        position: relative;
        top: -1ch;
        right: 0;
        /* width: 2ch; */
        content: var(--cents);
    }
    plucode {
        position: fixed;
        top: 16px;
        left:16px;
        font-size: smaller;
        color: var(--mdc-theme-primary);
    }
    price2 {
        /* border: 1px solid green; */
        display:flex;
    }

</style>

<Dialog fullscreen bind:open on:SMUIDialog:closed={() => (item = {})}>
    <main style="min-height: 50vh;">
        <div style="align-self: flex-end; margin:4px;">
            <IconButton action="close" style="color: #000d;" class="material-icons" type="button" on:click={() => open = false}>close</IconButton>
        </div>
        <Content style="display: flex; flex-direction: column; justify-content: space-around;">        
            <Title style="display:flex; flex-direction: column; align-items: center;">
                {item.Description}
                <plucode>{item.id}</plucode>
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
                <price2>
                    <dollars on:click={changeCents} style={`--cents: "${cents}";`}>{dollars}</dollars>
                    <!-- <cents >.{cents}</cents> -->
                </price2>
                <Textfield bind:value={item.unit} style="flex-basis:20%"/>
            </price>
        </Content>
        <Actions>
            <Button type="submit">
                <Label>Save</Label>
            </Button>
        </Actions>
    </main>
</Dialog>
