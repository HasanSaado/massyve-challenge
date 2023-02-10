const Express = require('express');
const app = Express();
const Mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/routes');
const cors = require('cors');

export {};

dotenv.config();

Mongoose.connect(process.env.MONGODB_URI).then(()=>{
  console.log("Connected to the Database.");
})
.catch((err: any) => {
  console.log(err);
});;

app.use(Express.json());
app.use(cors());
app.use('/api', routesUrls);
app.listen(4000, () => console.log('Server is up and running on port 4000'));

