var xInput = document.getElementById("x-vals");
var freqInput = document.getElementById("freq-vals");
var xVals = "";
var freqs = "";
d3.select(xInput)
    .on("change", () => {
        xVals = stringToVals(xInput.value);
    });
d3.select(freqInput)
    .on("change", () => {
        freqs = stringToVals(freqInput.value);
    });

function stringToVals(data) {
    var result = [];
    data.split(" ").forEach(element => {
        result.push(Number(element));
    });
    return result;
}

var xVals = stringToVals(xVals);
var freqs = stringToVals(freqs);