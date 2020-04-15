<template>
    <div>
        <img src="../assets/images/page-arsip-logo.svg" class="arsip-logo" />
        <div class="upload-container">
            <div class="header-upload">
                <div class="plus-button" @click="$refs.file.click()" />
                <input type="file" ref="file" style="display:none;" accept="image/*" v-on:change="validateForm()" />
                <span class="label-upload">Masukkan Arsip Anda</span>
                <div class="source-container">
                    <Source ref="source" />
                </div>    
            </div>
            <div class="description-container">
                <input type=text class="description-field" v-model="title" placeholder="Judul" />
                <input type=text class="description-field" v-model="penerbit" placeholder="Penerbit" />
                <input type=text class="description-field" v-model="year" placeholder="Tahun Terbit" />
            </div>
            <hr class="container-separator" />
            <div class="file-list-label-container">
                <span class="file-list-label">Your file</span>
            </div>
            <div class="container-image">
                <div v-for="(image, index) in images" v-bind:key="index" class="processed-image">
                    <img :src="image.src" style="width: 100%;height: 100%;" />
                </div>
            </div>
        </div>
        <button @click="publishContent" :disabled="bookID==null" class="publish-button">Publish</button>
        <button @click="cancelWarning" class="cancel-button">Cancel</button>
        <Copyright />
    </div>    
</template>

<script>
import Source from '../components/Source'
import Copyright from '../components/Copyright'
import axios from 'axios'
import { server } from '../static/helper'
import Swal from 'sweetalert2'

