<script>

    let nameRef

    function handleQtyClick(e) {
        if (e.key === " ") nameRef.focus()
    }

</script>
<input id="qty" type="number" min="1" max="99" on:keypress={handleQtyClick}/>
<input bind:this={nameRef} id="name" type="text"/>
<style>
    input {
        border: none;
        background-color: #f001
    }
    #qty {
        /* width: 3ch; */

    }
</style>