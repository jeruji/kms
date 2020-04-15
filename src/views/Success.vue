<template>
    <div>
        <img src="../assets/images/page-arsip-logo.svg" class="arsip-logo" />
        <img src="../assets/images/upload-berhasil.svg" class="success-logo" />
        <span class="success-label margin-top-30">Konten Anda berhasil</span>
        <span class="success-label">diupload</span>
        <div class="nav-button">
            <button @click="seeResult" class="content-button margin-right-6">See your content</button>
            <button @click="backHome" class="back-home margin-left-6">Back to home</button>
        </div>
        <div class="copyright-container">
            <Copyright />
        </div>
    </div>
</template>
<script>
import Copyright from '../components/Copyright'
export default {
    data(){
        return{
            bookID: null
        }
    },
    beforeCreate: function() {
        document.body.style = 'background-color:#f2f2f2;'
    },
    created: function() {
        this.bookID = this.$route.params.bookID
    },
    methods : {
        backHome(){
            this.$router.replace({path: 'Home'})
        },
        seeResult(){
            this.$router.push({
                name: 'Result',
                params: {
                    bookID: this.bookID
                }
            })
        }
    },
    components: {
        Copyright
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
@import url('https://fonts.googleapis.com/css?family=PT+Serif&display=swap');
.arsip-logo {
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: 148px;
    height: 30px;
}
.success-logo {
    margin-top: 60px;
}
.margin-top-30 {
    margin-top: 30px;
}
.margin-left-6 {
    margin-left: 6px;
}
.margin-right-6 {
    margin-right: 6px;
}
.success-label {
    font-family: 'PT Serif', serif;
    font-size: 30px;
    text-align: center;
    color: #000000;
    margin-left: auto;
    margin-right: auto;
    display: block;
}
.nav-button {
    margin-top: 65px;
}
.back-home {
    width: 184px;
    height: 40px;
    border-color: #2FB491;
    border: 1px solid;
    border-radius: 20px;
    display: inline-block;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    color: #2FB491;
    cursor: pointer;
}
.content-button {
    width: 184px;
    height: 40px;
    background-color: #2FB491;
    color: #FFFFFF;
    border-radius: 20px;
    display: inline-block;
    border: none;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    cursor: pointer;
}
</style>