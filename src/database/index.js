import mongoose from "mongoose";

const configOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectToDB = async () => {
    const mongoUrl = 'mongodb://localhost:27017/ec2';
    mongoose.connect(mongoUrl, configOptions).then(() => console.log("Mongo Db Connected")).catch(err => console.log(`Error . ${err.message}`))
}

export default connectToDB;