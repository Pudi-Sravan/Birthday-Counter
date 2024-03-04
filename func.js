document.querySelector(".data").style.display = "none";
document.getElementById("start").addEventListener("click", async function () {
    console.log("UserInfo function called");
    const username = document.getElementById('username').value;
    
    if (!username) {
        alert('Please enter a valid GitHub username.');
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const userData = await response.json();

        if (response.ok) {
            displayUserInfo(userData);
        } else {
            displayError(userData.message);
        }
    } catch (error) {
        displayError('An error occurred while fetching data.');
    }
});

function displayUserInfo(user) {
    document.querySelector(".details").style.display = "none";
    document.querySelector(".data").style.display = "block";
    const resultDiv = document.getElementById('data');
    resultDiv.innerHTML = `
        <img class="img" src="${user.avatar_url}" alt="Avatar">
        <h2 class="dataname" id="h">${user.login}</h2>
        <p class="dataname" id="p0">Name: ${user.name || 'Not available'}</p>
        <p class="datafollow" id="p1">Public Repositories: ${user.public_repos}</p>
        <p class="datafollow" id="p2">Followers: ${user.followers}</p>
        <p class="datalast" id="p3">Location: ${user.location || 'Not available'}</p>
        <p class="datalast" id="p4">Following: ${user.following}</p>`
}

function displayError(message) {
    const resultDiv = document.getElementById('data');
    resultDiv.innerHTML = `<p style="color: red;">Error: ${message}</p>`;
}