export default {
    data() {
        return{
            title: '',
            penerbit: '',
            year: '',
            imageSource: null,
            images: [],
            textResult: '',
            bookID: null,
            bookData: null
        }
    },
    beforeCreate: function() {
        document.body.style = 'background-color:#f2f2f2;'
    },
    components: {
        Source,
        Copyright
    },
    methods: {
        validateForm(){
            let validate = true

            if(this.title.length<5){
                validate = false
            }

            if(this.penerbit.length<5){
                validate = false
            }

            if(/^[12][0-9]{3}$/.test(this.year) == false){
                validate = false
            }

            if(this.$refs['source'].sourceVariable == 'all'){
                validate = false
            }

            if(!validate){
                Swal.fire({
                    icon: 'error',
                    title: 'Data Kosong',
                    text: 'Mohon isi judul, penerbit, tahun terbit ' +
                                        'dan pilih kategori.'
                })
                this.resetFile()
            }
            else {
                const self = this

                this.bookData = {
                    judul: this.title,
                    penerbit: this.penerbit,
                    tahunterbit: this.year,
                    kategori: this.$refs['source'].sourceVariable
                }
                if(this.bookID==null){
                    axios.post(server.baseURL+'/book/create', this.bookData)
                    .then(function (response) {
                        if(self.bookID==null){
                            self.bookID = response.data.book._id
                        }
                        self.processFile()
                    })
                }
                else{
                    self.processFile()
                }
                
            }
        },
        processFile(){
            const self = this
            this.imageSource = this.$refs.file.files[0]
            let formData = new FormData()
            formData.append('file', this.imageSource)
            
            axios.post(server.baseURL+'/book/upload', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(response => {
                let imageFile = server.baseURL+'/'+response.data.filename
                self.$router.push({
                    name: 'ImageProcess',
                    params: {
                        imageFile: imageFile,
                        images: this.images,
                        textResult: this.textResult,
                        bookID: this.bookID,
                        bookData: this.bookData
                    }
                })
            })
            .catch(response => {
                Swal.fire({
                    icon: 'error',
                    title: 'Upload Image Gagal',
                    text: 'Upload gagal, mohon periksa format file anda '+response.data  
                })
            })
        },
        publishContent() {
            this.$router.push({
                name: 'Success',
                params: {
                    bookID: this.bookID
                }
            })
        },
        cancelWarning() {
            Swal.fire({
                title: 'Anda yakin?',
                text: 'Data yang anda masukkan akan terhapus',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, Lanjutkan'
                }).then((result) => {
                if (result.value) {
                    this.cancelUpload()
                }
            })
        },
        cancelUpload() {

            let self = this

            if(this.bookID!=null){
                axios.delete(server.baseURL+'/book/delete?bookID=' + this.bookID)
                .then(
                    axios.delete(server.baseURL+'/bookdetail/delete?bookID=' + self.bookID)
                    .then(
                        self.$router.replace({
                            path: 'Home'
                        })
                    )
                )
            }
            else{
                this.$router.replace({
                    path: 'Home'
                })
            }    
        },
        resetFile() {
            this.$refs.file.value = ''
        }
    },
    mounted() {
        
        if(this.$route.params.hasOwnProperty('images')){
            this.images = this.$route.params.images
        }

        if(this.$route.params.hasOwnProperty('imgSrc')){
            this.images.push({
                src: this.$route.params.imgSrc
            })
        }

        if(this.$route.params.hasOwnProperty('bookID')){
            this.bookID = this.$route.params.bookID
        }
        
        if(this.$route.params.hasOwnProperty('textResult')){
            this.textResult = this.$route.params.textResult
            
            const bookDetailData = {
                    imageFile: this.images[this.images.length-1].src,
                    bookId: this.bookID,
                    textBook: this.textResult
                }
                
            axios.post(server.baseURL+'/bookdetail/create', bookDetailData)
                .then(function (response) {
                    console.log(response)
                })    
        }

        if(this.$route.params.hasOwnProperty('bookData')){
            this.bookData = this.$route.params.bookData
            this.title = this.bookData.judul
            this.penerbit = this.bookData.penerbit
            this.year = this.bookData.tahunterbit
            this.$refs['source'].sourceVariable = this.bookData.kategori
        }
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=PT+Serif&display=swap');
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
.upload-container {
    width: 710px;
    height: 465px;
    background-color: #FFFFFF;
    margin-top: 42px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    border-radius: 20px;
}
.plus-button {
    background-image: url('../assets/images/add-img.png');
    background-size: 41px;
    width: 42px;
    height: 42px;
    background-repeat: no-repeat;
    left: 51px;
    top: 42px;
    position: absolute;
    cursor: pointer;
}
.arsip-logo {
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: 148px;
    height: 30px;
}
.label-upload{
    left: 123px;
    font-family: 'PT Serif', serif;
    font-size: 30px;
    color: #000000;
    top: 42px;
    position: absolute;
}
.source-container{
    position: absolute;
    top: 25px;
    right: 88px;
}
.header-upload{
    height: 100px;
}
.description-container{
    margin-top: 30px;
    position: relative;
    width: 100%;
}
.description-field{
    width: 190px;
    height: 29px;
    border-radius: 22px;
    border:#707070 1px solid;
    margin-left: 6px;
    margin-right: 6px;
    position: relative;
    margin-left: 12px;
    text-indent: 15px;
}
.container-separator{
    border: 1px solid #E6E6E6;
    opacity: 1;
    width: 648px;
    margin-top: 35px;
}
.file-list-label{
    font-family: 'Open Sans', sans-serif;
    color: #808080;
    font-size: 14px;
    margin-left: 51px;
}
.file-list-label-container{
    position: relative;
    text-align: left;
}
.publish-button{
    background-color: #FF6E5C;
    border-radius: 20px;
    width: 185px;
    height: 40px;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    color: #FFFFFF;
    margin-top: 33px;
    margin-bottom: 20px;
    border:none;
    margin-right: 10px;
    cursor: pointer;
}
.cancel-button{
    background-color: #282929;
    border-radius: 20px;
    width: 185px;
    height: 40px;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    color: #FFFFFF;
    margin-top: 33px;
    margin-bottom: 20px;
    border:none;
    margin-left: 10px;
    cursor: pointer;
}
.container-image {
    position: relative;
    margin-top: 40px;
    overflow-x: auto;
    white-space: nowrap;
}
.processed-image {
    position: relative;
    width: 100px;
    height: 150px;
    display: inline-block;
    margin-left: 10px;
    margin-right: 10px;
}
</style>
