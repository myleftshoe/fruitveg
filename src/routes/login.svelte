<script>
    import { tick } from 'svelte'
    import { Pincode, PincodeInput } from 'svelte-pincode'

    export let message = ''
    let value = ''

    async function handleComplete() {
        await tick()
        formRef.submit()
    }

    let formRef
    let inputRef
</script>

<form method="post" bind:this={formRef} on:submit|preventDefault={() =>console.log('SUBMIT')} >
    <input name="pin" type="password" hidden bind:value bind:this={inputRef}/> 
    <Pincode bind:value type="numeric" on:complete={handleComplete} >
        <PincodeInput />
        <PincodeInput />
        <PincodeInput />
        <PincodeInput />
    </Pincode>
</form>
{message}
<style>
    form {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    :global([data-pincode] input) {
        font-size: 24px;
    }
</style>

