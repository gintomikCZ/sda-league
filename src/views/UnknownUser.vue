<template>
<div>
  <h1>Unknown User</h1>
  <p>Please log in first</p>
  <sda-button
    label="login"
    @clicked="$router.push('/')"
  />
</div>

</template>

<script>
export default {
  name: 'UnknownUser'
}

</script>

<style lang="stylus">

</style>