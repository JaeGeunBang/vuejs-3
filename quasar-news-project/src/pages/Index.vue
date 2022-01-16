<template>
  <div class="q-pa-md">
    <q-table
      flat
      :rows="news_list"
      :columns="columns"
      row-key="title"
      :filter="filter"
      @row-click="rowClick"
      :pagination="initialPagination"
    >
      <template v-slot:body-cell-title="props">
        <q-td :prop="props">
          <div class="text-h6" style="white-space: normal">
            {{ props.value }}
          </div>
          <div class="my-table-details">
            {{ props.row.details }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-link="props">
        <q-td :prop="props">
          <div style="white-space: normal">
            {{ props.value }}
          </div>
          <div class="my-table-details">
            {{ props.row.details }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-pubDate="props">
        <q-td :prop="props">
          <div>
            {{ props.value }}
          </div>
          <div class="my-table-details">
            {{ props.row.details }}
          </div>
        </q-td>
      </template>
      <template>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { ref } from 'vue';
import { Notify } from 'quasar'

export default {
  setup() {
    let news_list = ref([]);
    const filter = ref('');
    const columns = [
      { name: 'title', required: true, label: '기사 제목', align: 'left', field: 'title' },
      { name: 'pubDate', align: 'left', label: '발행일', field: 'pubDate', sortable: true },
    ]

    const getNews = async () => {
      const rssURL: string = "https://news.google.com/rss?hl=ko&gl=KR&ceid=KR:ko"
      const apiURL: string = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(rssURL) ;
      const response = await axios.get(apiURL) ;
      news_list.value = response.data.items
      Notify.create({message:'뉴스를 성공적으로 불러왔습니다'})
    }
    getNews()

    const rowClick = (event: any, row: any) => {
      window.open(row.link)
    }

    return {
      news_list,
      getNews,
      columns,
      filter,
      rowClick,
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 0,
        rowsPerPage: 3
      }
    }
  }
}
</script>
