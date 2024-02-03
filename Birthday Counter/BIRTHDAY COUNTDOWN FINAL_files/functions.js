let birthdayDate, userName, inputDateObject;
document.querySelector(".countdown").style.display = "none";
document.getElementById("start").addEventListener("click", function () {
    const inputDate = document.getElementById("dob-input").value;
    userName = document.getElementById("name").value;
    if (!isValidDate(inputDate)) {
        alert("Please enter a valid date (DD-MM-YYYY).");
        return;
    }

    inputDateObject = new Date(inputDate + "T00:00:00");
    const today = new Date();
    inputDateObject.setFullYear(today.getFullYear());

    birthdayDate = inputDateObject.getTime();

    console.log("inputDateObject GOOD:", inputDateObject); 

    document.querySelector(".data").style.display = "none";
    document.querySelector(".countdown").style.display = "block";
    updateCountdown();
});

function updateCountdown() {
    const countdownElement = document.getElementById("countdown");    
    if (!inputDateObject) {
        console.error("Error: inputDateObject is undefined");
        return;
    }
    const currentDate = new Date();
    const timeLeft = birthdayDate - currentDate.getTime();
    if (timeLeft <= 0) {
        if (currentDate.getDate() === inputDateObject.getDate()) {
            const birthdayGreeting = `<h2>Happy Birthday,${userName};PARTYYY!!!</h2>`;
            countdownElement.innerHTML = birthdayGreeting;
        } 
        else {
            const belatedGreeting = `<h2>Happy Belated Birthday meet you again at your next birthday, ${userName}!</h2>`;
            countdownElement.innerHTML = belatedGreeting;
        }
    } else {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        document.getElementById("days").textContent = days.toString().padStart(2, '0');
        document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
        setTimeout(updateCountdown, 1000);
    }
}

function isValidDate(dateString) {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false;
    const d = new Date(dateString + "T00:00:00");
    return !isNaN(d.getTime());
}