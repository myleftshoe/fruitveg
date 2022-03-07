<script context='module'>
    import 'carbon-components-svelte/css/white.css'
    import { TextInput, Button } from 'carbon-components-svelte'
</script>
<script>
    export let product = {}
    const fields = 'Description,UnitPrice,IsWeighed,PLUCode'.split(',')
</script>
<form method="post" action={`/products/${product.ItemCode}?_method=PUT`}>
    {#each Object.entries(product) as [key, value]}
        {#if fields.includes(key)}
            <TextInput type="text" id={key} name={key} labelText={key} {value}/>
        {/if}
    {/each}
    <Button type="submit">SAVE CHANGES</Button>
</form>
