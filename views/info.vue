<template lang="html">
    <div>
        <h1>{{ title }}</h1>
        <p>Here comes the redis server info</p>
        <p v-for="value, key in info">{{ key }}: {{ value }}</p>
    </div>
</template>

<script>
export default {
    data: function() {
        return {}
    }
}
</script>

<style lang="css">
</style>