<template>
  <div class="jumbotron jumbotron-fluid">
    <div class="container mt-4">
      <h1 class="display-6">
        {{ welcomeMessage }}
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
          <h3>{{ expertisesTitle }}</h3>
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
        <div class="mt-4 col-12" v-if="!isMentor">
          <h3>And you can add somekeywords for finding mentor.</h3>

          <b-form-tags
            input-id="tags-pills"
            tag-variant="primary"
            tag-pills
            size="lg"
            separator=" "
            v-model="keywords"
            placeholder="Enter new tags for expertises"
          ></b-form-tags>
        </div>
      </div>
      <div class="col-12">
        <b-button
          class="mt-4"
          pill
          size="lg"
          variant="dark"
          v-on:click="backToList"
          >Back</b-button
        >
        <b-button
          class="mt-4"
          pill
          size="lg"
          variant="dark"
          v-on:click="saveExpertise"
          >{{nextLabel}}</b-button
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
            <b-alert
          v-model="fullExpertises"
          variant="danger"
          dismissible
          fade
          class="mt-4"
        >
          You cannot choose more than 3 expertises.
        </b-alert>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import expertises from '../../state/expertises'
import usertype from '../../state/usertype'
import listrelation from '../../state/list-relation'

export default {
  name: 'ChooseExpertise',
  display: 'Choose Expertise',
  order: 1,
  components: {
    draggable
  },
  data () {
    return {
      emptyExpertiseList: false,
      fullExpertises: false,
      yourExpertises: [],
      keywords: [],
      isMentor: usertype.state === 'MENTOR',
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
          element.category = 'Database'
          this.allExpertises.push(element)
        }
      })
    },
    fillProgrammingLanguages: function (evt) {
      this.allExpertises.length = 0
      this.languageList.forEach((element) => {
        element.category = 'Language'
        if (!this.yourExpertises.includes(element)) {
          this.allExpertises.push(element)
        }
      })
    },
    fillFrameworks: function (evt) {
      this.allExpertises.length = 0
      this.frameworkList.forEach((element) => {
        element.category = 'Framework'

        if (!this.yourExpertises.includes(element)) {
          this.allExpertises.push(element)
        }
      })
    },
    fillOthers: function (evt) {
      this.allExpertises.length = 0
      this.otherList.forEach((element) => {
        element.category = 'Other'
        if (!this.yourExpertises.includes(element)) {
          this.allExpertises.push(element)
        }
      })
    },
    saveExpertise: function () {
      this.yourExpertises = this.yourExpertises.filter(
        (expertise) => expertise.id !== 0
      )
      if (this.yourExpertises.length < 1) {
        this.emptyExpertiseList = true
      } else if (this.yourExpertises.length > 3) {
        this.fullExpertises = true
      } else {
        expertises.state = this.yourExpertises

        if (this.isMentor) {
          this.$router.push('/finalize-be-mentor')
        } else {
          listrelation.state = 'search'
          expertises.keywords = this.keywords
          this.$router.push('/finalize-find-mentor')
        }
      }
    },
    backToList () {
      listrelation.state = 'user'
      this.$router.push('/list-mentor')
    }
  },
  computed: {
    welcomeMessage: function () {
      if (usertype.state === 'MENTOR') {
        return 'Choose your expertises from All Expertises and drag to Your Expertises'
      } else {
        return 'Choose expertises want to learn from All Expertises and drag to Wanna Learn Expertises'
      }
    },
    expertisesTitle: function () {
      if (usertype.state === 'MENTOR') {
        return 'Your Expertises'
      } else {
        return 'Wanna Learn Expertises'
      }
    },
    nextLabel: function () {
      if (usertype.state === 'MENTOR') {
        return 'Next'
      } else {
        return 'Search'
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
