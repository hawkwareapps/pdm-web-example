<template>
  <v-col>
    <v-row>
      <v-col cols="12" class="text-left">
        <router-link :to="-1">Back</router-link>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-img :src="image" aspect-ratio="1">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
      <v-col cols="8">
        <v-tabs v-if="item" v-model="tab">
          <v-tab v-for="c in item.Configurations" v-bind:key="c.Id">
            {{c.Name}}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-if="item" v-model="tab">
          <v-tab-item v-for="c in item.Configurations" v-bind:key="c.Id">
            <v-list>
                <v-list-item v-for="p in c.Properties" v-bind:key="p.Id">
                <v-list-item-title>{{p.Name}}</v-list-item-title>
                <v-list-item-subtitle>{{p.Value}}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'],
  data() {
    return {
      tab: null,
      number: '',
      description: '',
      properties: [],
      item: null,
      image: ''
    }
  },
  created () {
    var vm = this;
    axios({ url: 'http://localhost:9000/TestVault/Demo/api/Files/' + vm.$props.id +'/Preview', method: 'GET', responseType: 'arraybuffer', headers: {'Authorization': localStorage.getItem('token')}})
    .then(result => {
      vm.image = 'data:image/png;base64, ' +  Buffer.from(result.data, 'binary').toString('base64');
    });

    axios({ url: 'http://localhost:9000/TestVault/Demo/api/Files/' + vm.$props.id + '/Details', method: 'GET', headers: { 'Authorization': localStorage.getItem('token')}})
    .then(result => {
      vm.item = result.data;
      vm.tab = 0;
      vm.number  = result.data.Configurations[0].Properties.find((p) => { 
        return p.Name == 'Number';
      }).Value;
    });
  }
}
</script>
