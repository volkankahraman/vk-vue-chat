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
.loader {
  border: 8px solid var(--text-color);
  border-radius: 50%;
  border-top: 8px solid var(--primary-color);
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.pulse {
  animation: pulseAnim 400ms infinite;
  animation-direction: alternate;
  animation-timing-function: ease;
}
@keyframes pulseAnim {
  from {
    opacity: 0;
    font-size: 28vw;
  }
  to {
    font-size: 32vw;
    opacity: 1;
  }
}
@media (min-width: 600px) {
  @keyframes pulseAnim {
    from {
      opacity: 0;
      font-size: 14vw;
    }
    to {
      font-size: 16vw;
      opacity: 1;
    }
  }
}
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
  --primary-color: #a52422;
  --secondary-color: #181717;
  --text-color: white;
  --hover-color: #242424;
  --input-icon-color: #909090;
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
  background: var(--primary-color);
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
