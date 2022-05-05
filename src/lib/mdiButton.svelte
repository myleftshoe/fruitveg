<script>
    import IconButton, { Icon } from '@smui/icon-button'
    import { Svg } from '@smui/common/elements'
    import { mdiExclamationThick } from '@mdi/js'
    export let mdiIcon = mdiExclamationThick
</script>
<IconButton on:click>
    <Icon component={Svg} viewBox="0 0 24 24">
        <path fill="currentColor" d={mdiIcon} />
    </Icon>
</IconButton>