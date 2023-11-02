var piechart = {};

piechart.init = function() {
    var div = d3.select("#chart-container");
    var width = +div.style("width").replace("px", "");
    var height = +div.style("height").replace("px", "");
    var radius = Math.min(width, height) / 2;

    var svg = div.append("svg")
        .attr("width", width)
        .attr("height", height);

    var g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

    var pie = d3.pie().value(function(d) { 
        return d.percentage; 
    });

    var path = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(150);

    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    d3.csv("gdpFactor.csv", function(error, data) {
        if (error) {
            throw error;
        }
        var arc = g.selectAll(".edit")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "edit");

        arc.append("path")
            .attr("d", path)
            .attr("fill", function(d) { return color(d.data.factor); })
            .on("mouseover", function(d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html("Factor: " + d.data.factor + "<br/>Percentage: " + d.data.percentage + "%")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    });

    svg.append("g")
        .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
        .append("text")
        .text("Singapore Economy Factor GDP")
        .attr("class", "title")
        .attr("y", 180);
    
};

piechart.init();
