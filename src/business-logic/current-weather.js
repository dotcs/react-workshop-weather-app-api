const { delayPromise } = require('../util');


const config = {
  randomnessRange: 3    // degrees Celsius
};

const weatherStates = [ 'rainy', 'cloudy', 'sunny' ];

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

  return mockBaseData.map(x => {
    const state = randomizeStatus();
    const ret = {
      locationId: x.locationId,
      locationName: x.locationName,
      temperature: Math.floor(randomizeTemperature(x.temperature)),
      minTemperature: Math.floor(x.temperature + randomizeNumber(-8, 4)),
      maxTemperature: Math.ceil(x.temperature + randomizeNumber(3, 4)),
    };
    if (!state) { return ret; }
    return Object.assign({}, ret, { state });
  });
}


function randomizeNumber(number, range) {
  return number + Math.random() * range - (range / 2);
}

function randomizeStatus() {
  const index = Math.floor(randomizeNumber(0, 4) + 4/2);
  return weatherStates[index];
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
  const weatherData = generateMockData().filter(x => x.locationId === locationId)[0];

  const promise = weatherData
    ? Promise.resolve(weatherData)
    : Promise.reject(new Error(`Invalid \`locationId\`: ${locationId}`));

  return delayPromise(promise, 60);
};
