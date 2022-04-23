<script>
    import { blur } from 'svelte/transition'
    export let product = {}
    let prevProduct = {}
    let blink = false
    $: if (product.id !== prevProduct.id) {
        prevProduct = product
        blink = true
    } else {
        blink = false
    }
</script>
<tag  {...$$restProps} on:click>
    {#if !product?.label4?.trim() && !product?.label5?.trim()}
        <product>
            <div>loading...</div>
        </product>

    {:else}
        <product in:blur class:blink>
            <div>{product?.label5 || ''}</div>
            <div>{product?.label4 || ''}</div>
        </product>
    {/if}
    <price class:blink>
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
    .blink {
        animation:blinkText .5s 5
    }
    @keyframes blinkText{
        0%{		color: #000;	}
        50%{	color: transparent;	}
        100%{	color: #000;	}
    }        
    price {
        color: red;
        font-size: 16px;
    }
    sup {
        font-size: 11px;
    }
</style>