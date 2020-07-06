"use strict";

// event listeners
addEventListener('load', collapsibleFAQs);
addEventListener("load", prepareGallery); 
// ================================= Collapsible FAQs ======================================

function collapsibleFAQs() {
    // get collapisble elements
    var collapsibles = document.getElementsByClassName("collapsible"); 
    // loop through the collapsible elements and bind onclick event listener to each of them
    for (var i = 0; i < collapsibles.length; i++) {
        collapsibles[i].addEventListener("click", function () {
            //  this referes to => current collapsible element 
            this.classList.toggle("active"); 
            // get next element sibling of current element
            var content = this.nextElementSibling; 
            // toggle between display:'block' and display:'none'

            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
} 
// =========================================================================================
// ================================= Validate The form =====================================
/*
* 1. Validating Empty Fields
* 2. Validation Text Fields
* 3. Validating Email Fields
*/


function validateForm() {
    // get contact form 
    var contact = document.querySelector('#contact-form');
    var errors = [];
    var currentElement = null; 
    
    // error elements
    var errorRequiredSpan = "<span class='text-error required'>This field is required!</span>";
    var errorEmailSpan = "<span class='text-error required'>Please enter a valid email address!</span>"; 
    var errorInfoSpan = "<span class='text-error required'>Please enter valid information!</span>"; 


    // loop throgh all elements of the form 
    for (var i = 0; i < contact.length; i++) {
        currentElement = contact.elements[i]; 
        // exclude submit and hidden input types.
        if (currentElement.type !== "submit" && currentElement.type !== "hidden") {
            
            /* 1. Validating Empty Fields */
            // check if the input has not filled out.
            if (currentElement.value.trim() == "") {
                // remove previous error message if exits
                clearErrorMessage(currentElement);
                // add the error to the errors array.
                errors.push(currentElement.name); 
                // check if the error element already exists, so it will not add the error element again.
                if (!currentElement.nextElementSibling) 
                    addErrorMessage(currentElement, errorRequiredSpan);
            } else {
                // if the current element is not empty anymore, it removes the error element
                clearErrorMessage(currentElement);

                /* 2. Validating Text Fields */
                    // text inputs only accept numbers and alphabets
                if(currentElement.type == "text") {
                    // regular expression for validating text
                    var textRegex = /^[a-z\d\-_\s]+$/i;
                    if(!currentElement.value.match(textRegex)){
                        addErrorMessage(currentElement, errorInfoSpan);
                        // push this error to errors array
                        errors.push(currentElement.name);
                  } else {
                    //  if information is valid remove the error element
                    clearErrorMessage(currentElement);
                  }
                }

                /* 3. Validating Email Fields */
                if (currentElement.type == "email") {
                  // validate email address
                  // regular expression for validating email
                  var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                  if (!currentElement.value.match(emailRegex)) {
                      addErrorMessage(currentElement, errorEmailSpan);
                    // push this error to errors array
                    errors.push(currentElement.name);
                  } else {
                    //  if the email address is valid remove the error element
                    clearErrorMessage(currentElement);
                  }
                }
            }
        }
    } 
    // check if there are any errors show the error alert otherwise show the success message and then submit the form
    if (errors.length > 0) {
        alert("You have " + errors.length + " error(s)");
        return false;
    } else {
        alert("All Good :)");
        return true;
    }
}

// removing error elements
function clearErrorMessage(currentElement){
    if (currentElement.nextElementSibling)
        currentElement.parentNode.removeChild(currentElement.nextElementSibling);
}
// inserting error elements
function addErrorMessage(currentElement, errorElement){
    currentElement.insertAdjacentHTML("afterend", errorElement);
}

// =========================================================================================
// =================================== Products Gallery ====================================


var currentProductIndex = 0;
var products = null;

function prepareGallery() {
    // check if browser support document.getElementsByTagName
    if (!document.getElementsByTagName) {
        return false;
    } // check if browser support document.getElementById

    if (!document.getElementById) {
        return false;
    }

    if (document.getElementById("product-gallery")) {
        // get the product gallery element
        var gallery = document.getElementById("product-gallery");
         // add control buttons
        gallery.insertAdjacentHTML("afterend", "<div style=\"display:flex; flex-direction: row\">\n <button class=\"control\" onclick='nextProduct();'><i class=\"fa fa-chevron-left fa-2x\" aria-hidden=\"true\"></i></button>\n            <button class=\"control\" onclick='prevProduct();'><i class=\"fa fa-chevron-right fa-2x\" aria-hidden=\"true\"></i></button>\n      </div>"); 
        // get all the products
        products = gallery.children; 
        // checking if the products length is greater than 1, then making the first element visible
        if (products.length > 1) {
            products[0].style.display = "flex";
        } // start auto play
        autoPlay();
    }
} 

function prevProduct() {
    // if there is a previous product switch to the previous product
    if (currentProductIndex > 0) {
        products[currentProductIndex].style.display = "none";
        products[--currentProductIndex].style.display = "flex";
    } else {
        products[currentProductIndex].style.display = "none"; 
        // if there is no other previous product go to the last element   
        currentProductIndex = products.length - 1;
        products[currentProductIndex].style.display = "flex";
    }
}

function nextProduct() {
    // if there is a nexy product switch to the next product
    if (currentProductIndex + 1 < products.length) {
        products[currentProductIndex].style.display = "none";
        products[++currentProductIndex].style.display = "flex";
    } else {
        products[currentProductIndex].style.display = "none"; 
        // if there is no other next product go to the first element
        currentProductIndex = 0;
        products[currentProductIndex].style.display = "flex";
    }
} 
// auto play and change the product evey 5 seconds
function autoPlay() {
    setInterval(nextProduct, 5000);
} 
// =========================================================================================