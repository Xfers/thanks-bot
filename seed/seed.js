import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost/thanksbot', {useNewUrlParser: true});
import { Employee } from '../models/employee.js'
import csv from 'csv-parse';
import fs from 'fs';

fs.createReadStream('./seed/seed.csv')
  .pipe(csv())
  .on('data', (row) => {
    var employee = new Employee({email: row[0], slack_token: row[1]})
    employee.save((err, res) => {
      console.log(res);
    });
  });
// mongoose.disconnect();