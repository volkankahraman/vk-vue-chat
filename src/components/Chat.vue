/* eslint-disable */

<template>
  <div class="container">
    <div class="backDrop" v-if="dotMenuShow" @click="dotMenuShow = false"></div>
    <div class="header">
      <div class="logo">
        <img src="~@/assets/logo.png" width="30" />
        <Span> Chat</Span>
      </div>

      <button @click="dotMenuShow = true">
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
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          ></path>
        </svg>
      </button>

      <ul class="dot-menu" v-show="dotMenuShow">
        <li>
          <svg
            class="icon"
            style="color: var(--text-color); width: 5vw"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div style="padding-left: 15px" @click="about">Hakkında</div>
        </li>
        <li @click="logout">
          <svg
            class="icon"
            style="color: var(--text-color); width: 5vw"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            ></path>
          </svg>
          <div style="padding-left: 15px">Çıkış Yap</div>
        </li>
      </ul>
    </div>
    <div class="header-span">a</div>
    <div id="firebaseui-auth-container" v-if="!currUser.id"></div>
    <div
      class="main"
      v-chat-scroll="{
        smooth: true,
        notSmoothOnInit: true,
        scrollonremoved: true,
      }"
    >
      <transition-group name="list" tag="div">
        <Message
          v-for="(message, index) in messages.slice().reverse()"
          :message="message"
          :index="index"
          :key="message.id"
        />
      </transition-group>
      <div
        :class="{ 'not-writing': !writing.status }"
        v-for="(writing, writingIndex) in writings"
        :key="writingIndex"
      >
        {{ writing.user }} yazıyor...
      </div>
    </div>
    <div class="footer-span">a</div>
    <div class="footer">
      <form @submit.prevent="sendMessage" v-if="!gifPanelShow">
        <!-- v-touch:start="startRecording" v-touch:end="endRecording" -->
        <button>
          <input
            type="file"
            @input="previewSound"
            id="sound"
            accept="audio/*"
            capture
          />
          <svg
            class="icon"
            style="width: 5vw; margin-right: 5px"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <textarea
          @enter="alert()"
          id="message"
          v-model="message"
          @focus="inputIconShow = false"
          @blur="inputIconShow = true"
          type="text"
          name="message"
          placeholder="mesaj..."
          autocomplete="off"
        />
        <transition name="bounce" duration="600">
          <div class="icon-group" v-show="inputIconShow && !message">
            <button @click="sendLocation">
              <svg
                class="icon input-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <button @click="gifPanelShow = true">
              <svg
                class="icon input-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <button>
              <input
                type="file"
                @change="previewPhoto"
                id="photo"
                accept="image/*"
              />
              <svg
                class="icon input-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 00-2 0v1H8a1 1 0 000 2h1v1a1 1 0 002 0v-1h1a1 1 0 000-2h-1V9z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </transition>
        <button>
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
              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </form>
      <GifPanel
        v-if="gifPanelShow"
        :currUser="currUser"
        v-on:checkPanel="gifPanelStatus"
      />
    </div>
    <div class="update-dialog" v-if="prompt">
      <div class="update-dialog__content">
        A new version is found. Refresh to load it?
      </div>
      <div class="update-dialog__actions">
        <button
          class="update-dialog__button update-dialog__button--confirm"
          @click="update"
        >
          Update
        </button>
        <button
          class="update-dialog__button update-dialog__button--cancel"
          @click="prompt = false"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "./Message";
import GifPanel from "./GifPanel";
import { db } from "../firebase";
import Firebase from "firebase/app";
import Swal from "sweetalert2";

import "firebase/auth";
import "firebase/messaging";
import "firebase/storage";
require("vue2-animate/dist/vue2-animate.min.css");

// import
import * as firebaseui from "firebaseui";

