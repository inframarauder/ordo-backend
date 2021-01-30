exports.sendOTP = (phone) => {
	console.log(`OTP sent to ${phone}`);
};

exports.sendOrderingLink = (sessionId, phone) => {
	console.log(`Ordering Link sent to ${phone} with ${sessionId}`);
};

exports.verifyOTP = (phone, otp) => {
	console.log("OTP Verified!");
};
