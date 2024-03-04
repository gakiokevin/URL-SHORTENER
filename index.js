require('dotenv').config()
const express =require('express')
const cors  = require('cors')
const bodyParser = require('body-parser')
const dns = require('dns')
const urlparser =  require('url')
const PORT = process.env.PORT || 3000

const app = express()
app.set('view engine','pug')
app.set('views','views')
app.use(cors())
app.use(bodyParser.json())

let urlDb = {}


app.get('/',(req,res)=>{


return  res.render('index.pug')
})





app.post('/api/shorturl',(req,res)=>{
  let url = req.body.url
   try{
 const dnslookup = dns.lookup(urlparser.parse(url),hostname,(err,address)=>{
   if(!address){
       return res.json({error: 'invalid url'})
   }else {
     const  key = Math.floor(Math.random() * 100000) 
             const  value =  hostname
             urlDb[key] = url
            
              return res.json({original_url:url,short_url:key})
   }
 })

   }catch(error){

      return  res.json({error: 'invalid url'})
       console.log(error)

   }
})

app.get('/api/shorturl/:short_url',(req,res)=>{
  const short_url = req.params.short_url;

  if (urlDb.hasOwnProperty(Number(short_url))) {
    let original = urlDb[short_url];
   return  res.redirect(original)
  }else {
 return res.json({error: 'invalid url'})
  }
})

app.listen(PORT,()=>console.log('server is on'))
















































// app.get('/api/shorturl/:short_url',(req,res)=>{
//   let parsedUrl =  req.params.short_url
//   let long_url = UrlDb[parsedUrl]

//   res.json(long_url)

// })




// app.post('/api/shorturl',shorten)

// function shorten(req,res){

// const { word }= req.body

// const shorturl = shortid.generate({seed:word})
//  UrlDb[shorturl]= word
// res.json({original_url:word,short_url:shorturl})
// }


// app.post('/api/shorturl', isValidUrl);

// function isValidUrl(req, res) {
//   try {
//     const { urlname } = req.body;

//     // Use the Node.js URL module to parse the URL
//     const parsedUrl = new URL(urlname);

//     const hostname = parsedUrl.hostname;

//     // Use dns.lookup to validate the existence of the hostname
//     dns.lookup(hostname, (err, address, family) => {
//       if (err) {
//         res.json({ error: 'Invalid URL' });
//       } else {
//         res.json({ url: hostname });
//       }
//     });
//   } catch (error) {
//     res.json({error: 'invalid url' })
//   }
// }