export default {
  name: "Chat",
  firestore: {
    messages: db.collection("messages").orderBy("createdAt", "desc").limit(25),
  },
  components: {
    Message,
    GifPanel,
  },
  created() {
    window.oncontextmenu = function (event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.showUpdateUI = true;
      });
    }
    window.addEventListener("beforeunload", (event) => {
      if (this.message.length > 3) {
        event.preventDefault();
        event.returnValue = "";
      }
    });
    db.collection("users").onSnapshot((snapshot) => {
      this.writings = [];
      snapshot.forEach((doc) => {
        if (doc.id !== this.userDocID) {
          this.writings.push({
            user: doc.data().displayName,
            status: doc.data().writing,
          });
        }
      });
    });
  },

  data: function () {
    return {
      message: "",
      messages: [],
      currUser: {},
      userDocID: 0,
      prompt: false,
      inputIconShow: true,
      dotMenuShow: false,
      gifPanelShow: false,
      writings: [],
      triggered: false,
    };
  },
  watch: {
    messages: function (value) {
      if (value[0] && this.currUser.id) {
        value[0].last = true;
        value.forEach((message) => {
          if (message.user !== this.currUser.id && !message.seen) {
            db.collection("messages").doc(message.id).update({ seen: true });
          }
        });
      }
    },
    message: function (value) {
      if (value !== "" && value.length > 3) {
        if (!this.triggered) {
          db.collection("users").doc(this.userDocID).update({ writing: true });
          this.triggered = true;
        }
      } else {
        if (value.length < 1) {
          db.collection("users").doc(this.userDocID).update({ writing: false });
          console.log("sunucuya yaz");
          this.triggered = false;
        }
      }
    },
  },
  mounted: function () {
    var user = Firebase.auth().currentUser;

    if (user) {
      this.getToken();
      this.getUser(user);
    } else {
      Firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.getToken();
          this.getUser(user);
        } else {
          var ui = new firebaseui.auth.AuthUI(Firebase.auth());
          Firebase.auth().languageCode = "tr"; // set with string
          ui.start("#firebaseui-auth-container", {
            immediateFederatedRedirect: false,
            signInSuccessUrl: window.location.href,
            signInOptions: [
              Firebase.auth.EmailAuthProvider.PROVIDER_ID,
              Firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
          });
        }
      });
    }
  },
  methods: {
    gifPanelStatus(value) {
      this.gifPanelShow = value;
    },
    sendLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          let messageSnap = {
            seen: false,
            emoji: this.containsOnlyEmojis(this.message),
            user: this.currUser.id,
            content: "Konum gönderdi!",
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            createdAt: Date.now(),
          };
          db.collection("messages").add(messageSnap);
          Swal.fire({
            text: "gonum gitti !",
            timer: 900,
            icon: "success",
            showConfirmButton: false,
          });
        });
      } else {
        Swal.fire("Hata", "Konum desteklenmiyor", "error");
      }
    },
    about() {
      Swal.fire({
        title: "Hakkında",
        html: 'Sevgi ile yapıldı <br><span class="pulse" >❤️</span>',

        heightAuto: false,

        showConfirmButton: false,
      });
    },
    previewPhoto() {
      let inputElement = document.getElementById("photo");
      console.dir(inputElement.files[0]);

      let folderName = "/images/";

      Firebase.storage()
        .ref(folderName + inputElement.files[0].name)
        .put(inputElement.files[0])
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            let messageSnap = {
              seen: false,
              emoji: this.containsOnlyEmojis(this.message),
              user: this.currUser.id,
              content: "Fotoğraf gönderdi!",
              liked: false,
              imageUrl: url,
              createdAt: Date.now(),
            };
            db.collection("messages").add(messageSnap);
            Swal.fire({
              text: "gayıtlandı !",
              timer: 900,
              icon: "success",
              showConfirmButton: false,
            });
          });
        });
    },
    previewSound() {
      let inputElement = document.getElementById("sound");
      console.dir(inputElement.files[0]);

      let folderName = "/sounds/";
      Firebase.storage()
        .ref(folderName + inputElement.files[0].name)
        .put(inputElement.files[0])
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            let messageSnap = {
              seen: false,
              emoji: this.containsOnlyEmojis(this.message),
              user: this.currUser.id,
              content: "Ses kaydı gönderdi!",
              liked: false,
              soundUrl: url,
              createdAt: Date.now(),
            };

            db.collection("messages").add(messageSnap);
            Swal.fire({
              text: "gayıtlandı !",
              timer: 900,
              icon: "success",
              showConfirmButton: false,
            });
          });
        });
    },
    getUser(user) {
      this.currUser.id = user.uid;
      this.currUser.name = user.displayName;
      this.currUser.email = user.email;
      db.collection("users")
        .get()
        .then((querySnapshot) => {
          let exist = false;
          querySnapshot.forEach((doc) => {
            if (this.currUser.id === doc.data().userID) {
              this.userDocID = doc.id;

              exist = true;
            }
          });
          if (!exist)
            db.collection("users")
              .add({
                userID: this.currUser.id,
                displayName: this.currUser.name,
                mail: this.currUser.email,
              })
              .then((user) => {
                this.userDocID = user.id;
              });

          console.log("user", exist);
        });
    },
    getToken() {
      Firebase.messaging()
        .getToken()
        .then((token) => {
          console.log(token);
          db.collection("tokens")
            .get()
            .then((querySnapshot) => {
              let exist = false;
              querySnapshot.forEach(function (doc) {
                if (token === doc.data().token) exist = true;
              });
              if (!exist)
                db.collection("tokens").add({
                  token: token,
                  userID: this.currUser.id,
                });
              console.log("token", exist);
            });
        })
        .catch(() => console.log("error with notification"));
    },
    async accept() {
      this.showUpdateUI = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    },
    containsOnlyEmojis(text) {
      if (text.length === 0) return false;
      const onlyEmojis = text.replace(new RegExp("[\u0000-\u1eeff]", "g"), "");
      const visibleChars = text.replace(new RegExp("[\n\rs]+|( )+", "g"), "");
      return onlyEmojis.length === visibleChars.length;
    },
    logout() {
      Firebase.auth().signOut();
      this.currUser = {};
      location.reload();
    },
    sendMessage() {
      for (let i = 0; i < this.messages.length; i++) {
        this.messages[i].seen = false;
      }

      let messageSnap = {
        seen: false,
        emoji: this.containsOnlyEmojis(this.message),
        user: this.currUser.id,
        content: this.message,
        liked: false,
        createdAt: Date.now(),
      };

      // this.messages.push();
      if (this.message !== "") db.collection("messages").add(messageSnap);

      this.message = "";
    },
  },
};
</script>

