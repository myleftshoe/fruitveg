<script>
    import { Html5Qrcode } from "html5-qrcode" 
    import { onMount } from 'svelte'
    import IconButton, { Icon } from '@smui/icon-button'
    import { Svg } from '@smui/common/elements'
    import { mdiBarcodeOff, mdiBarcodeScan } from '@mdi/js'


    let reader
    let scanning = false

    console.log('start')

    function connect() {
        reader.setAttribute('autoplay', '');
        reader.setAttribute('muted', '');
        reader.setAttribute('playsinline', '')
        console.log('connect')

        function onScanSuccess(decodedText, decodedResult) {
            // handle the scanned code as you like, for example:
            console.log(`Code matched = ${decodedText}`, decodedResult);
            alert(`Code matched = ${decodedText}`, decodedResult);
        }

        function onScanFailure(error) {
            // handle scan failure, usually better to ignore and keep scanning.
            // for example:
            console.warn(`Code scan error = ${error}`);
        }

        let html5Qrcode = new Html5Qrcode("reader")
        html5Qrcode.start(
            { facingMode: "environment" }, 
            { 
                fps: 10, 
                qrbox: { width: 250, height: 125 },
                disableFlip: true,
            }, 
            onScanSuccess, 
            onScanFailure
        );
        scanning = true
    }

    onMount(connect)


</script>
<main>
    <div id="reader" bind:this={reader} height={250} width={250}></div>
    <IconButton on:click={() => scanning = !scanning}>
        {#if scanning}
            <Icon component={Svg} viewBox="0 0 24 24">
                <path fill="currentColor" d={mdiBarcodeOff} />
            </Icon>
        {:else}
            <Icon component={Svg} viewBox="0 0 24 24">
                <path fill="currentColor" d={mdiBarcodeScan} />
            </Icon>
        {/if}
    </IconButton>


</main>
<style>
    main {
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
    #reader {
        /* border: 1px solid red; */
        /* height: 60%; */
        /* width: 100%; */
    }
</style>