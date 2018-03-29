'use strict';

const Buffer = require('safe-buffer').Buffer;
var request = require('request');

// [START functions_helloworld_debug]
require('@google-cloud/debug-agent').start();
// [END functions_helloworld_debug]

/**
 * Cloud Function.
 *
 * @param {object} event The Cloud Functions event.
 * @param {function} callback The callback function.
 */
exports.helloWorld = function helloWorld (event, callback) {
  console.log(`My Cloud Function: ${event.data.message}`);
  callback();
};


/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.getPagSeg = function getPagSeg (req, res) {
  res.send(`Ola ${req.body.name ||  'World'}!`);
};

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.iuguCheckoutGET = function iuguCheckoutGET (req, res) {
	console.log('My Cloud Function:  iuguCheckoutGET');
  res.send(`#Congrats ! :) -> ${req.body.name ||  'World'}!`);
};

