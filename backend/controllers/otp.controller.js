const twilio = require('twilio');

let storedOTP = '';


exports.sendOTP = async (req, res) => {
  let { GSM, otpCode } = req.body;
  GSM = '+216' + GSM;

  try {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    await client.messages.create({
      body: `Votre code OTP est : ${otpCode}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: GSM
    });
    res.status(200).json({ success: true, message: 'Code OTP envoyé avec succès.' });
  } catch (err) {
    console.error('Error sending OTP:', err);
    res.status(500).json({ success: false, message: 'Une erreur s\'est produite lors de l\'envoi du code OTP.' });
  }
};


exports.verifyOTP = async (req, res) => {
  const { otp } = req.body;

  try {
    // Comparer le code OTP saisi par l'utilisateur avec le code OTP stocké
    if (otp === storedOTP) {
      res.status(200).json({ success: true, message: 'Code OTP vérifié avec succès.' });
    } else {
      res.status(400).json({ success: false, message: 'Code OTP incorrect.' });
    }
  } catch (err) {
    console.error('Error verifying OTP:', err);
    res.status(500).json({ success: false, message: 'Une erreur s\'est produite lors de la vérification du code OTP.' });
  }
};
