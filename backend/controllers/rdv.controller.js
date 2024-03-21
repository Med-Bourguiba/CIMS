const RDV = require("../models/rdv.model");
const jwt = require('jsonwebtoken');

exports.signin = async (req, res) => {
  const { NUM_RDV, COD_BENEF } = req.body;

  try {
    const rdv = await RDV.findOne({ COD_BENEF: COD_BENEF, NUM_RDV: NUM_RDV });

    if (!rdv) {
      console.log("Aucun rendez-vous trouvé pour les données fournies :", { NUM_RDV, COD_BENEF });
      return res.status(400).json({ message: "Données invalides !" });
    } else {
      console.log("Rendez-vous trouvé :", rdv);
      const token = jwt.sign(
        { data: { id: rdv._id, etatRDV: rdv.ETAT_RDV } },
        process.env.KEY,
        { expiresIn: '1h' }
      );

      console.log("Token généré :", token);
      return res.status(200).json({
        message: "Succès ...",
        token: token,
        rdv: rdv
      });
    }
  } catch (error) {
    console.error("Erreur lors de la recherche du rendez-vous :", error);
    return res.status(500).json({ message: "Erreur serveur lors de la recherche du rendez-vous." });
  }
};
