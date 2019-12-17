<template>
    <v-app>
        <v-app-bar app>
            <router-link to="/"> <span class="title ml-3 mr-5">PDM&nbsp;<span class="font-weight-light">WEB API</span></span></router-link>
            <v-text-field v-if="loggedIn"
              v-model="searchText"
              solo-inverted
              flat
              hide-details
              label="Search"
              prepend-inner-icon="brick-search"
              @keydown.enter="search()"
            />

            <v-spacer></v-spacer>
            <span class="title ml-3 mr-5" v-if="loggedIn">{{username}}</span>
            <v-btn v-if="loggedIn" @click="logout()">Logout</v-btn>
            <v-btn v-if="!loggedIn" @click="navigate('/login')">Login</v-btn>
        </v-app-bar>
        <v-content>
            <v-container fluid>
                <v-row>
                    <v-col>
                        <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <router-view></router-view>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>

    </v-app>
</template>

<script>
import { router } from './_helpers'

export default {
    name: 'app',
    data () {
        return {
          searchText: ''
        }
    },
    methods: {
        navigate (path) {
            if(path !== router.currentRoute.path){
                router.push({ path: path })
            }
        },
        search () {
            var vm = this;
            router.push({ path: '/' });
            this.$store.dispatch('search/search', vm.searchText);
        },
        logout () {
            this.$store.dispatch('authentication/logout');
            router.push('/');
        }
    },
    computed: {
        alert () {
            return this.$store.state.alert
        },
        loggedIn () {
            return this.$store.state.authentication.username !== null;
        },
        username () {
            return this.$store.state.authentication.username;
        }
    },
    watch:{
        // eslint-disable-next-line
        $route (to, from){
            // clear alert on location change
            this.$store.dispatch('alert/clear');
        }
    }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
    height: 100%;
}
</style>
