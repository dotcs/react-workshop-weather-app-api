const { delayPromise } = require('../util');


const config = {
  randomnessRange: 3    // degrees Celsius
};

const mockBaseData = [
  // (Will be enhanced programatically)
  {
    'locationId': 'Karlsruhe',
    'locationName': 'Karlsruhe',
    'temperature': 19.1
  },
  {
    'locationId': 'Munich',
    'locationName': 'Munich',
    'temperature': 10.2
  },
  {
    'locationId': 'Cologne',
    'locationName': 'Cologne',
    'temperature': 13.8
  },
  {
    'locationId': 'Hamburg',
    'locationName': 'Hamburg',
    'temperature': 7.9
  },
  {
    'locationId': 'Pforzheim',
    'locationName': 'Pforzheim',
    'temperature': 18
  },
];


function generateMockData() {
  return mockBaseData.map(x => ({
    locationId: x.locationId,
    locationName: x.locationName,
    temperature: randomizeTemperature(x.temperature),
    minTemperature: x.temperature + randomizeNumber(-8, 4),
    maxTemperature: x.temperature + randomizeNumber(3, 4)
  }));
}


function randomizeNumber(number, range) {
  return number + Math.random() * range - (range / 2);
}


/**
 * @param  {number} temperature
 * @return {number}
 */
function randomizeTemperature(temperature) {
  return randomizeNumber(temperature, config.randomnessRange);
}


// ---- Public API ---------------------------------------------------------------------------------

/**
 * @return {Promise}
 */
module.exports.getAll = () => {
  const promise = Promise.resolve(generateMockData());
  return delayPromise(promise, 120);
};


/**
 * @return {Promise}
 */
module.exports.get = ({ locationId }) => {
  const wheatherData = generateMockData().filter(x => x.locationId === locationId)[0];

  const promise = wheatherData
    ? Promise.resolve(wheatherData)
    : Promise.reject(new Error(`Invalid \`locationId\`: ${locationId}`));

  return delayPromise(promise, 60);
};
