function drawCumCurve(stats) {
    var divElement = document.getElementById("cum-curve");
    divElement.innerHTML = "";
    var margin = 40;
    var width = divElement.clientWidth;
    var height = divElement.clientHeight;

    var svg = d3.select(divElement)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    var xScale = d3.scaleLinear().domain([stats.xMin, stats.xMax]).range([margin, width - margin]);
    var yScale = d3.scaleLinear().domain([0, 100]).range([height - margin, margin]);

    var line = d3.line()
        .x(function(d) { return xScale(d.x); })
        .y(function(d) { return yScale(d.cum); })
        .curve(d3.curveLinear);

    var cumcurveData = [{
        x: stats.xMin,
        cum: 0
    }];

    stats.rows.forEach(row => {
        cumcurveData.push({
            x: row.x2,
            cum: row.cum
        });
    });

    svg
        .append("path")
        .datum(cumcurveData)
        .attr("class", "cumcurve-line")
        .attr("d", line);
}