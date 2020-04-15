<template>
    <div>
        <img src="../assets/images/page-arsip-logo.svg" class="arsip-logo" />
        <img src="../assets/images/page-arsip-gagal.svg" class="fail-logo" />
        <span class="fail-label margin-top-30">Konten Anda gagal</span>
        <span class="fail-label">diupload</span>
        <div class="nav-button">
            <button class="back-button">Back</button>
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

        }
    },
    beforeCreate: function() {
        document.body.style = 'background-color:#f2f2f2;'
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
.margin-top-30 {
    margin-top: 30px;
}
.fail-logo {
    margin-top: 60px;
}
.fail-label {
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
.back-button {
    width: 184px;
    height: 40px;
    border: none;
    background-color: #FF6E5C;
    border-radius: 20px;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    color: #FFFFFF;
}
</style>