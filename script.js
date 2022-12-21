function upload_source(){

	source = document.getElementById("source");

	source.onsubmit = async (redirect) => {
		redirect.preventDefault();

		let response = await fetch("http://127.0.0.1:8000/upload/source",{
			method: 'POST',
			body: new FormData(source)
		});

		let result = await response.json();

		console.log(result);

		window.alert(result["response"]);
	}
}

function upload_target(){

	target = document.getElementById("target");

	target.onsubmit = async (redirect) => {
		redirect.preventDefault();

		let response = await fetch("http://127.0.0.1:8000/upload/target",{
			method: 'POST',
			body: new FormData(target)
		});

		let result = await response.json();

		console.log(result);

		window.alert(result["response"]);
	}
}

async function fetch_result() {

	showLoader();

	var url = "http://127.0.0.1:8000/result";
	
	// Storing response
	const response = await fetch(url);
	
	// Storing data in form of JSON
	var data = await response.json();
	if (response) {
		hideloader();
	}

	show(data);
}

// Function to show bar
function showLoader(){
	document.getElementById('loading').style.display = 'block';
}

// Function to hide the loader
function hideloader() {
	document.getElementById('loading').style.display = 'none';
}

// Function to define innerHTML for HTML table
function show(data) {

	let tab = data["response"]

    console.log(tab);

	document.getElementById("authentication").innerHTML = tab;
    
}
