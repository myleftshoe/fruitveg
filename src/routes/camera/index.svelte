<script>
    import { Html5Qrcode } from 'html5-qrcode'
    import { onMount } from 'svelte'
    // import products from '$lib/productStore'

    let scanning = false
    let result = ''
    
    let html5Qrcode

    onMount(init)

    function init() {
        html5Qrcode = new Html5Qrcode('reader')
    }

    function start() {
        html5Qrcode.start(
            { facingMode: 'environment' },
            {
                fps: 10,
                qrbox: { width: 320, height: 80 },
                disableFlip: true,
                rememberLastUsedCamera: true,
                experimentalFeatures: {
                    useBarCodeDetectorIfSupported: true
                },
                aspectRatio: 3,
            },
            onScanSuccess,
            onScanFailure,
        )
        // html5Qrcode.applyVideoConstraints({ focusMode: "continuous", advanced: [ {zoom: 2 } ]})
        scanning = true
    }

    async function stop() {
        await html5Qrcode.stop()
        scanning = false
    }

    function onScanSuccess(decodedText, decodedResult) {
        // alert(`Code matched = ${decodedText}`)
        result = JSON.stringify(decodedResult, null, 4)
        alert(result)
        console.log(decodedResult)
    }

    function onScanFailure(error) {
        console.warn(`Code scan error = ${error}`)
    }

    // $: console.log($products)
</script>
<main>
    <reader id="reader"/>
    {#if scanning}
        <button on:click={stop}>stop</button>
    {:else}
        <button on:click={start}>start</button>
    {/if}
    <!-- <pre>{result}</pre> -->
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
        min-height: 500px;
        /* max-height: 200px; */
        background-color: black;
    }
    :global(body) {
        margin: 0;
        padding: 0;
    }
</style>

