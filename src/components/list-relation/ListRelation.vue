<template>
  <div class="container">
    <b-table
      class="mt-4"
      :items="items"
      :fields="fields"
      striped
      hover
      responsive="sm"
      caption-top
      :busy="isBusy"
    >
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template #cell(show_details)="show_details">
        <b-button
          size="sm"
          @click="relationDetail(show_details.index)"
          class="mr-2"
        >
          {{ buttonLabel }}
        </b-button>
      </template>
    </b-table>
    <b-button class="mt-4" pill size="lg" variant="dark" v-if = "search" v-on:click="backToFindMentor"
      >Back</b-button
    >
  </div>
</template>
<script>
import axios from 'axios'
import personexpertises from '../../state/person-expertises'
import listrelation from '../../state/list-relation'
import expertises from '../../state/expertises'

export default {
  name: 'ListMentorMentor',
  data () {
    return {
      fields: [
        'mentorLeaderName',
        'subjects',
        'menteeCount',
        'phase',
        'show_details'
      ],
      items: [],
      item: {},
      isBusy: true,
      url: '',
      method: 'GET',
      request: {},
      search: listrelation.state === 'search'
    }
  },
  methods: {
    backToFindMentor () {
      this.$router.push('/find-mentor')
    },
    fillData () {
      return new Promise((resolve, reject) => {
        axios({
          url: this.url,
          data: this.request,
          method: this.method
        }).then((resp) => {
          resp.data.listRelation.forEach((relation) => {
            relation.expertiseAreas.forEach((expertise) => {
              if (!this.item.subjects) {
                this.item.subjects = expertise.expertiseName
              } else {
                this.item.subjects =
                  this.item.subjects + ',' + expertise.expertiseName
              }
            })
            this.item.otherMentors = relation.otherMentors
            this.item.otherMentees = relation.otherMentees
            this.item.mentorLeaderName = relation.mentorName
            if (relation.otherMentees !== null) {
              this.item.menteeCount = relation.otherMentees.length
            } else this.item.menteeCount = 0
            this.item.phase = this.findLabel(relation.relationPhase)
            if (
              !(
                listrelation.state === 'search' &&
                localStorage.getItem('userName') === this.item.mentorLeaderName
              )
            ) {
              this.items.push(this.item)
            }
            this.isBusy = false
          })
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    findLabel (key) {
      if (key === 'NOT_STARTED') {
        return 'Not Started'
      }
      if (key === 'READY') {
        return 'Ready'
      }
      if (key === 'ONGOING') {
        return 'Ongoing'
      }
      if (key === 'FINISHED') {
        return 'Finished'
      }
    },
    relationDetail (counter) {
      personexpertises.state = this.items[counter]
      this.$router.push('/relation-detail')
    }
  },
  beforeMount () {
    if (listrelation.state === 'search') {
      this.url =
        'http://localhost:8080/expertise/search/' +
        localStorage.getItem('authToken')
      this.method = 'POST'
      this.request.expertiseNames = []
      expertises.state.forEach((expertise) => {
        this.request.expertiseNames.push(expertise.name)
      })
    } else {
      this.url =
        'http://localhost:8080/expertise/get/' +
        localStorage.getItem('authToken') +
        '/' +
        localStorage.getItem('id')
      this.method = 'GET'
    }
    this.isBusy = true
    this.fillData()
  },
  computed: {
    buttonLabel: function () {
      if (listrelation.state === 'search') {
        return 'Join'
      } else {
        return 'Detail'
      }
    }
  }
}
</script>
