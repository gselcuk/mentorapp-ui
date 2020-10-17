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
              :key="element.name"
              :header="element.name"
              :footer="element.category"
            >
              <b-row class="mt-2">
                <b-col sm="2">
                  <label for="textarea-default">Description:</label>
                </b-col>
                <b-col sm="10">
                  <b-form-textarea
                    id="textarea-default"
                    placeholder="Enter Description"
                    v-model = "description"
                  ></b-form-textarea>
                </b-col>
              </b-row>
              <div>
                <label for="tags-pills">Enter tags</label>
                <b-form-tags
                  input-id="tags-pills"
                  v-model="value"
                  tag-variant="primary"
                  tag-pills
                  size="lg"
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
            v-on:click="saveExpertise"
            >Save</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import expertises from '../../state/expertises'

export default {
  name: 'FinalizeBeMentor',
  display: 'Finalize Be Mentor',
  order: 1,
  components: {},
  data () {
    return {
      yourExpertises: expertises.state,
      description: ''
    }
  },
  methods: {
    checkExpertises () {
      if (this.yourExpertises.length < 1) {
        this.$router.push('/be-mentor')
      }
    }
  },
  addDescription (expertise) {
    expertise.description = this.description
  },
  saveExpertise () {},
  beforeMount () {
    this.checkExpertises()
  }
}
</script>

<style scoped>
.card {
  color: black;
}
</style>
