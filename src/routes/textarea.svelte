<script>
    import Autocomplete from '@smui-extra/autocomplete'

    let nameRef

    let fruits = ['Apple', 'Orange', 'Banana', 'Mango']
    let value

    function handleQtyClick(e) {
        if (e.key === ' ') nameRef.focus()
    }
</script>

<style>
    input {
        border: none;
        background-color: #f001;
        color: white;
    }
    #qty {
        /* width: 3ch; */
    }
</style>

<input
    id="qty"
    type="number"
    min="1"
    max="99"
    on:keypress={handleQtyClick}
/>
<input bind:this={nameRef} id="name" type="text" />
<Autocomplete combobox options={fruits} bind:value/>
