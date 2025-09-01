const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10
})
.then(() => console.log(' **MongoDB connected**'))
.catch((err) => console.error(' MongoDB connection error:', err));

const app = express();

//MiddleWare 
app.use(cors());
app.use(express.json());


//Routes

// Existing User Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth',authRoutes);

//Existing Admin Routes
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

//Sample Route
app.get('/', (req,res)=>{
    res.send('E-Hospital Backend is Live');
});

//Downloads Routes

//For Windows Downloads
app.get('/download/windows',(req,res) => {
    const filePath = path.join(__dirname,'downloads','EmoFH-Setup-Windows.exe');
    res.download(filePath,"E-Hospital-Windows.exe");
});

//For Mac
app.get('/downloads/mac',(req,res) => {
    const filePath = path.join(__dirname, 'downloads',"EmoFH-Setup-Mac.dmg");
    res.download(filePath, 'E-HospitalMac-dmg');
})

//Start Server
const PORT = process.env.PORT || 5040;
app.listen(PORT, () => {
    console.log(`Server is Running for E-Hospital on http://localhost:${PORT}`);
})