// When the page first loads, the first text field should be in focus by default//////
$("#name").focus();

/*=====job role=====*/

//hide the text input field but be visible if javascript is disabled
$("#other-title").hide();

//<-----show job role text field when other is selected----->
$("#title").on('change', function() {
    if($(this).val()==='other'){
        $("#other-title").show();
    }else{
            $("#other-title").hide();
       

    }

});

//hide the select theme option 
// <---code from
//(https://stackoverflow.com/questions/1643227/get-selected-text-from-a-drop-down-list-select-box-using-jquery)----->
$("#design option:selected").text('Select Theme');

//target the first option of a drop down menu
$("#color option:first").before("<option selected='selected'>Please select a T-shirt theme</option>");

$("#colors-js-puns").hide()

//show corresponding colors for themes selected
$("#design").on('change',function() {
    if ($("#design").val()==="js puns"){
        $("#design option:first").text('Select Theme').hide();
        $("#colors-js-puns option[value='cornflowerblue']").show().prop('selected', true);
        $("#colors-js-puns").show()
       //<---hide all option---->
        $("#color option").hide()
        //show only the 'Js puns'//
        $('#color option[value="cornflowerblue"]').show();
        $('#color option[value="darkslategrey"]').show();
        $('#color option[value="gold"]').show();
        
       
    }else{
        //<---hide all option---->
        $("#colors-js-puns option[value='tomato']").show().prop('selected', true);
        $("#colors-js-puns").show()
        $("#color option").hide()
         //show only the 'I love Js' //
        $('#color option[value="tomato"]').show();
        $('#color option[value="steelblue"]').show();
        $('#color option[value="dimgrey"]').show();
       
    } 
});

//<<<<--------------Activity------------>>>>>>>>>>>>>

///create an element to display the total activity cost///////
let totalCost = 0;
let price;
price = $('<label>').addClass('total').text('Total: $ ' + totalCost);
$('.activities').append(price);

////listen for changes in the Activity section////
$('[type="checkbox"]').on('change',function(e){
    const checkSelected = $(e.target);
    const insideText = checkSelected.parent().text();
    const dollarIndex = insideText.indexOf('$');
    const addingCost = insideText.slice(dollarIndex +1);
    const numCost = parseInt(addingCost);
    const emDashIndex = insideText.indexOf("—");
    const comaIndex = insideText.indexOf(',');
    const dateNTime = insideText.slice(emDashIndex +1, comaIndex);
//<-----https://stackoverflow.com/questions/11440128/jquery-test-if-checkbox-is-not-checked--->
    if (checkSelected.is(':checked')) {
        totalCost += numCost;
        $('.total').text('Total : $ ' + totalCost);
    } else {
        totalCost -= numCost;
        $('.total').text('Total : $ ' + totalCost);
    }
    

    //<<------Disabling conflicting activities---->>////
    const inputCheck = $("input[type='checkbox']");

    for(let i =0; i< inputCheck.length; i++){
        const checkboxText = inputCheck.eq(i).parent().text();
      if(checkboxText.includes(dateNTime) && checkboxText !== insideText ){
         if(checkSelected.is(':checked')){
             inputCheck.eq(i).attr("disabled",true);
             inputCheck.eq(i).parent().css("text-decoration","line-through");
         }else{
             inputCheck.eq(i).attr("disabled",false);
             inputCheck.eq(i).parent().css("text-decoration","none");
         }

      }

    }
    
});

//<<<<<<<<<<<<-----------Payment Section--------------->>>>>>>

//Initially, the credit card section should be selected and displayed in the form,
$('#payment option[value="credit card"]').attr('selected','true');

//user shouldn’t be able to select the “Select Payment Method” option.

$("#payment option[value='select_method']").hide();

    //create variables  & set behaviour for those variables
    const creditCard = $('div #credit-card');;
    const payPal = $('div p:first').attr('id','payPal');
    const bitCoin = $('div p:last').attr('id','bitCoin');
    payPal.hide();
    bitCoin.hide();
    // $("#credit-card").hide();

