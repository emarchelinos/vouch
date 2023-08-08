import {  connect } from 'mongoose';

export async function connectToDb() {
  try {
    await connect('mongodb://mongo_db:27017/test');
    console.info("Connected to mongo db")
  } catch (error) {
    console.error("Failed to connect to db")
  }
}