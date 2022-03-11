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
    <Title>{item.Description}</Title>
    <Content>
        <p></p>
        <div>
            <Textfield 
                style="width: 100%;"
                bind:value={item.label5}
            />    
            <Textfield
                style="width: 100%;"
                bind:value={item.label4}
            />    
        </div>
        <Textfield 
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
        <Button on:click={() => (item = {})}>
            <Label>Save</Label>
        </Button>
    </Actions>
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