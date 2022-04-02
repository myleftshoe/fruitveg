<script>
    import { slide as transition } from 'svelte/transition'
    import Button from '@smui/button'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    const units = [
        '[none]',
        'bags',
        'boxes',
        'crates',
        'tubs',
        'trays',
        'bin',
        'shelf',
        'trolley',
        'nets',
        'sacks',
        'pcs'
    ]

    export let item = {}

    function handleFracClick(e) {
        item.qty = e.target.value
        dispatch('change')
    }


    function handleUnitClick(e) {
        item.unit = e.target.value
        dispatch('change')
    }

</script>
<style>
    drawer {
        position: fixed;
        top:0;
        right:0;
        display: flex;
        /* width:50vw; */
        height:100%;
        background-color: #777e;
        z-index:1;
        padding: 16px;
        /* margin-bottom: 40px; */
    }
    special {
        /* width: 50%; */
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        /* gap: 2px; */
        align-items: center;
    }
    button {
        background:none;
        outline:none;
        border:none;
        padding:16px;
        cursor: pointer;
        width: 100%; 
        color:orange;
        font-family: arial;
        font-size: 16px;
        font-weight: bold;
    }
</style>
<drawer transition:transition={{duration: 250}}>
    <!-- <special>
        {#each ['1/4', '3/4', '1/3', '2/3'] as value}
            <button {value} style="width: 100%; color:orange;" on:click={handleFracClick}>{value}</button>
        {/each}
    </special> -->
    <special>
        {#each units as value}
            <button {value} on:click={handleUnitClick}>{value}</button>
        {/each}
    </special>
</drawer>