/**
 * ClockChart Class
 * Makes a time series histogram for times of day with
 * a clock in the center
 */
function ClockChart (cssClass, width) {
    this.cssClass   = cssClass;
    this.width      = width;
    this.height     = width; //square

    this.set_data = function (d) {
        this.data = d;
    };

    this.show = function (id) {

        // Make SVG Chart
        this.chart = d3.select(id).append("svg:svg")
            .attr("class",  this.cssClass)
            .attr("width",  this.width)
            .attr("height", this.height)
                .append("g")
                    .attr("transform", "translate(" + this.width/2.0 + "," + this.height/2.0 + ")");

        var r_scaler = d3.scale.linear()
            .domain([d3.min(this.data), d3.max(this.data)])
            .range([this.width/4.0, this.width/2.0 - 2]);

        var bar_width = 2 * Math.PI / this.data.length;

        // Draw bars
        this.chart.selectAll("g")
            .data(this.data).enter().append("path")
                .attr("d", d3.svg.arc()
                    .startAngle(function (d, i) {return i*bar_width;})
                    .endAngle(function (d, i) {return (i+1)*bar_width;})
                    .innerRadius(this.width/4.0)
                    .outerRadius(function (d) {return r_scaler(d)}));


        // Draw Circle
        this.chart.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r",  this.width/4.0);
        // Nighttime
        this.chart.append("path")
            .attr("class", "clocknight")
            .attr("transform", "rotate(180)")
            .attr("d", d3.svg.arc()
                .startAngle(Math.PI/2.0)
                .endAngle(1.5*Math.PI)
                .innerRadius(0)
                .outerRadius(this.width/4.0));


        for (var h=0;h<24;h++) {
            var x = ((this.width/4.0) - 12) * Math.sin(h*0.26179938779);
            var y = ((this.width/4.0) - 12) * -Math.cos(h*0.26179938779);
            if (h === 0)
                h = "00";
            this.chart.append("text")
                .attr("x", x - 8)
                .attr("y", y + 5)
                .attr("class", "clockface")
                .text(h);
        }
    };
}
