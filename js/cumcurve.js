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

    svg.append("rect")
        .attr("class", "cumcurve-background")
        .attr("x", margin)
        .attr("y", margin)
        .attr("width", width - 2 * margin)
        .attr("height", height - 2 * margin);

    var quartile = (height - 2 * margin) / 4

    svg.append("rect")
        .attr("class", "cumcurve-quartile")
        .attr("x", margin)
        .attr("y", margin + quartile)
        .attr("width", width - 2 * margin)
        .attr("height", quartile);

    svg.append("rect")
        .attr("class", "cumcurve-quartile")
        .attr("x", margin)
        .attr("y", margin + 3 * quartile)
        .attr("width", width - 2 * margin)
        .attr("height", quartile);

    // Add x-axis
    var xAxis = d3.axisBottom(xScale)
        .ticks(stats.bins);

    svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height - margin})`)
        .call(xAxis);

        // Add x-axis
        var yAxis = d3.axisLeft(yScale)
            .ticks(4)
            .tickFormat(d => d + "%");

    svg
        .append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin}, 0)`)
        .call(yAxis);

    // Path goes last to be on top
    svg
        .append("path")
        .datum(cumcurveData)
        .attr("class", "cumcurve-line")
        .attr("d", line);
}