<template>
    <div class="admin-post-page">
        <section class="update-form">
            <AdminPostForm :post="loadedPost" @submit="onSubmitted"/>
        </section>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    layout: 'admin',
    middleware: ['check-auth', 'auth'],
    asyncData(context) {
        const url = process.env.baseUrl + '/posts/' + context.params.postId + '.json';
        // we are not the client so context can be used and not route
        return axios.get(url)
        .then(res => {
        return {
            loadedPost: { ...res.data, id: context.params.postId }
        }
        })
        .catch(e => context.error(e))
    },
    methods: {
        onSubmitted(editedPost) {
           this.$store.dispatch('editPost',editedPost)
           .then(() => {
            this.$router.push("/admin");
           })
        }
    }
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>