<script>
  import Router from "svelte-spa-router";

  import Header from "./Header.svelte";
  import Home from "./routes/Home.svelte";
  import Edit from "./routes/Edit.svelte";
  import View from "./routes/View.svelte";

  const routes = {
    "/": Home,
    "/edit": Edit,
    "/view": View,
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/edit", label: "Edit" },
    { href: "/view", label: "View" },
  ];
</script>

<div class="root">
  <Header {navItems} />

  <main>
    <Router {routes} />
  </main>
</div>

<style lang="postcss">
  :global(#app) {
    background-color: var(--gray1);
    min-height: 100vh;
  }
  .root {
    padding-bottom: 5rem;
  }
  main {
    width: min(1000px, 95%);
    margin: auto;
  }
</style>
