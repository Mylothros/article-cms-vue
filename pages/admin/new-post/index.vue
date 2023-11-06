<template>
    <div class="admin-newpost-page">
        <section class="new-post-form">
            <AdminPostForm @submit="onSubmited"></AdminPostForm>
        </section>
    </div>
</template>

<script>

export default {
  // layout: 'admin',
  middleware: ['check-auth', 'auth'],
  methods: {
    onSubmited(postData) {
      this.$store.dispatch('addPost', postData)
      .then(() => {
        this.$router.push('/admin');
      })
    }
  }
}
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>