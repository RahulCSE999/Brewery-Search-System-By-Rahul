document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("cityInput");
    const searchButton = document.getElementById("searchButton");
    const breweryList = document.getElementById("breweryList");

    searchButton.addEventListener("click", () => {
        const city = cityInput.value.trim();

        if (city === "") {
            alert("Please enter a city.");
            return;
        }

        const apiUrl = `https://api.openbrewerydb.org/breweries?by_city=${city}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                displayBreweries(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    });

    function displayBreweries(breweries) {
        if (breweries.length === 0) {
            breweryList.innerHTML = "No breweries found in this city.";
        } else {
            const breweryHTML = breweries.map((brewery) => {
                return `
                    <div class="brewery">
                        <h2>${brewery.name}</h2>
                        <p>${brewery.street}</p>
                        <p>${brewery.city}, ${brewery.state}, ${brewery.postal_code}</p>
                        <p>${brewery.website_url}</p>
                        <p>${brewery.phone}</p>
                    </div>
                `;
            }).join("");
            breweryList.innerHTML = breweryHTML;
        }
    }
});
