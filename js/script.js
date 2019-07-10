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
$("#design option:selected").text('');

//target the first option of a drop down menu
$("#color option:first").before("<option selected='selected'>Please select a T-shirt theme</option>");
//hide color until theme is selected
$("#color option").hide()
//show corresponding colors for themes selected
$("#design").on('change',function() {
    if ($("#design").val()==="js puns"){
      //  $("#color option:contains('JS Puns')").show();

       //<---hide all option---->
       $("#color option").hide()
       //<---update the “Color” field to 1st-->
       $('#color option[value="cornflowerblue"]').attr('selected','true');
    
       //show only the 'Js puns'//
       $('#color option[value="cornflowerblue"]').show();
       $('#color option[value="darkslategrey"]').show();
       $('#color option[value="gold"]').show();
       
    }else{
        //<---hide all option---->
        $("#color option").hide()

        //<---update the “Color” field to 1st-->
         $('#color option[value="tomato"]').attr('selected','true');
     
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

// Hide the "Select Payment Method" option



//Initially, the credit card section should be selected and displayed in the form,
$('#payment option[value="credit card"]').attr('selected','true');
$("#payment option[value='select_method']").attr('disabled','disabled');

    //create variables  & set behaviour for those variables
    const payPal = $('div p:first').attr('id','payPal');
    const bitCoin = $('div p:last').attr('id','bitCoin');
    payPal.hide();
    bitCoin.hide();
    $("#credit-card").hide();

$("#payment").on('change',function(){
    //focus on credit card # box
    $("#payment option[value='select_method']").hide();
    // Get the value of the payment option selected
    const selectedPayment =  $(this).children('option:selected').val();
    
    
    if(event.target.value ==="credit card" ){
        $("#credit-card").show();
        $("#cc-num").focus();
        
    }
    else if(event.target.value === "payPal"){
        $("#credit-card").hide();
        $('#payPal').show();
        $('#bitcoin').hide();

    }
    else if( event.target.value === "bitCoin"){
        creditCard.hide();
        payPal.hide();
        bitCoin.show();
    }
    

});