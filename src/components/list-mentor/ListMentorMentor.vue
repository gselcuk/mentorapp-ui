<template>
    <div class="container">
    <b-table class= "mt-4" :items="items" :fields="fields" striped hover  responsive="sm" caption-top>

    </b-table>
      </div>
</template>
<script>
export default {
  name: 'ListMentorMentor',
  data () {
    return {
      fields: ['mentorLeaderName', 'subject', 'menteeLeaderName', 'phase'],
      items: [
        { subject: 'Java', age: 40, mentorLeaderName: 'euclid', menteeLeaderName: '' },
        { subject: 'Java', age: 21, mentorLeaderName: 'Larsen', menteeLeaderName: 'Shaw', phase: 'STARTED' }
      ]
    }
  },
  methods: {}
}
</script>
