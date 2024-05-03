import mongoose from "mongoose";

export default async function connectMongoDB() {

	try {
		await mongoose.connect(process.env.MONGO_URI,{ serverSelectionTimeoutMS: 20000 });
		console.log("MONGODB connected");
	} catch (error) {
		console.log("Error connecting to MongoDB: ", error.message);
	}
	// process.on('SIGINT', async () => {
	// 	await mongoose.disconnect();
	// 	process.exit(0);
	//   });
}
