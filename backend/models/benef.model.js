const mongoose = require("mongoose");

const benefSchema = new mongoose.Schema({

        COD_BENEF: String,
        NOM_PREN_BENEF: String,
        DATE_NAI_BENEF: Date,
        SEXE_BENEF: String,
        COD_ETAT_CIV: String,
        COD_NAT: {
            type: mongoose.Schema.Types.ObjectId,  //string au lieu du ObjectId
            ref: 'nationalites' 
        },
        ADR_BENEF: String,
        COD_LOC_ADR: Number,
        COD_LOC: Number,
        DATE_ENREG: Date,
        PREN_PERE_BENEF: String,
        PREN_MERE_BENEF: String,
        ETAT_BENEF: String,
        PREN_BENEF: String,
        COD_DELEG: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'delegations' 
        },
        USER_CREATION: String,
        DATE_CREATION: Date,
        USER_MAJ: String,
        DATE_MAJ: Date,
        NUM_DM: Number
});

module.exports = mongoose.model("beneficiaires", benefSchema);
