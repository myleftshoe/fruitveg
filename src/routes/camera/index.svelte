<script>

    let video
    // Prefer camera resolution nearest to 1280x720.
    // const constraints = { audio: false, video: { width: 640, height: 480 } }; 
    function connect() {
        navigator.mediaDevices.getUserMedia({video: true}).then(function(stream) {
            video.src = stream;
            // video.onloadedmetadata = function(e) {
                video.play();
            // };
        })
        // .catch(function(err) { console.log(err.name + ": " + err.message); });
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