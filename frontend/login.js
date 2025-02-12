document
	.getElementById("loginForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();
		
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;

		fetch("http://localhost/backend/auth.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				action: "login",
				email: email,
				password: password,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					localStorage.setItem("token", data.token);
					window.location.href = "admin.html";
				} else {
					document.getElementById("message").textContent = data.message;
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	});

document
	.getElementById("registerForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();

		const nombre = document.getElementById("registerName").value;
		const email = document.getElementById("registerEmail").value;
		const password = document.getElementById("registerPassword").value;

		fetch("http://localhost/backend/auth.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				action: "register",
				nombre: nombre,
				email: email,
				password: password,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					document.getElementById("registerMessage").textContent = data.message;
				} else {
					document.getElementById("registerMessage").textContent = data.message;
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	});
