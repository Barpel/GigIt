<template>
     <section class="user-msg" :class="msg.type" v-if="msg">
            <h6>{{msg.txt}}</h6>
        </section>
</template>

<script>
export default {
 props: ['msg'],
}
</script>

<style>

</style>
