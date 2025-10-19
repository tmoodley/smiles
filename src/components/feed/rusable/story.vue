<template>
  <div class="d-flex item-center">
    <img
      class="avatar"
      :src="image"
    />
    <div class="ml-3">
    <h5>{{name}}</h5>
    <p>{{time}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'image', 'time']
}
</script>

<style scoped>
.avatar {
  height: 60px;
  width: 60px;
  line-height: 60px;
  text-align: center;
  border: 2px solid rgba(0, 0, 0, 0.1);
  padding: 2px;
}
</style>