$("#payment").on('change',function(){
    
    
    // Get the value of the payment option selected
    const selectedPayment =  $(this).children('option:selected').val();
    // 'If Else' statement and corresponding action
     if(selectedPayment ==="credit card" ){
            creditCard.show();
            //focus on credit card # box
            $("#cc-num").focus();
        
    }
    else if (selectedPayment==="paypal"){
            creditCard.hide();
            payPal.show();
            bitCoin.hide();

    }
    else if ( selectedPayment ==="bitcoin"){
            creditCard.hide();
            payPal.hide();
            bitCoin.show();
    }
});

//<<<<<<<<---------Form Validation and Error Messages---------->>>>>>>>
//<<<<<<---Create a separate validation function for each of the required form fields-->>>


function nameValidation(){
    //takes the user input and compares it against Regex if it doesnt pass else it will display and error
    let newname = $('#name').val();
    if(newname !== ''){
        $('#name').prev().text("Name:").css('color', 'black'); 
          return true;
        
    }else {
        $('#name').prev().text("Please enter a valid Name.").css('color', 'red');
       
        return false;
}
}

  //run on blur
$('input#name').on('blur', function(event) {
    nameValidation(event.target.value);
  });

 


function emailValidation(){
        //regex from workspaces for email verification
        const email = /^[^@]+@[^@.]+\.[a-z]+$/i;
        //takes the user input and compares it against Regex if it doesnt pass else it will display and error
        if(email.test($('#mail').val())){
            $('#mail').prev().text("Email:").css('color', 'black');
           
             return true;
             
            }else {
            $('#mail').prev().text("Please enter a valid Email.").css('color', 'red');
            
            return false;
        }
};


//calling the email function everytime you click in or out



$('input#mail').on('keypress blur', function(event) {
    emailValidation(event.target.value);
  });

//validate activity section & adding errors

let errMessage = document.createElement('p');
    errMessage.innerHTML = "Please select at least one activity.";
    
    $(".activities").append(errMessage);
    $(".activities p").last().css("color", "red");
    $(".activities p").last().hide();
    
function activityValidation(){
    
    
            if (totalCost !== 0) {
                $(".activities p").last().hide();
               //console.log('the error message should not show')
                return true;                              
            }
            else{
                $(".activities p").last().show();
               //console.log('the error message should show')
                return false;
            }
}


$("form").submit(function(e){
     nameValidation();
     emailValidation();
     activityValidation();
       // check the status of name validation and email validation
       if( !nameValidation() || !emailValidation() || !activityValidation()){
        e.preventDefault(); 
    }
    

        //<<<<<--------------Credit Card Validation----------->>>>>>///
 
    // Checks if payment option is credit card
    if ($('#payment option[value = "credit card"]').is(':selected')) {
        // Checks if input field in not empty and it contains numbers between 13 and 16
        if ( $('#cc-num').val() == '' ||  !(/^\d{13,16}$/.test($('#cc-num').val())) ) {
            e.preventDefault();             
            $('#cc-num').css("border","3px solid red");
            $('#cc-num').attr("placeholder","Number Must Be 13-16 Digits");

        } 
        // Checks if input field in not empty and it contains 5 numbers
         if ( $('#zip').val() == '' || !(/^\d{5}$/.test($('#zip').val()) )) {
            e.preventDefault();
            $('#zip').css("border","3px solid red");
            $('#zip').attr("placeholder","Zip is 5 Digits");
        } 
        // Checks if input field in not empty and it contains 3 numbers
         if ($('#cvv').val() == '' || !(/^\d{3}$/.test($('#cvv').val())) ) {
            e.preventDefault();
            $('#cvv').css("border","3px solid red");
            $('#cvv').attr("placeholder","CVV 3 Digits");
        }
        
            
        }
    }

)