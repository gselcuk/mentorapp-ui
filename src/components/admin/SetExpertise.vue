<template>
  <div>
    <v-navbar></v-navbar>
    <div class="jumbotron jumbotron-fluid">
      <div class="container mt-4">
        <h1>All Expertises</h1>
        <b-card-group deck>
          <b-card
            v-for="element in expertises"
            :key="element.id"
            :header="element.subject"
            :footer="element.subject"
          >
            <b-card-text>{{ element.expertiseNames }}</b-card-text>
            <b-button @click="edit(element)" variant="primary">Edit</b-button>
          </b-card>

          <b-card
            title="You can add expertises here."
            header-tag="header"
            footer-tag="footer"
          >
            <template #header>
              <h6 class="mb-0">Expertise Management</h6>
            </template>
            <b-button @click="addExpertise" variant="primary"
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
                <b-form-textarea
                  id="textarea-default"
                  placeholder=" Description"
                  v-model="expertise.subject"
                ></b-form-textarea>
              </b-col>
            </b-row>
            <div>
              <label for="tags-pills">Expertises</label>
              <b-form-tags
                input-id="tags-pills"
                tag-variant="primary"
                tag-pills
                size="lg"
                separator=" "
                placeholder="Expertise names"
                v-model="expertise.expertiseNames"
              ></b-form-tags>
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
              <b-button @click="saveExpertise" variant="primary">Save</b-button>
            </div>
          </b-card>
        </b-card-group>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      expertises: [],
      expertise: {},
      isExpertise: true,
      isSaveExpertiseNotValid: false,
      id: 1
    }
  },
  methods: {
    addExpertise () {
      this.isSaveExpertiseNotValid = false
      this.isExpertise = !this.isExpertise
    },
    saveExpertise () {
      if (this.expertise.subject && this.expertise.expertiseNames) {
        if (!this.expertise.id) {
          this.expertise.id = this.id
          this.id = this.id + 1
          this.expertises.push(this.expertise)
        } else {
          console.log('tests')
          const index = this.expertises.findIndex(obj => obj.id === this.expertise.id)
          this.expertises[index] = this.expertise
        }

        this.isExpertise = !this.isExpertise
        this.expertise = {}
      } else {
        this.isSaveExpertiseNotValid = true
      }
    },
    edit (element) {
      this.expertise.subject = element.subject
      this.expertise.expertiseNames = element.expertiseNames
      this.expertise.id = element.id
      this.isExpertise = false
    }
  }
}
</script>
