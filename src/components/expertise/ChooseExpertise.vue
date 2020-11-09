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
          v-for="element in expertises"
          :key="element.subject"
          @click="fillSubjects(element.expertiseNames,element.subject)"
          >{{ element.subject }}</b-button
        >
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
              :key="element.expertiseName"
            >
              {{ element.expertiseName }}
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
              :key="element.expertiseName"
            >
              {{ element.expertiseName }}
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
          >{{ nextLabel }}</b-button
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
import axios from 'axios'
import UrlConstant from '../../UrlConstant'

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
      expertises: [],
      yourExpertises: [],
      keywords: [],
      isMentor: usertype.state === 'MENTOR',
      allExpertises: [{ expertiseName: 'Choose expertise from above', id: 0 }]
    }
  },
  methods: {
    log: function (evt) {
      window.console.log(evt)
    },
    fillSubjects (expertises, subject) {
      this.allExpertises.length = 0
      expertises.forEach((element) => {
        const exprtse = {}
        exprtse.category = subject
        exprtse.expertiseName = element
        if (!this.yourExpertises || this.yourExpertises.filter(x => x.expertiseName === element).length === 0) {
          this.allExpertises.push(exprtse)
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
  },
  beforeMount () {
    return new Promise((resolve, reject) => {
      axios({
        url: UrlConstant.GET_ADMIN_OBJECT + 'EXP',
        data: this.request,
        method: 'GET'
      })
        .then((resp) => {
          if (resp.data) {
            console.log(JSON.parse(resp.data.object))
            this.expertises = JSON.parse(resp.data.object)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }
}
</script>
<style scoped>
.list-group-item {
  color: black;
}
</style>
