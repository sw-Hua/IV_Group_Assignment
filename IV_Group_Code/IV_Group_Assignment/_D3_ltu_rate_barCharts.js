var barchart = {};


barchart.init = function () {
    var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin

    svg.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 50)
       .attr("y", 50)
       .attr("font-size", "24px")
       .text("Resident Long Term Unemployment Rate Annual")

    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");

    d3.csv("unemploymentRate.csv", function(data) {
        
        console.log("data: ");
        console.log(data);

        xScale.domain(data.map(function(d) { return d.Year; }));
        yScale.domain([0, d3.max(data, function(d) { return d.ltu_rate; })]);

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale))
         .append("text")
         .attr("y", height - 250)
         .attr("x", width - 100)
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Year");

        g.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             return d + "%";
         })
         .ticks(10))
         .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", "-5.1em")
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Unemployment Rate");

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.Year); })
         .attr("y", function(d) { return yScale(d.ltu_rate); })
         .attr("width", xScale.bandwidth())
         .attr("height", function (d) { return height - yScale(d.ltu_rate)
             ;
         })
         .attr("fill", "#006400"); // 设置颜色为深绿色;
        
    });
};
barchart.init();
