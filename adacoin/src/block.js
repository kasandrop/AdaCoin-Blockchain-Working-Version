"use strict";

const SHA256 = require('crypto-js/sha256'); //looks in the node_modules folder for the library
const { v4: uuidv4 } = require('uuid'); //for details review https://www.npmjs.com/package/uuid



class Block {
  constructor(ts, transaction, phash) {
    //ts - indicates the time stamp when the block was created
    //transaction - holds information to be stored, e.g. details of transaction, how much money transferred, sender, recipient 
    //phash - holds the hash value of the 'previous' block; essential to ensure integrity 

    this.ts = ts;
    this.transaction = transaction;
    this.phash = phash;

    //we also need to include a hash for this block
    this.hash = this.calculateHash(); //lets execute our hash function and store the function
  }

  calculateHash() {
    //returns a calculated hash based on the stored values
    let hash = SHA256(this.ts + JSON.stringify(this.transaction) + this.phash); //this creates an object
    return hash.toString(); //lets return a string rather than an object
  }


  //added helper function
  isDateValid() {
    console.log('isDateValid()');
    let isCorrectDate = new Date(this.ts).toString !== "Invalid Date";
    if (isCorrectDate === false) {
      return false;
    }
    return true;
  }




  isDateFromFuture() {
    console.log('isDateFromFuture()');
    let mydate = new Date(this.ts);
    let mytoday = new Date();
    let difference = mydate - mytoday;
    if (difference > 0) {
      return true;
    }
    return false;
  }





  get tid() { //return the tid - fyi, 'get' creates a property (rather than a function)
    return this.transaction.tid;
  }


  get creditValue() { //return the credit value property
    if (this.transaction.credit === undefined) {
      return 0;
    }
    return this.transaction.credit;
  }

  get debitValue() { //return the debit value property
    if (this.transaction.debit === undefined) {
      return 0;
    }
    return this.transaction.debit;
  }
  toString() {
    return JSON.stringify(this, null, l, 4);
  }

  isValidTransactionProperties() {
    console.log('isValidTransactionProperties()');
    // check transaction has either a credit or debit property
    if ((this.transaction.hasOwnProperty('credit')!== undefined  &&  this.transaction.hasOwnProperty('debit')!== undefined) ||
       (this.transaction.hasOwnProperty('credit')=== undefined  &&  this.transaction.hasOwnProperty('debit')=== undefined) 
       ){
      return false;
    }else{
      return true;
    }
  }

  isValidTransactionCriterias() {
    console.log('isValidTransactionCriterias()');
    let regex_pattern = /^\-?[0-9]+\.{1}[0-9]{2}$/; //https://cheatography.com/davechild/cheat-sheets/regular-expressions/

    if (this.transaction.hasOwnProperty('credit')) { //if we have a credit property
      if (!(regex_pattern.test(this.transaction.credit))) { //credit value is not a number
        return false; //not a valid transaction
      } else {
        this.transaction.credit = Number(this.transaction.credit); //convert to number
        if (this.transaction.credit <= 0 || this.transaction.credit > 1000) {
          return false;
        }
      }
    }

    if (this.transaction.hasOwnProperty('debit')) { //if we have a debit property
      if (!(regex_pattern.test(this.transaction.debit))) { //debit value is not a number
        return false; //not a valid transaction
      } else {
        this.transaction.debit = Number(this.transaction.debit); //convert to number
        if (this.transaction.debit >= 0 || this.transaction.debit < -1000) {
          return false;
        }
      }
    }
    //check the transaction has a tid property
    if (!this.transaction.hasOwnProperty('tid')) {
      return false; //wasn't able to find a tid property
    }
    return true;
  }

  /*
      Required feature nr 2- IMPLEMENTATION
   */
  validTransaction() {
    if (this.isValidTransactionProperties() && this.isValidTransactionCriterias() && this.isDateValid() && this.isDateFromFuture()) {
      return true;
    }
    return false;
  }


}







module.exports = { Block }; // this allows the classes to be exported