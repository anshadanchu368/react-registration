const express= require('express');
const app=express();
const mongoose=require('mongoose');
const multer=require('multer');


const port=5000;

const cors = require('cors');
app.use(cors());


mongoose.connect('mongodb://localhost:27017/user-registration',{useNewUrlParser:true,
useUnifiedTopology:true});


const db=mongoose.connection;
db.on('error',console.error.bind(console,'mongodb connection error'));
db.once('open',()=>{
    console.log('connected to mongodb');
});

const userSchema =new mongoose.Schema({
    name:String,
    password:String,
    image:String,
    address:String,

});

const User=mongoose.model('user',userSchema)

const storage =multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'uploads/');
    },  
    filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
})

const upload =multer({storage});

////////////////////////////////////////////////


app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/api/users', upload.single('image'), async (req, res) => {
    try {
      const { name, password, address } = req.body;
      const image = req.file ? './uploads/' + req.file.path : '';
  
      const user = new User({
        name,
        password,
        image,
        address,
      });
      await user.save();
  
      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

// ////////////////////////////////////


app.put('/api/users/:userId',upload.single('image'),async(req,res)=>{
    try{
        const {name,password,address}=req.body;
        const image=req.file?'./uploads/'+req.file.path:'';


        await User.findByIdAndUpdate(req.params.userId,{
            name,password,image,address
        });

        res.status(200).json({message:"user updated successfully"})
    }catch(error){
        console.error(error);
        res.status(500).json({error:"server error"})
    }
});


app.get('/api/users/:userId',async (req,res)=>{
    try{
      const user=await User.findById(req.params.userId);
      if(!user){
        return res.status(404).json({error:"user not found"});
      }
      res.status(200).json({user})
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})


app.listen(port,()=>{
    console.log(`server runs on http://localhost:${port}`);
})
