class Unit {
	constructor(name, fraction, side) { // name, fraction of base unit, boolean for right/left side of the conversion
		this.name = name;
		this.fraction = fraction;
		this.side = side;
	}
	to(unit) { // gives the factor when converting this unit to the given unit
		return this.fraction / unit.fraction;
	}
}

const units = {
	'Length': {
		// metric
		meter: new Unit('meters', 1, false),
		centimeter: new Unit('centimeters', 0.01, false),
		millimeter: new Unit('millimeters', 0.001, false),
		kilometer: new Unit('kilometers', 1000, false),
		// imperial
		inch: new Unit('inches', 0.0254, false),
		foot: new Unit('feet', 0.3048, false),
		yard: new Unit('yards', 0.9144, false),
		mile: new Unit('miles', 1609.344, false),
		// freedom
		m16: new Unit('M16s', 0.98, true),
		f150: new Unit('F-150s', 5.9, true),
		liberty: new Unit('Statues of Liberty', 46, true),
		milliLiberty: new Unit('MilliLiberties', 0.046, true)
	},
	'Area': {
		// metric
		squareMeter: new Unit('square meters', 1, false),
		squareCentimeter: new Unit('square centimeters', 0.0001, false),
		squareMillimeter: new Unit('square millimeters', 0.000001, false),
		// imperial
		squareInch: new Unit('square inches', 0.00064516, false),
		squareFoot: new Unit('square feet', 0.092903, false),
		// freedom
		nanoNYC: new Unit('nano-New York Cities', 0.784, true),
		milliNYC: new Unit('milli-New York Cities', 784, true)
	},
	'Volume': {
		// metric
		cubicMeter: new Unit('cubic meters', 1, false),
		cubicCentimeter: new Unit('cubic centimeters', 0.000001, false),
		cubicMillimeter: new Unit('cubic millimeters', 0.000000001, false),
		// imperial
		fluidOunce: new Unit('fluid ounces', 0.0295735, false),
		pint: new Unit('pints', 0.473176, false),
		quart: new Unit('quarts', 1.13652, false),
		gallon: new Unit('gallons', 4.54609, false),
		// freedom
		beer: new Unit('beers', 0.000354882, true),
		megaBeer: new Unit('mega-beers', 354.882, true)
	},
	'Mass': {
		// metric
		kilogram: new Unit('kilograms', 1, false),
		gram: new Unit('grams', 0.001, false),
		milligram: new Unit('milligrams', 0.000001, false),
		// imperial
		ounce: new Unit('ounces', 0.0283495, false),
		pound: new Unit('pounds', 0.453592, false),
		// freedom
		bigMac: new Unit('Big Macs', 0.25, true),
		microTrump: new Unit('micro-Trumps', 0.000097, true),
		trump: new Unit('Trumps', 97, true),
		f35: new Unit('F-35s', 27216, true)
	},
	'Time': {
		// normal
		second: new Unit('seconds', 1, false),
		minute: new Unit('minutes', 60, false),
		hour: new Unit('hours', 3600, false),
		day: new Unit('days', 86400, false),
		week: new Unit('weeks', 604800, false),
		millisecond: new Unit('milliseconds', 0.001, false),
		// freedom
		cubanMissileCrisis: new Unit('Cuban Missile Crises', 1123200, true),
		microCubanMissileCrisis: new Unit('micro-Cuban Missile Crises', 1.1232, true),
		gas: new Unit('Gas', 1200, true),
		elonTweet: new Unit('Elon tweets', 2880, true)
	},
	'Money': {
		// normal
		usd: new Unit('USD', 1, false),
		// freedom
		militaryBudgetYear: new Unit('military budget * years', 2130000000000, true),
		picoMilitaryBudgetYear: new Unit('pico-military budget * years', 2.13, true)
	},
	'Radiation': {
		// normal
		sievert: new Unit('sieverts', 1, false),
		millisievert: new Unit('millisieverts', 0.001, false),
		rad: new Unit('rads', 0.01, false),
		// freedom
		hiroshima: new Unit('Hiroshima', 100, true)
	}
}

for(let type of Object.keys(units)) { // type dropdown
	let option = document.createElement('option');
	option.value = type;
	option.innerHTML = type;
	document.getElementById('type').appendChild(option);
}

var conversion;

function updateUnits() { // update units when type changes
	document.getElementById('right-unit').innerHTML = '';
	document.getElementById('left-unit').innerHTML = '';

	for(let [id, unit] of Object.entries(units[document.getElementById('type').value])) { // unit dropdown
		let option = document.createElement('option');
		option.value = id;
		option.innerHTML = unit.name;
		document.getElementById((unit.side ? 'right' : 'left') + '-unit').appendChild(option);
	}

	document.getElementById('left-input').value = '1'; // default
	updateValues(false);
}

const ROUNDING = 5; // number of decimal places to round to;
function updateValues(side) { // side that was changed, boolean for false = left, true = right
	let inputtedValue = parseFloat(document.getElementById((side ? 'right' : 'left') + '-input').value);
	let output = document.getElementById((!side ? 'right' : 'left') + '-input');

	const type = units[document.getElementById('type').value];
	const inputUnit = type[document.getElementById((side ? 'right' : 'left') + '-unit').value];
	const outputUnit = type[document.getElementById((!side ? 'right' : 'left') + '-unit').value];

	output.value = Math.round(inputtedValue * inputUnit.to(outputUnit) * (10 ** ROUNDING)) / (10 ** ROUNDING);
}

// initial updates
updateUnits();
updateValues();