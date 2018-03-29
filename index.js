'use strict';

const Buffer = require('safe-buffer').Buffer;
var request = require('request');

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

	if(oneClickPayValidation(req)){
		res.send('Good work pal ! :) ');
	}else{
		res.status = 400
		res.body = {
			'message': 'Please pass a payment method id, a description, a price, a quantity and an email in the request body'
		}
		res.send(res);
	}
};



function oneClickPayValidation(req){
  // checking and preparing Iugu API parameters
  if (isNull(req.cpayment_method_id) || isNull(req.cdescription) || isNull(req.cprice) || isNull(req.cquantity) || isNull(req.email)) {
  	return false;
  }
  return true;
}

function isNull(variable) {
	return variable == null
}