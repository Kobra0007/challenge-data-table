var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var rows = require('./data.json')

var dimensions = [
	{
		title: "Date",
		value: "date"
	},
	{
		title: "Host",
		value: "host"
	}
];

var reduce = function(row, memo) {
  memo.impressions = row.type === 'impression' ? memo.impressions + 1 : memo.impressions || 0;
  memo.loads = row.type === 'load' ? memo.loads + 1 : memo.loads || 0;
  memo.displays = row.type === 'display' ? memo.displays + 1 : memo.displays || 0;
  return memo;
};

var calculations =[
	{
		title: 'Impressions', 
		value: 'impressions',
    template: function(val, row) {
      return row.impression;
    }
	},
	{
    title: 'Loads',
    value: 'loads',
    template: function(val, row) {
      return row.loads;
    }
  },
  {
    title: 'Displays',
    value: 'displays',
    template: function(val, row) {
      return row.displays;
    }
  },
  {
    title: 'Load Rate',
    value: 'loadRate',
    template: function(val, row) {
      return `${(row.loads / row.impressions * 100).toFixed(1)} %`;
    }
  },
  {
    title: 'Display Rate',
    value: 'displayRate',
    template: function(val, row) {
      return `${(row.displays / row.loads * 100).toFixed(1)} %`;
    }
  }
];

module.exports = createReactClass({
	render() {
		return ( 
				<div >
					<ReactPivot 
				  	rows={rows}
						dimensions={dimensions}
						reduce={reduce}
						calculations={calculations} 
						activeDimensions={['Date']} />
				</div>
		)
	}
})
