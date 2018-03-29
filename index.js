'use strict';

const Buffer = require('safe-buffer').Buffer;
var request = require('request');
// Preparing auth header
const API_TOKEN = "d8b71b55b1aa3acf2e07bc17d1a3759a"
const auth = "Basic " + new Buffer(API_TOKEN + ":").toString("base64")
const chargeEndpoint = 'https://api.iugu.com/v1/charge'

// [START functions_helloworld_debug]
require('@google-cloud/debug-agent').start();
// [END functions_helloworld_debug]

/*
* Cloud Function.
*
* @param {object} event The Cloud Functions event.
* @param {function} callback The callback function.
*/
exports.helloWorld = function helloWorld (event, callback) {
	console.log(`My Cloud Function: ${event.data.message}`);
	callback();
};


/*
* HTTP Cloud Function.
*
* @param {Object} req Cloud Function request context.
* @param {Object} res Cloud Function response context.
*/
exports.getPagSeg = function getPagSeg (req, res) {
	res.send(`Ola ${req.body.name ||  'World'}!`);
};

/*
* HTTP Cloud Function.
*
* @param {Object} req Cloud Function request context.
* @param {Object} res Cloud Function response context.
*/
exports.iuguCheckoutGET = function iuguCheckoutGET (req, res) {
	console.log('gcloud functions  iuguCheckoutGET');
	console.log(req.body);
	var options = { 
		method: 'POST',
		headers: { 'Authorization' : auth },
		url: chargeEndpoint,
		form: formdata
	}

	if(oneClickPayValidation(req)){
		res.send('Good work pal ! :) ');
	}else{
		res.status = 400
		res.body = {
			'message': 'Please pass a payment method id, a description, a price, a quantity and an email in the request body'
		}
		res.send(JSON.stringify(res.body));
	}
};



function oneClickPayValidation(req){
  // checking and preparing Iugu API parameters
  if (isNull(req.body.payment_method_id) || isNull(req.body.description) || isNull(req.body.price) || isNull(req.body.quantity) || isNull(req.body.email)) {
  	return false;
  }
  return true;
}

function isNull(variable) {
	return variable == null
}