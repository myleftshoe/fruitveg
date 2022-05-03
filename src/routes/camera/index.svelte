<script>

    let video
    // Prefer camera resolution nearest to 1280x720.
    const constraints = { audio: true, video: { width: 1280, height: 720 } }; 
    function connect() {
        navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream) {
            video.srcObject = mediaStream;
            video.onloadedmetadata = function(e) {
                video.play();
            };
        }).catch(function(err) { console.log(err.name + ": " + err.message); });
    }
</script>
<button on:click={connect}>camera</button>
<video bind:this={video}>
</video>