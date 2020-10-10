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
    <div id="firebaseui-auth-container" v-if="!currUser.id"></div>
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
    </div>
    <div class="footer-span">a</div>
    <div class="footer">
      <form @submit.prevent="sendMessage">
        <button>
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
  </div>
</template>

<script>
import Message from "./Message";
import { db } from "../firebase";
import Firebase from "firebase/app";
import "firebase/auth";

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
  data: function () {
    return {
      message: "",
      messages: [],
      currUser: {},
    };
  },
  mounted: function () {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.currUser.id = user.uid;
      } else {
        var ui = new firebaseui.auth.AuthUI(Firebase.auth());
        Firebase.auth().languageCode = "tr"; // set with string
        ui.start("#firebaseui-auth-container", {
          immediateFederatedRedirect: false,
          signInSuccessUrl: window.location.href,
          signInOptions: [
            Firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
            Firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          ],
        });
      }
    });
  },
  methods: {
    containsOnlyEmojis: function (text) {
      if (text.length === 0) return false;
      const onlyEmojis = text.replace(new RegExp("[\u0000-\u1eeff]", "g"), "");
      const visibleChars = text.replace(new RegExp("[\n\rs]+|( )+", "g"), "");
      return onlyEmojis.length === visibleChars.length;
    },
    logout: function () {
      Firebase.auth().signOut();
      this.currUser = {};
      location.reload();
    },
    sendMessage: function () {
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
  border-color: greenyellow;
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
  background: rgba(255, 255, 255, 0.2);
  color: greenyellow !important;
}
#firebaseui-auth-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  padding-top: 5vh;
  background: rgba(0, 0, 0, 0.94);
  z-index: 9999999;
  transition: all 0, 2 ease;
}
.logoutBtn {
  align-self: center;
}
.logo {
  flex: 1;
  display: flex;
  align-items: center;
}
@media (min-width: 600px) {
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
