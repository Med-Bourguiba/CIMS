const mongoose = require("mongoose");


const rdvSchema = new mongoose.Schema({
  
      COD_MED: {
          type: mongoose.Schema.Types.String,
          ref: 'medecins' 
      },
      COD_BENEF: {
          type: mongoose.Schema.Types.String,
          ref: 'beneficiaires' 
      },
      DATE_RDV: Date,
      HEURE_RDV: String,
      ETAT_RDV: String,
      USER_CREATION: String,
      DATE_CREATION: Date,
      USER_ANNULATION: String,
      DATE_ANNULATION: Date,
      SEANCE: String,
      COD_SERV: {
          type: mongoose.Schema.Types.String,
          ref: 'services' 
      },
      MOTIF_RDV: String,
      NUM_RDV: String,
      NUM_DOSSIER: Number,
      GSM: String
});

module.exports = mongoose.model("rdvs", rdvSchema);
