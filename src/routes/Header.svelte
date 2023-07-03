<script lang="ts">
  import { page } from '$app/stores';
  export let navItems: { href: string; label: string }[] = [];
</script>

<header>
  <div class="title">Timetable builder</div>
  <ul class="nav-list">
    {#each navItems as { href, label }}
      <li>
        <a {href} class="nav-item" data-active={$page.route.id === href}>
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
    padding-inline: var(--gap-md);

    display: flex;
    align-items: flex-end;
    gap: var(--gap-md);

    background-color: var(--bg-color);
    box-shadow: var(--shadow-xs);
  }
  .title {
    font-family: var(--ff-serif);
    font-size: 2rem;
    font-weight: 700;
    font-style: italic;
    letter-spacing: -0.1em;
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
  .nav-item[data-active='true'] {
    color: var(--primary11);
    border-bottom: 4px solid var(--primary8);
  }
  .nav-item:not([data-active='true']) {
    padding-bottom: calc(0.5rem + 2px);
  }
</style>
