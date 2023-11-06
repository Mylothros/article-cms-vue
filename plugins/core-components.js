import Vue from 'vue';

import PostList from '@/components/Posts/PostList.vue';
import AdminPostForm from '@/components/admin/AdminPostForm.vue';
import AppButton from '@/components/UI/AppButton';

Vue.component('AppButton', AppButton);
Vue.component('PostList', PostList);
Vue.component('AdminPostForm', AdminPostForm);