import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema= new mongoose.Schema({
      
     fullName:{
        type: String,
        require: true
     },
     
     email:{
        type: String,
        require:true,
        
     },
     password:{
        type:String,
        require:true,
        minlenght:5
     },
     bio:{
        type:String,
        default:"",
     },
     profilePics:{
        type:String,
        default:"",
     },
     nativeLanguage:{
        type:String,
        default:"",
     },
     learningLanguage: {
      type: String,
      default: "",
    },
     location:{
        type:String,
        default:"",
     },
     isOnboarded:{
        type:String,
        default:"",
     },
     friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
     }]








},{ timestamps:true});



//pre hook
userSchema.pre("save",async function(next){
       
    if(!this.isModified("password"))
         return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password= await bcrypt.hash(this.password,salt);
        next();
        
    } catch (error) {
        next(error)
    }
})

    userSchema.methods.matchPassword = async function (enteredPassword) {
  const isPasswordCorrect = await bcrypt.compare(enteredPassword, this.password);
  return isPasswordCorrect;
};


const User = mongoose.model("User",userSchema);


export default User;