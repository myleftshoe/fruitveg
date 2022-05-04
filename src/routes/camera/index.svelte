<script>
    import Quagga from 'quagga'
    import { onMount } from 'svelte';
    import { browser } from '$app/env';

    import IconButton, { Icon } from '@smui/icon-button'
    import { Svg } from '@smui/common/elements'
    import { mdiBarcodeScan } from '@mdi/js'


    let video

    const constraints = {
        width: {min: 480},
        height: {min: 640},
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
            decoder: {
                readers: ["code_128_reader"],
                debug: {
                    drawBoundingBox: true,
                    showFrequency: true,
                    drawScanline: true,
                    showPattern: true
                },
                multiple: false,
            }, 
            src: null,
            numOfWorkers: navigator.hardwareConcurrency,
            frequency:10,
            locate: false,
            // locator: {
            //     patchSize: "medium",
            //     halfSample: false,
            // },
        }, function (err) {
            if (err) {
                alert(err);
                return
            }
            // alert("Initialization finished. Ready to start");
            Quagga.start();
        })

        Quagga.onProcessed(result => {
            // alert(JSON.stringify(result))
                    var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;

            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                    result.boxes.filter(function (box) {
                        return box !== result.box;
                    }).forEach(function (box) {
                        Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
                    });
                }

                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
                }

                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
                }
            }
        })

        Quagga.onDetected(data => {
            const code = data.codeResult.code
            alert(`Barcode detected and processed : [${code}]`);
            // Quagga.stop()
        });

    }


	// onMount(startScanner)

    // browser && startScanner()

</script>
<main>
    <div bind:this={video}></div>
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
    }
</style>