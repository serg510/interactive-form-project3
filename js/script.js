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
price = $('<label>').addClass('total').text('The total price is : $ ' + totalCost);
$('.activities').append(price);

////listen for changes in the Activity section////
$('[type="checkbox"]').on('change',function(e){
    const checkSelected = $(e.target);
    const insideText = checkSelected.parent().text();

    console.log(checkSelected);
    console.log(insideText);
});

///update and display total activity cost

///disable conflicting activities


///Creating an dom element to display the total activity cost
