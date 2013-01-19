/**
 * BarChart Class
 * A basic bar chart
 */
function BarChart (id, width, height) {
    this.width  = width;
    this.height = height;
    this.margin = {top: 20, right: 20, bottom: 30, left: 40};

    // Make SVG Chart
    this.svg = d3.select(id).append("svg")
      .attr("class", "chart")
      .attr("width", this.width)
      .attr("height", this.height)
        .append("g")
          .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    // Update with data
    this.update = function (d, opts) {
        // figure chart area width and height
        var width  = this.width - this.margin.left - this.margin.right;
        var height = this.height - this.margin.top - this.margin.bottom;

        // Scalers
        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .05);
        var y = d3.scale.linear()
            .range([height, 0]);

        // X scale
        x.domain(d3.range(d.length));

        // Y scale with optional preset size
        if (opts["domain"])
            y.domain(opts["domain"]);
        else
            y.domain([d3.min(d), d3.max(d)]);

        // Set up axis's
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        // Get bars (if they exist)
        var bars = this.svg.selectAll(".bar").data(d);

        // Update existing bars
        bars.transition().duration(200)
          .attr("x", function(d, i) { return x(i); })
          .attr("width", x.rangeBand())
          .attr("y", function (d) { return y(d); })
          .attr("height", function(d) {return height - y(d); });

        // Append new data
        bars.enter().append("rect")
          .attr("class", "bar")
          .attr("width", x.rangeBand())
          .attr("y", function (d) { return y(d); })
          .attr("height", function(d) {return height - y(d); })
          .attr("x", this.width)
            .transition().duration(500)
              .attr("x", function(d, i) { return x(i); });

        // Remove extra elements
        bars.exit().remove();

        // Axes:
        this.svg.selectAll(".axis").remove();

        // X Axis
        this.svg.append("g")
            .attr("class", "axis x")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Y Axis
        this.svg.append("g")
          .attr("class", "axis y")
          .call(yAxis)

    };
}
