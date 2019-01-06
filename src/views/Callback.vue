<template>
<h1>callbach</h1>
</template>
<script>

import { setIdToken, setAccessToken } from '../auth/AuthService';

export default {
  name: 'Callback',
  mounted() {
    this.$nextTick(() => {
      console.log("inside tick")
      setAccessToken();
      setIdToken();
      window.location.href = '/';
    });
  },
};
</script>
