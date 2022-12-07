<script>
  import Router, { link } from "svelte-spa-router";

  import Home from "./routes/Home.svelte";
  import Classes from "./routes/Classes.svelte";
  import SaveLoad from "./routes/SaveLoad.svelte";
  import Timetable from "./routes/Timetable.svelte";

  const routes = {
    "/": Home,
    "/classes": Classes,
    "/save": SaveLoad,
    "/timetable": Timetable,
  };
</script>

<div class="root">
  <header>
    <ul class="nav-list">
      <li><a href="/" class="nav-item" use:link>Home</a></li>
      <li><a href="/classes" class="nav-item" use:link>Classes</a></li>
      <li><a href="/timetable" class="nav-item" use:link>Timetable</a></li>
      <li><a href="/save" class="nav-item" use:link>Save/Load</a></li>
    </ul>
  </header>

  <main>
    <Router {routes} />
  </main>
</div>

<style>
</style>
