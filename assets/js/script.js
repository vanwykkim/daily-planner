//get a hook into the container class to add time blocks

//var current day held in cache
var cachedDay; //check for date in cache? = 01/01/1999;
//var an array in cache to hold text for 13 hour blocks
var cachedArray= ["","","","","","","","","","","",""];
//at load check if current day same
var timeBlocks = 13;

//create a function to add a save button
//button needs to know which line it's on 0-12 so it can save text to the correct array index in cached array
function saveBtn(){;}



//create function to clear cache if new day
function clearDay(){
    //set cachedDay to today's date in cache
    //setDay(); create a function or just do it

    // go thru cached array and set all text to ""
    for(int i = 0; i < timeBlocks; i++){
        cachedArray[i]="";
    }
}


function loadPlanner(){
    var today;// = get today from momemnt.js

    //var array to use for timeBlocks
    var timesArray = ["8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm","7pm","8pm"];

    //check if cached day. If no cached day set to current day, if cached prior to today run clear function
    if(cachedDay !== today){ 
        //clear cached  array and set current day
        clearDay();
    }

    //get hook into header where current date should be, use date (today), append

    //add time blocks from 9am to 9pm
    //13 = number of time blocks to add
    for(var i = 0; i < timeBlocks; i++){
    //create a div
    //create/append a time 
    //create/append a text box// color textbox based on if it's current time/ previous or future//fill text content for textbox if from cache
    //create/append a save button //maybe set btn id = i?; so can use i to set text array?
    //append div to container
    }

}


//call loadPlanner to set the page
loadPlanner();

//save button CLICK listener