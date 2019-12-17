<template>
<v-col class="d-flex child-flex clickable" cols="2">
  <v-card @click.native="navigate()">
  <v-img :src="image" aspect-ratio="1">
    <template v-slot:placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular indeterminate color="grey"></v-progress-circular>
      </v-row>
    </template>
  </v-img>
  <v-card-title v-html="item.Name"></v-card-title>
  <v-card-subtitle v-html="item.StateName"></v-card-subtitle>
  </v-card>
</v-col>

</template>

<script>
import axios from 'axios';

export default {
  props: [ 'item' ], 
  data () {
    return {
      image: ''
    }
  },
  created() {
    var vm = this;
    axios({ url: 'http://localhost:9000/TestVault/Demo/api/Files/' + vm.$props.item.Id +'/Preview', method: 'GET', responseType: 'arraybuffer', headers: {'Authorization': localStorage.getItem('token')}})
    .then(result => {
      vm.image = 'data:image/png;base64, ' +  Buffer.from(result.data, 'binary').toString('base64');
    });
  },
  methods: {
    navigate () {
      this.$router.push({ name: 'Details', params: { id: this.$props.item.Id }});
    }
  }
}
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>
