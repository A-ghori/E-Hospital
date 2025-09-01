const twilio = require('twilio');

const client = new twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);
async function sendOtpSms(to , otp) {
    try {
        await client.messages.create({
            body: `Your OTP is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to
        });
        return true;
    }catch (err){
        console.error('Error sending OTP SMS:', err);
        return false;
    }
}

module.exports = { 
    sendOtpSms
}