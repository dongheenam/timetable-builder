<script>
  import Router from "svelte-spa-router";

  import Header from "./Header.svelte";
  import Home from "./routes/Home.svelte";
  import Edit from "./routes/Edit.svelte";
  import SaveLoad from "./routes/SaveLoad.svelte";
  import Timetable from "./routes/Timetable.svelte";

  const routes = {
    "/": Home,
    "/edit": Edit,
    "/save": SaveLoad,
    "/timetable": Timetable,
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/edit", label: "Edit" },
    { href: "/timetable", label: "Timetable" },
    { href: "/save", label: "Save/Load" },
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
  }
  main {
    width: min(1000px, 95%);
    margin: auto;
  }
</style>
