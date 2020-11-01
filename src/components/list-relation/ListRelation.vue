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
    <div class="d-flex justify-content-center">
      <b-button-toolbar
        class="col-md-2"
        key-nav
        v-if="search"
        aria-label="Toolbar with button groups"
      >
        <b-button-group class="mx-1">
          <b-button @click="previos()">&lsaquo;</b-button>
        </b-button-group>
        <b-button-group class="mx-1">
          <b-button variant="dark" v-on:click="backToFindMentor">Back</b-button>
        </b-button-group>
        <b-button-group class="mx-1">
          <b-button @click="next()">&rsaquo;</b-button>
        </b-button-group>
      </b-button-toolbar>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import personexpertises from '../../state/person-expertises'
import listrelation from '../../state/list-relation'
import expertises from '../../state/expertises'
import UrlConstant from '../../UrlConstant'

export default {
  name: 'ListMentorMentor',
  data () {
    return {
      fields: [
        'mentorLeaderName',
        'subjects',
        'menteeCount',
        'startDate',
        'phase',
        'show_details'
      ],
      items: [],
      item: {},
      isBusy: true,
      url: '',
      method: 'GET',
      request: {},
      search:
        listrelation.state === 'search' ||
        localStorage.getItem('isAdmin') === 'true',
      page: 0,
      size: 10,
      params: {}
    }
  },
  methods: {
    previos () {
      console.log(this.page)
      if (this.page > 0) {
        this.page = this.page - 1
        this.params.page = this.page
        this.params.size = 10
        this.fillData()
      }
    },
    next () {
      console.log(this.size)
      if (this.size === 10) {
        this.page = this.page + 1
        this.params.page = this.page
        this.params.size = 10
        this.fillData()
      }
    },
    backToFindMentor () {
      if (
        localStorage.getItem('isAdmin') === 'false' ||
        listrelation.state === 'search'
      ) {
        this.$router.push('/find-mentor')
      }
    },
    fillData () {
      this.items = []
      return new Promise((resolve, reject) => {
        axios({
          url: this.url,
          data: this.request,
          method: this.method,
          params: this.params
        }).then((resp) => {
          if (resp.data.listRelation) {
            this.size = resp.data.listRelation.length
            console.log(this.size)
            resp.data.listRelation.forEach((relation) => {
              this.item = {}
              this.item.expertiseAreas = []
              if (relation.expertiseAreas) {
                relation.expertiseAreas.forEach((expertise) => {
                  this.item.expertiseAreas.push(expertise)
                  if (!this.item.subjects) {
                    this.item.subjects = expertise.expertiseName
                  } else {
                    this.item.subjects =
                      this.item.subjects + ',' + expertise.expertiseName
                  }
                })
              }

              this.item.mentorGroupId = relation.mentorGroupId
              this.item.otherMentors = relation.otherMentors
              this.item.otherMentees = relation.otherMentees
              this.item.mentorLeaderName = relation.mentorName
              if (relation.startDate) {
                this.item.startDate = relation.startDate
              } else {
                this.item.startDate = '-'
              }
              if (relation.otherMentees !== null) {
                this.item.menteeCount = relation.otherMentees.length
              } else this.item.menteeCount = 0
              this.item.phase = this.findLabel(relation.relationPhase)

              if (
                !(
                  listrelation.state === 'search' &&
                  (localStorage.getItem('userName') ===
                    this.item.mentorLeaderName ||
                    (relation.otherMentees
                      ? relation.otherMentees.includes(
                        localStorage.getItem('userName')
                      )
                      : false))
                )
              ) {
                this.items.push(this.item)
              }
            })
            this.isBusy = false
          }
        })
      }).catch((err) => {
        console.log(err)
        this.isBusy = false
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
    if (
      listrelation.state === 'search' ||
      localStorage.getItem('isAdmin') === 'true'
    ) {
      this.url =
        UrlConstant.SEARCH_EXPERTISE + localStorage.getItem('authToken')
      this.method = 'POST'
      this.request.expertiseNames = []
      this.request.admin = localStorage.getItem('isAdmin')
      if (expertises.state) {
        expertises.state.forEach((expertise) => {
          this.request.expertiseNames.push(expertise.name)
        })
      }
    } else {
      this.url =
        UrlConstant.GET_EXPERTISE +
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
