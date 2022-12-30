<script>
  import { link, location } from "svelte-spa-router";

  export let navItems = [];
</script>

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

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 100;

    display: flex;
    align-items: center;
    background-color: var(--bg);
    box-shadow: var(--shadow-xs);
  }
  .title {
    padding-left: 1rem;

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
