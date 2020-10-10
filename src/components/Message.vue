/* eslint-disable */
<template>
  <div class="wrapper" v-if="message.content">
    <div class="bouble" :class="[{ user: owner }, { hasEmoji: message.emoji }]">
      {{ message.content }}
    </div>
    <span class="seen" :class="{ 'seen-hide': !message.seen }">Görüldü</span>
  </div>
</template>

<script>
import Firebase from "firebase/app";
import "firebase/auth";
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  created: function () {
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
.wrapper {
  display: flex;
  flex-direction: column;
}
.bouble.user {
  background: yellowgreen;
  color: black;
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
</style>