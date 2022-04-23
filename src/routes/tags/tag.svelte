<script>
    import { blur } from 'svelte/transition'
    export let product = {}
</script>
<tag  {...$$restProps} on:click>
    {#if !product?.label4?.trim() && !product?.label5?.trim()}
        <product>
            <div>loading...</div>
        </product>

    {:else}
        <product in:blur>
            <div>{product?.label5 || ''}</div>
            <div>{product?.label4 || ''}</div>
        </product>
    {/if}
    <price>
        ${product?.label6?.split('.')[0] || ''}
        <sup>{product?.label6?.split('.')[1] || ''}</sup>    
    </price>
</tag>
<style>
    tag {
        border: 5px solid #999;
        border-radius: 7px;
        background-color: white;
        cursor: pointer;
        display: inline-flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        padding: 2px;
        height: 50px;
        width: 90px;
        font-size: 11px;
        font-family: "Roboto Condensed";
        font-weight: 600;
        text-transform: uppercase;
        overflow: hidden;
    }
    tag:hover {
        background-color: orange;
        color: white;
    }
    product {
        display: flex; 
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #000;
        line-height: 12px;
    }
    price {
        color: red;
        font-size: 16px;
    }
    sup {
        font-size: 11px;
    }
</style>