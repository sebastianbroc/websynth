<template>
  <div class="navbar">
    <div class="navbar-content">
      <a>home</a>
      <a>files</a>
      <a>view</a>
      <a>options</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style lang="scss">
.navbar {
  width: 100vw;

  border-bottom: solid 1px black;
}

.navbar-content {
  margin-left: 10px;
  padding: 8px 0 8px 0;

  a {
    padding: 0 4px 0 4px;
    border-radius: 2px;

    &:hover {
      cursor: pointer;
      background: #D4A373;
    }
  }
}
</style>
