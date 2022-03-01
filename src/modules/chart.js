

// Defining width and height of svg
// const width = 900;
// const height = 700;

const chartHolder = document.querySelector('.main-chart');

const width = 1250;//chartHolder.getAttribute('width');
const height = 800; //chartHolder.getAttribute('height');

// Remove intial text
d3
  .select('.main-chart')
  .text('')

/**
 * Outer svg holder for the graph
 */
// console.log(typeof chartHolder.getAttribute('width'));
// console.log(chartHolder.getAttribute('height'));

const svg = d3
  .select(".main-chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

/**
 * Creates timeseries line graph with points visible as circle svgs
 *
 * @param {Array} data array of objects indicating points to be plotted i.e. (x,y) coordinates
 * @param {string} xAxisLabel Label for the x-axis of the chart
 * @param {string} yAxisLabel Label for the y-axis of the chart
 * @param {string} chartTitle Label for the chart
 * @param {number} pointSize Radius of points
 * @param {string} xValueLabel Field name in object array for x value
 * @param {string} yValueLabel Field name in object array for y value
 *
 * @example createGraph(
 * [
 * {
 *  timestamp: Date Fri Mar 20 2015 21:00:00 GMT+0000 (Greenwich Mean Time),
 *  temperature: 23.951662561576
 * },
 * {
 *  timestamp: Date Fri Mar 20 2015 16:00:00 GMT+0000 (Greenwich Mean Time),
 *  temperature: 40.73827580
 * },
 * {
 *  timestamp: Date Fri Mar 20 2015 12:00:00 GMT+0000 (Greenwich Mean Time),
 *  temperature: 50.7382743580
 * }
 * ], "Time", "Temperature", "San Francisco Weather", 5, "timestamp" , "temperature");
 */
const createGraph = (
  data,
  xAxisLabel,
  yAxisLabel,
  chartTitle,
  pointSize,
  xValueLabel,
  yValueLabel
) => {
  // storing data from function call into variables
  const xLabel = xAxisLabel;
  const yLabel = yAxisLabel;
  const title = chartTitle;
  const rad = pointSize;

  /**
   * Gets x value from data point object
   *
   * @param {number} d data point object from array
   * @returns {number} value stored from field name for x value provided
   */
  const xValue = (d) => d[xValueLabel];
  /**
   * Gets y value from data point object
   *
   * @param {number} d data point object from array
   * @returns {number} value stored from field name for y value provided
   */
  const yValue = (d) => d[yValueLabel];

  // defining margins in one object so can be easily referenced
  const margin = {
    top: 40,
    bottom: 50,
    left: 80,
    right: 50,
  };

  // defining actual chart area dimensions without margins to leave space for labels
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.bottom - margin.top;



  /*
   * Defining scales
   */

  /**
   * Gets function to generate a scale for the x axis of the graph by determining type of scale, domain and range
   * @returns d3 function for x axis scale
   */
  const xScale = d3
    // for timeseries
    .scaleTime()
    // extent returns array of min/max
    .domain(d3.extent(data, xValue))
    .range([0, chartWidth]);

  /**
   * Gets function to generate the x axis of the graph by determining position, grid lines and padding for labels
   * @returns d3 function for x axis
   */
  const xAxis = d3
    .axisBottom(xScale)
    // extending the x-axis data label ticks to make grid lines
    .tickSize(-chartHeight)
    // to leave some space between axis lines and value labels
    .tickPadding(10);

  /**
   * Gets function to generate a scale for the y axis of the graph by determining type of scale, domain and range
   * @returns d3 function for y axis scale
   */
  const yScale = d3
    //for linear graph
    .scaleLinear()
    .domain(d3.extent(data, yValue))
    //data values arranged top to bottom
    .range([chartHeight, 0]);

  /**
   * Gets function to generate the y axis of the graph by determining position, grid lines and padding for labels
   * @returns d3 function for y axis
   */  
  const yAxis = d3
    .axisLeft(yScale)
    // extending the x-axis data label ticks to make grid lines
    .tickSize(-chartWidth)
    // to leave some space between axis lines and value labels
    .tickPadding(10);



  /**
   * Group for chart components so that they can be moved together
   * (added a translate transform so there is room for axes)
   */
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);



  /*
   * Y-AXIS
   */

  /**
   * This call renders the axis, this always returns the selection and not the return value of called function
   */
  const yAxisGroup = g.append("g").call(yAxis);

  // Adding and formatting label for y-axis
  yAxisGroup
    .append("text")
    // have to add this to make labels appear
    .attr("fill", "black")
    // rotation makes it opposite
    .attr("x", -chartHeight / 2)
    .attr("y", -margin.left / 2)
    // have to apply translate on rotation as it rotates from that point/ goes off screen if you dont do this
    .attr("transform", "rotate(-90)")
    // centers to tick position
    .attr("text-anchor", "middle")
    .text(yLabel)
    // adding consistent formatting to both axis
    .attr("class", "axisLabel");

  /*
   * X-AXIS
   */

  /**
   * This call renders the axis, this always returns the selection and not the return value of called function
   * Transform axis to bottom as it appears at the top of chart
   */
  const xAxisGroup = g
    .append("g")
    .call(xAxis)
    .attr("transform", `translate(0, ${chartHeight})`);

  xAxisGroup.select(".domain").remove();

  // Adding and formatting label for y-axis
  xAxisGroup
    .append("text")
    .attr("x", chartWidth / 2)
    .attr("y", 40)
    .text(xLabel)
    // have to add this to make labels appear
    .attr("fill", "black")
    // adding consistent formatting to both axis
    .attr("class", "axisLabel");



  /*
   * DATA POINTS/ LINE
   */

  /**
   * Gets function to generate line from data points provided
   * @returns d3 function for line
   */  
  const lineGenerator = d3
    .line()
    .x((d) => xScale(xValue(d)))
    .y((d) => yScale(yValue(d)));

  // Add path element (creates actual line element)
  g
   .append("path")
   .attr("class", "line-path")
   .attr("d", lineGenerator(data));

  // Empty set initially
  const circles = g
    .selectAll("circle")
    // data join enables enter/update/exit
    .data(data);

  // Adding static circles (so that the point doesn't disappear with animation)
  circles
    .enter()
    .append("circle")
    .attr("cy", (d) => yScale(yValue(d)))
    .attr("cx", (d) => xScale(xValue(d)))
    .attr("r", rad);

  // Adding circles that will be animated (to give pulsing effect)
  circles
    .enter()
    .append("circle")
    .attr("cy", (d) => yScale(yValue(d)))
    .attr("cx", (d) => xScale(xValue(d)))
    .attr("r", rad)
    .attr("class", "pulse");

  // Centering chart title
  g.append("text")
    .text(title)
    .attr("x", chartWidth / 2 - margin.left - margin.right)
    .attr("y", 0 - margin.top / 2)
    .attr("class", "title");
};

// Importing csv data
d3.csv(
  "https://gist.githubusercontent.com/curran/60b40877ef898f19aeb8/raw/9476be5bd15fb15a6d5c733dd79788fb679c9be9/week_temperature_sf.csv"
).then((data) => {
  data.forEach((d) => {
    //formatting appropriate strings into int based on csv values
    d.temperature = +d.temperature;
    d.timestamp = new Date(d.timestamp);
  });
  //calling function for graph creation
  createGraph(
    data,
    "Time",
    "Temperature",
    "IMF 1",
    5,
    "timestamp",
    "temperature"
  );
});
