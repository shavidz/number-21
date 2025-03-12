document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("form");

	// Function to check if fields are valid
	const validateField = (input) => {
		const value = input.value.trim();
		const fieldGroup = input.closest(".form-group");
		const errorMessage = fieldGroup.querySelector(".error-message");

		// Check if required fields are empty
		if (input.required && value === "") {
			fieldGroup.classList.add("error");
			fieldGroup.classList.remove("success");
			errorMessage.textContent = "This field is required.";
			return false;
		}

		// Validate personal number (11 digits)
		if (input.id === "personal-number" && !/^\d{11}$/.test(value)) {
			fieldGroup.classList.add("error");
			fieldGroup.classList.remove("success");
			errorMessage.textContent = "Personal number must be 11 digits.";
			return false;
		}

		// Validate mobile number (9 digits)
		if (input.id === "mobile-number" && !/^\d{9}$/.test(value)) {
			fieldGroup.classList.add("error");
			fieldGroup.classList.remove("success");
			errorMessage.textContent = "Mobile number must be 9 digits.";
			return false;
		}

		// Validate password length (min 6 characters)
		if (input.id === "password" && value.length < 6) {
			fieldGroup.classList.add("error");
			fieldGroup.classList.remove("success");
			errorMessage.textContent = "Password must be at least 6 characters.";
			return false;
		}

		// Validate confirm password
		if (input.id === "confirm-password") {
			const password = document.getElementById("password").value;
			if (value !== password) {
				fieldGroup.classList.add("error");
				fieldGroup.classList.remove("success");
				errorMessage.textContent = "Passwords do not match.";
				return false;
			}
		}

		// If input passes validation
		fieldGroup.classList.add("success");
		fieldGroup.classList.remove("error");
		errorMessage.textContent = "";
		return true;
	};

	// Event listener for form submission
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		let isValid = true;

		// Validate all form fields
		const inputs = form.querySelectorAll("input");
		inputs.forEach((input) => {
			if (!validateField(input)) {
				isValid = false;
			}
		});

		// If all fields are valid, submit the form
		if (isValid) {
			// Submit the form if validation passes
			alert("Form submitted successfully!");
		} else {
			alert("Please fix the errors in the form.");
		}
	});

	// Event listeners for input validation
	const inputs = form.querySelectorAll("input");
	inputs.forEach((input) => {
		input.addEventListener("blur", () => validateField(input));
	});
});
