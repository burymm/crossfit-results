const consts = require('./consts');

function getAverage(array) {
  let sum = 0;
  let count = 0;
  
  array.forEach((item) => {
    if (item.cardNumber !== consts.AVERAGE_CARD_NUMBER) {
      sum += parseInt(item.workoutResult);
      count += 1;
    }
  });
  
  return Math.round(sum / count * 10) / 10;
}

module.exports = {
  getAverage,
};
