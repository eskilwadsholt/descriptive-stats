function drawHistogram(stats) {
    var divElement = document.getElementById("histogram");
    divElement.innerHTML = "";
    var margin = 40;
    var width = divElement.clientWidth;
    var height = divElement.clientHeight;

    var svg = d3.select(divElement)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    var xScale = d3.scaleLinear().domain([stats.xMin, stats.xMax]).range([margin, width - margin]);
    var yScale = d3.scaleLinear().domain([0, stats.hMax + 10 / stats.minWidth]).range([height - margin, margin]);

    var freqDiv = d3.select(divElement)
        .append("div")
        .attr("class", "freq-text");

    var intervalDiv = d3.select(divElement)
        .append("div")
        .attr("class", "interval-text");

    svg
        .selectAll("histogram")
        .data(stats.rows)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.x1))
        .attr("width", d => (xScale(d.x2) - xScale(d.x1)))
        .attr("y", d => height - margin - (yScale(0) - yScale(d.h)))
        .attr("height", d => yScale(0) - yScale(d.h))
        .on("mouseover", function(d) {
            freqDiv
                .style("visibility", "visible")
                .style("left", xScale(d.xmid) + "px")
                .style("bottom", yScale(0) - yScale(d.h) + margin + "px")
                .style("transform", "translate(-50%)")
                .html(d.f.toFixed(1) + "%");
            intervalDiv
                .style("visibility", "visible")
                .style("left", xScale((d.x1 + d.x2) / 2) + "px")
                .style("bottom", "0px")
                .style("transform", "translate(-50%)")
                .html(`]${d.x1};${d.x2}]`);
            
        })
        .on("mouseout", d => {
            freqDiv.style("visibility", "hidden");
            intervalDiv.style("visibility", "hidden");
        });

    svg.append("rect")
        .attr("class", "bar-reference")
        .attr("x", xScale(stats.xMax - stats.minWidth))
        .attr("width", xScale(stats.xMax) - xScale(stats.xMax - stats.minWidth))
        .attr("y", height - margin - (yScale(0) - yScale(stats.hMax + 10 / stats.minWidth)))
        .attr("height", yScale(0) - yScale(5 / stats.minWidth));

    // Add x-axis
    var xAxis = d3.axisBottom(xScale)
        .ticks(stats.bins);

    svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height - margin})`)
        .call(xAxis);
}

