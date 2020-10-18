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
      fields: ['mentorLeaderName', 'subject', 'menteeCount', 'phase'],
      items: [
      ],
      item: {},
      reponses: []
    }
  },
  methods: {
    fillData () {
      return new Promise((resolve, reject) => {
        axios({
          url: 'http://localhost:8080/expertise/get/' + localStorage.getItem('id'),
          data: this.request,
          method: 'GET'
        })
          .then((resp) => {
            this.reponses = resp.data
            console.log(resp.data)
          })
      })
        .catch((err) => {
          console.log(err)
          this.isSaveFailed = true
        })
    }
  },
  beforeMount () {
    this.fillData()
    this.responses.forEach(relation => {
      this.item.subject = relation.groupExpertiseRelation.expertiseAreas[0].expertiseName
      this.item.mentorLeaderName = relation.mentorName
      this.item.menteeNumber = relation.groupExpertiseRelation.mentees.length
      this.item.phase = relation.groupExpertiseRelation.relationPhase
      this.items.push(this.item)
    })
  }
}

</script>
