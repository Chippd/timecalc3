
//when page loads:
$(document).ready(function(){
	console.info('page ready');
	//start listening for checkbox changes
	checkboxlistener();
	$('input').eq(0).focus();	
})



//function for timesEquals press:
$('#times').submit(function(e){
	//preventing form sumbit default action:
	e.preventDefault();

	console.info('user pressed equals in timesEquals');
	//get how many rows we're dealing with...

	var rowCount = $('.timesRow').length;
	console.log ("we got: "+rowCount+" rows");

	//get value of first hours and minutes:

	var hours = parseInt($('.timesRow input').eq(0).val());
	var mins = parseInt($('.timesRow input').eq(1).val());

	console.log('first hour is: '+hours+' first min is: '+mins);

	//get number of switches and ther values 

	var switches = $('.switchRow').length;

	console.log('switch count: '+ switches);

	//for each extra row in quesiont, get the mode (minus or add) and get the values
	//loop over them, starting at 1 to avoid first values 
	for(i = 0; i < switches ; i++){
		var mode = $('.modeSwitch').eq(i).attr('mode');
		var row = $('.timesRow').eq(i-1);
		var hour = parseInt(row.children().children('input').eq(0).val());
		var min = parseInt(row.children().children('input').eq(1).val());

		console.log('we want to '+mode+' '+ hour + ' and '+ min + ' from '+hours,mins);

		if(mode === "add"){
			//add the hours and minutes
			hours = hours+hour;
			mins = mins+min;
		}

		if(mode === "minus"){
			//minus the hours and minutes
			hours = hours-hour;
			mins = mins-min;
		}
		console.log('new hours and mins are: '+hours,mins);

		//convert hours to minutes, then add to mins, then get hours and minutes again...
		hours = hours*60;
		mins = mins+hours;
		console.log('total mins ', mins );
		hours = Math.floor(mins / 60)
		mins = mins % 60
    	
    	console.log('fixed hours mins are '+hours,mins);

    	var message = hours + " hours " + mins + ' mins';

    	$('.answer p').text(message);
	}



})


//listener for toggleswitches

function checkboxlistener() { //switch add/subtract mode when toggled
	console.info('checkboxlistener running');
	$('.modeSwitch').change(function(){
		var mode = $(this).attr('mode'); //get the mode it is currently in

		if(mode === "add"){
			//then set mode to subtract
			$(this).attr('mode','minus');
			$(this).siblings('.mdi-content-add').removeClass('activeSwitch');
			$(this).siblings('.mdi-content-remove').addClass('activeSwitch');
		} else {
			$(this).attr('mode','add');
			$(this).siblings('.mdi-content-remove').removeClass('activeSwitch');
			$(this).siblings('.mdi-content-add').addClass('activeSwitch');
		}

	})
}


//get html for adding rows:
var xtraTimesRow = $('.switchRow').eq(0).html() + $(".timesRow").eq(0).html();

//function for adding extra row: 
var addTimesRow = function(){
	$('.timesEquals').before(xtraTimesRow);
}
