"use strict";
const { Block } = require('./block.js');


class Chain {
  constructor() {
    this.chain = [this.genesisBlock()];
  }

  genesisBlock() {
    //returns a new genesis block, the required starting block
    return new Block('1970/01/01', { credit: "0.00", tid: 'Genesis Block' }); //idx, ts, data, phash
  }

  lastBlock() {
    //gets the length of the chain and uses that to return the last block (object)
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    //responsible for adding additional blocks into the chain
    //needs to do some work first
    //1, get the hash of the previous block and add that at this new blocks previous hash
    //calculate the hash value for the newblock
    if (typeof newBlock.tid === 'undefined') {
      return false;
    }

    for (let i = 0; i < this.chain.length; i++) {
    
      if (this.chain[i].tid === newBlock.tid) {
        return false;
      }
    }
    if (newBlock.validTransaction()) {
      newBlock.phash = this.lastBlock().hash;
      newBlock.hash = newBlock.calculateHash(); //calculate the hash value for the 
      this.chain.push(newBlock); //add the new block to the chain - not normally this simple in 'real-life'
      return true;
    }
    return false;


  }

  isValid() {
    //returns true or false depending on whether the enire chain is valid
    for (let i = 1; i < this.chain.length; i++) { // 0 = genesis
      let current = this.chain[i]; //the current block being iterated
      let previous = this.chain[i - 1]; // the previous iterated block

      //check the block hashes
      if (current.hash !== current.calculateHash()) { // is the current block hash incorrect?
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
    //we need to iterate through the entire chain and incorporate the values of each transaction
    let value = 0;
    if (this.chain.length === 1) return value;
    for (let i = 1; i < this.chain.length; i++) {
      value += this.chain[i].creditValue;
      value += this.chain[i].debitValue;
    }
    return value;
  }
}




module.exports = { Chain }; // this allows the classes to be exported


/*

class Chain {
  constructor() {
    this.chain = [ this.genesisblock() ];
  }

  genesisblock() {
    //returns a new genesis block, the required starting block
    return new Block('1970/01/01', 'Genesis Block', 0); //idx, ts, data, phash
  }

  lastblock() {
    //gets the length of the chain and uses that to return the last block (object)
    return this.chain[this.chain.length - 1];
  }

  addblock(newblock) {
    //responsible for adding additional blocks into the chain
    //needs to do some work first
    //1, get the hash of the previous block and add that at this new blocks previous hash
    // FIX -
    if (!(newblock instanceof Block)) {
      return false;
    }

    for (let i = 0; i < this.chain.length; i++) {
      if ( this.chain[i].tid == newblock.tid ) {
        return false;
      }
    }

		if(newblock.validtransaction()) {
      newblock.phash = this.lastblock().hash;
      newblock.hash = newblock.calculatehash(); //calculate the hash value for the
    	this.chain.push(newblock); //add the new block to the chain - not normally this simple in 'real-life'
			return true;
		}
		return false;
  }

  isvalid() {
    //returns true or false depending on whether the enire chain is valid

    // FIX -
    if( this.chain[0].hash !== this.chain[0].calculatehash() ) { // is the genesis block hash incorrect?
        return false;
    }

    for( let b = 1; b < this.chain.length; b++ ) { // 0 = genesis
      const current = this.chain[ b ]; //the current block being iterated
      const previous = this.chain[ b - 1 ]; // the previous iterated block

      //check the block hashes
      if( current.hash !== current.calculatehash() ) { // is the current block hash incorrect?
        return false;
      }

      if( current.phash !== previous.hash ) { // is the current previous hash not the same as the previous hash?
        return false;
      }
    }
    //if we have iterated through the entire chain we should be all good
    return true;
  }

// ADDED FEATURE #1
  balance() {
    // The new balance method loops through the blocks on the chain and adds the credit and debit values to the total value, and returns it. Before it loops, the chains length is checked to make sure there are more blocks on the chain than just the genesis block
    let value = 0;

    if (this.chain.length > 1) {
      for (let i = 1; i < this.chain.length; i++) {
        value += this.chain[i].creditvalue;
        value += this.chain[i].debitvalue;
      }
    }
    return value;
  }


// ADDED FEATURE #3
  rebuild() {
    // The new rebuild method loops through the original chain and adds each block to a newly made chain. This will re-calculate all the hashes if the chain has become invalid from someone changing values i.e. hash, phash
    let newChain = new Chain();
    let ts, transaction;
    for (let i = 1; i < this.chain.length; i++) {
      ts = this.chain[i].ts;
      transaction = this.chain[i].transaction;
      newChain.addblock( new Block( ts, transaction));
    }
    return newChain;
  }
}

*/