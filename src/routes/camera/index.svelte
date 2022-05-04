<script>
    import Quagga from '@ericblade/quagga2'
    import { onMount } from 'svelte';
    import { browser } from '$app/env';

    import IconButton, { Icon } from '@smui/icon-button'
    import { Svg } from '@smui/common/elements'
    import { mdiBarcodeScan } from '@mdi/js'


    let video

    const constraints = {
        facingMode: "environment",
        aspectRatio: {min: 2, max: 2}
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

        Quagga.onProcessed(data => {
            // alert(JSON.stringify(data))
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