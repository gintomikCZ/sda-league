<template>
<div>
  <h1>news</h1>

  <sda-loading v-if="loading"/>

  <template v-else>

    <!-- <sda-button
      label="add new"
      class="mb-1rem"
      @clicked="$router.push('/newsform')"/> -->

    <add-new-button form-name="newsform" />

    <sda-list>

      <template v-for="(row, index) in news" :key="row.id">
        <sda-list-item
          :content="row.title"
          :right-side="row.formatedDate"
          is-title
          is-link
          :is-bordered="!row.content"
          @click="$router.push('/news/' + row.id)" />
        <sda-list-item
          :content="row.content"
          :is-bordered="index + 1 < news.length"
          is-description />
      </template>

    </sda-list>

  </template>

</div>
</template>

<script>
import SdaList from '../components/list/SdaList.vue'
import SdaListItem from '../components/list/SdaListItem.vue'
import SdaLoading from '../components/SdaLoading.vue'
import AddNewButton from '../components/AddNewButton.vue'
import dateFunctions from '../utilities/dateFunctions.js'

export default {
  name: 'TheNews',
  data () {
    return {
      loading: true
    }
  },
  computed: {
    news () {
      return this.$store.state.news.map(item => {
        return Object.assign(item, { formatedDate: dateFunctions.formatDate(item.date) })
        /*
          {
            title: '',
            content: '',
            date: '2022-03-12',
            formatedDate: '12.03.2022',
            teamid: '5'
          }
        */
      }).sort((a, b) => {
        // return a.date.localeCompare(b.date)
        if (a.date < b.date) return -1
        return a.date === b.date ? 0 : 1
      })
    }
  },
  created () {
    return this.$store.dispatch('fetchNews').then(() => {
      this.loading = false
    })
  },
  components: { SdaList, SdaLoading, AddNewButton, SdaListItem }

}
</script>

<style lang="stylus">

</style>