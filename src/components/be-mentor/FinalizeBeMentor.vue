<template>
  <div>
    <v-navbar></v-navbar>
    <div class="jumbotron jumbotron-fluid">
      {{ yourExpertises }}
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
      yourExpertises: expertises.state
    }
  }
}
</script>
