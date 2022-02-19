"use strict";
const {Block} =require ('./block.js');
  class Chain {
  constructor() {
    this.chain = [this.genesisBlock()];
  }

  genesisBlock() {
    //returns a new genesis block, the required starting block
    return new Block('1/1/1970', 'Genesis Block', 0); //idx, ts, data, phash
  }

  lastBlock() {
    //gets the length of the chain and uses that to return the last block (object)
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    //responsible for adding additional blocks into the chain
    //needs to do some work first
    //1, get the hash of the previous block and add that at this new blocks previous hash
    newBlock.phash = this.lastBlock().hash;
    newBlock.hash = newBlock.calculateHash(); //calculate the hash value for the newblock

    if (newBlock.validTransaction()) {

      this.chain.push(newBlock); //add the new block to the chain - not normally this simple in 'real-life'

    }

    return false;
  }

  isValid() {
    //returns true or false depending on whether the enire chain is valid
    for (let b = 1; b < this.chain.length; b++) { // 0 = genesis
      const current = this.chain[b]; //the current block being iterated
      const previous = this.chain[b - 1]; // the previous iterated block

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
    if (this.chain.length <= 1) return value;
    for (let i = 1; i < this.chain.length; i++) {
      value += this.chain[i].creditValue;
      value += this.chain[i].debitValue;
    }

    return value;
  }
  toString() {
    return JSON.stringify(this, null, l, 4);
  }
}




module.exports = { Chain }; // this allows the classes to be exported