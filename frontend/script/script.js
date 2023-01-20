function upload_source(){

	source = document.getElementById("source");

	source.onsubmit = async (redirect) => {
		redirect.preventDefault();

		try{
			
		let response = await fetch("http://127.0.0.1:8000/upload/source",{
			method: 'POST',
			body: new FormData(source)
		});

		let result = await response.json();

		console.log(result);

		window.alert(result["response"]);
		}

		catch(error)
		{
			window.alert("Internal Server Error!");
		}
	}
}

function upload_target(){

	target = document.getElementById("target");

	target.onsubmit = async (redirect) => {
		redirect.preventDefault();

		try{
				let response = await fetch("http://127.0.0.1:8000/upload/target",{
				method: 'POST',
				body: new FormData(target)
			});

			let result = await response.json();

			console.log(result);

			window.alert(result["response"]);
		}
		catch(error)
		{
			window.alert("Internal Server Error!");
		}
	
	}
}

async function fetch_result() {

	document.getElementById("authentication").innerHTML = "";

	showLoader();

	var url = "http://127.0.0.1:8000/result";

	try{
		// Storing response
		const response = await fetch(url);
		
		// Storing data in form of JSON
		var data = await response.json();
		if (response) {
			hideloader();
		}

		if (data == undefined)
			{
				window.alert("Internal Server Error!");
				return;
			}

		show(data);
	}

	catch(error)
	{
		hideloader();
		window.alert("Internal Server Error!");
	}
	
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
