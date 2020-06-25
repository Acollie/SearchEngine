<template>
    <div>
        <a v-bind:href="url">
            <h3>{{page_title}}</h3>
            <h4>{{body}}</h4>
        </a>
    </div>
</template>

<script>
    export default {
        name: "Result",
        props:["page_title","url","body"],
        created() {
        }
    }

</script>

<style scoped>
    div{
        background-color: red;
        margin: 20px;
        text-align: left;
    }
    a{
        color: #FFFFFF;
        text-decoration: none;
    }
</style>
