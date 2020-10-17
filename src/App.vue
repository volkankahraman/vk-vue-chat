/* eslint-disable */
<template>
  <Chat />
</template>

<script>
import Chat from "./components/Chat.vue";

export default {
  name: "Vk-Chat",
  components: {
    Chat,
  },
};
</script>

<style>
* {
  margin: 0;
  box-sizing: border-box;
  font-family: roboto, monospace;
}
html {
  background: rgb(255, 0, 0);
  background: radial-gradient(
    circle,
    rgba(255, 0, 0, 1) 40%,
    rgba(2, 0, 36, 1) 100%
  );
}
.disable-selection {
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer */
  -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
  -webkit-user-select: none; /* Chrome, Safari, and Opera */
  -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
}
:root {
  --main-primary: #a52422;
  --text-color: white;
  --secondary-color: #181717;
  --hover-color: #242424;
}

::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}
::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: var(--main-primary);
  border: 22px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-thumb:hover {
  background: #ffffff;
}
::-webkit-scrollbar-thumb:active {
  background: #000000;
}
::-webkit-scrollbar-track {
  background: #000000;
  border: 0px none #ffffff;
  border-radius: 43px;
}
::-webkit-scrollbar-track:hover {
  background: #666666;
}
::-webkit-scrollbar-track:active {
  background: #333333;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
