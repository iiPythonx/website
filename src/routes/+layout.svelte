<svelte:head>
    <title>{title}</title>
</svelte:head>

<script>
    import { page } from "$app/stores";

    $: path = $page.url.pathname.split("/")[1];
    $: title = path ? `iiPython / ${path[0].toUpperCase()}${path.slice(1)}` : "iiPython";
</script>

<slot />
