const request= require('request-promise');
const jxon = require('jxon');
const pagSeguroCheckout = process.env.PAGSEG_URL;
const token = process.env.PAGSEG_CLIENT_TOKEN;
const email = process.env.PAGSEG_CLIENT_EMAIL;

function getPagSeg(requestBody){ 
  console.log('URL = ' + process.env.PAGSEG_URL);
  console.log('Path = ' + process.execPath);
  let req =  jxon.jsToString(requestBody);
  return makeRequest('POST', pagSeguroCheckout, req).then((output)=>{
    
    return output;
  });
}

function makeRequest(method, url, body) {
  return new Promise(function(resolve, reject) {
    var output;

    var headers = {'Content-Type': 'application/xml; charset=UTF-8'};
    var options = {
      url: pagSeguroCheckout,
      method: method,
      headers: headers,
      qs: {'email': email, 'token': token},
      body : body
    };
    request(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       output =  jxon.stringToJs(body);
       console.log("REQUEST END ########");
       resolve(output);
     }
     else{
       showError(error, body);
       reject(Error("makeRequest ERROR url = " + url + ' | output = ' + body));
     }
   });
  });
}


function showError(error) {
  console.log("Request Error Start: ");
  console.log(error);
  // console.log(msg);
  console.log("Request Error End: ");
}

module.exports = {
  getPagSeg : getPagSeg
};