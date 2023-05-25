const Event = require('../models/event')
const {validationResult} = require('express-validator')

//create event
module.exports.createEvent = async (req,res)=>{
    try {
      //validate data -> validation result give us object 
      const error = validationResult(req);
      if(!error.isEmpty()){
        return res.status(400).json({
          message:"invalidation error",
          error:error
        })
      }
  //get the data
  const {type,uid,name,tagline,schedule,description,files,moderator,category,sub_category,rigor_rank,attendees} = req.body;
//create Event
const event = await Event.create({
  name,
  tagline,
  schedule,
  description,
  moderator,
  category,
  sub_category,
  rigor_rank,
  attendees,
})

//**Multer code when user add an from from frontend part ***

//  Event.uploadEvent(req,res,(err)=>{
//   if(err){console.log("Multer Error"),err}
// console.log(req.file)
// if(req.file){
// event.files   = Event.filePath;
// }
// }
//)


//check event
if(!event){
  return res.status(400).json({
    message:"event not created"
  })
}

//return success
return res.status(201).json({
  message:"event created",
  event:event,
})


    } catch (error) {
        console.log(error)
        return res.status(500).json({
          message:"server error"
          
        })
    }
}

//update event
module.exports.updateEvent = async (req,res)=>{
 try {
   //get event id from params
   const Event_id  = req.params.id;
  //  console.log(Event_id)
   // get data 
   const {name,tagline,schedule,description,files,moderator,category,sub_category,rigor_rank,attendees} = req.body;
   //update event
   const UpdateEvent = await Event.findByIdAndUpdate(Event_id,{
     name,
     files,
     tagline,
     schedule,
     description,
     moderator,
     category,
     sub_category,
     rigor_rank,
     attendees,
   },
   { new: true });
 
   if(!UpdateEvent){
     return res.status(400).json({
       message:"event not found"
     })
   }
   //return success
   return res.status(201).json({
     message:"event updated",
     event:UpdateEvent
   })
 } catch (error) {
  return res.status(500).json({
    message:"Error in updating Event"
  })
 }
}

//delete event
module.exports.deleteEvent=async (req,res) => {
  try {
    const Event_id = req.params.id;
    //update event
    const DeleteEvent = await Event.findByIdAndDelete(Event_id);
  
    if(!DeleteEvent){
      return res.status(400).json({
        message:"event not found"
      })
    }
    //return success
    return res.status(201).json({
      message:"event deleted",
      event:DeleteEvent
    })
  } catch (error) {
    return res.status(500).json({
      message:"Error in deleting Events",
      error:error
    })
  }
}

//Fetch latest event
module.exports.getLatestEventss = async (req,res)=>{
  try {
    const { type, limit, page } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const events = await Event.find(type)
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      page: parseInt(page),
      limit: parseInt(limit),
      events,
    });
  }catch (error) {
return res.status(500).json({
  message:"Error in getting Events",
  error:error
})    
  }
}

//get event by its id 
module.exports.getEvent=async(req,res)=>{
  try {
    //get id 
    const event_id = req.params.id;
    //get event by id 
    const event = await Event.findById(event_id);
    //check if id exist or not
    if(!event){
      return res.josn(400,{
        message:"event not found"
      })
    }

    return res.status(201).json({
      message:"event founded",
      data:event
    })
  } catch (error) {
    return res.status(500).json({
      message:"error in getting event",
    })
  }
}