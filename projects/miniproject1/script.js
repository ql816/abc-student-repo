
window.onload = function () {
	var oh = document.getElementById("h");
	var om = document.getElementById("m");
	var os = document.getElementById("s");


	let contentElement = document.getElementById("text");
	let text = contentElement.innerHTML;
	let letters = text.split("");
	let letterSpans = letters.map((letter)=>{ return "<span>"+letter+"</span>"});
	contentElement.innerHTML = letterSpans.join("");
	let spanTags = contentElement.getElementsByTagName("span");
	let randomMultipliers = letters.map((letter)=>{ return Math.random()*4 })

	let range = document.getElementById("timeadjuster");
	let rangevalue  = range.value;
	var time = new Date();
	function timer() {
		time = new Date();
		var H = time.getHours() + time.getMinutes() / 60;
    var Mi = time.getMinutes();
    var S = time.getSeconds() + time.getMilliseconds() / 1000;
		os.style.transform = 'rotate(' + S * 6 + 'deg)';
		om.style.transform = 'rotate(' + Mi * 6 + 'deg)';
		oh.style.transform = 'rotate(' + H * 30 + 'deg)';
	}

	function changer() {
		let change = range.value - rangevalue;
		console.log(change);
			time.setSeconds(time.getSeconds()+ change);
			rangevalue = range.value;
		var H = time.getHours() + time.getMinutes() / 60;
    var Mi = time.getMinutes();
    var S = time.getSeconds() + time.getMilliseconds() / 1000;
		os.style.transform = 'rotate(' + S * 6 + 'deg)';
		om.style.transform = 'rotate(' + Mi * 6 + 'deg)';
		oh.style.transform = 'rotate(' + H * 30 + 'deg)';
		var r  = rangevalue%100 + Math.random()*100;
		var g  = rangevalue%100 + Math.random()*150;
		var b  = rangevalue%100 + Math.random()*200;
		var inputBackgroundColor=document.getElementById("bg").style.backgroundColor='rgb(' + r + ',' + g + ',' + b +  ',0.4'+ ')';;
	}

	function post_timer(){
		time.setSeconds(time.getSeconds()+ 1);
		var H = time.getHours() + time.getMinutes() / 60;
		var Mi = time.getMinutes();
		var S = time.getSeconds() + time.getMilliseconds() / 1000;
		os.style.transform = 'rotate(' + S * 6 + 'deg)';
		om.style.transform = 'rotate(' + Mi * 6 + 'deg)';
		oh.style.transform = 'rotate(' + H * 30 + 'deg)';

	}

	function blank(){
		console.log("ready for change");
	}

	timer()
	go = setInterval(timer, 1000);
	go_2 = setInterval(blank, 20000);
	range.addEventListener("input", function(){
			changer();
			clearInterval(go);
			clearInterval(go_2);
			let sliderValue = range.value/200;
			for(let i = 0; i < spanTags.length; i+=1){
					let randomMultiplier = randomMultipliers[i];
					let yPos = sliderValue*randomMultiplier
	spanTags[i].style.top = yPos + "px";
}
});
	range.addEventListener("change",function(){
			go_2 = setInterval(post_timer,1000);
	});

}
