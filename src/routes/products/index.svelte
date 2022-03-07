<script context="module">
    import 'carbon-components-svelte/css/white.css'
    import {
        DataTable,
        Toolbar,
        ToolbarContent,
        ToolbarSearch,
        Link,
    } from 'carbon-components-svelte'
    import fuzzy from '../../helpers/fuzzy.js'
    import getheaders from '../../helpers/headers.js'
</script>

<script>
    export let products = []
    $: value = value?.toUpperCase?.() ?? ''
    $: headers = getheaders(products)
    $: rows = fuzzy(products, value)
    $: { 
        const ItemCodeHeader = headers.find(({key}) => key === 'ItemCode')
        ItemCodeHeader.empty = true
        ItemCodeHeader.sort = false
    }
</script>

<DataTable
    zebra
    sortable
    {headers}
    {rows}
>
    <Toolbar>
        <ToolbarContent>
            <ToolbarSearch bind:value expanded persistent/>
        </ToolbarContent>
    </Toolbar>
    <svelte:fragment slot="cell-header" let:header>
        {#if header.key === "id"}
            PLUCODE
        {:else}
            {header.value}
        {/if}
    </svelte:fragment>
    <svelte:fragment slot="cell" let:row let:cell>
        {#if cell.key === "Description"}
            <Link inline href={`products/${row.ItemCode}`}>
                {cell.value}
            </Link>
        {:else}
            <div hidden={cell.key === 'ItemCode'}>{cell.value}</div>
        {/if}
    </svelte:fragment>

</DataTable>
