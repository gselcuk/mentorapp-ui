<template>
  <div></div>
</template>
<script>
import expertises from '../../state/expertises'

export default {
  name: 'FinalizeBeMentor',
  display: 'Finalize Be Mentor',
  data () {
    return {
      yourExpertises: expertises.state,
      keywords: expertises.keywords,
      request: {}
    }
  }
}
</script>
