<template>
   <p class="error">There was some network error - {{errortext.response.data.message}}</p>
</template>

<script>
export default {
name: 'Error',
props: ['errortext']
}
</script>

<style scoped>
.error {
  font-weight: bold;
  text-align: center;
  padding: 20px;
}
</style>
