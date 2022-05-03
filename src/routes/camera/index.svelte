<script>

    let video
    // Prefer camera resolution nearest to 1280x720.
    // const constraints = { audio: false, video: { width: 640, height: 480 } }; 
    function connect() {
        navigator.mediaDevices.getUserMedia({video: true}).then(function(stream) {
            video.srcObject = stream;
            // video.onloadedmetadata = function(e) {
                video.play();
            // };
        })
        // .catch(function(err) { console.log(err.name + ": " + err.message); });
    }
</script>
<button on:click={connect}>camera</button>
<video bind:this={video} width="640" height="480" autoplay></video>