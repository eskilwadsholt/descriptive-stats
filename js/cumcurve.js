function drawCumCurve(stats) {
    var divElement = document.getElementById("cum-curve");
    divElement.innerHTML = "";
    var margin = {
        top: 20,
        right: 20,
        bottom: 40,
        left: 50
    };
    var width = divElement.clientWidth;
    var height = divElement.clientHeight;

    var svg = d3.select(divElement)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    var xScale = d3.scaleLinear().domain([stats.xMin, stats.xMax]).range([margin.left, width - margin.right]);
    var yScale = d3.scaleLinear().domain([0, 100]).range([height - margin.bottom, margin.top]);

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
        .attr("x", margin.left)
        .attr("y", margin.top)
        .attr("width", width - margin.left - margin.right)
        .attr("height", height - margin.top - margin.bottom);

    var quartile = (height - margin.top - margin.bottom) / 4

    svg.append("rect")
        .attr("class", "cumcurve-quartile")
        .attr("x", margin.left)
        .attr("y", margin.top + quartile)
        .attr("width", width - margin.left - margin.right)
        .attr("height", quartile);

    svg.append("rect")
        .attr("class", "cumcurve-quartile")
        .attr("x", margin.left)
        .attr("y", margin.top + 3 * quartile)
        .attr("width", width - margin.left - margin.right)
        .attr("height", quartile);

    // Add x-axis
    var xAxis = d3.axisBottom(xScale)
        .ticks(stats.bins);

    svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(xAxis);

        // Add x-axis
        var yAxis = d3.axisLeft(yScale)
            .ticks(4)
            .tickFormat(d => d + "%");

    svg
        .append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxis);

    // Path goes last to be on top
    svg
        .append("path")
        .datum(cumcurveData)
        .attr("class", "cumcurve-line")
        .attr("d", line);
}