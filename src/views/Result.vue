<template>
    <div>
        <div class="header-container">
             <img src="@/assets/images/home-logo.svg" class="logo" />
        </div>
        <div class="count-result-container">
            <span class="count-result-text">
                <span class="bold-result">{{ totalSearch }}</span> naskah telah ditemukan 
            </span>
        </div>
        <div class="search-keyword-container">
            <div v-for="(keyword, index) in searchKeywords" v-bind:key="index" class="search-keyword">
                {{keyword}}
            </div>
        </div>
        <div v-for="(result, index) in searchResults" v-bind:key="index" class="result-category-container">
            <div class="result-container">
                <div class="img-container">
                    <img :src="result.image" class="result-img" />
                </div>
                <div class="title-container">
                    <span class="title-text">
                        {{ result.title }} 
                    </span>
                    <span class="description-text">
                        {{ result.description }}
                    </span>
                </div>
                <div class="keterangan-container">
                    <div class="source-container">
                        <span class="source-type">
                            {{ result.sourceType }}
                        </span>
                        <span class="source-title">
                            {{ result.sourceTitle }}
                        </span>
                    </div>
                    <div class="publisher-container">
                        <span class="publisher-text">
                            {{ result.publisherText }}
                        </span>
                        <span class="publisher-name">
                            {{ result.publisherName }}
                        </span>
                    </div>
                    <div class="year-publicity-container">
                        <span class="year-publicity-title">
                            {{ result.yearTitle }}
                        </span>
                        <span class="year-publicity-text">
                            {{ result.yearPublicity }}
                        </span>
                    </div>
                </div>    
            </div>
            <div class="category-container">
                <div class="category-title-container">
                    <span class="category-title">
                        CATEGORY
                    </span>
                </div>
                <div class="type-container">
                    <img src="../assets/images/check-circle.png" class="check-circle-style" />
                    <span class="type-text">
                        BUKU
                    </span>
                    <span class="count-text">
                        ({{ totalBuku }})
                    </span>
                </div>
                <div class="type-container">
                    <img src="../assets/images/check-circle.png" class="check-circle-style" />
                    <span class="type-text">
                        MAJALAH
                    </span>
                    <span class="count-text">
                        ( {{ totalMajalah }} )
                    </span>
                </div>
                <div class="type-container">
                    <img src="../assets/images/check-circle.png" class="check-circle-style" />
                    <span class="type-text">
                        KORAN
                    </span>
                    <span class="count-text">
                        ( {{ totalKoran }} )
                    </span>
                </div>
            </div>
        </div>
        <Copyright />
    </div>
</template>
<script>
import Copyright from '../components/Copyright'
import axios from 'axios'
import { server } from '../static/helper'
export default {
    data(){
        return {
            bookID: null,
            totalSearch: 0,
            searchKeywords: [
                'Soedirman',
                'Soekarno'
            ],
            searchResults: [{
                image : '@/assets/images/home-logo.svg',
                title : 'Ini Contoh Title Hasil dari Result',
                description : 'Ada tiga hal yang perlu diluruskan dalam kicauan blablabla soal serangan Cheng Ho ke Majapahit',
                sourceType : 'Judul Koran',
                sourceTitle : 'Historia Paper',
                publisherText : 'Penerbit',
                publisherName : 'Historia.id',
                yearTitle : 'Tahun terbit',
                yearPublicity : '1991'
            }],
            totalBuku: 0,
            totalMajalah: 0,
            totalKoran: 0
        }
    },
    components: {
        Copyright
    },
    created: function() {
        if(this.$route.params.hasOwnProperty('bookID')){
            this.bookID = this.$route.params.bookID
        }
    },
    watch: {
        bookID: function() {
            let self = this
            axios.get(server.baseURL+'/book/book/'+this.bookID)
                .then(data => 
                {
                    let bookData = data.data
                    for(let index=0; index<bookData.length; index++){
                        self.searchResults.push({
                            
                        })
                    }  
                })
        }
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
@import url('https://fonts.googleapis.com/css?family=PT+Serif&display=swap');
.header-container {
    display: inline-block;
    width: 100%;
    height: 30px;
}
.logo {
    left: 60px;
    position: relative;
    height: 100%;
    float: left;
}
.search-content {
    top: 125px;
    position: relative;
}
.count-result-text {
    left: 160px;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
}
.bold-result {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    font-weight: bold;
}
.search-keyword-container {
    width: fit-content;
    margin-left: 160px;
    margin-top: 14px;
}
.count-result-container {
    margin-top: 125px;
    margin-left: 160px;
    height: fit-content;
    text-align: left;
}
.check-circle-style {
    width: 28px;
    height: 28px;
    vertical-align: middle;
    margin-right: 12px;
}
.search-keyword {
    display: inline-block;
    margin-right: 20px;
    border-radius: 20px;
    border-style: solid;
    border: 1px solid #cccccc;
    padding: 10px;
}
.result-container {
    width: 60%;
    margin-left: 160px;
    text-align: left;
    display: inline-block;
}
.result-category-container {
    width: 100%;
    height: fit-content;
    margin-top: 64px;
}
.img-container {
    width: 150px;
    height: 200px;
    float: left;
    margin-right: 20px;
}
.result-img {
    width: 100%;
    height: 100%;
}
.category-container {
    width: 25%;
    display: inline-block;
    text-align: left;
}
.category-title-container {
    margin-bottom: 18px;
}
.title-container {
    position: relative;
    width: inherit;
    vertical-align: top;
    display: inline-block;
}
.title-text {
    font-family: 'PT Serif', serif;
    font-size: 32px;
    text-align: left;
    display: block;
}
.description-text {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    text-align: left;
    display: block;
}
.keterangan-container {
    margin-top: 22px;
    text-align: left;
}
.source-type, .publisher-text, .year-publicity-title {
    font-family: 'Open Sans', sans-serif;
    color: #808080;
    font-size: 12px;
    display: block;
}
.source-container, .publisher-container, .year-publicity-container {
    display: inline-block;
    margin-right: 40px;
}
.source-title, .publisher-name, .year-publicity-text {
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    font-weight: bold;
}
.category-title {
    font-family: 'Open Sans', sans-serif;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 4px;
}
.type-text {
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    font-weight: bold;
}
.type-container {
    margin-bottom: 15px;
}
.count-text {
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    color: #FF6E5C;
}
</style>