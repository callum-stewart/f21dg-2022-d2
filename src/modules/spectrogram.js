// adapted from https://replit.com/@vicgonzalez25/d3-spectrogram#spectrogram.js
function Waterfall(id, width, height) {
    // Assume a 50px margin around the waterfall display
    this.margin = 50;

    this.width = width == null ? 400 : width;
    this.height = height == null ? 400 : height;
    this.elementWidth = null;
    this.elementHeight = null;

    this.data = null;

    this.x = null;
    this.y = null;
    this.z = d3.scaleSequential(d3.interpolateViridis);


    this.div = d3.select(id);

    this.canvas = this.div.append("canvas");

    this.svg = this.div.append("svg");
    this.svgGroup = this.svg.append("g");
    this.rectangle = this.svgGroup.append("rect");
    this.xAxis = null;
    this.yAxis = null;
    this.xAxisGroup = this.svgGroup.append("g");
    this.yAxisGroup = this.svgGroup.append("g");
    this.yAxisLabel = this.svgGroup.append("text");
    this.xAxisLabel = this.svgGroup.append("text");
    this.tooltipGroup = this.svgGroup.append("g");
}

async function getJson(jsonFile) {
    const response = await fetch(jsonFile);
    return await response.text();

}

// cb = callback
function drawSpectrogram(w, data) {
    w.data = data
    initDisplay(w, data);
}

function formatFrequency(n) {
    return d3.format(".3s")(n) + "Hz";
}

function initDisplay(w, data) {

    let width = w.width - 5,
        height = w.height - 15,
        elementWidth = width - 2 * w.margin,
        elementHeight = height - 2 * w.margin;

    w.elementWidth = elementWidth;
    w.elementHeight = elementHeight;

    w.svg.attr("width", width)
        .attr("height", height)
        .style("position", "absolute");
    w.svgGroup.attr("transform", "translate(" + w.margin + "," + w.margin + ")");

    w.x = d3.scaleLinear().range([0, elementWidth]).interpolate(d3.interpolateRound);
    w.y = d3.scaleLinear().range([elementHeight, 0]).interpolate(d3.interpolateRound);

    w.pixelHeight = d3.scaleLinear().range([0, 100]).interpolate(d3.interpolateRound);
    w.pixelHeight.domain(w.data.freqRange);

    w.y.domain(w.data.freqRange);
    w.x.domain(w.data.timeRange);
    w.z.domain(w.data.zRange);

    w.canvas.attr("width", elementWidth)
        .attr("height", elementHeight)
        .style("padding", w.margin + "px")
        .style("position", "absolute");
    w.rectangle.attr("width", elementWidth)
        .attr("height", elementHeight)
        .style("fill", "#fff")
        .style("opacity", 0);

    w.xAxis = d3.axisBottom(w.x)//.ticks(16).tickFormat(formatFrequency);
    w.xAxisGroup.attr("class", "axis x-axis")
        .call(w.xAxis).attr("transform", "translate(0, "+w.elementHeight+")");
    w.yAxis = d3.axisLeft(w.y).ticks(16).tickFormat(formatFrequency);
    w.yAxisGroup.attr("class", "axis y-axis")
        .call(w.yAxis);

    w.yAxisLabel.attr("class", "axis y-axis")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(2,-10)")
        .text("Frequency");
    w.xAxisLabel.attr("class", "axis x-axis")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + elementWidth / 2 + "," + (elementHeight+w.margin)+ ")")
        .text("Time");

    // Draw the waterfall
    renderDisplay(w);
}

function renderDisplay(w) {
    var context = w.canvas.node().getContext("2d");

    for (let i = 0; i < w.data.values.length; i++) {
        for (let j = 0; j < w.data.values[i].values.length; j++) {
            context.setTransform(1, 0, 0, -1, 0, w.elementHeight);
            context.fillStyle = w.z(w.data.values[i].values[j].z);
            context.fillRect(w.x(w.data.values[i].time),
                w.elementHeight-w.y(w.data.values[i].values[j].freq),
                w.x(w.data.timeStep),
		w.y(w.data.values[i].values[j].freq + w.data.freqStep) - w.y(w.data.values[i].values[j].freq));
        }
    }
}


export {drawSpectrogram, Waterfall };
