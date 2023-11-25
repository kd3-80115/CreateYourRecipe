function searchMeal() {
  var recipeText;
  var refToInsPara = document.getElementById("instruction-para");
  var refToSearchField = document.getElementById("search");
  var refToTitle = document.getElementById("mealTitle");
  var refToTableBody = document.getElementById("table-body");
  var refToMealImage = document.getElementById("mealPic");
  var refToLoader = document.getElementById("loader");

  var mealToSearch = refToSearchField.value;
  refToLoader.style.display = "block";
  var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealToSearch}`;
  var helper = new XMLHttpRequest();
  
  helper.onreadystatechange = () => {
    if (helper.status == 200 && helper.readyState == 4) {
      // hide the loader after successfully data loaded
      refToLoader.style.display = "none";
      var obj = JSON.parse(helper.responseText);
      if (obj.meals!=null) {
        //Print the title of recipe
        refToTitle.innerText = obj.meals[0].strMeal;
        refToTitle.style.color="black";
        //Get the instructions from the server
        recipeText = obj.meals[0].strInstructions;
        //remove the \r\n from the string
        var formattedRecipe = recipeText.replace(/(\r\n|\r|\n)/g, "<br>");
        refToInsPara.innerHTML = formattedRecipe;
        //set the image of meal
        refToMealImage.innerHTML = `<img src="${obj.meals[0].strMealThumb}" alt="Meal image" style="height: 20vh; width: 10vw"/>`;

        //reset table
        refToTableBody.innerHTML = "";
        for (let i = 1; i <= 20; i++) {
          var meal = obj.meals[0];
          const ingredient = meal[`strIngredient${i}`];
          const measurement = meal[`strMeasure${i}`];

          if (ingredient && measurement) {
            var row = `<tr><td>${ingredient}</td><td>${measurement}</td></tr>`;
            refToTableBody.innerHTML = row + refToTableBody.innerHTML;
          }
        }
      }
      else
      {
        refToTitle.innerText="Meal not found!!";
        refToTitle.style.color="red";
        refToInsPara.innerHTML="";
        refToTableBody.innerHTML="";
        refToMealImage.innerHTML="";
      }
    }
  };
  helper.open("GET", url);
  helper.send();
}
