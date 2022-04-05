let weather = { // sukuriame objektą, kuris talpins mūsų funkcijas ir API
    apiKey: "0aa8679f7f4cfb9af5b36c2935c1a05d",
    fetchWeather: function (city) {
        fetch( // paimame miesto orus su šiuo URL: funkcijos parametras city dedamas į URL, taikome mūsų API raktą
          "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
          .then((response) => { // po to, kai gavome miesto orus, norime, kad sugeneruotų JSON rezultatą 
            if (!response.ok) { // jei nepavyko gauti atsakymo, rodome klaidos pranešimą
              alert("No weather found.");
              throw new Error("No weather found.");
            }
            return response.json(); // sugeneruojame JSON rezultatą
          })
          .then((data) => this.displayWeather(data)); // spausdiname orus į naršyklę panaudodami displayWeather funkciją; mums būtina naudoti this, kadangi naudojame funkciją esančią objekto viduje.
      },
      displayWeather: function (data) { // funkcija, kuri priima miesto orų duomenis ir spausdina į naršyklę
        const { name } = data; // priskiriame miesto pavadinimą
        const { icon, description } = data.weather[0]; // priskiriame debesuotumo ikonėlę ir aprašymą
        const { temp, humidity } = data.main; // priskiriame temperatūrą ir drėgnumą
        const { speed } = data.wind; // priskiriame vėjo greitį
        // surandame HTML elementus ir keičiame jų duomenis:
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
          "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".icon").alt = name;  
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.round(temp) + "°";
        document.querySelector(".humidity").innerText =
          "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
          "Wind: " + Math.round(speed) + " km/h";
        document.querySelector(".weather").classList.remove("loading"); // gavus orų duomenis, galime paslėpti loading
        document.body.style.backgroundImage =
          "url('https://source.unsplash.com/1600x900/?" + name + "')"; // pasirinkto miesto nuotrauka
      },
      search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value); // paimame miestą, kurį paieškos laukelyje įvedė vartotojas ir priskiriame jį kaip parametrą fetchWeather funkcijai ir ją vykdome.
      }
    };

    document.querySelector(".search button").addEventListener("click", function () { // laukiame kada bus paspaustas paieškos mygtukas. Jį paspaudus, vykdome search funkciją esančią weather objekte
      weather.search();
    });
    
    document
      .querySelector(".search-bar")
      .addEventListener("keyup", function (event) { // jei užpildžius paieškos laukelį spaudžiamas ne paieškos mygtukas, o Enter klaviatūroje, vykdome search funkciją esančią weather objekte
        if (event.key == "Enter") {
          weather.search();
        }
      });
    
    weather.fetchWeather("Vilnius"); // kai puslapis užkraunamas kaip default įvykdome Vilniaus orų užklausą