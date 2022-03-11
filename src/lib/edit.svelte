<script>
    import List, { Item, Text, PrimaryText, SecondaryText, Meta } from '@smui/list'
    import Dialog, { Title, Content, Actions } from '@smui/dialog'
    import Button, { Label } from '@smui/button'
    import Textfield from '@smui/textfield'
    import Switch from '@smui/switch'

    export let item = { 
        label5: '',
        label4: ''
    }
    let checked = false
    $: open = Boolean(item.id)
    $: price = item.UnitPrice || 0
    $: console.log(item)
</script>
<Dialog bind:open on:SMUIDialog:closed={() => (item = {})}>
    <Title>{item.Description}</Title>
    <Content>
    <Textfield 
        style="width: 100%;"
        bind:value={item.label5}
    />    
    <Textfield
        style="width: 100%;"
        bind:value={item.label4}
    />    
    <Textfield 
        style="width: 30%;"
        prefix="$"
        bind:value={price}
    />
    <Textfield 
        style="width: 20%;"
        bind:value={item.unit}
    />
    <!-- <Switch bind:checked icons={false} /> -->
    </Content>
    <Actions>
        <Button on:click={() => (item = {})}>
            <Label>Save</Label>
        </Button>
    </Actions>
</Dialog>
