/* eslint-disable */

<template>
  <div class="container">
    <div class="header">
      <div class="logo">
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
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <Span> Chat</Span>
      </div>
      <button @click="logout" class="logoutBtn">
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
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          ></path>
        </svg>
      </button>
    </div>
    <div class="header-span">a</div>
    <div id="firebaseui-auth-container" v-if="false"></div>
    <div
      class="main"
      v-chat-scroll="{
        smooth: true,
        notSmoothOnInit: true,
        scrollonremoved: true,
      }"
    >
      <Message
        v-for="message in messages.slice().reverse()"
        :message="message"
        :key="message.id"
      />

      <div :class="{ 'not-writing': true }">Karşı taraf yazıyor...</div>
    </div>
    <div class="footer-span">a</div>
    <div class="footer">
      <form @submit.prevent="sendMessage">
        <!-- v-touch:start="startRecording" v-touch:end="endRecording" -->
        <button>
          <input
            type="file"
            @change="previewSound"
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
        <input
          id="message"
          v-model="message"
          type="text"
          name="message"
          placeholder="mesaj..."
          autocomplete="off"
        />
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
import { db } from "../firebase";
import Firebase from "firebase/app";
import Swal from "sweetalert2";

import "firebase/auth";
import "firebase/messaging";
import "firebase/storage";

// import
import * as firebaseui from "firebaseui";

export default {
  name: "Chat",
  firestore: {
    messages: db.collection("messages").orderBy("createdAt", "desc").limit(25),
  },
  components: {
    Message,
  },
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.showUpdateUI = true;
      });
    }
  },
  data: function () {
    return {
      message: "",
      messages: [],
      currUser: {},
      prompt: false,
    };
  },
  mounted: function () {
    var user = Firebase.auth().currentUser;
    if (user) {
      console.log(user);
      this.currUser.id = user.uid;
      this.getToken();
    } else {
      Firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user);

          this.currUser.id = user.uid;
          this.getToken();
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
    previewSound() {
      let inputElement = document.getElementById("sound");
      console.dir(inputElement.files[0]);

      // soundElement.src = window.URL.createObjectURL(inputElement.files[0]);
      Firebase.storage()
        .ref(inputElement.files[0].name)
        .put(inputElement.files[0])
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            let messageSnap = {
              seen: false,
              emoji: this.containsOnlyEmojis(this.message),
              user: this.currUser.id,
              content: "Ses kaydı gönderdi!",
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

      // ref.on("state_changed", (snapshot) => {
      //   snapshot.ref.getDownloadURL().then((url) => {
      //     console.log(url);
      //     soundElement.src = url;
      //     Swal.fire({
      //       text: "gayıtlandı !" + url,
      //       timer: 300,
      //     });
      //   });
      // });
    },
    startRecording() {
      console.log("a");

      // const player = document.getElementById("player");
    },
    endRecording() {
      console.log("b");
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
              console.log(exist);
            });
        })
        .catch((err) => console.log("error", err));
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
  color: white;
}
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
}

.header {
  padding: 10px;
  background: #181717;
  position: fixed;
  top: 0;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
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
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("~@/assets/wolf.jpg");
  background-position: center;
  background-size: cover;
  flex: 10;
  color: white;
  overflow-x: hidden;
  overflow-y: auto;
}
.footer {
  position: fixed;
  padding: 10px 5px 10px 5px;
  bottom: 0;
  background: black;
  width: 100vw;
  color: white;
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
  color: white;
  font-size: 18px;
  width: 80vw;
  padding: 2px;
  flex: 1;
}
#message:focus {
  outline-width: 0;
  border-color: var(--main-primary);
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
  background: var(--main-primary);
  opacity: 0.8;
  color: var(--main-primary) !important;
}
#firebaseui-auth-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  padding-top: 5vh;
  background: rgba(0, 0, 0, 0.94);
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
  color: white;
  background-color: #2c3e50;
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
@media (min-width: 600px) {
  #sound {
    width: 4vw;
  }
  .icon {
    width: 4vw;
    height: 4vw;
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
}
</style>
