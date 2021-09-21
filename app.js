const PORT = process.env.PORT || 8000;
const express = require('express');
const morgan = require('module');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
const { Url }= require("./models/url.js");
const getDeviceDetails = require('device-details');
//import  getDeviceDetails  from 'device-details';
const { DeviceDetails } = require('device-details/lib/models');
//import { DeviceDetails } from "device-details/lib/models";
const { VisiterDetails }= require("./models/url.js");
require("./connection/conn.js");
const { nanoid } = require('nanoid');
require('dotenv').config();
 app.use(helmet());
 const os = require('os');
 //app.use(morgan('tiny'));
 const { detect } = require('detect-browser');


// --------------------------------------------------------------------------------------------------------
// module
const update = async(req , res) => {
  try {
    var newValues = url;
    var upadteVisiters = newValues.totalVisits + 1;
    newValues.totalVisits = upadteVisiters;
    // -----------ip
    var ip = await ipify({useIPv6: false});
    console.log(await ipify({useIPv6: false}));
   //country
   var geo = geoip.lookup(ip);
   console.log(geo);
  console.log(os.platform());

  console.log("browser");
   const browser = detect();
  if (browser) {
    console.log(browser.name);
    console.log(browser.version);
    console.log(browser.os);
  }
  // ----------------- platform
var platform = os.platform();

switch(platform) {
    case 'android':
        var updateAnroidVisiter = newValues.anroidVisiter +1;
        newValues.anroidVisiter = updateAnroidVisiter;
        break;
    case 'darwin':
        var updateIosVisiter = newValues.iosVisiter +1;
        newValues.iosVisiter = updateIosVisiter;
        break;
    case 'linux':
        var updateLinuxVisiter = newValues.linuxVisiters +1;
        newValues.linuxVisiters = updateLinuxVisiter;
        break;
    case 'win32':
        var updateWindowVisiter = newValues.windowVisiter +1;
        newValues.windowVisiter = updateWindowVisiter;
        break;
    default:
        var updateOtherVisiter = newValues.otherOsVisiters +1;
        newValues.otherOsVisiters = updateOtherVisiter;
}
  //----------------browser
  var brows = browser.name;
  switch(brows) {
      case 'chrome':
          var updateChromeVisiter = newValues.ChromeVisiters +1;
          newValues.ChromeVisiters =  updateChromeVisiter;
          break;
      case 'Edge':
          var updateEdgeVisiter = newValues.Edgevisiters +1;
          newValues.Edgevisiters = updateEdgeVisiter;
          break;
      case 'safari':
          var updateSafariVisiter = newValues.SafariVisiters +1;
          newValues.SafariVisiters = updateSafariVisiter;
          break;
      default:
          var updateOtherBrVisiter = newValues.otherBrowserVisiters +1;
          newValues.otherBrowserVisiters = updateOtherBrVisiter;
  }

    //----------------country
    var geo = geoip.lookup(ip);
    var i = geo.country;
    //console.log(geo);
    switch(i) {
        case 'IN':
            var updateIndiaVisiter = newValues.indianVisiters +1;
            newValues.indianVisiters =  updateIndiaVisiter;
            break;
        case 'CN':
            var updateChinaVisiter = newValues.chinaVisiters +1;
            newValues.chinaVisiters = updateChinaVisiter;
            break;
        case 'US':
            var updateUsVisiter = newValues.usVisiters +1;
            newValues.usVisiters = updateUsVisiter;
            break;
        default:
            var updateOtherCountryVisiter = newValues.othersCountriesVisiters +1;
            newValues.othersCountriesVisiters = updateOtherCountryVisiter;
    }

  } catch (e) {

  }

}

// -----------------------------------------------------------------------------------------------------

 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());

const ipify = require('ipify');

 app.use(cors());
 app.use(express.json());
 app.use(express.static('./public'));
var geoip = require('geoip-country');

//console.log(device);




 app.use((error , req, res, next) => {
   if (error.status ) {
     res.status(error.status);
   } else {
     res.status(500);
   }
   res.json({
     message:error.message,
     stack: process.env.NODE_ENV ==='production' ? '😏' : error.stack
   })
 })
 app.get('/', (req , res) => {
   // res.json({
   //   message:"hh"
   // });

 })
app.get('/:id', async(req ,res) => {
  const {id: slug} = req.params;
  try {
      const url = await Url.findOne({ slug });
      if(url) {
        res.redirect(url.url);

    }
    res.redirect(`/?error=${slug} not found`);
  } catch (e) {
      res.redirect(`/?error=Link not found`)
  }
})

  app.post('/',async (req , res , next) => {
    console.log(req.body);
    let {slug , url} = req.body;
    try{
        if(!slug)
        {
          let checker  = true;
          while (Boolean(checker))
          {
            slug = nanoid(5);
            const existin = await UrlS.findOne({slug });
            if(!(existin)){
              checker  = false;
              }
          }
        }
        else {
          const existing = await Url.findOne({slug });
          if(existing){
            throw new Error('Slug in use.')
         }
        }
        slug = slug.toLowerCase();
        const newUrl = new Url({
          url,
          slug
        });
        const created = await newUrl.save();
    //  run();
        res.status(201).json({
          message:"Successfully Created",
          created:created
        });
    } catch (error) {
      next(error);

    }

  })

 app.listen(PORT ,() => {
   console.log( `started at ${PORT}`);
 })
