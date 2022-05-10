<script context=module>
    const isHex12 = (value = '') => /^([0-9A-Fa-f]{12})$/.test(value.trim())
</script>
<script>
    import products, { fetchPreview } from '$lib/productStore'
    let product = {}
    async function onInput(e) {
        const { value } = e.target
        if (!isHex12(value)) return
        product = await fetchPreview(value)
    }
</script>
<input type="text" placeholder="mac address" on:input={onInput}/>
<pre>{JSON.stringify(product,null,4)}</pre>
<style>
    input {
        font-size:1.5rem;
    }
</style>
