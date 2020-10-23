/* eslint-disable */
<template>
  <div
    class="wrapper"
    v-if="message.content"
    v-touch:touchhold="onMessageTap"
    @dblclick="likeMessage"
  >
    <div
      v-if="!message.soundUrl && !message.imageUrl && !message.location"
      class="bouble disable-selection"
      :class="[{ user: owner }, { hasEmoji: message.emoji }]"
    >
      {{ message.content }}
    </div>
    <div class="sound-bouble" :class="{ user: owner }" v-if="message.soundUrl">
      <audio
        id="player"
        controls
        :src="message.soundUrl"
        :class="{ 'sound-owner': owner }"
      ></audio>
      <button @click="onMessageTap" class="deleteSound" v-if="owner">
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          ></path>
        </svg>
      </button>
    </div>
    <div class="image-bouble" :class="{ user: owner }" v-if="message.imageUrl">
      <img :src="message.imageUrl" />
    </div>
    <!-- :class="{ 'seen-hide': !message.seen || !owner }" -->

    <div
      class="location-bouble"
      :class="{ user: owner }"
      v-if="message.location"
    >
      <a :href="locationUrl" target="_blank">
        <LMap
          :zoom="16"
          :center="[message.location.latitude, message.location.longitude]"
          @click.prevent="console.log('hey')"
          attributionControl="false"
        >
          <LTileLayer
            attribution="hey"
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          ></LTileLayer>
          <LMarker
            :lat-lng="[message.location.latitude, message.location.longitude]"
          ></LMarker>
        </LMap>
      </a>
      <!-- <a :href="locationUrl" target="_blank">
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
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          ></path>
          <path
            stroke-linecap="fround"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
        </svg>
        Konum
      </a> -->
    </div>
    <transition name="bounce" duration="400">
      <span
        class="heart"
        v-show="liked || message.liked"
        :class="{ 'not-owner': !owner }"
        @click="unLikeMessage"
        >❤️</span
      >
    </transition>
    <span class="seen" v-if="message.seen && owner && message.last"
      >Görüldü</span
    >
  </div>
</template>

<script>
import Firebase from "firebase/app";
import "firebase/auth";
import { db } from "../firebase";
import Swal from "sweetalert2";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// import "gsap";
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  methods: {
    likeMessage() {
      this.liked = true;
      db.collection("messages").doc(this.message.id).update({ liked: true });
    },
    unLikeMessage() {
      this.liked = false;
      db.collection("messages").doc(this.message.id).update({ liked: false });
    },
    onMessageTap() {
      if (this.owner)
        Swal.fire({
          text: `Mesaj: ${this.message.content}`,
          confirmButtonColor: "var(--primary-color)",
          confirmButtonText: "Sil",
        }).then((result) => {
          if (result.value) {
            db.collection("messages").doc(this.message.id).delete();
            Swal.fire({
              title: "Silindi !",
              icon: "success",
              timer: 900,
              showConfirmButton: false,
            });
          }
        });
    },
  },
  created: function () {
    if (this.message.location)
      this.locationUrl = `https://www.google.com/maps?q=${
        this.message.location.latitude + "," + this.message.location.longitude
      }`;
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.uid === this.message.user) {
          this.owner = true;
        }
      }
    });
  },
  data: () => {
    return { owner: false, locationUrl: "", liked: false };
  },
};
</script>

<style>
.icon {
  width: 4vw;
  height: 4vw;
}
.deleteSound {
  font-weight: bold;
  height: 45px;
  padding: 12px;
}
.bouble {
  color: var(--text-color);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.15);
  padding: 10px 15px 10px 15px;
  margin: 5px;
  align-self: flex-start;
  max-width: 60vw;
  box-sizing: border-box;
  /* animation: all 1s linear; */
}
.sound-bouble {
  background: none !important;
  align-self: flex-start;
  display: flex;
  align-items: center;
}
.sound-owner {
  background: var(--primary-color);
  border-radius: 23px 0 0 23px;
}
.image-bouble {
  background: none !important;
  align-self: flex-start;
}

.location-bouble {
  align-self: flex-start;
  padding: 8px;
  width: 60vw;
  height: 200px;
  margin: 5px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.15);
}
.location-bouble .icon {
  width: 7vw;
  height: 6vw;
  margin: 0 10px;
}

.image-bouble img {
  width: 50vw;
}
.sound-bouble audio {
  height: 45px;
  margin: 5px 0 5px 0;
}
.wrapper {
  display: flex;
  flex-direction: column;
}
.user {
  background: var(--primary-color);

  color: var(--text-color);
  align-self: flex-end;
}
.hasEmoji {
  background: none !important;
  font-size: 32px;
  padding: 0;
}
.seen {
  align-self: flex-end;
  display: inline-flex;
  font-size: 12px;
  color: grey;
}
.heart {
  align-self: flex-end;
  display: inline-flex;
  margin-top: -15px;
  cursor: pointer;
}

.not-owner {
  align-self: flex-start;
}
.seen-hide {
  display: none;
}
.swal2-popup {
  background-color: var(--secondary-color) !important;
}
#swal2-title {
  color: var(--text-color);
}
#swal2-content {
  color: var(--text-color);
}
button {
  background: var(--primary-color);
  border: none;
  color: var(--text-color);
}
@media (min-width: 600px) {
  .icon {
    width: 1vw;
    height: 1vw;
  }
  .image-bouble img {
    width: 20vw;
  }
}
</style>