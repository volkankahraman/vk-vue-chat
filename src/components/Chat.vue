<template>
  <div class="container">
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
        ></path>
      </svg>
      <Span> Chat</Span>
    </div><div class="header-span">a</div>
    <div class="main">
      <!-- <Message v-for="message in messages" :content="message" v-bind:key="message" /> -->
      <Message  />
      <Message  />
      <Message  />
      <Message  />
      <Message  />
    </div>
    <div class="footer">
      <form @submit.prevent="sendMessage">
        <input
          type="text"
          name="message"
          placeholder="mesaj..."
          id="message"
          v-model="message"
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
            ></path>
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import  Message from "./Message";
export default {
  name: "Chat",
  components:{
    Message,
  },
  props: ['message'],
  created: ()=>{
    this.messages = [];
  },
  
  methods: {
    sendMessage: function () {
      this.messages.push(this.message)
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
.header-span{
  padding: 15px;
  display: flex;
}

.header span {
  padding: 10px;
  font-size: 5vw;
  font-weight: bold;
}

.main {
  padding: 20px;
  background: black;
  flex: 10;
  color: white;
}
.footer {
  position: fixed;
  padding: 10px;
  bottom: 0;
  background: black;
  width: 100vw;
  color: white;
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
  font-size: 4vw;
  width: 80vw;
  padding: 2px;
}
#message:focus {
  outline-width: 0;
}
button {
  background: none;
  border: none;
  margin-left: 10px;
  text-align: center;
}
</style>
