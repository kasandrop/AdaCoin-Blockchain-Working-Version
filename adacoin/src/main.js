const SHA256 = require('crypto-js/sha256'); //looks in the node_modules folder for the library


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

    //use this to test first coin value
    //console.log ("ts: " + this.ts );
    //console.log ("transaction: " + this.transaction.amount );
    //console.log ("phash: " + this.phash );
    
  }
  
  calculatehash() {
    //returns a calculated hash based on the stored values
    let hash = SHA256( this.ts + JSON.stringify(this.transaction) + this.phash ); //this creates an object
    return hash.toString(); //lets return a string rather than an object
  }
}


class Chain {
  constructor() {
    this.chain = [ this.genesisblock() ];
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
    
    this.chain.push(newblock); //add the new block to the chain - not normally this simple in 'real-life'
  }

  isvalid() {
    //returns true or false depending on whether the enire chain is valid
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
}


//let adacoin = new Block();
//console.log(adacoin.calculatehash())

//adacoin = new Chain();
//console.log(adacoin.genesisblock())

adacoin = new Chain();
adacoin.addblock( new Block("19/01/2022", { amount: 10 } ) );

//add some additional tests
adacoin.addblock( new Block("20/01/2022", { amount: 83 } ) );

//console.log(JSON.stringify (adacoin) );
//console.log(JSON.stringify (adacoin, null, 4) );

console.log(adacoin.isvalid());

//lets do some hacking - lets try to override an amount being transfered
adacoin.chain[1].data = { amount: 200 };

//what about if we try to recalculate the hash?
adacoin.chain[1].hash = adacoin.chain[1].calculatehash();

console.log(adacoin.isvalid());
 

module.exports = { Block, Chain }; // this allows the classes to be exported