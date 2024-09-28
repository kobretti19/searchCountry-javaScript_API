const countriesContainer = document.querySelector(".countries");

const renderCountry = function (data, className = "") {
  countriesContainer.innerHTML = "";
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.official}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${Object.keys(data.languages)}</p>
      <p class="country__row"><span>💰</span>${Object.keys(data.currencies)}</p>
      <p class="country__row"><span>🏙️</span>${data.capital}</p>
    </div>
  </article>
  `;
  console.log(data);
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderCountry(data[0]);
    });
};
document.querySelector("#searchButton").addEventListener("click", function () {
  const srchInput = document.querySelector("#searchInput").value;
  console.log(srchInput);

  getCountryData(`${srchInput}`);
});
