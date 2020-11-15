<template>
  <div>
    <v-navbar></v-navbar>
    <div class="jumbotron jumbotron-fluid">
      <div class="container mt-4">
        <h1>All Expertises</h1>
        <b-card-group deck>
          <b-card
            v-for="element in expertises"
            :key="element.subject"
            :header="element.subject"
            :footer="element.subject"
          >
            <b-card-text>{{ element.expertiseNames }}</b-card-text>
            <b-button @click="edit(element)" variant="dark">Edit</b-button>
          </b-card>

          <b-card
            title="You can add expertises here."
            header-tag="header"
            footer-tag="footer"
          >
            <template #header>
              <h6 class="mb-0">Expertise Management</h6>
            </template>
            <b-button @click="addExpertise" variant="dark"
              >Add Expertise</b-button
            >
            <template #footer>
              <h6 class="mb-0">Expertise Management</h6>
            </template>
          </b-card>
        </b-card-group>
        <b-card-group deck class="mt-4" v-if="!isExpertise">
          <b-card>
            <b-row class="mt-2">
              <b-col sm="2">
                <label for="textarea-default">Expertise Subject:</label>
              </b-col>
              <b-col sm="10">
                <b-form-input
                  id="input-small"
                  placeholder="Subject of Expertise"
                  v-model="expertise.subject"
                ></b-form-input>
              </b-col>
            </b-row>
            <div>
              <b-row class="mt-2">
                <b-col sm="2">
                  <label for="input-small">Expertise Name:</label>
                </b-col>
                <b-col sm="10">
                  <div class="input-group mb-3">
                    <b-form-input
                      id="input-small"
                      placeholder="Name of subject"
                      v-model="expertiseName"
                    ></b-form-input>
                    <div class="input-group-append">
                      <b-button
                        variant="outline-success"
                        id="enter"
                        type="button"
                        @click="addExpertiseToExpertises"
                      >
                        +
                      </b-button>
                    </div>
                  </div>
                </b-col>
                <b-col sm="12">
                  <b-alert
                    v-model="isExpertiseNameNotValid"
                    variant="danger"
                    dismissible
                    fade
                  >
                    Name of subject cannot be null
                  </b-alert>
                </b-col>
                <b-col>
                  <b-list-group
                    v-for="element in expertiseNames"
                    :key="element"
                  >
                    <b-list-group-item
                      >{{ element }}
                      <b-button
                        variant="outline-danger"
                        id="enter"
                        type="button"
                        @click="removeExpertiseFromExpertises(element)"
                      >
                        -
                      </b-button>
                    </b-list-group-item>
                  </b-list-group>
                </b-col>
              </b-row>
            </div>
            <div class="mt-2">
              <b-alert
                v-model="isSaveExpertiseNotValid"
                variant="danger"
                dismissible
                fade
              >
                Both of fields need to be filled for adding new expertise or
                edit!
              </b-alert>
            </div>

            <div class="mt-2">
              <b-button @click="saveExpertise" variant="dark">Save</b-button>
            </div>
          </b-card>
        </b-card-group>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import UrlConstant from '../../UrlConstant'

export default {
  data () {
    return {
      expertises: [],
      expertise: {},
      expertiseNames: [],
      isExpertise: true,
      isSaveExpertiseNotValid: false,
      expertiseName: '',
      request: {},
      isExpertiseNameNotValid: false,
      state: 'ADD',
      lastId: 0
    }
  },
  methods: {
    addExpertise () {
      this.isSaveExpertiseNotValid = false
      this.isExpertise = !this.isExpertise
      this.expertiseSubject = ''
      this.expertiseName = ''
      this.expertiseNames = []
      this.state = 'ADD'
    },
    addExpertiseToExpertises () {
      if (this.expertiseName !== '') {
        const index = this.expertiseNames.findIndex(
          (obj) => obj === this.expertiseName
        )
        if (index === -1) {
          this.expertiseNames.push(this.expertiseName)
        }
      } else {
        this.isExpertiseNameNotValid = true
      }
    },
    removeExpertiseFromExpertises (element) {
      const index = this.expertiseNames.findIndex((obj) => obj === element)
      this.expertiseNames.splice(index, 1)
    },
    saveExpertise () {
      this.expertise.expertiseNames = this.expertiseNames
      if (
        this.expertise.subject &&
        this.expertise.expertiseNames.length !== 0
      ) {
        const index = this.expertises.findIndex(
          (obj) => obj.id === this.expertise.id
        )
        if (index === -1 && this.state === 'ADD') {
          this.lastId = this.lastId + 1
          this.expertise.id = this.lastId
          this.expertises.push(this.expertise)
        } else {
          this.expertises[index] = this.expertise
          console.log(this.expertises)
        }
        this.request.objectType = 'EXP'
        console.log(this.expertises)

        this.request.object = JSON.stringify(this.expertises)
        return new Promise((resolve, reject) => {
          axios({
            url: UrlConstant.SET_ADMIN_OBJECT,
            data: this.request,
            method: 'POST'
          })
            .then((resp) => {
              this.isExpertise = !this.isExpertise
              this.expertise = {}
              this.expertiseNames = []
              this.expertiseName = ''
            })
            .catch((err) => {
              console.log(err)
            })
        })
      } else {
        this.isSaveExpertiseNotValid = true
      }
    },
    edit (element) {
      this.state = 'EDIT'
      this.expertise.subject = element.subject
      this.expertiseNames = element.expertiseNames
      this.expertise.id = element.id
      this.isExpertise = false
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
            this.expertises = JSON.parse(resp.data.object)
            if (this.expertises) this.lastId = this.expertises.length
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }
}
</script>
