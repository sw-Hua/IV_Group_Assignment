var stackedareachart = {};

stackedareachart.init = function () { 
function get_colors (n) {
    var colors = [
        "#a6cee3", "#1f78b4", "#b2df8a", "#33a02c",
        "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00",
        "#cab2d6", "#6a3d9a", "#ffff99", "#b15928",
        "#f6c4e1", "#aaa662", "#8dd3c7", "#fb8072",
        "#80b1d3", "#bebada", "#fdb462", "#b3de69"
    ];
    
     return colors[ n % colors.length];}
      
    var margin = {top: 61, right: 180, bottom: 101, left: 70},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    var times = ["2000","2001", "2002", "2003", "2004", "2005", "2006",
               "2007", "2008", "2009", "2010", "2011", "2012", "2013",
               "2014", "2015", "2016", "2017", "2018", "2019", "2020",
               "2021"];
    
    var x = d3.scale.linear()
        .range([0, width]);
    
    var y = d3.scale.linear()
        .range([height, 0]);
    
    var color = d3.scale.category10();
    
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(10)
        .tickFormat(d3.format(""));
    
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5, "s");
    
    var area = d3.svg.area()
        .x(function(d) { return x(d.Data_Series); })
        .y0(function(d) { return y(d.y0); })
        .y1(function(d) { return y(d.y0 + d.y); }); 
      
    var stack = d3.layout.stack()
        .values(function(d) { return d.values; });
      
    var svg = d3.select("#stack-area-container-propotion").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
      svg.append("text")
        .attr("x", 0)
        .attr("y", -40)
        .attr("dy", "0.71em")
        .attr("fill", "#000")
        .text("Imports of Services By Continents From 2000 to 2021")
        .style("font", "23px avenir")
        .style("fill", "#000000");
      
         svg.append("text")
        .attr("x", 0)
        .attr("y", 402)
        .attr("dy", "0em")
        .style("font", "12px avenir")
        .style("fill", "#000000")
        .text("context xxx xx x szfsafsafsafasfasfsga fsaijgiosajogjsaiojgoij iosjfoajsofjoajsfoasjfoasj foisjofijasojfoisajfs safojsao ");
      
        svg.append("text")
        .attr("x", 0)
        .attr("y", 402)
        .attr("dy", "1em")
        .style("font", "12px avenir")
        .style("fill", "#000000")
        .text("categories follow a similar structure: the occurences dip in the early morning and peak during the lunch and early evening hours.");
      
    
        d3.csv("Proportion_Imports _Of_Services_By_ Major_Trading_ Partner2000_2021_Percentage.csv", function(error, data) {
       
        //Assign crime categories to color domain
            color.domain(d3.keys(data[0]).filter(function (key) {
                return key !== "Data_Series";
            }));
     
    
            data.forEach(function(d) {  
                d.Hong_Kong_SARs = +d.Hong_Kong_SARs;
                d.India = +d.India;
                d.Japan = +d.Japan;
                d.Mainland_China = +d.Mainland_China;
                d.Korea = +d.Korea;
                d.Saudi_Arabia = +d.Saudi_Arabia;
                d.Taiwan_China = +d.Taiwan_China;
                d.Arab_Emirates = +d.Arab_Emirates;
                d.ASEAN = +d.ASEAN;
                d.European_Union = +d.European_Union;
                d.UK = +d.UK;
                d.France = +d.France;
                d.Germany = +d.Germany;
                d.Switzerland = +d.Switzerland;
                d.US = +d.US;
                d.Canada = +d.Canada;
                d.Australia = +d.Australia;
                d.New_Zealand = +d.New_Zealand;
                d.Latin_America = +d.Latin_America;
                d.Africa = +d.Africa;
            });
            

            
      // Set domains for axes
            x.domain(d3.extent(data, function (d) {
                return d.Data_Series;
            }));
      y.domain([0, 1])
    
      var browsers = stack(color.domain().map(function(name) {
        return {
          name: name,
          values: data.map(function(d) {
            return {Data_Series: d.Data_Series, y: d[name] * 1};
          })
        };
      }));
    
      var browser = svg.selectAll(".browser")
          .data(browsers)
            .enter().append("g")
          .attr("class", "browser");
    
      browser.append("path")
          .attr("class", "area")
          .attr("d", function(d) { return area(d.values); })
          .style("fill", function(d,i) { 
                return get_colors(i); });
    
       svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis).append("text")
               .attr("x", 350)
          .attr("y", 36)
          .attr("fill", "#000")
          .text("Year")
            .style("font-weight", "bold");
    
      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
              .attr("x", -250)
          .attr("y", -55)
          .attr("dy", "0.3408em")
          .attr("fill", "#000")
          .text("Trade Volume")
               .style("font-weight", "bold");
          
       var legend = svg.selectAll(".legend")
             .data(color.domain()).enter()
               .append("g")
            .attr("class","legend")
         .attr("transform", "translate(" + (width +20) + "," + 0+ ")");
    
       legend.append("rect")
         .attr("x", 0) 
         .attr("y", function(d, i) { return 20 * i; })
         .attr("width", 10)
         .attr("height", 10)
         .style("fill", function(d, i) {
             return get_colors(i);}); 
       
        legend.append("text")
         .attr("x", 20) 
         .attr("dy", "0.75em")
         .attr("y", function(d, i) { return 20 * i; })
         .text(function(d) {return d});
          
        legend.append("text")
         .attr("x",0) 
          .attr("dy", "0.75em")
         .attr("y",-20)
         .text("Categories");
    
    
        });
};
stackedareachart.init();