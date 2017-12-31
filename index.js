
function getPagSeg(requestBody){ 
  console.log('log 1');
  console.log(requestBody);
  var output = {
    msg : "return"
  }
  return output;
}



module.exports = {
  getPagSeg : getPagSeg
};