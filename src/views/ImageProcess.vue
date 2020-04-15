<template>
    <div>
        <img src="../assets/images/page-arsip-logo.svg" class="arsip-logo" />
        <div class="processing-container">
            <div class="text-result-container">
                <img v-if="textResult==null" src="../assets/images/loading.gif" class="loading-spin" />
                <textarea rows="16" cols="50" v-if="textResult" id="textResult" class="text-result" v-model="textResult"></textarea>
            </div>
            <img id="imageFile" v-if="imgUrl" :src="imgUrl" class="image-container" />
            <div class="slider-container">
                <label for="brightness-slider" class="slider-label brightness-position">Brightness</label>
                <input type="range" min="40" max="150" name="brightness-slider" class="brightness-slider" v-model="brightness">
                <label for="contrast-slider" class="slider-label contrast-position">Contrast</label>
                <input type="range" min="20" max="150" name="contrast-slider" class="contrast-slider" v-model="contrast">
            </div>
        </div>
        <button @click="submitImage" class="ok-button" v-bind:disabled="btnDisabled">Okay</button>
        <Copyright />
    </div>
</template>
<script>
import { createWorker, PSM, OEM } from 'tesseract.js'
import Copyright from '../components/Copyright'

const worker = createWorker({
  logger: m => console.log(m),
})

export default {
    data() {
        return {
            textResult: null,
            brightness: 0,
            contrast: 0,
            imgUrl: null,
            images: [],
            btnDisabled: true,
            bookID: true,
            bookData: null
        }
    },
    beforeCreate: function() {
        document.body.style = 'background-color:#f2f2f2;'
    },
    components: {
        Copyright
    },
    mounted(){
        this.images = this.$route.params.images
        this.imgUrl = this.$route.params.imageFile
        this.bookID = this.$route.params.bookID
        this.bookData = this.$route.params.bookData
    },
    watch: {
        imgUrl: function(){
            this.recognize(this.imgUrl, this)
        },
        brightness: function(){
            document.getElementById('imageFile').style.filter = "brightness("+this.brightness+"%)"
        },
        contrast: function(){
            document.getElementById('imageFile').style.filter = "contrast("+this.contrast+"%)"
        },
        textResult: function(){
            if(this.textResult!=''){
                this.btnDisabled = false
            }
        }
    },
    methods: {
        recognize: async (imageFile, self) => {
            
            await worker.load()
            await worker.loadLanguage('ind')
            await worker.initialize('ind', OEM.LSTM_ONLY)
            await worker.setParameters({
            tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
            })
            const { 
                data: { 
                    text } 
                } = await worker.recognize(imageFile)
                    self.textResult = text
            
        },
        submitImage(){
            this.$router.push({
                name: 'Upload',
                params: { imgSrc: this.imgUrl, images: this.images, textResult: this.textResult, bookID: this.bookID, bookData: this.bookData }
            })
        }
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
.arsip-logo {
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: 148px;
    height: 30px;
}
.text-result-container{
    position: relative;
    width: 30%;
    height: 461px;
    overflow-y: hidden;
    margin-top: 33px;
    margin-right: 46px;
    display: inline-block;
}
.text-result{
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    color: #333333;
    text-align: left;
    line-height: 28px;
}
.image-container{
    border-radius: 20px;
    background-color: #FFFFFF;
    display: inline-block;
    width: 334px;
    height: 486px;
}
.processing-container{
    position: relative;
    margin-top: 40px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
}
.ok-button{
    width: 184px;
    height: 40px;
    border-radius: 20px;
    background-color: #FF6E5C;
    color: #FFFFFF;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    border: none;
    margin-top: 22px;
    cursor: pointer;
}
.brightness-slider, .contrast-slider{
    display: block;
    position: absolute;
}
.brightness-slider {
    top: 60px;
}
.contrast-slider {
    position: absolute;
    top: 145px;
}
.slider-container{
    margin-left: 46px;
    width: 30%;
    display: inline-block;
}
.slider-label{
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    color: #333333;
    text-align: left;
    display: block;
}
.brightness-position{
    position: absolute;
    top: 33px; 
}
.contrast-position {
    position: absolute;
    top: 120px;
}
.loading-spin {
    margin-top: 50%;
}
</style>