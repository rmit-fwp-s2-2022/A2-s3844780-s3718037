import React, { useState } from "react";
import emailjs from '@emailjs/browser';

import { Modal } from 'bootstrap';

// EMAIL JS
const SERVICE_ID = "service_8seh72n";
const TEMPLATE_ID = "template_1gmty92";
const PUBLIC_KEY = "xE2pVnRW_eJV20SS1";

export default function MultiFactorAuthentication(props) {
	const clearInputs = { code: "" };
	const [code, setCode] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const reset = () => {
		// Reset modal
		document.querySelector("#mfa-btn-close").disabled = false;
		document.querySelector("#mfa-btn-send-code").disabled = false;
		document.querySelector("#mfa-code").disabled = true;
		document.querySelector("#mfa-code").value = "";

		// Clear error message
		setErrorMessage(null);
	}

	const inputChange = (event) => {
		const value = event.target.value;

		// Only numbers allowed
		document.querySelector("#mfa-code").value = value.replace(/[^0-9]+/, '');

		// Only 5 characters allowed
		if (value.length > 5) {
			document.querySelector("#mfa-code").value = value.slice(0, 5);
		}
		else {
			if (value.length === 5) {
				if (value === code) {

					// Disable input
					document.querySelector("#mfa-code").disabled = true;
					document.querySelector("#mfa-btn-close").disabled = true;
					document.querySelector("#mfa-btn-send-code").disabled = true;

					setTimeout(() => {
						// Close Verification Modal
						const modalInstance = Modal.getInstance(document.getElementById("mfa-modal"));
						modalInstance.hide();

						setTimeout(() => {
							// Reset Verification modal
							reset();

							// Login User
							props.userLogin(props.userLoginData);
						}, 500);
					}, 1000);

					// Reset modal login inputs
					document.querySelectorAll("#login-modal input").forEach((input) => input.value = "");
				}
				else
					setErrorMessage("Invalid Verification Code");
			}
			else
				setErrorMessage(null);
		}
	}

	const sendEmail = () => {

		// Re-enable button after 10secs (prevent spam)
		const btnSendCode = document.querySelector("#mfa-btn-send-code");
		btnSendCode.disabled = true;
		btnSendCode.textContent = "Sent";
		btnSendCode.classList.add("btn-secondary");
		btnSendCode.classList.remove("btn-success");
		setTimeout(() => {
			btnSendCode.disabled = false
			btnSendCode.textContent = "Send Code";
			btnSendCode.classList.add("btn-success");
			btnSendCode.classList.remove("btn-secondary");
		}, 10000);

		// Enable code input
		document.querySelector("#mfa-code").disabled = false;

		// Generate random code
		const newCode = (Math.floor(Math.random() * 90000) + 10000).toString();
		setCode(newCode);

		// Set email parameters
		const user = props.userLoginData;
		const emailParams = { name: user.name, email: user.email, code: newCode };

		// Send Email
		emailjs.send(SERVICE_ID, TEMPLATE_ID, emailParams, PUBLIC_KEY)
			.then(function (response) {
				console.log('SUCCESS!', response.status, response.text);
			}, function (error) {
				console.log('FAILED...', error);
			});
	};

	return (
		<div className="modal fade" id="mfa-modal" data-bs-backdrop="static" tabIndex="-1">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="mfa-modal-label">Enter Verification Code</h5>
						<button type="button" id="mfa-btn-close" className="btn-close"
							onClick={reset} data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#login-modal"></button>
					</div>
					<div className="modal-body" style={{height: "175px"}}>
						<p className="fs-6 mb-3"></p>
						<div className="input-group">
							<input name="code" type="text" className="form-control" id="mfa-code"
								onChange={inputChange} placeholder="Enter the verification code" disabled />
							<button className="btn btn-success" id="mfa-btn-send-code"
								style={{ width: "22%", whiteSpace: "nowrap" }} onClick={sendEmail}>Send Code</button>
						</div>
						<p className="form-text">
							Verification code is sent to your email.
							Please check your inbox and spam folders.
						</p>
						{errorMessage !== null &&
							<p className="text-danger m-0">{errorMessage}</p>
						}
					</div>
				</div>
			</div>
		</div>
	);
};