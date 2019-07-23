//Have two arrays going:
//1 main array called "Main_Array"
//And then

function Calc() {
    var ingredientName=""; //This variable is the string that shows what they ordered
    var ingredientPrice="";// Shows the number for the price
    var sumTotal = 0; //The amount that adds up
    var sizeTotal = 0; //How Much Money
    var sizeArray = document.getElementsByClassName("size")
    for (var i = 0; i < sizeArray.length; i++) { // go through the array and review what is checked
        if (sizeArray[i].checked) {
            var checkedSize = sizeArray[i].value; //new variable checkedSize
            ingredientName = ingredientName+checkedSize+"<br>";
        }
    }
    if (checkedSize === "Personal") {
        sizeTotal = 6;
        ingredientPrice = ingredientPrice+"$"+sizeTotal+"<br>";
    } else if (checkedSize === "Medium") {
        sizeTotal = 10;
        ingredientPrice = ingredientPrice+"$"+sizeTotal+"<br>";
    } else if (checkedSize === "Large") {
        sizeTotal = 14;
        ingredientPrice = ingredientPrice+"$"+sizeTotal+"<br>";
    } else if (checkedSize === "ExtraL") {
        sizeTotal = 16;
        ingredientPrice = ingredientPrice+"$"+sizeTotal+"<br>";
    }

    sumTotal = sizeTotal; //Whichever choice is selected, make it the sumTotal that will be passed along
    //document.getElementById("total").innerHTML = sumTotal; (Insert Check to Test Code)
    //document.getElementById("IngredName").innerHTML = ingredientName;
    //document.getElementById("IngredPrice").innerHTML = ingredientPrice;
    addMeat(sumTotal,ingredientName,ingredientPrice); 
};

function addMeat(sumTotal,ingredientName,ingredientPrice) {
    var sumTotal = sumTotal; //Taking the variable back
    var meatTotal = 0; //Meat Price
    var meatArray = document.getElementsByClassName("meat");
    var selectedMeat = [];
    for (var i = 0; i < meatArray.length; i++) {
        if (meatArray[i].checked) {
            selectedMeat.push(meatArray[i].value);
        }
    }
    var meatAmount = selectedMeat.length;
    if (meatAmount > 1) {
        meatTotal = (meatAmount - 1); 
    } else {
        meatTotal = 0;
    }
    sumTotal = (sumTotal + meatTotal);
    
    for (var i = 0; i < selectedMeat.length; i++) {
        ingredientName = ingredientName+selectedMeat[i]+"<br>";
        if (meatAmount <= 1) {
            ingredientPrice = ingredientPrice+"$"+0+"<br>";
            meatAmount = meatAmount - 1;
        } else if (meatAmount == 2) {
            ingredientPrice = ingredientPrice+"$"+1+"<br>";
            meatAmount = meatAmount - 1;
        } else {
            ingredientPrice = ingredientPrice+"$"+1+"<br>";
            meatAmount = meatAmount - 1;
        }
    }
    addVeggie(sumTotal,ingredientName,ingredientPrice);
//document.getElementById("total").innerHTML = sumTotal; //(Inserted commented out check to test code)   
//document.getElementById("IngredName").innerHTML = ingredientName;
//document.getElementById("IngredPrice").innerHTML = ingredientPrice;
};



