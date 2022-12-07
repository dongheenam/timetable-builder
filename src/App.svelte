<script>
  import Router, { link, location } from "svelte-spa-router";

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
  <header>
    <div class="title">Timetable builder</div>
    <ul class="nav-list">
      {#each navItems as { href, label }}
        <li>
          <a {href} class="nav-item" use:link data-active={$location === href}>
            {label}
          </a>
        </li>
      {/each}
    </ul>
  </header>

  <main>
    <Router {routes} />
  </main>
</div>

<style lang="postcss">
  :global(#app) {
    background-color: var(--gray1);
  }
  .root {
    min-height: 100vh;
  }
  main {
    width: min(1000px, 95%);
    margin: auto;
  }

  header {
    display: flex;
    align-items: center;
    padding: 1rem 0 0 1rem;
    background-color: var(--bg);
    box-shadow: var(--shadow-xs);
  }
  .title {
    font-size: 1.7rem;
    font-weight: 300;
  }
  .nav-list {
    margin: 0;
    margin-left: auto;
    display: flex;
    flex-direction: row;
  }

  .nav-item {
    position: relative;
    display: block;

    font-weight: 600;
    text-transform: uppercase;

    padding: 0.5rem 1rem;
    border-bottom: 2px solid var(--gray7);
  }
  .nav-item:hover {
    background-color: var(--gray4);
  }
  .nav-item:focus {
    outline: 3px solid var(--primary8);
    z-index: 10;
  }
  .nav-item[data-active="true"] {
    color: var(--primary11);
    border-bottom: 4px solid var(--primary8);
  }
  .nav-item:not([data-active="true"]) {
    padding-bottom: calc(0.5rem + 2px);
  }
</style>
