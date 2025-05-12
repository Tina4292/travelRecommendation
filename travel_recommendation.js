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
    const input = document.getElementById("searcInput").value.toLowerCase();
    const recommendations = await fetchRecommendations();

    const filtered = recommendations.filter(place =>
        place.type.toLowerCase() === input ||
        place.name.toLowerCase().includes(input)
    );

    displayRecommendations(filtered);
}

function clearResults() {
    document.getElementById("searchInput").value = "";
    document.getElementById("results").innerHTML = "";
}