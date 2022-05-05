<script>
    import { Html5Qrcode } from "html5-qrcode" 
    import { onMount } from 'svelte'
    import MdiButton from '$lib/mdiButton.svelte'
    import { mdiBarcodeOff, mdiBarcodeScan } from '@mdi/js'

    let reader
    let scanning = false

    let html5Qrcode

    onMount(init)

    function init(autostart = true) {
        console.log('init')
        reader.setAttribute('autoplay', '')
        reader.setAttribute('muted', '')
        reader.setAttribute('playsinline', '')

        html5Qrcode = new Html5Qrcode("reader")

        autostart && start()
    }

    function start() {
        html5Qrcode.start(
            { facingMode: "environment" }, 
            { 
                fps: 10, 
                qrbox: { width: 250, height: 125 },
                disableFlip: true,
            }, 
            onScanSuccess, 
            onScanFailure
        )
        scanning = true
    }

    async function stop() {
        await html5Qrcode.stop()
        scanning = false
    }

    function onScanSuccess(decodedText, decodedResult) {
        // handle the scanned code as you like, for example:
        console.log(`Code matched = ${decodedText}`, decodedResult)
        alert(`Code matched = ${decodedText}`, decodedResult)
    }

    function onScanFailure(error) {
        // handle scan failure, usually better to ignore and keep scanning.
        // for example:
        console.warn(`Code scan error = ${error}`)
    }
</script>
<main>
    <div id="reader" bind:this={reader}></div>
    {#if scanning}
        <MdiButton mdiIcon={mdiBarcodeOff} on:click={stop}/>
    {:else}
        <MdiButton mdiIcon={mdiBarcodeScan} on:click={start}/>
    {/if}
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
        width: 100%;
        min-height: 500px;
        background-color: black;
    }
</style>