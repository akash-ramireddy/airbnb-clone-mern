if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
const MONGO_URL = process.env.ATLASDB_URL;

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
    initData.data=initData.data.map((obj)=>({...obj,owner:'68cec4e05b377d1a42fc945d'}));
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