async function getStats() {
    const username = document.getElementById('username').value.trim();
    const resultDiv = document.getElementById('result');
  
    if (!username) {
      alert("Please enter a username.");
      return;
    }
    fetch(`https://codechef-api.vercel.app/handle/${username}`)

    resultDiv.classList.remove("hidden");
    resultDiv.innerHTML = "Fetching stats...";
  
    try {
      // Use CORS proxy to bypass browser restriction
      const proxyUrl = "https://corsproxy.io/?";
      const apiUrl = `https://codechef-api.vercel.app/handle/${username}`;
      const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
      const data = await response.json();
  
      if (data.status === 'failed') {
        resultDiv.innerHTML = `<p>User <strong>${username}</strong> not found!</p>`;
        return;
      }
  
      const user = data.data;
  
      resultDiv.innerHTML = `
        <h3>@${user.username}</h3>
        <p><strong>Name:</strong> ${user.full_name}</p>
        <p><strong>Stars:</strong> ${'⭐'.repeat(user.stars)} (${user.rating})</p>
        <p><strong>Highest Rating:</strong> ${user.highest_rating}</p>
        <p><strong>Country:</strong> ${user.country}</p>
        <p><strong>Global Rank:</strong> ${user.global_rank}</p>
        <p><strong>Country Rank:</strong> ${user.country_rank}</p>
      `;
    } catch (error) {
      resultDiv.innerHTML = "<p style='color: red;'>Error fetching data. CORS issue or network error.</p>";
      console.error(error);
    }
  }
  