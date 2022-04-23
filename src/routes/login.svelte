<script>
    import { tick } from 'svelte'
    import { Pincode, PincodeInput } from 'svelte-pincode'

    export let message = ''
    let value = ''

    async function handleComplete() {
        await tick()
        refs.form.submit()
    }

    const refs = {}
    $: refs.pincode && refs.pincode.focusFirstInput()
</script>

<form method="post" bind:this={refs.form} on:submit|preventDefault={() =>console.log('SUBMIT')} >
    <input name="pin" type="password" hidden bind:value bind:this={refs.input}/> 
    <Pincode bind:this={refs.pincode} bind:value type="numeric" on:complete={handleComplete} >
        <PincodeInput />
        <PincodeInput />
        <PincodeInput />
        <PincodeInput />
    </Pincode>
    <code>{message}</code>
</form>
<style>
    form {
        width: 100%;
        height: 50vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    :global([data-pincode] input) {
        font-size: 24px;
        background-color: transparent;
    }
    code {
        color:red;
    }
</style>

