<template>
  <div>
    <v-navbar></v-navbar>
    <div class="container bootdey flex-grow-1 container-p-y">
      <div class="media align-items-center py-3 mb-3">
        <img
          src="../../assets/default-mentor.png"
          alt=""
          class="d-block ui-w-100 rounded-circle"
        />
        <div class="media-body ml-4">
          <h4 class="font-weight-bold mb-0">
            {{ userName }}
          </h4>
          <div class="text-muted mb-2">{{ userRole }}</div>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-body">
          <b-card-group deck>
            <b-card
              v-for="element in expertiseAreas"
              :key="element.name"
              :header="element.expertiseName"
              :footer="element.category"
            >
              <b-row class="mt-2">
                <b-col sm="2">
                  <label for="textarea-default">Description:</label>
                </b-col>
                <b-col sm="10">
                  <b-form-textarea
                    id="textarea-default"
                    :placeholder="element.expertiseDescription"
                  ></b-form-textarea>
                </b-col>
              </b-row>
              <div>
                <label for="tags-pills">Enter tags</label>
                <b-form-tags
                  input-id="tags-pills"
                  v-model="element.keywords"
                  tag-variant="primary"
                  tag-pills
                  size="lg"
                  separator=" "
                ></b-form-tags>
              </div>
            </b-card>
          </b-card-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UrlConstant from '../../UrlConstant'
import axios from 'axios'

export default {
  name: 'Profile',
  data () {
    return {
      userName: localStorage.getItem('userName'),
      userRole: localStorage.getItem('userRole'),
      expertiseAreas: []
    }
  },
  methods: {
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
    }
  },
  beforeMount () {
    return new Promise((resolve, reject) => {
      axios({
        url:
            UrlConstant.GET_EXPERTISE +
            localStorage.getItem('authToken') +
            '/' +
            localStorage.getItem('id'),
        data: this.request,
        method: 'GET'
      }).then((resp) => {
        resp.data.listRelation.forEach((relation) => {
          relation.expertiseAreas.forEach((expertise) => {
            this.expertiseAreas.push(expertise)
          })
        })
      })
    })
  }
}
</script>
<style scoped>
body {
  margin-top: 20px;
  background: #f5f5f5;
}

.ui-w-100 {
  width: 100px !important;
  height: auto;
}

.card {
  background-clip: padding-box;
  box-shadow: 0 1px 4px rgba(24, 28, 33, 0.012);
}

.user-view-table td:first-child {
  width: 9rem;
}
.user-view-table td {
  padding-right: 0;
  padding-left: 0;
  border: 0;
}

.text-light {
  color: #babbbc !important;
}

.card .row-bordered > [class*=" col-"]::after {
  border-color: rgba(24, 28, 33, 0.075);
}

.text-xlarge {
  font-size: 170% !important;
}
</style>
