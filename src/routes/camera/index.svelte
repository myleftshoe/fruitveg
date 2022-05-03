<script>
    import Quagga from 'quagga'
    import { onMount } from 'svelte';
    import { browser } from '$app/env';


    let video

    const constraints = {
        audio: false,
        video: {
            facingMode: 'environment'
        }
    }


    async function connect() {
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '')

        console.dir(video);
        if ('srcObject' in video) {
            video.srcObject = stream;
        } else {
            video.src = URL.createObjectURL(stream);
        }
        video.play();
        // .catch(function(err) { console.log(err.name + ": " + err.message); });
        startScanner()
    }

    let started = false;
    function startScanner() {

        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: video,
                constraints: {
                    width: 240,
                    height: 320,
                    facingMode: "environment"
                },
            },
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
            }, function (err) {
                if (err) {
                    alert(err);
                    return
                }

                console.log("Initialization finished. Ready to start");
                Quagga.start();

                // Set flag to is running
                started = true;
            }
        })

        Quagga.onProcessed(function (result) {
            alert('processed!', result)
        })

        Quagga.onDetected(function (result) {
            console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
        });

    }


	// onMount(startScanner)

    // browser && startScanner()

</script>
<main>
    <video bind:this={video} width="240" height="320"></video>
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