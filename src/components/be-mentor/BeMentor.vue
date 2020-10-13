<template>
  <div>
    <v-navbar></v-navbar>
    <div class="jumbotron jumbotron-fluid">
      <div class="container mt-4">
        <h1 class="display-6">
          Choose your expertises from All Expertises and drag to Your Expertises
        </h1>
        <div class="btn-group mt-4" role="group" aria-label="Basic example">
          <b-button
            type="button"
            class="btn btn-secondary"
            variant="dark"
            v-on:click="fillDatabase"
            >Database</b-button
          >
          <b-button
            type="button"
            class="btn btn-secondary"
            variant="dark"
            v-on:click="fillProgrammingLanguages"
          >
            Programming Languages
          </b-button>
          <b-button
            type="button"
            class="btn btn-secondary"
            variant="dark"
            v-on:click="fillFrameworks"
          >
            Javascript Frameworks
          </b-button>
          <b-button
            type="button"
            class="btn btn-secondary"
            variant="dark"
            v-on:click="fillOthers"
          >
            Others
          </b-button>
        </div>
        <div class="row mt-4">
          <div class="col-6">
            <h3>Your Expertises</h3>
            <draggable
              class="list-group"
              :list="yourExpertises"
              group="people"
              @change="log"
            >
              <div
                class="list-group-item"
                v-for="element in yourExpertises"
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
              :list="allExpertises"
              group="people"
              @change="log"
            >
              <div
                class="list-group-item"
                v-for="element in allExpertises"
                :key="element.name"
              >
                {{ element.name }}
              </div>
            </draggable>
          </div>
        </div>
        <div class="col-12">
          <b-button
            class="mt-4"
            pill
            size="lg"
            variant="dark"
            v-on:click="saveExpertise"
            >Next</b-button
          >
          <b-alert
            v-model="emptyExpertiseList"
            variant="danger"
            dismissible
            fade
            class="mt-4"
          >
            Your Expertises Empty ! Please Choose at Least 1 Expertise.
          </b-alert>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import expertises from '../../state/expertises'

export default {
  name: 'BeMentor',
  display: 'Be Mentor',
  order: 1,
  components: {
    draggable
  },
  data () {
    return {
      emptyExpertiseList: false,
      yourExpertises: [],
      allExpertises: [{ name: 'Choose expertise from above', id: 0 }],
      languageList: [
        { name: 'Java', id: 8 },
        { name: '.NET', id: 9 },
        { name: 'C', id: 10 },
        { name: 'C++', id: 11 },
        { name: 'COBOL', id: 12 }
      ],
      frameworkList: [
        { name: 'nodeJs', id: 13 },
        { name: 'vueJs', id: 14 },
        { name: 'Angular', id: 15 },
        { name: 'React', id: 16 }
      ],
      databaseList: [
        { name: 'Oracle', id: 17 },
        { name: 'Couchbase', id: 18 },
        { name: 'MongoDB', id: 19 },
        { name: 'CassandraDB', id: 20 },
        { name: 'DynamoDB', id: 21 }
      ],
      otherList: [
        { name: 'Apache Kafka', id: 22 },
        { name: 'Redis', id: 23 },
        { name: 'RabbitMQ', id: 24 },
        { name: 'Docker', id: 25 },
        { name: 'Jenkins', id: 26 }
      ]
    }
  },
  methods: {
    log: function (evt) {
      window.console.log(evt)
    },
    fillDatabase: function (evt) {
      this.allExpertises.length = 0
      this.databaseList.forEach((element) => {
        if (!this.yourExpertises.includes(element)) {
          this.allExpertises.push(element)
        }
      })
    },
    fillProgrammingLanguages: function (evt) {
      this.allExpertises.length = 0
      this.languageList.forEach((element) => {
        if (!this.yourExpertises.includes(element)) {
          this.allExpertises.push(element)
        }
      })
    },
    fillFrameworks: function (evt) {
      this.allExpertises.length = 0
      this.frameworkList.forEach((element) => {
        if (!this.yourExpertises.includes(element)) {
          this.allExpertises.push(element)
        }
      })
    },
    fillOthers: function (evt) {
      this.allExpertises.length = 0
      this.otherList.forEach((element) => {
        if (!this.yourExpertises.includes(element)) {
          this.allExpertises.push(element)
        }
      })
    },
    saveExpertise: function () {
      this.yourExpertises = this.yourExpertises.filter(expertise => expertise.id !== 0)
      if (this.yourExpertises.length < 1) {
        this.emptyExpertiseList = true
      } else {
        expertises.state = this.yourExpertises
        this.$router.push('/finalize-be-mentor')
      }
    }
  }
}
</script>
<style scoped>
.list-group-item {
  color: black;
}
</style>
