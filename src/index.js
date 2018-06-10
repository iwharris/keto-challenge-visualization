import * as d3 from 'd3';

const csvPath = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTr8ODuAPw9TbuRntPn7cJSYnDMXitcwX-34guxTHdDj7xJuoSGmWxSgec4K0G9NulIFmiMMbOsSgpV/pub?gid=1355356545&single=true&output=csv';

// d3.select('.chart')
//   .selectAll('div')
//   .data(data)
//   .enter()
//   .append('div')
//   .style('width', d => `${d}px`)
//   .text(d => d);


// const sheetUrl = 'https://docs.google.com/spreadsheets/d/1qmL49UX6v1CvPnnx_Zt5niKZ9uilVvwh-apsmD8F3QI/edit?usp=sharing';

// function draw({ data, tabletop }) {
//   console.log(data, tabletop);
// }

function renderChart(data) {
  console.log('rendering with data', data);
  d3.select('.chart')
    .selectAll('div')
    .data(data)
    .enter()
    .append('div')
    .text(d => d.username);
}

function fetchCsv() {
  return d3.csv(csvPath)
    // .then(data => console.log('data', data));
    .then(renderChart);
}

console.log('loading...');
fetchCsv()
  .then(a => console.log('done'));
