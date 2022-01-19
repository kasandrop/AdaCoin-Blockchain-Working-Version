const { Block, Chain } = require('../src/main.js'); 

describe('AdaCoin Initial Test Scenario', () => {
  test('Initialisation Test', () => {

    let adacoin = new Chain();
    adacoin.addblock( new Block(1, "19/01/2022", { amount: 10 } ) );
    adacoin.addblock( new Block(2, "20/01/2022", { amount: 83 } ) );

    //adacoin.chain[1].transaction = { amount: 30 };
    //what about if we try to recalculate the hash?
    //adacoin.chain[1].hash = adacoin.chain[1].calculatehash();
    
    expect (adacoin.isvalid()).toBe(true);
  });
});   
 