<script>
    export let product = {}
</script>
<tag  {...$$restProps}>
    <product>
        <div>{product?.label5 || ''}</div>
        <div>{product?.label4 || ''}</div>
    </product>
    <price>${product?.label6 || '0'}</price>
</tag>
<style>
    tag {
        border: 8px solid #999;
        border-radius: 7px;
        background-color: white;
        cursor: pointer;
        display: inline-flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        padding: 5px;
        height: 10vw;
        width: 17vw;
        font-size: 14px;
        font-family: arial;
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
        line-height: 14px;
    }
    price {
        color: red;
        font-size: x-large;
        font-family: sans;
    }
</style>