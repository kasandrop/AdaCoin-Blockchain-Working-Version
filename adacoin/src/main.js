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
    this.hash = this.calculatehash(); //lets execute our hash function and store the function
  }

  calculatehash() {
    //returns a calculated hash based on the stored values
    let hash = SHA256(this.ts + JSON.stringify(this.transaction) + this.phash); //this creates an object
    return hash.toString(); //lets return a string rather than an object
  }

  isdatevalid() {
    const date = new Date(this.ts);
    return date instanceof Date && !isNaN(date.valueOf());

  }
  validtransaction() {
    //check transaction has either a credit or debit property
    if (!(this.transaction.hasOwnProperty('credit') || this.transaction.hasOwnProperty('debit'))) {
      return false; //wasn't able to find either a credit or debit property
    }

    // [abc] = range either a, b, c
    // * = 0 or more instances
    // + = 1 or more instances
    // ? = 0 or 1 instance
    // \ = escape following character
    let regex_pattern = /^[0-9]+\.?[0-9]$/; //https://cheatography.com/davechild/cheat-sheets/regular-expressions/

    if (this.transaction.hasOwnProperty('credit')) { //if we have a credit property
      if (!(regex_pattern.test(this.transaction.credit))) { //credit value is not a number
        return false; //not a valid transaction
      } else {
        this.transaction.credit = Number(this.transaction.credit); //convert to number
      }
    }

    if (this.transaction.hasOwnProperty('debit')) { //if we have a debit property
      if (!(regex_pattern.test(this.transaction.debit))) { //debit value is not a number
        return false; //not a valid transaction
      } else {
        this.transaction.debit = Number(this.transaction.debit); //convert to number
      }
    }

    //check the transation has a tid property
    if (!this.transaction.hasOwnProperty('tid')) {
      return false; //wasn't able to find a tid property
    }

    return true;
  }

  get tid() { //return the tid - fyi, 'get' creates a property (rather than a function)
    return this.transaction.tid;
  }
  get timestamp() {
    if (this.isdatevalid()) {
      return new Date(this.ts);
    } else {
      return new Date(2100, 11, 11);
    }
  }

  get creditvalue() { //return the credit value property
    if (this.transaction.credit === undefined) {
      return 0;
    }
    return this.transaction.credit;
  }

  get debitvalue() { //return the debit value property
    if (this.transaction.debit === undefined) {
      return 0;
    }
    return this.transaction.debit;
  }
 
  

}


class Chain {
  constructor() {
    this.chain = [this.genesisblock()];
  }

  genesisblock() {
    //returns a new genesis block, the required starting block
    return new Block('1/1/1970', 'Genesis Block', 0); //idx, ts, data, phash
  }

  lastblock() {
    //gets the length of the chain and uses that to return the last block (object)
    return this.chain[this.chain.length - 1];
  }

  addblock(newblock) {
    //responsible for adding additional blocks into the chain
    //needs to do some work first
    //1, get the hash of the previous block and add that at this new blocks previous hash
    newblock.phash = this.lastblock().hash;
    newblock.hash = newblock.calculatehash(); //calculate the hash value for the newblock

    if (newblock.validtransaction()) {
      console.log("a")
      this.chain.push(newblock); //add the new block to the chain - not normally this simple in 'real-life'
      return true;
    }
    console.log("b")
    return false;
  }

  isvalid() {
    //returns true or false depending on whether the enire chain is valid
    for (let b = 1; b < this.chain.length; b++) { // 0 = genesis
      const current = this.chain[b]; //the current block being iterated
      const previous = this.chain[b - 1]; // the previous iterated block

      //check the block hashes
      if (current.hash !== current.calculatehash()) { // is the current block hash incorrect?
        return false;
      }

      if (current.phash !== previous.hash) { // is the current previous hash not the same as the previous hash?
        return false;
      }
    }
    //if we have iterated through the entire chain we should be all good
    return true;
  }

  balance() {
    //we need to iterated through the entire chain and incorporate the values of each transaction
    let value = 0;

    return value;
  }
toString(){ return JSON.stringify(this);}
}

//  let today= new Date();
//      let futureDate=new Date(today);
//      futureDate.setDate(futureDate.getDate()+1);
//    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>today is:'+new Intl.DateTimeFormat('en-GB').format(today) );
//      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>tomorrow is:'+new Intl.DateTimeFormat('en-GB').format(futureDate) );
// let newBlock = new Block('2020/1/1', { debit: '111110', tid: 'aaa'} );
// console.log('valid transation: '+ newBlock.validtransaction());
// console.log('tid: '+ newBlock.tid);
// console.log('debit value: '+ newBlock.debitvalue);
// console.log('credit value: '+ newBlock.creditvalue);
// console.log('new block with date 31/2/2020 wrong datew');

// let newBlockDate = new Block('31/2/2020', { debit: -466, tid: 'aaa'} );
// console.log('Compilers see the date:'+new Intl.DateTimeFormat('en-GB').format(newBlockDate.timestamp) );
// console.log('is date valid: '+newBlockDate.isdatevalid());


let adaCoin = new Chain();
adaCoin.addblock(new Block("19/01/2022", { credit: 10, tid: 'A001' }));
adaCoin.addblock(new Block("19/01/2022", { credit: 20, tid: '201' }));
let b = adaCoin.chain[1];
b.transaction.credit = 10000099;
console.log(JSON.stringify(adaCoin,null ,4));

module.exports = { Block, Chain }; // this allows the classes to be exported