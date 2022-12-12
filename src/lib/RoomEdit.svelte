<script>
  import { classGroups, staffNames } from "../lib/stores";
</script>

<div>
  <span>classGroups:</span>
  <pre>{JSON.stringify($classGroups, null, 2)}</pre>
</div>
<hr />
<div>
  <span>staffNames:</span>
  <pre>{JSON.stringify($staffNames, null, 2)}</pre>
</div>