<style scoped>
.backDrop {
  width: 100vw;
  height: 100vh;
  background: none;
  position: fixed;
  z-index: 1;
}
.slide-leave-active,
.slide-enter-active {
  transition: 200ms;
}
.slide-enter {
  transform: translateY(-70%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateY(-70%);
  opacity: 0;
}

.dot-menu {
  padding: 10px;
  margin: 5px;
  position: absolute;
  right: 10px;
  top: 0;
  z-index: 2;
  background: var(--secondary-color);
  color: var(--text-color);
  box-sizing: border-box;
  -webkit-box-shadow: 5px 9px 21px -9px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 5px 9px 21px -9px rgba(0, 0, 0, 0.75);
  box-shadow: 5px 9px 21px -9px rgba(0, 0, 0, 0.75);
}
.dot-menu li {
  padding: 15px 25px 15px 10px;
  list-style: none;
  cursor: pointer;
  align-items: center;
  display: flex;
}
.dot-menu li:hover,
.dot-menu li:active {
  background: var(--hover-color);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
audio::-webkit-media-controls-mute-button,
audio::-webkit-media-controls-time-remaining-display,
audio::-webkit-media-controls-volume-slider,
audio::-webkit-media-controls-volume-slider-container {
  display: none;
}
#player {
  height: 40px;

  margin: 10px 0px 10px 0px;
}
.player-container {
  position: relative;
  top: 10px;
  width: 220px;
  overflow: hidden;
  border-radius: 0.7em;
  /* border-top-right-radius: 0.5em 0.5em;
  border-bottom-right-radius: 1em 0.7em; */
}
.player-container ~ .owner {
  align-self: right;
}
.icon {
  width: 8vw;
  height: 8vw;
  color: var(--text-color);
}
.icon-group {
  position: absolute;
  right: 13vw;
}
.input-icon {
  width: 7vw;
  height: 7vw;
  color: var(--input-icon-color);
}
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
}

.header {
  padding: 10px;
  background: var(--secondary-color);
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--text-color);
}
.header-span {
  padding: 20px;
  display: flex;
}

.header span {
  padding: 10px 10px 10px 10px;
  font-size: 22px;
  font-weight: bold;
}

