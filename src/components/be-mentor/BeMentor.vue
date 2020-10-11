<template>
  <div>
    <v-navbar></v-navbar>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-6">Choose your expertises</h1>
        <div class="row">
          <div class="col-6">
            <h3>Your Expertises</h3>
            <draggable
              class="list-group"
              :list="list1"
              group="people"
              @change="log"
            >
              <div
                class="list-group-item"
                v-for="(element) in list1"
                :key="element.name"
              >
                {{ element.name }}
              </div>
            </draggable>
          </div>

          <div class="col-6">
            <h3>All Expertises</h3>
            <draggable
              class="list-group"
              :list="list2"
              group="people"
              @change="log"
            >
              <div
                class="list-group-item"
                v-for="(element) in list2"
                :key="element.name"
              >
                {{ element.name }}
              </div>
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'

export default {
  name: 'BeMentor',
  display: 'Two BeMentor',
  order: 1,
  components: {
    draggable
  },
  data () {
    return {
      list1: [

      ],
      list2: [
        { name: 'Java', id: 1 },
        { name: '.NET', id: 2 },
        { name: 'nodeJS', id: 3 },
        { name: 'vueJS', id: 4 },
        { name: 'Angular', id: 1 },
        { name: 'Oracle', id: 2 },
        { name: 'CouchBase', id: 3 },
        { name: 'NoSQL', id: 4 },
        { name: 'Reactive Programming', id: 1 }
      ]
    }
  },
  methods: {
    log: function (evt) {
      window.console.log(evt)
    }
  }
}
</script>
<style scoped>
.list-group-item{
    color: black;
}
</style>
