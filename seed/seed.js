import { Employee } from '../models/employee.js'
import csv from 'csv-parse';
import fs from 'fs';

// adding more users should be as easy as updating the seed.csv and pushing to heroku
export function updateDataIfNeeded() {
  fs.createReadStream('./seed/seed.csv')
  .pipe(csv())
  .on('data', (row) => {
    var employee = new Employee({email: row[0], slack_token: row[1]})
    employee.save((err, res) => {
      if (res) {
        console.log("Updating...")
        console.log(res);
      }
    });
  });
}
