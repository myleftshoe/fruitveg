<style>
    appbar {
        /* width:100%; */
        display: flex;
        align-items: center;
        justify-content: center;
        background: #000f;
        border-radius: 0px;
        border-bottom: 1px solid #000f;
        position: sticky;
        position: -webkit-sticky;
        top: 0vh;
        /* margin:-10px; */
        box-shadow: 2px 4px 4px #0007;
        padding: 10px 5px 10px 0px; 
        transition: top .3s ease-out;
        z-index: 1;
    }
</style>
<appbar>
    <slot/>
</appbar>