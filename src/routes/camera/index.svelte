<script>
    import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode'
    import { onMount } from 'svelte'
    import MdiButton from '$lib/mdiButton.svelte'
    import { mdiBarcodeScan, mdiBarcodeOff } from '@mdi/js'
    // import products from '$lib/productStore'

    let scanning = false
    let code = '[scan result]'

    let html5Qrcode

    onMount(init)

    function init() {
        html5Qrcode = new Html5Qrcode('reader')
    }

    let blink = false
    let blinkTimeout
    function doBlink() {
        blink = true
        clearTimeout(blinkTimeout)
        blinkTimeout = setTimeout(() => {blink = false}, 100)
    }

    function start() {
        html5Qrcode.start(
            { facingMode: 'environment' },
            {
                formatsToSupport: [Html5QrcodeSupportedFormats.CODE_128],
                fps: 10,
                qrbox: calcQrBox,
                // qrbox: { width: 360, height: 60 },
                disableFlip: true,
                rememberLastUsedCamera: true,
                experimentalFeatures: {
                    useBarCodeDetectorIfSupported: true,
                },
                aspectRatio: 2.2,
            },
            onScanSuccess,
            onScanFailure
        )
        // html5Qrcode.applyVideoConstraints({ focusMode: "continuous", advanced: [ {zoom: 2 } ]})
        scanning = true
    }

    async function stop() {
        await html5Qrcode.stop()
        scanning = false
    }

    function calcQrBox(viewfinderWidth, viewfinderHeight) {
        const [width, height] = [viewfinderWidth - 15, viewfinderWidth / 5]
        code = `${width}x${height}`
        return { width, height }
    }

    function onScanSuccess(decodedText, decodedResult) {
        // alert(`Code matched = ${decodedText}`)
        code = decodedText
        doBlink()
        console.log(decodedResult)
    }

    function onScanFailure(error) {
        // console.warn(`Code scan error = ${error}`)
    }

</script>
<main>
    <header>        
        <code class:blink>{code}</code>
    </header>
    <reader id="reader"/>
    <footer>
        {#if scanning}
            <MdiButton icon={mdiBarcodeOff} on:click={stop}/>
        {:else}
            <MdiButton icon={mdiBarcodeScan} on:click={start}/>
        {/if}
    </footer>
    <!-- <product>{$products[0]}</product> -->
</main>
<style>
    main { 
        height: 100vh;
        width: 100vw;
        display: grid;
        place-content: center;
    }
    reader {
        height: 100vh;
        background-color: black;
    }
    header, footer {
        position: fixed;
        width: 100%;
        height: 80px;
        display: grid;
        place-content: center;
        background-color: #7777;
        font-size: 2rem;
        z-index: 2;
    }
    header {
        top: 0;
    }
    footer {
        bottom: 0;
    }
    .blink {
        color: green;
    }
    :global(body) {
        margin: 0;
        padding: 0;
        color: white;
    }
</style>
