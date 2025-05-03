document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#github-search-form");
  const input = document.querySelector("#github-username");
  const userContainer = document.querySelector(".user");

  // Function to fetch GitHub user data
  function fetchUserData(userName) {
    const url = `https://api.github.com/users/${userName}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`User not found: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        displayUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        userContainer.style.display = "block";
        userContainer.innerHTML = `<p style="color: red;">Error: Unable to fetch user data. Please try again.</p>`;
      });
  }

  // Function to display user data
  function displayUserData(data) {
    userContainer.style.display = "block";
    userContainer.innerHTML = `
      <div class="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto">
      <div class="flex items-center space-x-4">
        <img class="w-16 h-16 rounded-full border-2 border-gray-300" src="${data.avatar_url}" alt="User Avatar">
        <div>
        <h2 class="text-xl font-bold text-gray-800">${data.login}</h2>
        <a href="${data.html_url}" target="_blank" class="text-blue-500 hover:underline">View Profile</a>
        </div>
      </div>
      <div class="mt-4">
        <p class="text-gray-600"><span class="font-semibold">Account Type:</span> ${data.type}</p>
        <p class="text-gray-600"><span class="font-semibold">Followers:</span> ${data.followers}</p>
        <p class="text-gray-600"><span class="font-semibold">Following:</span> ${data.following}</p>
        <p class="text-gray-600"><span class="font-semibold">Public Repos:</span> ${data.public_repos}</p>
      </div>
      </div>
    `;
  }

  // Event listener for form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const userName = input.value.trim();

    if (userName === "") {
      console.error("Error: Input field is empty.");
      userContainer.style.display = "block";
      userContainer.innerHTML = `<p style="color: red;">Error: Please enter a GitHub username.</p>`;
      return;
    }

    fetchUserData(userName);
  });
});