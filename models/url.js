const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const visiterDetails = new mongoose.Schema({
    os:{
        type: String
    },
    browsers:{
        type: String
    },
    ip:{
        type: Number
    },
    timestamp:{
      type: Date
    }

});
const VisiterDetails = mongoose.model("VisiterDetails",visiterDetails);

const urlSchema = new Schema({
    url:{
        type: String,
        required: true
    },
      slug:{
        type: String
    },
    totalVisits:{
        type: Number,
        default: 0
    },
    // visiterDetails:{
    //   type: VisiterDetails
    // },
    timestamp:{
    type: Date,
    default: new Date().getTime() + 5*60*60*1000 +30*60*1000
  },
  anroidVisiter:{
    type:Number,
    default:0
  },
  iosVisiter:{
    type:Number,
    default:0
  },
  windowVisiter:{
    type:Number,
    default:0
  },
  linuxVisiters:{
    type:Number,
    default:0
  },
  otherOsVisiters:{
    type:Number,
    default:0
  },
  ChromeVisiters:{
    type:Number,
    default:0
  },
  Edgevisiters:{
    type:Number,
    default:0
  },
  SafariVisiters:{
    type:Number,
    default:0
  },
  otherBrowserVisiters:{
    type:Number,
    default:0
  },
  indianVisiters:{
    type:Number,
    default:0
  },
  chinaVisiters:{
    type:Number,
    default:0
  },
  usVisiters:{
    type:Number,
    default:0
  },
  othersCountriesVisiters:{
    type:Number,
    default:0
  },

});
const Url = mongoose.model("Url",urlSchema);


module.exports = {Url, VisiterDetails};
