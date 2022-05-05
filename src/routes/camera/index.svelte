<script>
    import {Html5Qrcode} from "html5-qrcode" 

    import IconButton, { Icon } from '@smui/icon-button'
    import { Svg } from '@smui/common/elements'
    import { mdiBarcodeScan } from '@mdi/js'


    let reader

    const constraints = {
        facingMode: "environment",
        height: 360,
        width: 180,
        // aspectRatio: {min: 1, max: 2}
    }
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
        html5Qrcode.start({ facingMode: "environment" }, { fps: 10, qrbox: {width: 250, height: 250} }, onScanSuccess, onScanFailure);
    }


</script>
<main>
    <div id="reader" bind:this={reader}></div>
    <IconButton on:click={connect}>
        <Icon component={Svg} viewBox="0 0 24 24">
            <path fill="currentColor" d={mdiBarcodeScan} />
        </Icon>
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
    div {
        border: 1px solid red;
        height: 180px;
        width: 360px;
    }
</style>