<style>
    dollars {
        display:flex;
        justify-content: center;
        align-items: center;
        min-width: 5ch;
        height:2ch;
        font-family: none;
        font-size: 72px;
        font-weight: 600; 
    }
    dollars::before {
        position: relative;
        top: -1ch;
        right: 1ch;
        font-size: 32px;
        font-weight: lighter;
        content: "$";
    }
    dollars::after {
        position: relative;
        top: -1ch;
        left: 1ch;
        font-size: 32px;
        font-weight: lighter;
        content: "." var(--cents);
    }
    controls {
        display:flex;
        flex-direction: row;
        gap: 4ch;
        /* border:1px solid #0004; */
        border-radius:5px;
    }

</style>
<script context="module">
    import IconButton, { Icon } from '@smui/icon-button'
    import { mdiPlus, mdiMinus } from '@mdi/js'
    import { Svg } from '@smui/common/elements'


    export function split(price) {
        return [
            Math.trunc(price).toString(),
            ((price % 1).toFixed(2) * 100).toString().padStart(2, '0')
        ]
    }
</script>
<script>
    export let value = 0.99
    export let vertical = false
    
    function setValue(newValue) {
        console.log(newValue)
        value = newValue < 1 ? 0.99 : newValue
        value = parseFloat(value).toFixed(2)
        return value
    }

    const increment = () => setValue(++value)
    const decrement= () => setValue(--value)

    function changeCents(e) {
        let [dollars, cents] = split(value)
        cents = cents === '99' ? '00' : cents === '00' ? '50' : '99'
        setValue(`${dollars}.${cents}`)
        e.target.style.setProperty('--cents', `"${cents}"`)
    }
    
    $: [dollars, cents] = split(value)
</script>
<controls style={vertical && "flex-direction: column;"}>
    <IconButton class="material-icons" size="normal" variant="outlined" type="button" on:click={increment}>
        <Icon component={Svg} viewBox="0 0 24 24">
            <path fill="currentColor" d={mdiPlus} />
        </Icon>
    </IconButton>
    <IconButton class="material-icons" size="normal" variant="outlined" type="button" on:click={decrement}>
        <Icon component={Svg} viewBox="0 0 24 24">
            <path fill="currentColor" d={mdiMinus} />
        </Icon>
    </IconButton>
</controls>
<dollars style={`--cents: "${cents}";`} on:click={changeCents}>{dollars}</dollars>
