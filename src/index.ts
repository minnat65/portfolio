import { app } from './app';
import { getDBInstance } from './config/database';

const start = async () => {
  
  try {
    await getDBInstance();
  } catch(err) {
    console.log(err);
  }
  
  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });  
}

start();