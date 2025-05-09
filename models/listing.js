const mongoose=require("mongoose");
const Schema=mongoose.Schema; //ye asehi bna liye apni suvidha ke liye

const listingSchema= new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        // type: String,
        // // we set default for when the value is not entered by user,it is undefined/null
        // default:"https://unsplash.com/photos/an-aerial-view-of-a-sandy-beach-with-palm-trees-zhLcg5xZ9nU",
        // // "set" is set for the user when image exists but link is not present
        // set:(v)=>v===""
        //    ?"https://images.unsplash.com/photo-1735586971748-96f7425c0162?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMHx8fGVufDB8fHx8fA%3D%3D"
        //    : v,

        url:String,
        filename:String,
    },
    price:Number,
    location:String,
    country:String,
    reviews: [
       { type:Schema.Types.ObjectId,
        ref:"Review",
       }
    ],
    owner: {
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    geometry: {
            type: {
              type: String, // Don't do `{ location: { type: String } }`
              enum: ['Point'], // 'location.type' must be 'Point'
              required: true
            },
            coordinates: {
              type: [Number],
              required: true
            }
          }
    }
);

listingSchema.post("findOneAndDelete", async (listing)=>{
   if(listing){
    await Review.deleteMany({_id:{$in: listing.reviews}});

   }
})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;