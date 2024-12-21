import mongoose from "mongoose";

const configOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectToDB = async () => {
  //  const mongoUrl = 'mongodb://localhost:27017/ec2';
 const mongoUrl = 'mongodb+srv://sandeep7727939593:sandeep7727939593@ec2.gfbnq.mongodb.net/?retryWrites=true&w=majority&appName=ec2';
    mongoose.connect(mongoUrl, configOptions).then(() => console.log("Mongo Db Connected")).catch(err => console.log(`Error . ${err.message}`))
}

export default connectToDB;
