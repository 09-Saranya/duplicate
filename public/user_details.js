document.addEventListener("DOMContentLoaded", () => {
    const dashboardButton = document.getElementById("dashboardButton");
    const userDetails = document.getElementById("userDetails");
    const userFullName = document.getElementById("name");
    const userEmail = document.getElementById("email");

    dashboardButton.addEventListener("click", async () => {
        const response = await fetch("/api/user"); // Replace with your API endpoint
        const data = await response.json();

        if (data) {
            userFullName.textContent = data.name;
            userEmail.textContent = data.email;
            userDetails.classList.remove("hidden");
        }
    });
});