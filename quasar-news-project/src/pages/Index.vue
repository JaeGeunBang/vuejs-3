<template>
  <div>
    <q-list bordered>
      <q-item clickable v-ripple
              v-for="news in news_list"
              :key="news.link"
      >
        <q-item-section class="text-h6"> {{ news.title }} </q-item-section>
        <q-item-section side class="text-caption"> {{ news.pubDate }} </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { ref } from 'vue';

export default {
  setup() {
    let news_list = ref([]);
    const getNews = async () => {
      const rssURL: string = "https://news.google.com/rss?hl=ko&gl=KR&ceid=KR:ko"
      const apiURL: string = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(rssURL) ;
      const response = await axios.get(apiURL) ;
      news_list.value = response.data.items
    }
    getNews()

    return {
      news_list,
      getNews,
    }
  }
}
</script>
