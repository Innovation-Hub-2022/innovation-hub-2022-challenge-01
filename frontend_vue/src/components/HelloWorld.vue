<template>
  <div class="hello">
    <div>
      <label v-if="cognitoUser!=null">Current user: {{cognitoUser.username}}</label>
      <div class="d-flex">
        <label class="col-1">API url:</label>
        <input type="text" v-model="url" class="col-6">
      </div>
      <button @click.prevent="getAuthorizeMethod()" class="btn btn-primary">Call get method</button>
      <button @click.prevent="getRefreshSession()" v-if=isNeedRefresh class="btn btn-info">Refresh session</button>
      <button @click.prevent="getLogin()" v-if=isNeedLogin class="btn btn-info">Sign in</button>
      <div> 
        {{response}}
      </div>
    </div>
    <div v-if="false">
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
    </div>
  </div>
</template> 

<script>
import axios from "axios";
import {UserPool} from '../configure';

export default {
  data() {
    return {
      response: ' ',
      isNeedRefresh: false,
      isNeedLogin: false,
      url: window.localStorage.getItem('url'),
      cognitoUser: UserPool.getCurrentUser()
    }
  },
  methods: {
    getLogin() {
      this.$router.push('/signin');
    },
    getRefreshSession() {
      this.cognitoUser.getSession((err, result) => {
        this.isNeedRefresh = false;
        console.log("Get Session error: " + err)
        console.log("idToken will expired at:" + new Date(result.idToken.payload.exp * 1000).toISOString());
        console.log("accessToken will expired at:" + new Date(result.accessToken.payload.exp * 1000).toISOString());
       });
    },
    getAuthorizeMethod() {
      window.localStorage.setItem('url', this.url);
      var XCogId = '';
      if(this.cognitoUser != null) {
        const propertyName = this.cognitoUser.keyPrefix + '.' + this.cognitoUser.username + ".idToken";
        XCogId = this.cognitoUser.pool.storage[propertyName];
      }
      if(!this.url) return;
      axios.get(this.url, 
          { 
            headers: {
              'X-COG-ID': XCogId,
            }
          }
        )
        .then((response) => {
          this.response = "Returned get method: '" + JSON.stringify(response.data, null, '\t\n') + "'";
          this.isNeedRefresh = false;
          this.isNeedLogin = false;
          console.log(response);
        })
        .catch(error => {
          if(error.response) {
            this.isNeedLogin = error.response.data.message == "Unauthorized"
            this.isNeedRefresh = error.response.data.message == "The incoming token has expired"
            this.response = "Returned get method: '" + error.response.data.message + "'";
          }
          else {
            this.response = "Returned get method: '" + error + "'";
          }
//          debugger; // eslint-disable-line no-debugger
          console.log(error)
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
