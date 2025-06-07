const express = require('express')
const app = express()
const cors = require('cors')
const bodyparser = require('body-parser')
const path = require('path')
const mg=require('mongoose')


app.use(cors())
app.use(bodyparser.json());

mg.connect('mongodb://127.0.0.1:27017/carshub').then(()=>{console.log("connected")}).catch((err)=>{console.log(err)})

const userSchema = new mg.Schema({
    email:String,
    username:String,
    password:String,
    });
const User = new mg.model('user', userSchema);

app.post('/userlogin',async (req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const existingUser = await User.findOne({ username });
    if(!username || !password){
        return res.status(400).json({ message: 'Please enter all feilds' });
    }

    if(!existingUser){
        return res.status(400).json({ message: 'Username do not exist' });
    }
    else{
        if(existingUser.password == password){
            res.status(201).json({ message: 'User logged up successfully' });
        }else{
            return res.status(400).json({ message: 'username and password do not match' });
        }
    }
})

app.post('/usersignup',async (req,res)=>{
    try {
        const { email, username, password } = req.body;
        if(!username || !password || !email){
            return res.status(400).json({ message: 'Please enter all feilds' });
        }
    
        //  Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ message: 'Username already taken' });
        }
    
        // Create new user and save to database
        const newUser = new User({ email, username, password });
        await newUser.save();
    
        res.status(201).json({ message: 'User signed up successfully' });
      } catch (err) {
        console.error('Error signing up:', err);
        res.status(500).json({ message: 'Server error' });
      }
})

const carSchema = new mg.Schema({
    carname:String,
    carbrand:String,
    mileage:Number,
    average:Number,
    fuel:String,
    price:Number,
    description:String,
    modelyear:Number,
    avalability:Boolean,
    img:String,
})
const Car =new mg.model('cars',carSchema)
app.get('/cardata',async (req,res)=>{
    try{
        const cardata=await Car.find({})
        res.status(200).json(cardata);
    }catch(err){
        res.status(500).json({massage:'server error'});
    }
})

const citySchema = new mg.Schema({
    cities : String,
})
const Cities = new mg.model('cities',citySchema)
app.get('/cities',async (req,res)=>{
    try{
        const citydata = await Cities.find({})
        res.status(200).json(citydata);
    }catch(err){
        res.status(500).json({massage:'server error'})
    }
})

const contactSchema = new mg.Schema({
    fullname:String,
    email:String,
    phoneno:String,
    subject:String,
    msg:String,
})
const Contacts = new mg.model('contact',contactSchema)
app.post('/contacts',async (req,res)=>{
    try{
        const {fullname,email,phoneno,subject,msg} = req.body;
        if(!fullname || !email || !phoneno || !subject || !msg){
            return res.status(400).json({ message: 'Please enter all feilds' });
        }
        const newContact = new Contacts({ fullname,email,phoneno,subject,msg });
        await newContact.save();
        res.status(200).json({massage:'inserted successfully'});
    }catch(err){
        res.status(500).json({massage:'server error'})
    }
})

const orderSchema = new mg.Schema({
  username: String,
  carId: String,
  name: String,
  date: Date,
  email: String,
  phone: String,
  code: Number,
  city: String,
  amount : Number,
  cardno : String,
  cvv : String,
  exdate : String,
  createdAt: { type: Date, default: Date.now },
});

const Orders = new mg.model('orders', orderSchema);

app.post('/bookOrder', async (req, res) => {
    const { username, carId, name, date, email, phone, code, city, amount, cardno, cvv, exdate } = req.body;
  
    // // Validate fields are not empty
    // if (!name || !date || !email || !phone || !city || !cardno || !cvv || !exdate) {
    //   return res.status(400).json({ message: 'Please enter all fields' });
    // }
  
    // // Validate card number (length of 10 digits)
    // const cardnoRegex = /^[0-9]{10}$/;
    // if (!cardnoRegex.test(cardno)) {
    //   return res.status(400).json({ message: 'Invalid card number. Must be 10 digits.' });
    // }
  
    // // Validate CVV (either 3 or 4 digits)
    // const cvvRegex = /^[0-9]{3}$/;
    // if (!cvvRegex.test(cvv)) {
    //   return res.status(400).json({ message: 'Invalid CVV. Must be of 3 digits.' });
    // }
  
    // // Validate expiry date (format MM/YY) and ensure it's a future date
    // const exdateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    // if (!exdateRegex.test(exdate)) {
    //   return res.status(400).json({ message: 'Invalid expiry date. Must be in MM/YY format.' });
    // }
  
    // const [month, year] = exdate.split('/');
    // const expiryDate = new Date(`20${year}`, month - 1); // Convert MM/YY to a valid date
    // const currentDate = new Date();
    // if (expiryDate < currentDate) {
    //   return res.status(400).json({ message: 'Expiry date cannot be in the past.' });
    // }
  
    try {
      // If validations pass, create a new order
      const newOrder = new Orders({
        username,
        carId,
        name,
        date,
        email,
        phone,
        code,
        city,
        amount,
        cardno,
        cvv,
        exdate,
      });
  
      await newOrder.save();
      res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Failed to create order' });
    }
  });
  


app.get('/showOrders', async (req, res) => {
    try {
        const { user } = req.query; // Access the username from query parameters

        // Find orders for the user
        const orderedCars = await Orders.find({ username: user });
        
        // Fetch car details for each order using their carId
        const carIds = orderedCars.map(order => order.carId);
        const cars = await Car.find({ _id: { $in: carIds } });

        // Combine order and car data
        const ordersWithCarDetails = orderedCars.map(order => {
            const car = cars.find(car => car._id.toString() === order.carId);
            return {
                ...order.toObject(),
                carDetails: car ? car : null // Add car details to the order
            };
        });

        res.status(200).json({ ordersWithCarDetails });  
    } catch (err) {
        console.error(err); // Log the error
        res.status(500).json({ message: 'server error' });
    }
});
app.listen(5000,()=>{console.log("server running on 5000")})