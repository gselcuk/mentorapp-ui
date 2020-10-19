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
    >
    </b-table>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'ListMentorMentor',
  data () {
    return {
      fields: ['mentorLeaderName', 'subjects', 'menteeCount', 'phase'],
      items: [],
      item: {}
    }
  },
  methods: {
    fillData () {
      return new Promise((resolve, reject) => {
        axios({
          url:
            'http://localhost:8080/expertise/get/' + localStorage.getItem('authToken') + '/' + localStorage.getItem('id'),
          data: this.request,
          method: 'GET'
        }).then((resp) => {
          resp.data.listRelation.forEach((relation) => {
            relation.groupExpertiseRelation.expertiseAreas.forEach(expertise => {
              if (!this.item.subjects) { this.item.subjects = expertise.expertiseName } else { this.item.subjects = this.item.subjects + ',' + expertise.expertiseName }
            })
            this.item.mentorLeaderName = relation.mentorName
            if (relation.groupExpertiseRelation.mentees !== null) {
              this.item.menteeCount =
                relation.groupExpertiseRelation.mentees.length
            } else this.item.menteeCount = 0
            this.item.phase = this.findLabel(relation.groupExpertiseRelation.relationPhase)
            this.items.push(this.item)
          })
        })
      }).catch((err) => {
        console.log(err)
        this.isSaveFailed = true
      })
    },
    findLabel (key) {
      if (key === 'NOT_STARTED') { return 'Not Started' }
      if (key === 'READY') { return 'Ready' }
      if (key === 'ONGOING') { return 'Ongoing' }
      if (key === 'FINISHED') { return 'Finished' }
    }
  },
  beforeMount () {
    this.fillData()
  }
}
</script>
