<template>
  <div>
    <!-- Nav bar -->
    <nav class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row">
      <div class="container">
        <a class="navbar-brand float-left">MENU</a>
        <a class="navbar-brand flex-grow-1" v-if="currentUser!=null">Current user: {{currentUser.username}}</a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/">Home</router-link>
          </li>
          <li class="nav-item" v-if="currentUser==null">
            <router-link class="nav-link pr-3" to="/signup">Sign up</router-link>
          </li>
          <li class="nav-item" v-if="currentUser==null">
            <router-link class="nav-link pr-3" to="/signin">Sign in</router-link>
          </li>
          <li class="nav-item" v-if="currentUser!=null">
            <router-link class="nav-link pr-3" to="/signout">Sign out</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/view">User list</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/identity">Identity list</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Router view -->
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {UserPool} from './configure';

export default {
  data() {
    var cognitoUser = UserPool.getCurrentUser();
    return {
      currentUser: cognitoUser
    }
  }  
}
</script>

<style>
    .pr-3 {
        margin-right: 10px;
    }
</style>