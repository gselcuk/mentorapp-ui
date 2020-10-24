<template>
  <div>
    <v-navbar></v-navbar>
    <b-jumbotron>
      <div class="container">
        <b-card-group deck>
          <b-card no-body class="overflow-hidden" style="max-width: 540px">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-img
                  src="../../assets/default-mentor.png"
                  alt="Image"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col md="6">
                <b-card-body title="Mentor">
                  <b-card-text>
                    <h2 >{{ this.creatorName }}</h2>
                    <h6>{{ this.otherMentors }}</h6>
                    <h3>{{ this.subjects }}</h3>
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>

          <b-card no-body class="overflow-hidden" style="max-width: 540px">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-body title="Mentee">
                  <b-card-text>
                    <h6>{{ this.otherMentees }}</h6>
                  </b-card-text>
                </b-card-body>
              </b-col>
              <b-col md="6">
                <b-card-img
                  src="../../assets/default-mentee.png"
                  alt="Image"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
            </b-row>
          </b-card>
        </b-card-group>
        <b-form-group class="mt-4" label="Relation Phase:">
          <b-form-radio-group
            v-model="selected"
            name="radios-btn-default"
          >
            <b-form-radio value="Not Started" size="lg">Not Started</b-form-radio>
            <b-form-radio value="Ready" size="lg">Ready</b-form-radio>
            <b-form-radio value="Ongoing" size="lg">Ongoing</b-form-radio>
            <b-form-radio value="Finished" size="lg">Finished</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
         <b-button variant="primary" @click  ="backToList" >Save</b-button>
         <b-button variant="secondary" @click  ="backToList" >Back to List</b-button>
      </div>
    </b-jumbotron>
  </div>
</template>
<script>
import expertises from '../../state/person-expertises'

export default {
  name: 'RelationDetail',
  data () {
    return {
      selected: expertises.state.phase,
      fields: [
        'mentorLeaderName',
        'subjects',
        'menteeCount',
        'phase',
        'show_details'
      ],
      expertises: expertises.state,
      creatorName: expertises.state.mentorLeaderName,
      subjects: expertises.state.subjects
    }
  },
  computed: {
    otherMentors: function () {
      if (expertises.state.otherMentors) {
        return expertises.state.otherMentors
      } else {
        return 'There is no other mentors.'
      }
    },
    otherMentees: function () {
      if (expertises.state.otherMentees) {
        return expertises.state.otherMentees
      } else {
        return 'There is no other mentees.'
      }
    }
  },
  methods: {backToList () {
    this.$router.push('/list-mentor')
  }
  },
  beforeMount () {
    console.log(expertises.state.phase)
  }
}
</script>
