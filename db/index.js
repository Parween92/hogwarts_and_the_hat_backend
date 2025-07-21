import chalk from "chalk";
import { mongoose } from "mongoose";

export default async function dbInit() {
  try {
    const mongo = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "final_project",
    });
    console.log(chalk.cyan(`DB connected to ${mongo.connection.name}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
