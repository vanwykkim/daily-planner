

//var an array in cache to hold text for 13 hour blocks
var cachedArray= ["","","","","","","","","","","",""];
//number of timeblocks using
var timeBlocks = 13;


//function to clear cache if new day
function clearDay(date){

    //set cachedDay to today's date in cache
    localStorage.setItem("myCachedDay", JSON.stringify(date.format('YYYY-MM-DD')));
    // go thru array and set all text to "" to clear cache
    for(var i = 0; i < timeBlocks; i++){
        cachedArray[i]="";
    }
    //start a fresh cachedArray for a fresh day
    localStorage.setItem("myCachedArray", JSON.stringify(cachedArray));
}

function loadPlanner(){
    //get today from momemnt.js
    var today = moment();
    var cachedDay = JSON.parse(localStorage.getItem("myCachedDay"));
    if (cachedDay !== null && cachedDay !== "undefined"){
        localStorage.setItem("myCachedDay", JSON.stringify(today.format('YYYY-MM-DD')));
    }else{
        if(cachedDay !== today.format('YYYY-MM-DD')){
            clearDay(today);
        }   
    }
    //get hook into header where current date should be, use date (today), append
    var currentDayEL = $('#currentDay');
    currentDayEL.text(today.format('dddd MMM Do, YYYY'));

    //get a hook into the container class to add time blocks
    var containerEl = $('.container');

    //var array to use for timeBlocks
    //array.indexOf() index to start the background color
    var timesArray = ["8AM","9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM"];
    console.log(timesArray);
    //Index for current time on planner

    //add time blocks from 8am to 8pm
    //13 = number of time blocks to add
    for(var i = 0; i < timeBlocks; i++){      
        //create a div
        var timeBlockEl = $("<div>");
        timeBlockEl.attr('class','time-block');
        timeBlockEl.addClass('row');
        
        //create/append a time section
        var timeSectionEl = $('<p>');
        timeSectionEl.attr('class','hour');
        timeSectionEl.text(timesArray[i]);
        timeBlockEl.append(timeSectionEl);
        //create/append a text box// color textbox based on if it's current time/ previous or future//fill text content for textbox if from cache
        var textBoxEl = $('<textarea>');
        textBoxEl.attr('type', 'text');
        textBoxEl.attr('id', i+'text');
        //check for cached planner text array
        var thisCachedArray = JSON.parse(localStorage.getItem("myCachedArray"));
        if (thisCachedArray !== null && thisCachedArray !== "undefined") {
            //if myCachedArray exits set value from cached array
            textBoxEl.val(thisCachedArray[i]); 
        }
        //time of day
        var time = today.format("HH");
        if(i+8 < time){
           textBoxEl.attr('class','past');
        }else if(i+8 == time){
           textBoxEl.attr('class','present');
        }else{
           textBoxEl.attr('class','future');
        }
        timeBlockEl.append(textBoxEl);
        //create/append a save button 
        var saveButtonEl = $('<btn>Save</btn>');
        //set a id to know which element you're grabbing to save in listener function
        saveButtonEl.attr('id', i);
        saveButtonEl.attr('class', 'saveBtn');
        saveButtonEl.addClass("saveBtn i:hover");
        timeBlockEl.append(saveButtonEl);

        //append div to container
        containerEl.append(timeBlockEl);
    }

}


//call loadPlanner to set the page
loadPlanner();

//link to element saved button in the Dom using class
var saveBtnEl = $('.saveBtn');

//save button CLICK listener
saveBtnEl.on("click", function(){
    //get the id of the timeblock you're saving
    var buttonIndex = this.id;
    //the block of text in the planner to save
    var textblock = "#" + buttonIndex + "text";
    //element for correct textblock in the dom
    var textEl = $(textblock);
    //check if already cached an array
    var isCachedArray = JSON.parse(localStorage.getItem("myCachedArray"));
    if (isCachedArray !== null && isCachedArray !== "undefined") {
        cachedArray = isCachedArray;//get array from local storage
        cachedArray[buttonIndex] = textEl.val(); //add value at index
        localStorage.setItem("myCachedArray", JSON.stringify(cachedArray));//restore array to local storage
    }else{
        //no local storage started. Start it. 
        cachedArray[buttonIndex] = textEl.val();
        localStorage.setItem("myCachedArray", JSON.stringify(cachedArray));//set array to local storage
    }
});