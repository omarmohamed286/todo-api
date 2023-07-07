const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI).then(()=>{
    console.log('database connected succefully')
}).catch(err=>{
    console.log('error occurred while connecting to database ' + err)
});
