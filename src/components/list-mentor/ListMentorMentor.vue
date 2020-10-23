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
      <template #cell(show_details) = "show_details" >
        <b-button size="sm" @click  ="relationDetail(show_details.index)" class="mr-2">
          Details
        </b-button>
      </template>
    </b-table>
  </div>
</template>
<script>
import axios from 'axios'
import expertises from '../../state/person-expertises'

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
      isBusy: true
    }
  },
  methods: {
    fillData () {
      return new Promise((resolve, reject) => {
        axios({
          url:
            'http://localhost:8080/expertise/get/' +
            localStorage.getItem('authToken') +
            '/' +
            localStorage.getItem('id'),
          data: this.request,
          method: 'GET'
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
            this.items.push(this.item)
          })
          this.isBusy = false
        })
      }).catch((err) => {
        console.log(err)
        this.isSaveFailed = true
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
      expertises.state = this.items[counter]
      this.$router.push('/relation-detail')
    }
  },
  beforeMount () {
    this.isBusy = true
    this.fillData()
  }
}
</script>
