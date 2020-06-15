var placeSearch, autocomplete;

function searchFunction() {
    console.log("in search function");
    search_val = $("#searchplace").val();
    console.log("value to search: " + search_val);
    getJSON("http://localhost:5000/search/"+search_val).then(function(data) {
    console.log(data);
    data_output = data;
    for (var output in data.results) {
        console.log(typeof output);
        data_output = data_output + data.results[output]["formatted_address"] + "\n";
    // ...
    }
    result2.innerText = data_output; //display the result in an HTML element
    }, function(status) { //error detection....
    result2.innerText = 'Something went wrong.';
    });
}

function myFunction() {
    console.log("in my function");
    search_val = $("#autocomplete").val();
    console.log("value to search: " + search_val);
    /*$.ajax({
        url: "http://localhost:5000/autocomplete/" + search_val,
        type: "GET",
        success: function(result){
            console.log(result);
        },
        error: function(error){
            console.log(error);
        }
    })*/
    getJSON("http://localhost:5000/autocomplete/"+search_val).then(function(data) {
    console.log(data);
    data_output = "";
    console.log(typeof data.predictions);
    for (var desc in data.predictions) {
        console.log(typeof desc);
        data_output = data_output + data.predictions[desc]["description"] + "\n";
    }
    result.innerText = data_output; //display the result in an HTML element
    }, function(status) { //error detection....
    result.innerText = 'Something went wrong.';
    });
}

$("#autocomplete").on("change paste keyup", function() {
   myFunction();
});
/*
$('#autocomplete').change(function(){
    search_val = $("#autocomplete").val();
    console.log("value to searcg: " + search_val);
    $.ajax({
        url: "http://localhost:5000/autocomplete/" + search_val,
        type: "GET",
        success: function(result){
            console.log(result);
        },
        error: function(error){
            console.log(error);
        }
    })
});
*/
var getJSON = function(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        resolve(xhr.response);
      } else {
        reject(status);
      }
    };
    xhr.send();
  });
};
