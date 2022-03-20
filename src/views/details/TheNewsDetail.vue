<template>
<div>
  <h1>article</h1>

  <sda-loading v-if="loading"/>

  <template v-else-if="article">
    <ul>
      <li>
        <div>název:</div>
        <div>{{ article.title }}</div>
      </li>
      <li>
        <div>text:</div>
        <div>{{ article.content }}</div>
      </li>
      <li>
        <div>team:</div>
        <div>{{ article.team + ' ' + article.city }}</div>
      </li>
      <li>
        <div>date:</div>
        <div>{{ formatedDate }}</div>
      </li>
    </ul>
    <div class="buttons-div">
      <sda-button
        label="edit"
        @clicked="onEditClicked"/>
    </div>
    <div class="buttons-div">
      <sda-button
      label="delete"
      @clicked="onDeleteClicked"/>
    </div>

    <sda-modal
      :show="showDeleteConfirm"
      title="confirm deleting"
      :message="'do you really want to delete article ' + article.title + '?'"
      @close-me="showDeleteConfirm = false"
      @cancel-clicked="showDeleteConfirm = false"
      @confirm-clicked="deleteRecord"/>

  </template>

  <template v-else>
    <p>article has not been found</p>
  </template>
</div>
</template>

<script>
import dateFunctions from '../../utilities/dateFunctions.js'
import db from '../../utilities/db.js'
import SdaLoading from '../../components/SdaLoading.vue'
import SdaModal from '../../components/SdaModal.vue'

export default {
  name: 'TheTeamDetail',
  data () {
    return {
      loading: true,
      showDeleteConfirm: false
    }
  },
  computed: {
    article () {
      return this.$store.state.article
    },
    formatedDate () {
      return dateFunctions.formatDate(this.article.date)
    }
  },
  created () {
    return this.$store.dispatch('fetchArticle', this.$route.params.id).then(() => {
      this.loading = false
    })
  },
  methods: {
    onEditClicked () {
      this.$router.push('/newsform/' + this.$route.params.id)
    },
    onDeleteClicked () {
      this.showDeleteConfirm = true
    },
    deleteRecord () {
      return db.delete('news', {
        id: this.$route.params.id
      }).then(() => {
        this.$router.push('/news')
      })
    }
  },
  components: { SdaLoading, SdaModal }
}
</script>

<style lang="stylus" scoped>
@import '../../styles/variables.styl'
ul
  list-style-type: none
  margin: 0 auto
  padding: 0
  width: 80%
  border: 1px solid $secondary
  & li
    padding: .35em .5em
    display: flex
    justify-content: space-between
    & div
      width: 50%
      text-align: left
</style>