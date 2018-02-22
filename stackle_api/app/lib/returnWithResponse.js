'use strict';

/**
 * Pass the response object and data you want to throw.
 * For an example 
 * {
 *  status: 200 - required
 *  result: any - required
 * }
 * @param { Object } data status
 * @param { Object } response response
 */
function configureReturnData(data, response) {
  if (!!!~Object.keys(data).indexOf('status')) {
    throw new Error('Attribute status is missing');
  }
  
  if (!!!~Object.keys(data).indexOf('result')) {
    throw new Error('Attribute result is missing');
  }

  response.header("Access-Control-Allow-Origin", "*");
  // response.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.status(data.status);
  response.send({
    status: data.status,
    result: data.result,
  });
}

module.exports.configureReturnData = configureReturnData;