<script>
    import Quagga from 'quagga'
    import { onMount } from 'svelte';
    import { browser } from '$app/env';


    let video

    const constraints = {
        width: {min: 240},
        height: {min: 320},
        facingMode: "environment",
        aspectRatio: {min: 1, max: 2}
    }


    async function connect() {
        // const stream = await navigator.mediaDevices.getUserMedia(constraints)
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '')

        // console.dir(video);
        // if ('srcObject' in video) {
        //     video.srcObject = stream;
        // } else {
        //     video.src = URL.createObjectURL(stream);
        // }
        // video.play();
        // .catch(function(err) { console.log(err.name + ": " + err.message); });
        startScanner()
    }

    function startScanner() {
        alert('start')

        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: video,
                // numOfWorkers: navigator.hardwareConcurrency,
                constraints,
            },
            locator: {
                patchSize: "medium",
                halfSample: false,
            },
            numOfWorkers: 1,
            frequency:10,
            decoder: {
                readers: [
                    "code_128_reader",
                    "ean_reader",
                    "ean_8_reader",
                    "code_39_reader",
                    "code_39_vin_reader",
                    "codabar_reader",
                    "upc_reader",
                    "upc_e_reader",
                    "i2of5_reader"
                ],
            }, 
            locate: true,
            src: null,
        }, function (err) {
            if (err) {
                alert(err);
                return
            }
            alert("Initialization finished. Ready to start");
            Quagga.start();
        })

        Quagga.onProcessed(function (result) {
            // alert(JSON.stringify(result))
        })

        Quagga.onDetected(function (result) {
            // const code = result.codeResult.code
            const code = 'code'
            alert(`Barcode detected and processed : [${code}]`);
            // Quagga.stop()
        });

    }


	// onMount(startScanner)

    // browser && startScanner()

</script>
<main>
    <div bind:this={video} width="240" height="320"></div>
    <button on:click={connect}>camera</button>
</main>
<style>
    main {
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
    video {
        border: 1px solid red;
    }
</style>