

//var current day held in cache
var cachedDay; //check for date in cache? = 01/01/1999;
//var an array in cache to hold text for 13 hour blocks
var cachedArray= ["","","","","","","","","","","",""];
//at load check if current day same
var timeBlocks = 13;


//create function to clear cache if new day
function clearDay(){
    //set cachedDay to today's date in cache
    //setDay(); create a function or just do it

    // go thru cached array and set all text to ""
    for(var i = 0; i < timeBlocks; i++){
        cachedArray[i]="";
    }
}


function loadPlanner(){
    //get today from momemnt.js
    var today = moment();
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
    var timeIndex = 0;

    //check if cached day. If no cached day set to current day, if cached prior to today run clear function
    // if(cachedDay !== today){ 
    //     //clear cached  array and set current day
    //     clearDay();
    // }

    //add time blocks from 9am to 9pm
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
        var textBoxEl = $('<input>');
        textBoxEl.attr('type', 'text');
        textBoxEl.attr('id', i+'text');
        //time of day
        var time = today.format("HH");
        console.log(time);
        if(i+8 < time){
           textBoxEl.attr('class','past');
        }else if(i+8 == time){
           textBoxEl.attr('class','present');
        }else{
           textBoxEl.attr('class','future');
        }
        timeBlockEl.append(textBoxEl);
        //create/append a save button //maybe set btn id = i?; so can use i to set text array?
        var saveButtonEl = $('<btn>Save</btn>');
        saveButtonEl.attr('id', i);
        saveButtonEl.attr('class', 'saveBtn');
        timeBlockEl.append(saveButtonEl);

        //append div to container
        containerEl.append(timeBlockEl);
    }

}


//call loadPlanner to set the page
loadPlanner();
var saveBtnEl = $('.saveBtn');

//save button CLICK listener
//create a function to add a save button
//button needs to know which line it's on 0-12 so it can save text to the correct array index in cached array
saveBtnEl.on("click", function(){
    //get the id of the timeblock you're saving
    var buttonIndex = this.id;
    //the block of text in the planner to save
    var textblock = "#" + buttonIndex + "text";
    var textEl = $(textblock);//$("#"+buttonIndex +'text');
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