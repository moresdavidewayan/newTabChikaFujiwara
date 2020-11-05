addZero=function(num){
    if (String(num).length==1){
        num="0"+num;
    }
    return num;
}

setInterval( () => {
    day = new Date();

    hr = addZero(day.getHours());
    min = addZero(day.getMinutes());
    sec = addZero(day.getSeconds());

    document.getElementById("ore").innerText = hr
    document.getElementById("min").innerText = min
    document.getElementById("sec").innerText = sec
})

input = document.getElementById("searchBar");
putSpace = false;
document.addEventListener("keydown", function(event) {
    event.preventDefault();
    switch (event.key) {
        case "Enter":
			if(input.innerText != "Ricerca Google" && input.innerText.startsWith("!yt ")){
				location = "https://www.youtube.com/results?search_query=" + input.innerText.substring(4).replace("&nbsp:", "+");
			}
			else if(input.innerText != "Ricerca Google" && input.innerText.startsWith("!url ")){
				location = "https://" + input.innerText.substring(5);
			}
	    	else if (input.innerText != "Ricerca Google") {
		    	location = "https://google.com/search?q=" + input.innerText.replace("&nbsp:", "+");
	    	}
	    break;
        case "Backspace":
	    if (input.innerText != "Ricerca Google") {
		    if (event.ctrlKey) {

			    splitput = input.innerText.split(" ");
			    splitput.pop(-1);
			    splitput = splitput.join(" ");
			    
			    input.innerText = splitput;
			    putSpace = true;

		    } else {

			    if (putSpace == true) {
				putSpace = false
			    } else if (input.innerText.slice(-2,-1) == " ") {
				input.innerText = input.innerText.slice(0, -1);
				putSpace = true;    
			    } else {
				input.innerText = input.innerText.slice(0, -1);
			    }

		    }
	    }
	    break;
        case " ":
            putSpace = true
            break;
        default:
            console.log(event.key)
            if (!["Control", "Escape", "Tab", "Shift", "Alt", "AltGraph", "Insert", "Delete", "Home", "End", "PageUp", "PageDown", "ScrollLock", "Pause", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight", "NumLock", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "OS", "PrintScreen", "Meta", "Dead", "CapsLock", "ContextMenu", "Super"].includes(event.key)) {

		if (input.innerText == "Ricerca Google") {
			input.innerText = "";
		}

                if (putSpace == true) {
                    input.innerText = input.innerText + " " + event.key;
                    putSpace = false
                } else {
                    input.innerText = input.innerText + event.key;
                }
            }
    }

    if (input.innerText.length == 0) {
	    input.innerText = "Ricerca Google";
    }

    splitput = input.innerText.split(" ")
    splitput[0] = splitput[0] + " "

    if (splitput.length == 1) {
	    toCheck = /\!.*/.exec(input.innerText)
		    if (toCheck != null) {
			    if (toCheck.index === 0) {
				    input.innerHTML = "<span style=\"color: #626262;\">" + input.innerText + "</span>"
			    }
		    }
    } else {
	    toCheck = /\!.*/.exec(splitput[0]) 
	    if (toCheck != null) {
		    if (toCheck.index === 0) {
			    input.innerHTML = "<span style=\"color: #626262;\">" + splitput[0] + "</span> " + splitput.slice(1).join(" ")
		    }
	    }
    }
}, 1000)