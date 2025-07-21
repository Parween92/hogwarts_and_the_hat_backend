import chalk from "chalk";
import { mongoose } from "mongoose";

export default async function dbInit() {
  try {
    console.log(chalk.yellow("Attempting to connect to MongoDB..."));

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not defined");
    }

    const mongo = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "final_project",
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds socket timeout
    });
    console.log(chalk.cyan(`DB connected to ${mongo.connection.name}`));
  } catch (error) {
    console.log(chalk.red("Database connection failed:"));
    console.error(error.message);

    if (error.message.includes("IP")) {
      console.log(
        chalk.yellow(
          "💡 Tip: Make sure your IP is whitelisted in MongoDB Atlas"
        )
      );
      console.log(
        chalk.yellow(
          "   Go to Network Access and add 0.0.0.0/0 for Render deployments"
        )
      );
    }

    if (error.message.includes("authentication")) {
      console.log(
        chalk.yellow(
          "💡 Tip: Check your MongoDB username and password in MONGO_URI"
        )
      );
    }

    process.exit(1);
  }
}
