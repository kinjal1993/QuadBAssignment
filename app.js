require('dotenv/config') // require the dotenv/config at beginning of file
const express = require('express');
const schedule = require('node-schedule');
const path = require('path')
const app = express();

app.use(express.json());

// set static directory
app.use(express.static(__dirname + '/public'));

// set view directory
app.set('views', path.join(__dirname, 'views'))
const { sequelize } = require('./config/db');

require("./routes")(app);

sequelize.sync().then(() => {
  if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

  const {fetchWazirXData} = require("./services/wazirx");
  fetchWazirXData(); // initial call to fetch wazirx data
  
  schedule.scheduleJob("* * * * *",(async function () { // background job to fetch wazirx data every minute
    try
    {
      await fetchWazirXData();
    }
    catch (err)
    {
      console.log(err);
    }
  }));


  const PORT = process.env.APP_PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});





