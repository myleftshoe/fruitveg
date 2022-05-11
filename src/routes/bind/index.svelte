<script context=module>
    const isHex12 = (value = '') => /^([0-9A-Fa-f]{12})$/.test(value.trim())
</script>
<script>
    import products, { fetchPreview } from '$lib/productStore'
    import Tag from '$lib/tag.svelte'
    import ProductDrawer from '$lib/productDrawer.svelte'

    let open = false

    let product = {}
    async function onInput(e) {
        const { value } = e.target
        if (!isHex12(value)) return
        product = await fetchPreview(value)
    }
</script>
<main>
    <input type="text" placeholder="mac address" on:input={onInput}/>
    <Tag/>
    <button on:click={() => open = true}>bind</button>
    <pre>{JSON.stringify(product,null,4)}</pre>
    {#if open}
        <ProductDrawer bind:open/>
    {/if}
</main>
<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
    }
    input {
        font-size:1.5rem;
        max-width: 100vw;
        border: none;
        border-bottom: 2px solid orange;
        outline: none;
    }
</style>
