/* eslint-disable */
<template>
  <div class="wrapper" v-if="message.content">
    <div
      v-if="!message.soundUrl"
      class="bouble disable-selection"
      v-touch:touchhold="onMessageTap"
      :class="[{ user: owner }, { hasEmoji: message.emoji }]"
    >
      {{ message.content }}
    </div>
    <div class="sound-bouble" :class="{ user: owner }" v-if="message.soundUrl">
      <audio id="player" controls :src="message.soundUrl"></audio>
      <button @click="onMessageTap">X</button>
    </div>
    <span class="seen" :class="{ 'seen-hide': !message.seen }">Görüldü</span>
  </div>
</template>

<script>
import Firebase from "firebase/app";
import "firebase/auth";
import { db } from "../firebase";
import Swal from "sweetalert2";

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
          confirmButtonColor: "#a52422",
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
    return { owner: false };
  },
};
</script>

<style>
.bouble {
  color: white;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.15);
  padding: 10px 15px 10px 15px;
  margin: 5px;
  align-self: flex-start;
  max-width: 60vw;
  box-sizing: border-box;
}
.sound-bouble {
  background: none !important;
  align-self: flex-start;
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
  background: var(--main-primary);

  color: #eee;
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
  background-color: #181717 !important;
}
#swal2-title {
  color: white;
}
#swal2-content {
  color: white;
}
button {
  background: var(--main-primary);
  border: none;
  color: white;
}
</style>