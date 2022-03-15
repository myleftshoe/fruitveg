<style>
    dollars {
        display:flex;
        font-weight: 600; 
        justify-content: center;
        align-items: center;
        min-width: 4ch;
        height:2ch;
        margin: 18px;
        border-radius: 2ch;
        font-size: 72px;
        font-family: none;
    }
    dollars::before {
        font-size: 32px;
        font-weight: lighter;
        position: relative;
        top: -1ch;
        right: 1ch;
        content: '$';
    }
    dollars::after {
        font-size: 32px;
        font-weight: lighter;
        position: relative;
        top: -1ch;
        left: 1ch;
        content: "." var(--cents);
    }
</style>
<script context="module">
    export function split(price) {
        return [
            Math.trunc(price).toString(),
            ((price % 1).toFixed(2) * 100).toString().padStart(2, '0')
        ]
    }
</script>
<script>
    export let value = 0.99;
    $: [dollars, cents] = split(value)
</script>
<dollars style={`--cents: "${cents}";`}>{dollars}</dollars>
