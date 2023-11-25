const mongoose = require('mongoose');
const Phone = require('../models/Phone.model');
const phonesData = require('../constants/phones.json');

// Conectar la BBDD

require('../config/db.config');

// Actuar cuando se abra la conexion

mongoose.connection.once('open', () => {
  // Borrar la base de datos

  mongoose.connection.dropDatabase()
    .then(() => {
      console.log('DB cleared');

      // Crear los telefonos
      return Phone.create(phonesData);
    })
    .then((phonesDB) => {
      phonesDB.forEach(phone => console.log(`${phone.name} has been created`));
    })
    .catch(err => console.error(err))
    .finally(() => {
      mongoose.connection.close()
      .then(() => {
        console.log('End of seeds');
      })
      .catch((err) => console.error('Error while disconnecting', err))
      .finally(() => process.exit(0))
    })
})