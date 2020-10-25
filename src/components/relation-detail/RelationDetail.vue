<template>
  <div>
    <v-navbar></v-navbar>
    <b-jumbotron>
      <div class="container">
        <h1>Subjects of this relation : {{ this.subjects }}</h1>
        <b-card-group deck>
          <b-card no-body class="overflow-hidden border-0" style="max-width: 540px">
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
                    <h2>{{ this.creatorName }}</h2>
                    <h6>{{ this.otherMentors }}</h6>
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>

          <b-card no-body class="overflow-hidden border-0" style="max-width: 540px">
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
            <b-button variant="primary" @click="joinMentee" v-if = "!isCreator">Join</b-button>
          </b-card>
        </b-card-group>
        <b-form-group class="mt-4" label="Relation Phase:">
          <b-form-radio-group v-model="selected" name="radios-btn-default">
            <b-form-radio value="Not Started" size="lg" disabled
              >Not Started</b-form-radio
            >
            <b-form-radio value="Ready" size="lg" disabled>Ready</b-form-radio>
            <b-form-radio value="Ongoing" size="lg" disabled
              >Ongoing</b-form-radio
            >
            <b-form-radio value="Finished" size="lg" disabled
              >Finished</b-form-radio
            >
          </b-form-radio-group>
        </b-form-group>
        <b-button variant="primary" @click="backToList" v-if = "isCreator">Save</b-button>
        <b-button variant="secondary" @click="backToList"
          >Back to List</b-button
        >
      </div>
    </b-jumbotron>
  </div>
</template>
<script>
import expertises from '../../state/person-expertises'
import axios from 'axios'
import URL_CONSTANT from '../../URL_CONSTANT'

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
      subjects: expertises.state.subjects,
      isCreator: expertises.state.mentorLeaderName === localStorage.getItem('userName'),
      request: {},
      groupExpertiseRelation: {}
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
  methods: {
    backToList () {
      this.$router.push('/list-mentor')
    },
    joinMentee () {
      this.request = {}
      this.request.mentorGroupId = expertises.state.mentorGroupId
      this.request.userId = localStorage.getItem('id')
      this.request.groupName = 'MENTEE'
      this.request.authToken = localStorage.getItem('authToken')
      return new Promise((resolve, reject) => {
        axios({
          url: URL_CONSTANT.JOIN_RELATION,
          data: this.request,
          method: 'POST'
        }).then((resp) => {

        })
      })
    }
  },
  beforeMount () {
    console.log(expertises.state.phase)
  }
}
</script>
