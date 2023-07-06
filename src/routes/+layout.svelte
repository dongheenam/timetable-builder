<script lang="ts">
  import Header from './Header.svelte';

  import '$lib/styles/global.css';

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/edit', label: 'Edit' },
    { href: '/view', label: 'View' },
  ];
</script>

<div id="app">
  <Header {navItems} />
  <main>
    <slot />
  </main>
</div>

<style>
  #app {
    background-color: var(--gray2);
    min-height: 100vh;
    padding-bottom: 5rem;
  }
  main {
    width: min(1000px, 95%);
    margin-inline: auto;

    padding-top: 2rem;
  }
</style>
