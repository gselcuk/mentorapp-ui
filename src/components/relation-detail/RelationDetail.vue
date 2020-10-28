<template>
  <div>
    <v-navbar></v-navbar>
    <b-jumbotron>
      <div class="container">
        <h1>Subjects of this relation : {{ this.subjects }}</h1>
        <h3 class="mt-4">Start Date: {{ this.startDate }}</h3>
        <b-card-group deck>
          <b-card
            no-body
            class="overflow-hidden border-0"
            style="max-width: 540px"
          >
            <b-row no-gutters>
              <b-col md="6">
                <b-card-img
                  src="../../assets/default-mentor.png"
                  alt="Image"
                  class="d-none d-lg-block rounded-0"
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

          <b-card
            no-body
            class="overflow-hidden border-0"
            style="max-width: 540px"
          >
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
                  class="d-none d-lg-block rounded-0"
                ></b-card-img>
              </b-col>
            </b-row>
          </b-card>
        </b-card-group>
        <b-container class="bv-example-row mt-4">
          <b-row>
            <b-col>
              <b-card-group deck>
                <b-card header="Expertise Description">
                  <b-list-group>
                    <b-list-group-item v-for="i in items" :key="i.expertiseName"
                      >{{ i.expertiseName }} :
                      {{ i.expertiseDescription }}</b-list-group-item
                    >
                  </b-list-group>
                </b-card>
              </b-card-group>
            </b-col>
            <b-col v-if ="isStarted">
              <b-card-group deck>
                <b-card header="Choose a date">
                  <label for="example-datepicker">Next session subjects</label>
                  <b-form-input
                    v-model="sessionSubject"
                    placeholder="Subject Description"
                  ></b-form-input>

                  <b-form-datepicker
                    id="example-datepicker"
                    v-model="sessionDate"
                    class="mb-2 mt-4"
                    :disabled="!isMentor"
                  ></b-form-datepicker>
                  <b-button variant="primary" @click="setNextSession" v-if = "isMentor"
                    >Set next session</b-button
                  >
                  <b-button variant="primary" @click="setCompleted"  v-if = "isMentor"
                    >Completed</b-button
                  >
                </b-card>
              </b-card-group>
            </b-col>
            <b-col  v-if ="isSessionHistoryExist">
              <b-card-group deck>
                <b-card header="Session History">
                  <b-list-group>
                    <b-list-group-item v-for="session in sessionHistories" :key="session.expertiseName"
                      >{{ session.sessionDescription }} :
                      {{ session.sessionDate  }}</b-list-group-item
                    >
                  </b-list-group>
                </b-card>
              </b-card-group>
            </b-col>
          </b-row>
        </b-container>

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
        <b-button variant="primary" @click="joinMentee" v-if="isJoinEnable"
          >Join</b-button
        >
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
import UrlConstant from '../../UrlConstant'

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
      request: {},
      groupExpertiseRelation: {},
      startDate: expertises.state.startDate,
      isJoinEnable: expertises.state.otherMentees !== null
        ? !expertises.state.otherMentees.includes(
          localStorage.getItem('userName')
        ) && expertises.state.mentorLeaderName !==
          localStorage.getItem('userName')
        : expertises.state.mentorLeaderName !==
          localStorage.getItem('userName'),
      item: {},
      items: [],
      isStarted: expertises.state.menteeCount !== 0,
      isMentor: localStorage.getItem('userRole') === 'MENTOR_GROUP_LEADER',
      sessionHistories: [],
      currentSessionHistory: {},
      isSessionHistoryExist: false
    }
  },
  computed: {
    otherMentors: function () {
      var result = ''
      if (expertises.state.otherMentors) {
        expertises.state.otherMentors.forEach((element) => {
          if (result === '') {
            result = element
          } else {
            element = element + ',' + result
          }
        })
        return result
      }
    },
    otherMentees: function () {
      var result = ''
      if (expertises.state.otherMentees) {
        expertises.state.otherMentees.forEach((element) => {
          if (result === '') {
            result = element
          } else {
            element = element + ',' + result
          }
        })
        return result
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
      if (localStorage.getItem('userRole') === 'UESR') {
        localStorage.setItem('MENTEE')
      }
      return new Promise((resolve, reject) => {
        axios({
          url: UrlConstant.JOIN_RELATION,
          data: this.request,
          method: 'POST'
        }).then((resp) => {})
      })
    }
  },
  beforeMount () {
    expertises.state.expertiseAreas.forEach((element) => {
      this.item = {}
      this.item.expertiseName = element.expertiseName
      this.item.expertiseDescription = element.expertiseDescription
      this.items.push(this.item)
    })
  }
}
</script>
