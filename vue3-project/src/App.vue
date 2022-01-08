<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/"> Home </router-link>
    <ul class="navbar-nav">
      <li class="nav-item active">
        <router-link class="nav-link" to="/todos">Todos</router-link>
      </li>
    </ul>
  </nav>
  <router-view />

</template>

<script>
export default {

}
</script>

<style>

</style>
