const mongoose = require('mongoose');
const Wonder_model=require("../Model/schema");
const sampleListings=require("./data");
const getCoordinates=require("../utils/getCoordinates");
main().then(()=>{
 console.log("Database connected");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/MERN');

}

// async function query(){
//     const arr=sampleListings.map((ele)=>{
//      return {
//         ...ele,
//         owner:"6878a5e073c207a7f7b7b694"
//       }
//     })

//     for(let i=0;i<arr.length;i++){
//       await  Wonder_model.insertMany([arr[i]]);
//     }
    
// }


async function query() {
  for (let ele of sampleListings) {
    // 👇 Combine location and country for more accurate results
    const fullLocation = `${ele.location}, ${ele.country}`;

    // 👇 Fetch coordinates from OpenStreetMap (Nominatim)
    const coords = await getCoordinates(fullLocation);

    const newListing = {
      ...ele,
      latitude: coords.latitude,
      longitude: coords.longitude,
      owner: "6878a5e073c207a7f7b7b694"
    };

    await Wonder_model.insertMany([newListing]);
    console.log(` Added: ${ele.title}`);
  }
}

query().then(()=>{
    console.log("succesful");
})
.catch(()=>{
    console.log("error");
})
