<template>
    <div>
        <select v-model="sourceVariable" class="select-source">
            <option value="all">All Files</option>
            <option value="koran">Newspapers</option>
            <option value="buku">Books</option>
        </select>
    </div>
</template>
<script>
export default {
    data() {
        return {
            sourceVariable: 'all'
        }
    }
}
</script>
<style scoped>
.select-source{
    margin-top: 27px;
    border: none;
}
.select-source, .select-source option{
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    font-weight: bold
}
</style>