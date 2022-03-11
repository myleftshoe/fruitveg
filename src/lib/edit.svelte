<script>
    import List, { Item, Text, PrimaryText, SecondaryText, Meta } from '@smui/list'
    import Dialog, { Title, Content, Actions } from '@smui/dialog'
    import Button, { Label } from '@smui/button'
    import Textfield from '@smui/textfield'

    export let item = { 
        label5: '',
        label4: '',
        UnitPrice: 0,
        unit: '',
    }
    let checked = false
    $: open = Boolean(item.id)
    $: console.log(item)
</script>
<Dialog bind:open on:SMUIDialog:closed={() => (item = {})}>
<form method="post" action={`/products/${item.ItemCode}?_method=PUT`}>
    <Title>{item.Description}</Title>
    <Content>
        <p></p>
        <div>
            <input hidden
                type="text"
                id="PLUCode"
                name="PLUCode"
                bind:value={item.id}
            />
            <input hidden
                type="text"
                id="Description"
                name="Description"
                bind:value={item.Description}
            />
            <input hidden
                type="text"
                id="isWeighed"
                name="isWeighed"
                bind:value={item.isWeighed}
            />
            <Textfield 
                input$id="label5"
                input$name="label5"
                style="width: 100%;"
                bind:value={item.label5}
            />    
            <Textfield
                input$id="label4"
                input$name="label4"
                style="width: 100%;"
                bind:value={item.label4}
            />     
        </div>
        <Textfield 
            input$id="UnitPrice"
            input$name="UnitPrice"
            style="width: 40%;"
            prefix="$"
            bind:value={item.UnitPrice}
        />
        <Textfield 
            style="width: 30%;"
            bind:value={item.unit}
        />
    </Content>
    <Actions>
        <Button type="submit">
            <Label>Save</Label>
        </Button>
    </Actions>
</form>
</Dialog>
<style>
    div { 
        border: 3px solid #000b;
        border-radius: 18px;
        padding: 18px;
        padding-top: 0px;
        margin-top: 24px;
    }
</style>