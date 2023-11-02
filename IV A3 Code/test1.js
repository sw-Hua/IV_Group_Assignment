    // chart-script.js
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var parseTime = d3.timeParse("%Y");

    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var valueline = d3.line()
        .x(function(d) { return x(d.Data_Series); })
        .y(function(d) { return y(d.Per_Capita_GDP_In_Chained_2015_Dollars_Dollar); });

    var svg = d3.select("#gdp-chart-container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("gdpper.csv", function(error, data) {
        if (error) throw error;

        data.forEach(function(d) {
            d.Data_Series = parseTime(d.Data_Series);
            d.Per_Capita_GDP_In_Chained_2015_Dollars_Dollar = +d.Per_Capita_GDP_In_Chained_2015_Dollars_Dollar;
        });

        x.domain(d3.extent(data, function(d) { return d.Data_Series; }));
        y.domain([0, d3.max(data, function(d) { return d.Per_Capita_GDP_In_Chained_2015_Dollars_Dollar; })]);

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueline);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        svg.append("g")
            .call(d3.axisLeft(y));

        // Add the tooltip div
        var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        // Add the circle on the line
        var focus = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("circle")
            .attr("r", 4.5);

        // Append the tooltip to the circle
        focus.append("text")
            .attr("x", 9)
            .attr("dy", ".35em");

        // Overlay rectangle to capture hover events
        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); tooltip.style("opacity", 0); })
            .on("mousemove", mousemove);

        function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = d3.bisector(function(d) { return d.Data_Series; }).left(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.Data_Series > d1.Data_Series - x0 ? d1 : d0;

            focus.attr("transform", "translate(" + x(d.Data_Series) + "," + y(d.Per_Capita_GDP_In_Chained_2015_Dollars_Dollar) + ")");
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("Year: " + d.Data_Series.getFullYear() + "<br/>GDP: " + d.Per_Capita_GDP_In_Chained_2015_Dollars_Dollar)
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        }
    });