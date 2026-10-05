import mongoose from "mongoose"

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo db connected")
    } catch(error) {
        console.log("Connection error", error)
        process.exit(1)
  }
}

export default connect