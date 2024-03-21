const mongoose = require("mongoose");

const medecinSchema = new mongoose.Schema({
    COD_MED: Number,
    NOM_PREN_MED: String,
    DATE_NAISS_MED: Date,
    SEXE_MED: String,
    COD_NAT: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'nationalites' 
    },
    COD_STAT: Number,
    COD_SPEC: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'specialites' 
    },
    COD_GRADE: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'grades' 
    },
    COD_SERV: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'services' 
    },
    ADR_MED: String,
    TEL1_MED: Number,
    TEL2_MED: Number,
    ACCES: String,
    COD_GROUPE: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groupe_soins' 
    }
});

module.exports = mongoose.model("medecins", medecinSchema);
