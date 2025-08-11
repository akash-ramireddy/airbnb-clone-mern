if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main(){
    await mongoose.connect(MONGO_URL);
}
main()
    .then(()=>{
        console.log("Connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'68972329d2cb7199cb5614a7'}));
    for (let listing of initData.data) {
        let response = await geocodingClient
            .forwardGeocode({
                query: listing.location,
                limit: 1
            })
            .send();
        listing.geometry = response.body.features[0].geometry;
    }
    await Listing.insertMany(initData.data);
    console.log("Data was initialised.");
}

initDB();