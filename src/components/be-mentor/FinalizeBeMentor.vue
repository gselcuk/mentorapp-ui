<template>
  <div>
    <v-navbar></v-navbar>
    <div class="jumbotron jumbotron-fluid">
      <div class="container mt-4">
        <h1 class="display-6">
          Choose your expertises from All Expertises and drag to Your Expertises
        </h1>
        <div>
          <b-card-group deck>
            <b-card
              v-for="element in yourExpertises"
              :key="element.expertiseName"
              :header="element.expertiseName"
              :footer="element.category"
            >
              <b-row class="mt-2">
                <b-col sm="10">
                  <b-form-textarea
                    id="textarea-default"
                    placeholder="Enter Description"
                    v-model="element.description"
                  ></b-form-textarea>
                </b-col>
              </b-row>
              <div>
                <label for="tags-pills">Enter tags</label>
                <b-form-tags
                  input-id="tags-pills"
                  v-model="element.keywords"
                  tag-variant="primary"
                  tag-pills
                  size="sm"
                  separator=" "
                  placeholder="Enter new tags for expertises"
                ></b-form-tags>
              </div>
            </b-card>
          </b-card-group>
        </div>
        <div class="col-12">
          <b-button
            class="mt-4"
            pill
            size="lg"
            variant="dark"
            v-on:click="backToBeMentor"
            >Back</b-button
          >
          <b-button
            class="mt-4"
            pill
            size="lg"
            variant="dark"
            v-on:click="saveExpertise"
            >Save</b-button
          >
          <b-alert v-model="isSaveFailed" variant="danger" dismissible fade>
            Save operation failed!
          </b-alert>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import expertises from '../../state/expertises'
import axios from 'axios'
import UrlConstant from '../../UrlConstant'

export default {
  name: 'FinalizeBeMentor',
  display: 'Finalize Be Mentor',
  order: 1,
  components: {},
  data () {
    return {
      yourExpertises: expertises.state,
      description: '',
      request: {},
      expertises: [],
      expertise: {},
      isSaveFailed: false
    }
  },
  methods: {
    backToBeMentor () {
      this.$router.push('/be-mentor')
    },
    checkExpertises () {
      if (this.yourExpertises.length < 1) {
        this.$router.push('/be-mentor')
      }
    },
    saveExpertise () {
      this.request.groupExpertiseRelation = {}
      this.request.groupExpertiseRelation.mentorGroupId = localStorage.getItem(
        'id'
      )
      this.request.groupExpertiseRelation.expertiseAreas = []
      this.yourExpertises.forEach((element) => {
        this.expertise = {}
        this.expertise.category = element.category
        this.expertise.expertiseName = element.expertiseName
        if (element.description) {
          this.expertise.expertiseDescription = element.description
        }
        if (element.keywords) {
          element.keywords.forEach((keyword) => {
            this.expertise.keywords = []
            this.expertise.keywords.push(keyword)
          })
        }
        this.request.groupExpertiseRelation.expertiseAreas.push(this.expertise)
      })

      this.request.authToken = localStorage.getItem('authToken')
      return new Promise((resolve, reject) => {
        axios({
          url: UrlConstant.BE_MENTOR,
          data: this.request,
          method: 'POST'
        })
          .then((resp) => {
            localStorage.setItem('userRole', 'MENTOR_GROUP_LEADER')
            this.$router.push('/list-mentor')
          })
          .catch((err) => {
            console.log(err)
            this.isSaveFailed = true
          })
      })
    },
    beforeMount () {
      this.checkExpertises()
    }
  }
}
</script>

  <style scoped>
.card {
  color: black;
}
</style>
