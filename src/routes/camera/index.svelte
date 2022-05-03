<script>
    import Quagga from 'quagga'

    let video

    const constraints = {
        audio: false,
        video: {
            facingMode: 'environment'
        }
    }


    function connect() {
        navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
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
        })
    }
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