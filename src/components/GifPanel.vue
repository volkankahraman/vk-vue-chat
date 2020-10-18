<template>
  <div class="gifPanel">
    <div class="gifPanelHeader">
      <button @click="closePanel">
        <svg
          class="icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg></button
      ><button
        @click="gifVersion = 'GIPHY'"
        :class="{ selected: gifVersion == 'GIPHY' }"
      >
        GIFHY
      </button>
      <button
        @click="gifVersion = 'stickers'"
        :class="{ selected: gifVersion == 'stickers' }"
      >
        STICKER
      </button>
      <form @submit.prevent="searchGif" style="flex: 1">
        <input
          type="text"
          v-model.lazy="search"
          placeholder="Ara..."
          autocomplete="off"
          id="search"
        />
      </form>
      <button @click="searchGif">
        <svg
          class="icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
    </div>
    <div class="gifPanelContent">
      <div class="loader-container" v-if="loading">
        <div class="loader"></div>
      </div>
      <div class="row" v-if="!loading">
        <div class="column">
          <img
            @click="sendGif(gif)"
            v-for="gif in gifs.left"
            :key="gif"
            :src="gif"
            loading="lazy"
          />
        </div>
        <div class="column">
          <img
            @click="sendGif(gif)"
            v-for="gif in gifs.right"
            :key="gif"
            :src="gif"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const giphy = require("giphy-api")({
  apiKey: "c4f1tw7I7D3glsL99Ud2jYjFIeQxCLif",
  https: true,
});
import { db } from "../firebase";
export default {
  name: "GifPanel",
  props: {
    currUser: {
      required: true,
    },
  },
  data: function () {
    return {
      gifVersion: "GIPHYy",
      gifs: {
        left: [],
        right: [],
      },
      loading: false,
      search: "",
    };
  },
  created: function () {
    this.gifVersion = "GIPHY";
  },
  methods: {
    searchGif() {
      this.gifs = {
        left: [],
        right: [],
      };
      this.loading = true;
      if (this.search) {
        console.log(this.search);
        switch (this.gifVersion) {
          case "GIPHY":
            giphy.search({ q: this.search, limit: 25 }).then((res) => {
              this.loading = false;
              res.data.forEach(this.getGifs);
            });
            break;
          case "stickers":
            giphy
              .search({
                api: "stickers",
                q: this.search,
                limit: 25,
              })
              .then((res) => {
                this.loading = false;

                res.data.forEach(this.getGifs);
              });
            break;
        }
      }
    },

    closePanel() {
      this.$emit("checkPanel", false);
    },
    getGifs(gif, i) {
      if (i % 2 == 1) this.gifs.left.push(gif.images.downsized.url);
      else this.gifs.right.push(gif.images.downsized.url);
    },
    sendGif(gif) {
      let messageSnap = {
        seen: false,
        emoji: false,
        user: this.currUser.id,
        content: "Gif gönderdi!",
        liked: false,
        imageUrl: gif,
        createdAt: Date.now(),
      };
      console.log(messageSnap);
      this.closePanel();
      db.collection("messages").add(messageSnap);
    },
  },
  watch: {
    search: function (search) {
      if (search.length >= 3) {
        this.searchGif();
      }
    },
    gifVersion: function (version) {
      this.gifs = {
        left: [],
        right: [],
      };
      this.loading = true;
      switch (version) {
        case "GIPHY":
          giphy.search({ q: "love", limit: 25 }).then((res) => {
            this.loading = false;
            res.data.forEach(this.getGifs);
          });
          break;
        case "stickers":
          giphy
            .search({
              api: "stickers",
              q: "funny",
              limit: 25,
            })
            .then((res) => {
              this.loading = false;

              res.data.forEach(this.getGifs);
            });
          break;
      }
    },
  },
};
</script>

<style>
.selected {
  background: var(--hover-color);
  height: 40px;
}
#search {
  background: var(--hover-color);
  border: none;
  padding: 10px;
  color: var(--text-color);
  flex: 1 0 auto;
  width: 100%;
}
.loader-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.gifPanel {
  background: black;
  height: 60vh;
}
.gifPanel .icon {
  padding: 5px;
}
.gifPanelHeader {
  /* overflow:scroll; */
  align-items: center;
  display: flex;
  width: 100%;
  padding: 5px;
  font-weight: bold;
  background: var(--secondary-color);
}
.gifPanelContent {
  overflow: scroll;
  height: 60vh;
}
.gifPanelContent .row {
  display: -ms-flexbox; /* IE 10 */
  display: flex;
  -ms-flex-wrap: wrap; /* IE 10 */
  flex-wrap: wrap;
  padding: 0 4px;
}
.column {
  -ms-flex: 50%; /* IE 10 */
  flex: 50%;
  padding: 0 4px;
}

.gifPanelContent img {
  width: 100%;
  margin-top: 8px;
  vertical-align: middle;
}
button {
  background: none;
  border: none;
  text-align: center;
  transition: background, color 0.2s ease;
}
button:focus {
  outline-width: 0;
}

button:active {
  background: var(--primary-color);
  opacity: 0.8;
  color: var(--primary-color) !important;
}
.icon {
  width: 8vw;
  height: 8vw;
  color: var(--text-color);
}

@media (min-width: 600px) {
  .icon {
    width: 2vw;
    height: 2vw;
  }
}
</style>
