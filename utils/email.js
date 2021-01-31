const nodemailer = require("nodemailer");

//nodemailer setup :

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASSWORD,
	},

	tls: {
		rejectUnauthorized: false,
	},
});

exports.sendOTP = async (email, code) => {
	try {
		const mailOptions = {
			from: process.env.EMAIL,
			to: email,
			subject: "Ordo Verification Code",
			html: `
			<div style='text-align:"center";'>
				<p>
					Thank you for using Ordo.<br/>
					Your verfication code is : ${code}
				</p>
				<p>
					Please use this code to verify your email and activate your session.
				</p>
			`,
		};
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.error(error);
	}
};

exports.sendMenuLink = async (session) => {
	try {
		const mailOptions = {
			from: process.env.EMAIL,
			to: session.email,
			subject: "Ordo - Session Activated",
			html: `
			<div style='text-align:"center";'>
				<p>
					Your ordo session is now active.
					Click the link below to view the menu : <br/>
					<h2>
						<a href='https://ordo.com/menu?session=${session._id}'>
							GO TO MENU
						</a>
					</h2>
				</p>
				<p>
					Please use this pin to place your order :<strong> ${session.pin}</strong>
				</p>
				<p>
					Thank You,
					Team Ordo
				</p>
			`,
		};

		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.error(error);
	}
};
