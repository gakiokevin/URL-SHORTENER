require('dotenv').config()
const express =require('express')
const cors  = require('cors')
const bodyParser = require('body-parser')
const dns = require('dns')

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use('/public', express.static(`${process.cwd()}/public`))




app.get('/',(req,res)=>{
res.sendFile(process.cwd() + '/views/index.html')
})

function isValidUrl(url){
  const hostname = new URL(url).hostname;

  return new Promise((resolve, reject) => {
    dns.resolve4(hostname, (err, addresses) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });

}


const urlDb = {}
app.post('/api/shorturl',async (req,res)=>{
   const url = req.body.url
  

   try {
    const isValid = await isValidUrl(url)

    if(isValid){
      const shortenedURl = Math.floor(Math.random() * 444444)
      urlDb[shortenedURl] = url

      res.json({ original_url : url, short_url : shortenedURl})

    }else {
      res.json({error: 'invalid url'})
    }
   } catch (error) {
    res.json({error: 'invalid url'})
    console.log(error.message)
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















