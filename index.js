const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const request = require('request-promise')
const PORT = 3000;

const cheerio = require("cheerio");
const e = require('express');


app.set('view engine' , 'ejs');

//middleware=================================================//
app.use(bodyParser.json()); 
app.use(bodyParser.json({limit: '50mb'})); app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//===========================================================//


app.get("/",function(req,res){
    res.render("test",{});
})


app.listen(PORT , function(){
    console.log("실행중");
}) ;

app.post("/parse",(req,res)=> {
    console.log(req.body);
    const element = req.body.element;
    const cont = req.body.content.replace("\n\t","");
    

    const host = req.body.host; 
    const extractTag = req.body.extractTag; 
    
    // const $ = cheerio.load(cont);
    // console.log($('div.ChampionName').html());

    // request('https://www.op.gg/summoner/userName=wo+suixinsuoyu').then(function (html) {

    // Cheerio 오브젝트 생성
    const $ = cheerio.load(cont);


    // const $articleList = $('.GameSettingInfo .ChampionName').toArray();
    const $articleList = $(element).toArray();
 


    var arr = [] ; 
    // if(extractTag)
    $articleList.forEach((el)=>{

        arr.push($(el).html().replace(/\n/gi,"").replace(/\r/gi,"").replace(/\t/gi,"") );
    })
    console.log(arr);
    res.json(arr);
    
// });
});

