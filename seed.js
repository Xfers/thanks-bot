import { Employee } from './models/employee.js';
import csv from 'csv-parse';
import fs from 'fs';

fs.createReadStream('./seed.csv')
  .pipe(csv())
  .on('data', row => {
    var employee = new Employee({ email: row[0], slack_token: row[1] });
    employee.save((err, res) => {
      if (err) { console.log(err) }
      if (res) {
        console.log(`Updating... ${res.email} - ${res.slack_token}`);
      }
    });
  });
