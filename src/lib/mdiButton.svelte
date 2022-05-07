<script>
    import IconButton, { Icon } from '@smui/icon-button'
    import { Svg } from '@smui/common/elements'
    import { mdiExclamationThick } from '@mdi/js'
    export let icon = mdiExclamationThick
    export let color = 'currentColor'
    export let size = 'normal'
</script>
<IconButton on:click class="material-icons" {size}>
    <Icon component={Svg} viewBox="0 0 24 24">
        <path fill={color} d={icon} />
    </Icon>
</IconButton>