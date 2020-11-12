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
            <b-col v-if="isStarted">
              <b-card-group deck>
                <b-card header="Choose a date">
                  <label for="example-datepicker">Next session subjects</label>
                  <b-form-input
                    v-model="sessionDescription"
                    placeholder="Subject Description"
                  ></b-form-input>
                  <b-alert
                    v-model="isDescriptionNotValid"
                    variant="danger"
                    dismissible
                    fade
                    class="mt-4"
                  >
                    Descrition required
                  </b-alert>
                  <b-form-datepicker
                    id="datepicker-sm"
                    size="sm"
                    v-model="sessionDate"
                    locale="en-US"
                    class="mb-2 mt-4"
                    :disabled="!isMentor"
                  ></b-form-datepicker>
                  <b-alert
                    v-model="isDateNotValid"
                    variant="danger"
                    dismissible
                    fade
                    class="mt-4"
                  >
                    Date is required
                  </b-alert>
                  <b-button
                    variant="primary"
                    @click="setNextSession"
                    v-if="isMentor"
                    >Set next session</b-button
                  >
                </b-card>
              </b-card-group>
            </b-col>
            <b-col v-if="isSessionHistoryExist">
              <b-card-group deck>
                <b-card header="Session History">
                  <b-list-group>
                    <b-list-group-item
                      v-for="session in sessionHistories"
                      :key="session.sessionDescription"
                    >
                      <div class="row">
                        <div class="col-8">
                          <h6>Date : {{ session.sessionDate }}</h6>
                          <h6>
                            Description : {{ session.sessionDescription }}
                          </h6>
                          <b-form-rating
                            :value="findRating(session.sessionRatings)"
                            v-if="isMenteeInRelation"
                          ></b-form-rating>
                        </div>
                        <div class="col-4">
                          <b-button variant="primary">Rate</b-button>
                        </div>
                      </div>

                      <span class="border-bottom"></span>
                    </b-list-group-item>
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
      isJoinEnable:
        expertises.state.otherMentees !== null
          ? !expertises.state.otherMentees.includes(
            localStorage.getItem('userName')
          ) &&
            expertises.state.mentorLeaderName !==
              localStorage.getItem('userName')
          : expertises.state.mentorLeaderName !==
            localStorage.getItem('userName'),
      item: {},
      items: [],
      isStarted: expertises.state.menteeCount !== 0,
      isMentor: localStorage.getItem('id') === expertises.state.mentorGroupId,
      sessionHistories: [],
      currentSessionHistory: {},
      isSessionHistoryExist: false,
      otherMentees: this.findOtherMentees(),
      sessionDescription: 'stestestes',
      sessionDate: '',
      isDescriptionNotValid: false,
      isDateNotValid: false,
      isMenteeInRelation: false
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
            result = result + ',' + element
          }
        })
        return result
      }
    }
  },
  methods: {
    findRating (sessionRatings) {
      if (sessionRatings) {
        sessionRatings.forEach((rating) => {
          if (rating.userId === localStorage.getItem('userId')) { return rating.rating }
        })
      }
    },
    setNextSession () {
      if (!this.sessionDescription) {
        this.isDescriptionNotValid = true
      }
      if (!this.sessionDate) {
        this.isDateNotValid = true
      }
      this.request = {}
      this.request.mentorGroupId = localStorage.getItem('id')
      this.request.sessionDescription = this.sessionDescription
      this.request.sessionDate = this.sessionDate

      return new Promise((resolve, reject) => {
        axios({
          url: UrlConstant.SET_NEXT_SESSION,
          data: this.request,
          method: 'POST'
        }).then((resp) => {
          if (resp.data.sessionHistory) {
            this.sessionHistories = []
            resp.data.sessionHistory.forEach((element) => {
              this.isSessionHistoryExist = true
              this.sessionHistories.push(element)
            })
          }
        })
      })
    },
    findOtherMentees () {
      var result = ''
      if (expertises.state.otherMentees) {
        expertises.state.otherMentees.forEach((element) => {
          if (result === '') {
            result = element
          } else {
            result = result + ',' + element
          }
        })
        return result
      } else {
        return 'There is no other mentees.'
      }
    },
    backToList () {
      this.$router.push('/list-mentor')
    },
    joinMentee () {
      this.request = {}
      this.request.mentorGroupId = expertises.state.mentorGroupId
      this.request.userId = localStorage.getItem('id')
      this.request.groupName = 'MENTEE'
      this.request.authToken = localStorage.getItem('authToken')
      if (localStorage.getItem('userRole') === 'USER') {
        localStorage.setItem('userRole', 'MENTEE')
      }
      this.otherMentees =
        this.otherMentees === 'There is no other mentees.'
          ? localStorage.getItem('userName')
          : this.otherMentees + ',' + localStorage.getItem('userName')
      this.isJoinEnable = false
      return new Promise((resolve, reject) => {
        axios({
          url: UrlConstant.JOIN_RELATION,
          data: this.request,
          method: 'POST'
        }).then((resp) => {
          this.startDate = resp.data.startDate
        })
      })
    }
  },
  beforeMount () {
    expertises.state.expertiseAreas.forEach((element) => {
      this.item = {}
      this.item.expertiseName = element.expertiseName
      this.item.expertiseDescription = element.expertiseDescription
      this.items.push(this.item)
      this.sessionHistories = []
      return new Promise((resolve, reject) => {
        axios({
          url: UrlConstant.GET_SESSION_INFO + expertises.state.mentorGroupId,
          method: 'GET'
        }).then((resp) => {
          console.log(resp.data.currentSession.sessionDescription)
          this.sessionDate = resp.data.currentSession.sessionDate
          this.sessionDescription = resp.data.currentSession.sessionDescription
          if (resp.data.sessionHistory) {
            this.isSessionHistoryExist = true
            resp.data.sessionHistory.forEach((element) => {
              this.sessionHistories.push(element)
            })
          }
        })
      })
    })
  }
}
</script>
