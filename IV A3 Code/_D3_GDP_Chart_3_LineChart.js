// chart-script.js

// set the dimensions and margins of the graph
var margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%Y");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.Data_Series); })
    .y(function(d) { return y(d.Per_Capita_GDP_In_Chained_2015_Dollars_Dollar); });

// select the div and append the svg object to it
var svg = d3.select("#gdp-chart-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("gdpper.csv", function(error, data) {
    if (error) throw error;

    // format the data
    data.forEach(function(d) {
        d.Data_Series = parseTime(d.Data_Series);
        d.Per_Capita_GDP_In_Chained_2015_Dollars_Dollar = +d.Per_Capita_GDP_In_Chained_2015_Dollars_Dollar;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.Data_Series; }));
    y.domain([0, d3.max(data, function(d) { return d.Per_Capita_GDP_In_Chained_2015_Dollars_Dollar; })]);

    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

});
