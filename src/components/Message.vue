<template>
<div class="wrapper">

<div class="bouble " :class="{ 'user' : content !== ''}">{{content}} </div>
</div>
  
</template>

<script>
export default {
props: ['content']
}
</script>

<style>
.bouble{
    color:white;
    border: 1px solid black;
    border-radius: 5px;
    background:rgba(255, 255, 255, 0.15);
    padding: 10px 15px 10px 15px;
    margin: 5px;
        align-self: flex-start;
    
    max-width: 60vw;
    box-sizing: border-box;
}
.wrapper{
    display: flex;
    flex-direction: column;
    
}
.bouble.user {
    background: yellowgreen;
    color: black;
        align-self: flex-end;
}
</style>