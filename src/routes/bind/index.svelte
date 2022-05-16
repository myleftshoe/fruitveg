<script context=module>
    import { onMount } from 'svelte'
    const isHex12 = (value = '') => /^([0-9A-Fa-f]{12})$/.test(value.trim())
</script>
<script>
    import products, { fetchPreview } from '$lib/productStore'
    import Tag from '$lib/tag.svelte'
    import ProductDrawer from '$lib/productDrawer.svelte'

    let open = false
    let input

    onMount(() => screen.orientation.lock('portrait-primary'))

    function handleWindowKeypress(e) {
        if (e.key === '*') {
            e.stopPropagation()
            e.preventDefault()
            input.focus()
        }
    }

    function onFocus() {
        console.log('handleInputFocus')
        input.select()
    }

    let product = {}
    async function onInput({ target: { value }}) {
        if (!isHex12(value)) return
        product = await fetchPreview(value)
    }
</script>
<svelte:window on:keypress|capture={handleWindowKeypress}/>
<main>
    <!-- svelte-ignore a11y-autofocus -->
    <input bind:this={input} autofocus type="text" placeholder="mac address" on:input={onInput} on:focus={onFocus}/>
    <Tag {product}/>
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
        text-align: center;
    }
    :global(html, body, *, *::before, *::after) {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
</style>
