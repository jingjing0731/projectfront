<template>
    <fieldset>
        <legend>老师管理</legend>
        <router-view></router-view>
    </fieldset>
 
</template>

<script setup lang="ts">
import { ref,onMounted  } from "vue";
import PubSub from 'pubsub-js'
const productName = ref('')
onMounted(()=>{
     //消费者
     //订阅消息
     //PubSub.subscribe('主题', function(msg, data){})
     PubSub.subscribe('主题1', (topic: string, data: any) => {
        console.log(topic, data);
        productName.value=data;
    })
})
</script>