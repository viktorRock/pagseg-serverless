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
	// var response = iuguCheckout(req, res);
	res.send(iuguCheckout(req, res));
	// res.status(response.status).send(JSON.stringify(response.body));
	// res.status(403).send('Forbidden!');
};

function iuguCheckout(req, res){
	var options = { 
		method: 'POST',
		headers: { 'Authorization' : auth },
		url: chargeEndpoint,
		form: req.body
	}
	var ret = {};

	if(oneClickPayValidation(req.body)){
		// return JSON.stringify(makeRequest(options, res));
		return makeRequest(options, res);
	}else{
		res.status(400);
		res.body = {
			'message': 'Its required a payment method id, a description, a price, a quantity and an email in the request body'
		}
		// return JSON.stringify(res.body);
		return res;
	}

}

function oneClickPayValidation(body){
  // checking and preparing Iugu API parameters
  if (isNull(body.customer_payment_method_id) || isNull(body.email) || !validateItems(body.items)) {
  	console.log(body);
  	console.log("error on oneClickPayValidation");
  	return false;
  }
  return true;
}

function isNull(variable) {
	return variable == null;
}

function validateItems(items){
	if(!items){
		console.log("No items found");
		return false;
	}
	else if (isNull(items.description) || isNull(items.price_cents) || isNull(items.quantity)) {
		console.log("items elements error");
		return false;
	}
	return true;
}

function makeRequest(options, res){
	var result = {};
	console.log('makeRequest options: ' + options)
	request(options, function (error, response, body) {
		console.log('makeRequest body: ' + body)

		if (error) console.log("Error ! = error");

		let bodyParams = JSON.parse(body);
		if(!bodyParams) {
			console.log("#### NOT A JSON ");
			result.status = 500
			result.body = {
				message: 'Received response in a incorrect format, expected JSON',
				iuguresponse: body,
			}
			return result;
		}
		var csuccess = bodyParams.success;

		if (csuccess != true) {
			console.log("not sucess !!! ");
			result.status = 500
			result.body = {
				message: 'Iugu response received, but contains errors',
				iuguresponse: body,
			}

			return result;  // res.status(500).send(JSON.stringify(res.body));

		} else {
			console.log("#### Sucess !!! ");
			result.status = 200
			result.body = {
				message: 'Iugu response received',
				iuguresponse: body,
			}
			return result;
		}

	})
}