
$(document).ready(function () {
    
    var today = new Date();
    var dd = today.getDate();
    
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
    
    if(mm<10) 
    {
        mm='0'+mm;
    } 
    
    today = mm+'/'+dd+'/'+yyyy;
    
    

    $("#searchBtn").on("click", function () {
        var cityterm = $('#citySearch').val().trim();
        searchWeather(cityterm)
        recents.push(cityterm) 
        crtBtn(recents[recents.length-1])   
        
        

        window.localStorage.setItem("recents", JSON.stringify(recents))


    });

    function crtBtn(input) {
        var li = $("<li>").addClass("list-group-item").text(input)
        $(".list-group").append(li)
    }







    function searchWeather(term) {

        var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${term}&appid=0085a766ccd837cc98f89fbc8dd6ed37&units=imperial`



        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            // After the data from the AJAX request comes back
            .then(function (response) {
                $(".card").empty();
                console.log(response);
                var body = $(".card");
             
                // Creating elements for html 
                var divTitle = $("<div>").addClass("card-title")
                divTitle.attr("id", "city");
                var image = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png")

                var divTemp = $("<p>").addClass("card-text")
                divTemp.attr("id", "temperature");
                
                var divHum = $("<p>").addClass("card-text")
                divHum.attr("id", "humidity");
                
                var divWind = $("<p>").addClass("card-text")
                divWind.attr("id", "windSpeed");
                
                divTitle.text(response.name + " " + today + " " + image); 
                divTemp.text("Temperature: " + response.main.temp.toFixed(1) + " °F");  
                divHum.text("Humidity: " + response.main.humidity + "%");

                divWind.text("Wind Speed: " + response.wind.speed + " MPH");

                body.append(divTitle);
                body.append(divTemp);
                body.append(divHum);
                body.append(divWind);



                getForecast(response.coord.lat, response.coord.lon)
            });
    }

    function getForecast(lat, lon) {
  
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=0085a766ccd837cc98f89fbc8dd6ed37&units=imperial`,
            method: "GET",
            dataType: "json"
        
        }).then(function (res){
      
          console.log(res)
          
          $('#forecast').empty();
      
          // variable to hold response.list
          let results = res.daily;
          console.log(results)
          
          for (let i = 0; i < 5; i++) {
              
              var date = new Date();
              var val=(date.getMonth()+1)+"/"+(date.getDate()+i+1)+"/"+date.getFullYear();
            
              
              
              var card = $("<div>").addClass("card col-lg-2 ml-4 bg-primary text-white");

              var cardBody = $("<div>").addClass("card-body")

              var cityDate = $("<h4>").addClass("card-text").text(val)
              cityDate.attr("id", "title-card");
              
              var temperature = $("<p>").addClass("card-text").text("Temp: " + results[i].temp.day.toFixed(1) +" °F");
              temperature.attr("id", "text-card");

              var humidity = $("<p>").addClass("card-text").text("Hum: " + results[i].humidity + "%");
              humidity.attr("id", "text-card");
                    
              var image = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + results[i].weather[0].icon + ".png")
              image.attr("id", "text-card");

              card.append(cityDate)
              card.append(image)
              card.append(temperature)
              card.append(humidity)
              $("#forecast").append(card)
      
            
          }
        });
      
      }

    var recents = JSON.parse(window.localStorage.getItem("recents")) || []
  
    for (let i = 0; i < recents.length; i++) {
        crtBtn(recents[i])
        
    }
 
})
