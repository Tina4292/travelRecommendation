async function fetchRecommendations() {
    const response = await fetch('travel_recommendation_api.json');
    const data = await response.json();
    return data;
}

function displayRecommendations(results) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    results.forEach(place => {
        const card = document.createElement("div");
        card.className = "place-card";

        card.innerHTML = `
            <h2>${place.name}</h2>
            <img src = "${place.imageUrl}" alt = "${place.name}">
            <p> ${place.description} </p>
        `;

        resultsDiv.appendChild(card);
    });
}

async function searchRecommendations() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const data = await fetchRecommendations();
  let results = [];

  if (input.includes("beach")) {
    results = data.beaches;
  } else if (input.includes("temple")) {
    results = data.temples;
  } else if (["country", "countries"].some(word => input.includes(word))) {
    // User typed "country" or "countries" → show all cities from all countries
    results = data.countries.flatMap(country => country.cities);
  } else {
    // Match a specific country name
    const matchedCountry = data.countries.find(country =>
      country.name.toLowerCase().includes(input)
    );
    if (matchedCountry) {
      results = matchedCountry.cities;
    }
  }

  // Show results or fallback message
  if (results.length === 0) {
    document.getElementById("results").innerHTML = "<p>No results found.</p>";
  } else {
    displayRecommendations(results);
  }
}

function clearResults() {
    document.getElementById("searchInput").value = "";
    document.getElementById("results").innerHTML = "";
}