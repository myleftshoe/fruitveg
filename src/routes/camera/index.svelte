<script>
    import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode'
    import { onMount } from 'svelte'
    import MdiButton from '$lib/mdiButton.svelte'
    import { mdiBarcodeScan, mdiBarcodeOff } from '@mdi/js'
    // import products from '$lib/productStore'

    let scanning = false
    let result = ''
    let code = ''

    let html5Qrcode

    onMount(init)

    function init() {
        html5Qrcode = new Html5Qrcode('reader')
    }

    function start() {
        html5Qrcode.start(
            { facingMode: 'environment' },
            {
                formatsToSupport: [Html5QrcodeSupportedFormats.CODE_128],
                fps: 20,
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
        result = `${width}x${height}`
        return { width, height }
    }

    function onScanSuccess(decodedText, decodedResult) {
        // alert(`Code matched = ${decodedText}`)
        code = decodedText
        result = JSON.stringify(decodedResult, null, 4)
        // alert(result)
        console.log(decodedResult)
    }

    function onScanFailure(error) {
        console.warn(`Code scan error = ${error}`)
    }

    // $: console.log($products)
</script>

<main>
    <reader id="reader"/>
    <overlay>
        <code>{code}</code>
        {#if scanning}
            <MdiButton icon={mdiBarcodeOff} on:click={stop}/>
        {:else}
            <MdiButton icon={mdiBarcodeScan} on:click={start}/>
        {/if}
    </overlay>
    <!-- <product>{$products[0]}</product> -->
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
    reader {
        width: 100%;
        min-height: 80vh;
        max-height: 80vh;
        background-color: black;
    }
    :global(body) {
        margin: 0;
        padding: 0;
    }
    overlay {
        z-index: 20;
        position: fixed;
        top:0;
        width: calc( 100vw - 40px );
        /* background-color: #7777; */
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        color:white;
    }
</style>