function addVeggie(sumTotal,ingredientName,ingredientPrice) {
    var sumTotal = sumTotal;
    var veggieTotal = 0;
    var veggieArray = document.getElementsByClassName("veggie");
    var selectedVeggie = [];
    for (var i = 0; i < veggieArray.length; i++) {
        if (veggieArray[i].checked) {
            selectedVeggie.push(veggieArray[i].value);
        }
    }
    var veggieAmount = selectedVeggie.length;
    if (veggieAmount > 1) {
        veggieTotal =  (veggieAmount - 1);
    } else {
        veggieTotal = 0;
    } 

    sumTotal = (sumTotal + veggieTotal);
    //document.getElementById("total").innerHTML = sumTotal; //(Inserted commented out check to test code)
    for (var i = 0; i < selectedVeggie.length; i++) {
        ingredientName = ingredientName+selectedVeggie[i]+"<br>";
        if (veggieAmount <= 1) {
            ingredientPrice = ingredientPrice+"$"+0+"<br>";
            veggieAmount = veggieAmount - 1;
        } else if (veggieAmount == 2) {
            ingredientPrice = ingredientPrice+"$"+1+"<br>";
            veggieAmount = veggieAmount - 1;
        } else {
            ingredientPrice =ingredientPrice+"$"+1+"<br>";
            veggieAmount = veggieAmount - 1;
        }
    }
    addCheese(sumTotal, ingredientName, ingredientPrice);
//document.getElementById("total").innerHTML = sumTotal; //(Inserted commented out check to test code)   
//document.getElementById("IngredName").innerHTML = ingredientName;
//document.getElementById("IngredPrice").innerHTML = ingredientPrice;
};

function addCheese(sumTotal, ingredientName, ingredientPrice) {
    var sumTotal = sumTotal;
    var cheeseTotal = 0
    var cheeseArray = document.getElementsByClassName("cheese");
        for (var i = 0; i < cheeseArray.length; i++) {
            if (cheeseArray[i].checked) {
                var checkedCheese = cheeseArray[i].value;
                ingredientName = ingredientName+checkedCheese+"<br>";
            }
        }

    if (checkedCheese === "Regular Cheese") {
        cheeseTotal = 0;
        ingredientPrice = ingredientPrice+"$"+cheeseTotal+"<br>";
    } else if (checkedCheese === "No Cheese") {
        cheeseTotal = 0;
        ingredientPrice = ingredientPrice+"$"+cheeseTotal+"<br>";
    } else if (checkedCheese === "Extra Cheese") {
        cheeseTotal = 3;
        ingredientPrice = ingredientPrice+"$"+cheeseTotal+"<br>";
    }
    sumTotal = (sumTotal + cheeseTotal);
    addCrust(sumTotal, ingredientName, ingredientPrice);
//document.getElementById("total").innerHTML ="$"+sumTotal; //(Inserted commented out check to test code)   
//document.getElementById("IngredName").innerHTML = ingredientName;
//document.getElementById("IngredPrice").innerHTML =ingredientPrice;
};



function addCrust(sumTotal, ingredientName, ingredientPrice) {
    var sumTotal = sumTotal;
    var crustTotal = 0
    var crustArray = document.getElementsByClassName("crust");
        for (var i = 0; i < crustArray.length; i++) {
            if (crustArray[i].checked) {
                var checkedCrust = crustArray[i].value;
                ingredientName = ingredientName+checkedCrust+"<br>";
            }
        }

    if (checkedCrust === "Cheese Stuffed Crust") {
        crustTotal = 3;
        ingredientPrice = ingredientPrice+"$"+crustTotal+"<br>";
    } else {
        crustTotal = 0;
        ingredientPrice = ingredientPrice+"$"+crustTotal+"<br>";
    }
    sumTotal = (sumTotal + crustTotal);
    addSauce(sumTotal, ingredientName, ingredientPrice);
//document.getElementById("total").innerHTML ="$"+sumTotal; //(Inserted commented out check to test code)   
//document.getElementById("IngredName").innerHTML = ingredientName;
//document.getElementById("IngredPrice").innerHTML = ingredientPrice;
};

function addSauce(sumTotal, ingredientName, ingredientPrice) {
    var sumTotal = sumTotal;
    var sauceArray = document.getElementsByClassName("sauce");
    var sauceTotal = 0
        for (var i = 0; i < sauceArray.length; i++) {
            if (sauceArray[i].checked) {
                var checkedSauce = sauceArray[i].value;
                ingredientName = ingredientName+checkedSauce+"<br>";
            }
        }
    
    ingredientPrice = ingredientPrice+"$"+sauceTotal+"<br>";
    
    sumTotal = (sumTotal + sauceTotal);

document.getElementById("total").innerHTML ="$"+sumTotal; //(Inserted commented out check to test code)   
document.getElementById("IngredName").innerHTML = ingredientName;
document.getElementById("IngredPrice").innerHTML = ingredientPrice;
};