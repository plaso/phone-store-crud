const mongoose = require('mongoose');
const Phone = require('../models/Phone.model');
const phonesData = require('../constants/phones.json');
const Manufacturer = require('../models/Manufacturer.model');
const manufacturers = require('../constants/manufacturer.json');

// Conectar la BBDD

require('../config/db.config');

// Actuar cuando se abra la conexion

mongoose.connection.once('open', () => {
  // Borrar la base de datos

  mongoose.connection.dropDatabase()
    .then(() => {
      console.log('DB cleared');
    })
    .then(() => {
      return Manufacturer.create(manufacturers);
    })
    .then((manufacturersDB) => { // Este ya tiene los id de la base de datos
      manufacturersDB.forEach(manufacturer => console.log(`${manufacturer.name} has been created`));
      // Crear los telefonos
      // Coger los telefonos del JSON y cambiar su string de manufacturer por el id que se ha creado arriba
      const phonesWithManufacturerID = phonesData
        .map(phone => {
          const manufacturer = manufacturersDB
            .find(manufacturer => manufacturer.name === phone.manufacturer)

          return {
            ...phone,
            manufacturer: manufacturer._id
          }
        })

      return Phone.create(phonesWithManufacturerID);
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