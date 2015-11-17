 function timeConverter (input) {
 	var  timeArray = input.split(':');

 	if (input.indexOf('AM')> -1) {
 		return input.slice(0, -2);
 	} else {
 		timeArray[0] = parseInt(timeArray[0]) + 12;

 		return timeArray.join(':').slice(0, -2);
 	}
}