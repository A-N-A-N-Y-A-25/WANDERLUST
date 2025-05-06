const Listing=require("../models/listing");
const{listingSchema}=require("../schema.js");

module.exports.index = async (req,res)=>{
    const allListing=await Listing.find({});
    res.render("./listings/index.ejs",{allListing});  //don't forget "."
};

module.exports.renderNewForm= ( req,res)=>{
    res.render("./listings/new.ejs")
};

module.exports.createListing= async (req,res,next)=>{
  let url=req.file.path;
  let filename=req.file.filename;

  //  let {title,desc,price,location,country,image}=req.body;
 
  const newListing=new Listing(req.body.listing);/*in this method of accessing values,
  //       we have created  object of values in new.ejs */
  newListing.owner=req.user._id;
  newListing.image={url,filename};
// 1st way to schema validation
    // if(!newlisting.price)
    //   {
    //     throw new ExpressError(400,"price is missing");
    //   }

//2nd way : using joi-line 54

await newListing.save();
req.flash("success","New Listing Created!");
res.redirect("/listings");
       //  console.log(listing);

};

module.exports.showListing= async (req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id)
    .populate({path:"reviews", populate:{
      path:"author",
    },
    })
    .populate("owner");
    if(!listing){
    req.flash("error","Listing you requested for doesn't exist!");
    res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
  };

  module.exports.renderEditForm=async (req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
      req.flash("error","Listing you requested for doesn't exist!");
      res.redirect("/listings");
      }
    res.render("listings/edit.ejs",{listing});
  };

  module.exports.updateListing=async (req,res)=>{
    //  if(!req.body.listing)
    //  {
    //   throw new ExpressError(400,"send valid data for listing");
    //  }
      let{id}=req.params;
      await Listing.findByIdAndUpdate(id,{...req.body.listing});
      req.flash("success"," Listing Updated!");
      return res.redirect(`/listings/${id}`);//redirecting to show route
    };

    module.exports.destroyListing=async (req,res)=>{
      let{id}=req.params;
      let deletedListing= await Listing.findByIdAndDelete(id);
      console.log(deletedListing);
      req.flash("success","Listing Deleted!");
      res.redirect("/listings");
    };