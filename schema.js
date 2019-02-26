const Influx = require('influx');

const schema = {
cron_solaire : '06 * * * *',
solaireSchema : {
  host: 'localhost',
  database: 'domotique',
  schema: [{
    measurement: 'solaire',
    fields: {
      ensoleillement: Influx.FieldType.INTEGER,
      courant_charge: Influx.FieldType.INTEGER,
      capacite_batterie: Influx.FieldType.INTEGER,
      conso_auj: Influx.FieldType.INTEGER,
      conso_mois: Influx.FieldType.INTEGER,
      conso_totale: Influx.FieldType.INTEGER,
      produite_auj: Influx.FieldType.INTEGER,
      produite_mois: Influx.FieldType.INTEGER,
      produite_totale: Influx.FieldType.INTEGER
    },
    tags: [
      'energie_solaire'
    ]
  }]
},
meteoSchema : {
  host: 'localhost',
  database: 'domotique',
  schema: [{
    measurement: 'meteo',
    fields: {
      current_temp: Influx.FieldType.INTEGER,
      imageUrl: Influx.FieldType.STRING,
      skytext: Influx.FieldType.STRING,
      current_hum: Influx.FieldType.INTEGER,
      sky_code: Influx.FieldType.INTEGER,
      next_low: Influx.FieldType.INTEGER,
      next_high: Influx.FieldType.INTEGER,
      next_precip: Influx.FieldType.INTEGER,
      sensor_temp: Influx.FieldType.INTEGER,
      sensor_hum: Influx.FieldType.INTEGER
    },
    tags: [
      'weather'
    ]
  }]
},
linkySchema: {
  host: 'localhost',
  database: 'domotique',
  schema: [{
    measurement: 'linky',
    fields: {
      puissance_w: Influx.FieldType.INTEGER,
      hchc: Influx.FieldType.INTEGER,
      hchp: Influx.FieldType.INTEGER,
      consoHeure: Influx.FieldType.INTEGER
    },
    tags: [
      'energy'
    ]
  }]
},
jardinSchema : {
  host: 'localhost',
  database: 'domotique',
  schema: [{
    measurement: 'jardin',
    fields: {
      heure_arrosage: Influx.FieldType.INTEGER,
      duree_arrosage: Influx.FieldType.INTEGER,
      hauteur_cuve: Influx.FieldType.INTEGER,
      remplissage: Influx.FieldType.INTEGER,
      time_on: Influx.FieldType.STRING,
      time_off: Influx.FieldType.STRING,
      compensation_eau_maison: Influx.FieldType.INTEGER,
      compensation_debit_max: Influx.FieldType.INTEGER,
      modulation_hum_faible: Influx.FieldType.INTEGER,
      prevision_meteo: Influx.FieldType.INTEGER
    },
    tags: [
      'jardin'
    ]
  }]
}
}
module.exports = schema;
