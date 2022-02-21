"use strict";
 const { Chain } = require('./chain.js');
 const { Block } = require('./block.js');


var block = new Block('2022/2/20', { credit: '0.01', tid: 'aaa' });
function check() {
  console.log('isDateFromFuture()');
  if (typeof block.ts !== 'string') {
    return false;
  }
  let mydate = new Date(block.ts);
  let mytoday = new Date();
  let difference = mydate - mytoday;
  if (difference > 0) {
    return true;
  }
  return false;

}


console.log('is day from future:'+block.isDateValid());
//dat.toLocaleString().slice(0,9))
//  let block = new Block('26/01/2020', { credit: 810, tid: 'bbaaa' });
//  console.log("isdatebalid:"+block.isDateValid());
// console.log("date: "+new Date(block.ts).toLocaleString('en-GB'));

//new Intl.DateTimeFormat('en-GB').format(today)






