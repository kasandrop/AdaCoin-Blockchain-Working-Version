"use strict";
const {Chain} =require  ('./chain.js');
const {Block} =require ('./block.js');

 

var a1=true;
var a2=false;

 


 let block = new Block('2020/1/1', { credit: 810, tid: 'bbaaa' });
    let newBlock = new Block('2020/1/1', { debit: -76.66, tid: 'bbaaa' });
    let adaChain = new Chain();
    adaChain.addBlock(block); 



