import { connect } from "mongoose";

// Using Singleton design pattern to avoid creating new db instance.
class DB {
  private static _instance: DB;

  private constructor() {
    console.log('new instance created.');
  }

  static async initialize() {
    try {
    await connect(process.env.DB_URL!);
    console.log('DB connected.');
    } catch(err) {
      console.log(err);
    }
  }

  public static async getDBInstance() {
    if(!DB._instance) {
      await DB.initialize();
      DB._instance = new DB();
    }

    console.log('Using existing DB instance.')
    return DB._instance;
  }
}

const getDBInstance = DB.getDBInstance;

export { getDBInstance };