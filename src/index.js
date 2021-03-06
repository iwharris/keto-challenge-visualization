import * as d3 from 'd3';
import _ from 'lodash';
import parseRow from './helpers/data';

const csvPath = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTr8ODuAPw9TbuRntPn7cJSYnDMXitcwX-34guxTHdDj7xJuoSGmWxSgec4K0G9NulIFmiMMbOsSgpV/pub?gid=1355356545&single=true&output=csv';

function renderChart(data) {
  return d3.select('.chart')
    .selectAll('div')
    .data(data)
    .enter()
    .append('div')
    // .each(d => console.log(d))
    .text(d => `${d.username} - ${d.gender} - ${d.height}`);
}

function fetchCsv() {
  return d3.csv(csvPath, parseRow)
    .then((data) => {
      const groups = _.groupBy(data, r => r.latestCheckin);
      console.log('groups', groups);
      return data;
    })
    .then(renderChart);
}

fetchCsv();
