<template>
    <div>
        <img src="@/assets/images/home-logo.svg" class="home-logo" />
        <div class="search-container">
            <input type="search" v-model="searchVariable" class="search-box" />
            <div class="search-img" />
        </div>
        <button class="search-button">Search</button>
        <Source />
        <a href="" class="upload-arsip">
            <router-link to="/upload">
                Masukkan Arsip Anda
            </router-link>
        </a>
        <Copyright />    
    </div>
</template>

<script>
import Copyright from '../components/Copyright'
import Source from '../components/Source'
export default {
    data() {
        return {
            sourceVariable: 'all',
            searchVariable: ''
        }
    },
    components: {
        Copyright,
        Source
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
.home-logo{
    display: block;
    margin: 0 auto;
}
.search-container{
    margin-top: 100px;
    width: 30%;
    margin-left: auto;
    margin-right: auto;
    position: relative;
}
.search-box{
    width: 100%;
    height: 35px;
    border-radius: 15px;
    border: 1px #707070 solid;
    padding: 5px 5px 5px 40px; 
}
.search-img{
    position: absolute;
    display: inline-block;
    height: 22px;
    width: 22px;
    z-index: 10;
    border-radius: 10px;
    border: none;
    background: url('../assets/images/home-search.svg') no-repeat left center;
    top: 6px;
    left: 7px;
}
.search-button{
    display: block;
    margin-top: 54px;
    background-color: #FF6E5C;
    height: 40px;
    width: 185px;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    color: #FFFFFF;
    margin-left: auto;
    margin-right: auto;
    border: none;
    border-radius: 20px;
}
.upload-arsip{
    display: block;
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    color: #FF6E5C;
    margin-left: auto;
    margin-right: auto;
    margin-top: 134px;
}
</style>