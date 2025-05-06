const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

main().then(()=>{
    console.log("COnnected to DB");
    })
      .catch((err) => {
        console.log(err);
    });
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wander_lust');
}

const initDB= async ()=>{
   await Listing.deleteMany({});
   initData.data=initData.data.map((obj)=>({...obj ,owner:"67e3cb81dd484a8ccada3104"}));
   await Listing.insertMany(initData.data);
   console.log("Data was initialised");
};
initDB();
