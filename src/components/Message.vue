/* eslint-disable */
<template>
  <div class="wrapper" v-if="message.content" v-touch:touchhold="onMessageTap">
    <div
      v-if="!message.soundUrl && !message.imageUrl && !message.location"
      class="bouble disable-selection"
      :class="[{ user: owner }, { hasEmoji: message.emoji }]"
    >
      {{ message.content }}
    </div>
    <div class="sound-bouble" :class="{ user: owner }" v-if="message.soundUrl">
      <audio id="player" controls :src="message.soundUrl"></audio>
      <button @click="onMessageTap" class="deleteSound">X</button>
    </div>
    <div class="image-bouble" :class="{ user: owner }" v-if="message.imageUrl">
      <img :src="message.imageUrl" />
    </div>
    <span class="seen" :class="{ 'seen-hide': !message.seen }">Görüldü</span>
    <div
      class="location-bouble"
      :class="{ user: owner }"
      v-if="message.location"
    >
      <a :href="locationUrl" target="_blank">
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
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
        </svg>
        Konum</a
      >
    </div>
  </div>
</template>

<script>
import Firebase from "firebase/app";
import "firebase/auth";
import { db } from "../firebase";
import Swal from "sweetalert2";

// import "gsap";
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  methods: {
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
    // window.oncontextmenu = function (event) {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   return false;
    // };
    if (this.message.location)
      this.locationUrl = `https://www.google.com/maps?q=${
        this.message.location.latitude + "," + this.message.location.longitude
      }`;
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.uid === this.message.user) {
          this.owner = true;
        }
      } else {
        console.log("not user");
      }
    });
  },
  data: () => {
    return { owner: false, locationUrl: "" };
  },
};
</script>

<style>
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
.sound-bouble audio {
  background: var(--primary-color);
  border-radius: 23px 0 0 23px;
}
.image-bouble {
  background: none !important;
  align-self: flex-start;
}

.location-bouble {
  align-self: flex-start;
  padding: 10px 20px 10px 0;
  margin: 5px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.15);
}
.location-bouble .icon {
  width: 7vw;
  height: 6vw;
  margin: 0 10px;
}

.location-bouble a {
  display: flex;
  align-items: center;
  font-weight: bold;
  color: white;
  text-decoration: none; /* no underline */
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
  .image-bouble img {
    width: 20vw;
  }
}
</style>