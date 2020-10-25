const LOCAL_URL = 'http://localhost:8080'
const EXPERTISE = '/expertise'
const USER = '/user'
const USER_AUTH = LOCAL_URL + USER + '/authenticate'
const JOIN_RELATION = LOCAL_URL + EXPERTISE + '/join-relation'
const BE_MENTOR = LOCAL_URL + EXPERTISE + '/be-mentor'
const SEARCH_EXPERTISE = LOCAL_URL + EXPERTISE + '/search/'
const GET_EXPERTISE = LOCAL_URL + EXPERTISE + '/get/'

export default {
  JOIN_RELATION: JOIN_RELATION,
  BE_MENTOR: BE_MENTOR,
  SEARCH_EXPERTISE: SEARCH_EXPERTISE,
  GET_EXPERTISE: GET_EXPERTISE,
  USER_AUTH: USER_AUTH
}