.main {
  padding: 20px;
  background-image : linear-gradient(231deg, rgba(233, 233, 233, 0.01) 0%, rgba(233, 233, 233, 0.01) 25%,rgba(10, 10, 10, 0.01) 25%, rgba(10, 10, 10, 0.01) 50%,rgba(237, 237, 237, 0.01) 50%, rgba(237, 237, 237, 0.01) 75%,rgba(200, 200, 200, 0.01) 75%, rgba(200, 200, 200, 0.01) 100%),linear-gradient(344deg, rgba(2, 2, 2, 0.03) 0%, rgba(2, 2, 2, 0.03) 20%,rgba(10, 10, 10, 0.03) 20%, rgba(10, 10, 10, 0.03) 40%,rgba(100, 100, 100, 0.03) 40%, rgba(100, 100, 100, 0.03) 60%,rgba(60, 60, 60, 0.03) 60%, rgba(60, 60, 60, 0.03) 80%,rgba(135, 135, 135, 0.03) 80%, rgba(135, 135, 135, 0.03) 100%),linear-gradient(148deg, rgba(150, 150, 150, 0.03) 0%, rgba(150, 150, 150, 0.03) 14.286%,rgba(15, 15, 15, 0.03) 14.286%, rgba(15, 15, 15, 0.03) 28.572%,rgba(74, 74, 74, 0.03) 28.572%, rgba(74, 74, 74, 0.03) 42.858%,rgba(175, 175, 175, 0.03) 42.858%, rgba(175, 175, 175, 0.03) 57.144%,rgba(16, 16, 16, 0.03) 57.144%, rgba(16, 16, 16, 0.03) 71.42999999999999%,rgba(83, 83, 83, 0.03) 71.43%, rgba(83, 83, 83, 0.03) 85.71600000000001%,rgba(249, 249, 249, 0.03) 85.716%, rgba(249, 249, 249, 0.03) 100.002%),linear-gradient(122deg, rgba(150, 150, 150, 0.01) 0%, rgba(150, 150, 150, 0.01) 20%,rgba(252, 252, 252, 0.01) 20%, rgba(252, 252, 252, 0.01) 40%,rgba(226, 226, 226, 0.01) 40%, rgba(226, 226, 226, 0.01) 60%,rgba(49, 49, 49, 0.01) 60%, rgba(49, 49, 49, 0.01) 80%,rgba(94, 94, 94, 0.01) 80%, rgba(94, 94, 94, 0.01) 100%),linear-gradient(295deg, rgba(207, 207, 207, 0.02) 0%, rgba(207, 207, 207, 0.02) 25%,rgba(47, 47, 47, 0.02) 25%, rgba(47, 47, 47, 0.02) 50%,rgba(142, 142, 142, 0.02) 50%, rgba(142, 142, 142, 0.02) 75%,rgba(76, 76, 76, 0.02) 75%, rgba(76, 76, 76, 0.02) 100%),linear-gradient(73deg, rgba(81, 81, 81, 0.03) 0%, rgba(81, 81, 81, 0.03) 12.5%,rgba(158, 158, 158, 0.03) 12.5%, rgba(158, 158, 158, 0.03) 25%,rgba(136, 136, 136, 0.03) 25%, rgba(136, 136, 136, 0.03) 37.5%,rgba(209, 209, 209, 0.03) 37.5%, rgba(209, 209, 209, 0.03) 50%,rgba(152, 152, 152, 0.03) 50%, rgba(152, 152, 152, 0.03) 62.5%,rgba(97, 97, 97, 0.03) 62.5%, rgba(97, 97, 97, 0.03) 75%,rgba(167, 167, 167, 0.03) 75%, rgba(167, 167, 167, 0.03) 87.5%,rgba(22, 22, 22, 0.03) 87.5%, rgba(22, 22, 22, 0.03) 100%),linear-gradient(90deg, rgb(0,0,0),rgb(0,0,0));
  background-position: center;
  background-size: cover;
  flex: 10;
  color: var(--text-color);
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 35px;
  width: 100%;
}
.footer {
  position: fixed;
  padding: 10px 5px 10px 5px;
  bottom: 0;
  background: var(--secondary-color);
  width: 100vw;
  color: var(--text-color);
}
.footer-span {
  padding: 15px;
  display: flex;
}
.footer form {
  display: flex;
  align-content: flex-end;
}

#message {
  background: none;
  border: none;
  border-bottom: 1px solid white;
  color: var(--text-color);
  font-size: 18px;
  line-height: 20px;
  width: 80vw;
  padding: 2px;
  flex: 1;
  resize: none;
}
#message:focus {
  outline-width: 0;
  border-color: var(--primary-color);
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
#firebaseui-auth-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  padding-top: 5vh;
  background: var(--secondary-color);
  z-index: 9999999;
  left: 0;
  transition: all 0.2s ease;
}
.logoutBtn {
  align-self: center;
}
.logo {
  flex: 1;
  display: flex;
  align-items: center;
}

.update-dialog {
  position: fixed;
  left: 50%;
  bottom: 64px;
  transform: translateX(-50%);
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 12px;
  max-width: 576px;
  color: var(--text-color);
  background-color: var(--secondary-color);
  text-align: left;
}
.not-writing {
  display: none;
}
#sound {
  opacity: 0;
  position: absolute;
  height: 100px;
  top: 5px;
  width: 8vw;
}
#photo {
  opacity: 0;
  position: absolute;
  height: 100px;
  top: 5px;
  width: 8vw;
}
@media (min-width: 600px) {
  #sound {
    width: 4vw;
  }
  .icon {
    width: 2vw;
    height: 2vw;
  }
  .container {
    width: 80vw;
    margin: auto;
  }
  .header {
    width: 80vw;
  }
  .footer {
    width: 80vw;
  }
  .icon-group {
    right: 3.5vw;
  }
}
</style>
