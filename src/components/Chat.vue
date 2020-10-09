/* eslint-disable */

<template>
  <div class="container">
    <div id="firebaseui-auth-container" style="position: fixed"></div>
    <div class="header">
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
    <div class="header-span">a</div>
    <div
      class="main"
      v-chat-scroll="{
        smooth: true,
        notSmoothOnInit: true,
        scrollonremoved: true,
      }"
    >
      <Message
        v-for="message in messages"
        :message="message"
        :key="message.id"
      />
    </div>
    <div class="footer-span">a</div>
    <div class="footer">
      <form @submit.prevent="sendMessage">
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
// import * as firebaseui from "firebaseui";

export default {
  name: "Chat",
  firestore: {
    messages: db.collection("messages").orderBy("createdAt").limit(30),
  },
  components: {
    Message,
  },
  data: function () {
    return {
      message: "",
      messages: [],
      currUser: {
        user: "user",
      },
    };
  },
  mounted: function () {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log(this.currUser);
        // console.log(this.messages);

        this.currUser.type = "anonymous";
        this.currUser.id = user.uid;
      } else {
        // var ui = new firebaseui.auth.AuthUI(Firebase.auth());
        // ui.start("#firebaseui-auth-container", {
        //   signInOptions: [Firebase.auth.EmailAuthProvider.PROVIDER_ID],
        //   requireDisplayName: false
        // });
        Firebase.auth()
          .signInAnonymously()
          .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("error");
            console.log(errorCode, errorMessage);
            // ...
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
      db.collection("messages").add(messageSnap);
      console.log(messageSnap);
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
  background: black;
  flex: 10;
  color: white;
  overflow-x: hidden;
  overflow-y: auto;
}
.footer {
  position: fixed;
  padding: 10px;
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
}
#message:focus {
  outline-width: 0;
  border-color: greenyellow;
}
button {
  background: none;
  border: none;
  margin-left: 10px;
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
