<template>
  <div id="app">
    <div id="search_box">
      Search box :<input v-model="search_box" placeholder="Search here">
      <button @click="this.sent_data">Go!</button>
    </div>
    <div v-for="x in response" v-bind:key="x.title">
      <Result v-bind:page_title="x.title" v-bind:url="x.url" v-bind:body="x.body"></Result>
    </div>
    <div v-if="server_status==2">
      <p>0 results </p>
    </div>
    <div v-if="server_status==0">
      <p>There was an error</p>
    </div>
    <div id="footer">
      This is an experimental project to create an open source search engine.
    </div>
  </div>

</template>

<script>
import Result from "./components/Result";
export default {
  name: 'App',
  components: {
    Result

  },
  data: function () {
    return {
      response:[],
      search_box:"",
      server_status:1,
    }

  },
  methods:{
    sent_data(){
      const data = { text: this.search_box };

      fetch("http://localhost:4000/api/", {
                method: 'POST',headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)
              }
      ).then(data=>data.json()).then(res=>{
        if(res.response.length==0){
          this.server_status=2
        }else{
          this.server_status=res.status
        }
        this.response=res.response
      })
    }
  },
  watch:{
    search_box:function () {
    }
  },
  created() {

  },

}
</script>

<style>
#footer{
  bottom: 0px;
  position: fixed;
}
#search_box{
  left: 0px;
  font-size: 34px;
  text-align: left;
  margin: 10px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
