const { Block, Chain } = require('../src/main.js');

describe('\n\n 0 Checking if  the float variable can hold    money properly', () => {

  /* @) verification 
    method used:
  inspection of  SRS, 
  walkthrough
      
  tests number 1  support my discovery
  
  Another interesting insight is not explaining why debit  is minus and credit plus. When this situation happens.   The business rules are based on this foundation. It can cause future bugs!!!
  
    */
  test('0.1 multiplication proving float  can not hold money properly', () => {
    let price = 1.4;
    let quantity = 165;
    let result = price * quantity;
    expect(price * quantity).toBe(231);
  });

  test('0.2 addition    proving float  can not hold money properly ', () => {
    let p1 = 1.43;
    let p2 = 1.5;
    let p3 = 0.23
    let result = p1 + p2 + p3;
    expect(p1 + p2 + p3).toBe(3.16);
  });
  test('0.3 multiplication proving  float numbers are rounded ', () => {
    let price = 1.4;
    let quantity = 165;
    let result = price * quantity;
    expect(price * quantity).toBeCloseTo(231);
  });

  test('0.4 addition proving  float numbers are rounded  ', () => {
    let p1 = 1.43;
    let p2 = 1.5;
    let p3 = 0.23
    let result = p1 + p2 + p3;
    expect(p1 + p2 + p3).toBeCloseTo(3.16);
  });
  test('0.5 addidition  of halfs proving float  can not hold money properly', () => {
    let price1 = 1.50;
    let price2 = 0.50

    expect(price1 + price2).toBe(2);
  });
});


describe('\n\n 2 Correctness of validtransaction()   method', () => {

  test('2.1 valid type of transaction >credit< ', () => {
    let block = new Block("19/01/2022", { credit: 11, tid: 'aaa' });
    expect(block.validtransaction()).toBe(true);
  });
  test('2.2 valid type of transaction >debit< ', () => {
    let block = new Block("19/01/2022", { debit: -1.22, tid: 'aaa' });
    expect(block.validtransaction()).toBe(true);
  });

  test('2.3 invalid type of transaction >Credit< (Capital letter)', () => {
    let block = new Block("19/01/2022", { Credit: 51.22, tid: 'aaa' });
    expect(block.validtransaction()).not.toBe(true);
  });
  test('2.4 invalid type of transaction >Debit<  (Capital letter)', () => {
    let block = new Block("19/01/2022", { Debit: -33.22, tid: 'aaa' });
    expect(block.validtransaction()).not.toBe(true);
  });
  /*
   
  Baundary Value Analysis tests 2.5-2.16
  conditions
  1) if type is credit
  2) if type is debit
  3) debit (negative range) values are: >= -1000 and < 0.
  4) credit  (position range) values are: > 0 and <= 1000.
  
  
  
    */


  test('2.5 type:debit values inside the  range <-1000;0) Lower Boundary -LEFT   ', () => {
    let block = new Block("19/01/2022", { debit: -1000.01, tid: 'aaa' })
    expect(block.validtransaction()).toBe(false);
  });

  test('2.6 type:debit values inside the  range <-1000;0) Lower Boundary -CENTER   ', () => {
    let block = new Block("19/01/2022", { debit: -1000, tid: 'aaa' });
    expect(block.validtransaction()).toBe(true);
  });
  test('2.7 type:debit values inside the  range <-1000;0) Lower Boundary -RIGHT ', () => {
    let block = new Block("19/01/2022", { debit: -999.99, tid: 'aaa' });
    expect(block.validtransaction()).toBe(true);
  });



  test('2.8 type:debit values inside the  range <-1000;0) HIGHER Boundary -LEFT   ', () => {
    let block = new Block("19/01/2022", { debit: -0.01, tid: 'aaa' });
    expect(block.validtransaction()).toBe(true);
  });
  //zero should be rejected
  test('2.9 type:debit values inside the  range <-1000;0) HIGHER Boundary -CENTER  ', () => {
    let block = new Block("19/01/2022", { debit: 0, tid: 'aaa' });
    expect(block.validtransaction()).toBe(false);
  });
  test('2.10 type:debit values inside the  range <-1000;0) HIGHER Boundary -RIGHT  ', () => {
    let block = new Block("19/01/2022", { debit: 0.01, tid: 'aaa' });
    expect(block.validtransaction()).toBe(false);
  });




  test('2.11 type:credit values inside the  range (0;1000> Lower Boundary -LEFT   ', () => {
    let block = new Block("19/01/2022", { credit: -0.01, tid: 'aaa' });
    expect(block.validtransaction()).toBe(false);
  });
  //0 should be rejected 
  test('2.12 type:credit values inside the  range (0;1000> Lower Boundary -CENTER   ', () => {
    let block = new Block("19/01/2022", { credit: 0, tid: 'aaa' });
    expect(block.validtransaction()).toBe(false);
  });
  test('2.13 type:credit values inside the  range (0;1000> Lower Boundary -RIGHT ', () => {
    let block = new Block("19/01/2022", { credit: 0.01, tid: 'aaa' });
    expect(block.validtransaction()).toBe(true);
  });



  test('2.14 type:credit values inside the  range (0;1000> HIGHER Boundary -LEFT   ', () => {
    let block = new Block("19/01/2022", { credit: 999.99, tid: 'aaa' });
    expect(block.validtransaction()).toBe(true);
  });
  test('2.15 type:credit values inside the  range (0;1000> HIGHER Boundary -CENTER  ', () => {
    let block = new Block("19/01/2022", { credit: 1000, tid: 'aaa' });
    expect(block.validtransaction()).toBe(true);
  });
  test('2.16 type:credit values inside the  range (0;1000> HIGHER Boundary -RIGHT  ', () => {
    let block = new Block("19/01/2022", { credit: 1000.01, tid: 'aaa' });
    expect(block.validtransaction()).toBe(false);
  });


  //Baundary Value Analysis tests for two decimal places
  test('2.17   decimal places exactly  two  for credit .higher boundary ', () => {
    let block = new Block("19/01/2022", { credit: 67.013, tid: 'aaa' });
    expect(block.validtransaction()).toBe(false);
  });

  test('2.18  decimal places exactly  two  for debit.higher boundary ', () => {
    let block = new Block("19/01/2022", { debit: -77.013, tid: 'aaa' });
    expect(block.validtransaction()).toBe(false);
  });

  test('2.19   decimal places exactly  two  for credit .lower boundary ', () => {
    let block = new Block("19/01/2022", { credit: 100.2, tid: 'aaa' });
    expect(block.validtransaction()).toBe(false);
  });

  test('2.20   decimal places exactly  two  for debit  .lower boundary ', () => {
    let block = new Block("19/01/2022", { debit: - 100.3, tid: 'aaa' });
    expect(block.validtransaction()).toBe(false);
  });
  test('2.21  Transactions with missing id not allowed  for debit ', () => {
    let block = new Block("19/01/2022", { debit: - 100.3 });
    expect(block.validtransaction()).toBe(false);
  });
  test('2.22  Transactions with missing id not allowed  for credit ', () => {
    let block = new Block("19/01/2022", { credit: 7.3 });
    expect(block.validtransaction()).toBe(false);
  });
  test('2.23  Transactions with missing id and missing type  not allowed ', () => {
    let block = new Block("19/01/2022", {});
    expect(block.validtransaction()).toBe(false);
  });
  test('2.24  Transactions with  missing type  not allowed ', () => {
    let block = new Block("19/01/2022", { tid: 'aaa' });
    expect(block.validtransaction()).toBe(false);
  });
});

describe('\n\n 3 Correctness of the block ', () => {
  test('3.1   Transaction with future dates should be rejected for credit tomorrow', () => {

    let today = new Date();
    let futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + 1);

    let block = new Block(new Intl.DateTimeFormat('en-GB').format(futureDate), { credit: 100.13, tid: 'aaa' });
    expect(block.validtransaction()).toBe(false);
  });
  test('3.2  Transaction with future dates should be rejected for debit  tomorrow', () => {

    let today = new Date();
    let futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + 1);

    let block = new Block(new Intl.DateTimeFormat('en-GB').format(futureDate), { debit: -15.31, tid: 'aaa' });
    expect(block.validtransaction()).toBe(false);
  });

  test('3.3 Transaction with missing dates should be rejected for debit  ', () => {
    let block = new Block({ debit: -18.36, tid: 'aaa' });

    expect(block.validtransaction()).toBe(false);
  });


  test('3.4 Transaction with missing dates should be rejected for credit  ', () => {
    let block = new Block({ credit: 1.66, tid: 'aaa' });

    expect(block.validtransaction()).toBe(false);
  });
  test('3.5  Transaction with correct dates shouldn\'t be rejected for credit  ', () => {
    let today = new Date();
    let block = new Block(new Intl.DateTimeFormat('en-GB').format(today), { credit: 885.31, tid: 'aaa' });
    expect(block.validtransaction()).toBe(true);
  });
  test('3.6  Transaction with correct dates shouldn\'t be rejected for debit ', () => {
    let today = new Date();
    let block = new Block(new Intl.DateTimeFormat('en-GB').format(today), { debit: -245.21, tid: 'aaa' });
    expect(block.validtransaction()).toBe(true);

  });
});

//Decision table testing to have all possible combination

describe('\n\n 4 Correctness of Chain class', () => {

  test('4.1 Block with existing uuid will not be added to the chain addblock method tested debit debit ', () => {
    let block = new Block('2020/1/1', { debit: -310, tid: 'aaa' });
    let newBlock = new Block('2020/1/1', { debit: -36.66, tid: 'aaa' });
    let adaChain = new Chain();
    adaChain.addBlock(block);
    let result = adaChain.adBlock(newBlock);
    expect(result).toBe(false);
  });

  test('4.2 Block with existing uuid will not be added to the chain addblock method tested debit credit', () => {
    let block = new Block('2020/1/1', { debit: -190, tid: 'aaabb' });
    let newBlock = new Block('2020/1/1', { credit: 99.66, tid: 'aaabb' });
    let adaChain = new Chain();
    adaChain.addBlock(block);
    let result = adaChain.adBlock(newBlock);
    expect(result).toBe(false);
  });

  test('4.3 Block with existing uuid will not be added to the chain addblock method tested credit debit ', () => {
    let block = new Block('2020/1/1', { credit: 810, tid: 'bbaaa' });
    let newBlock = new Block('2020/1/1', { debit: -76.66, tid: 'bbaaa' });
    let adaChain = new Chain();
    adaChain.addBlock(block);
    let result = adaChain.adBlock(newBlock);
    expect(result).toBe(false);
  });

  test('4.4 Block with existing uuid will not be added to the chain addblock method tested credit credit ', () => {
    let block = new Block('2020/1/1', { credit: 8, tid: 'aeraa45' });
    let newBlock = new Block('2020/1/1', { credit: 56.66, tid: 'aeraa45' });
    let adaChain = new Chain();
    adaChain.addBlock(block);
    let result = adaChain.adBlock(newBlock);
    expect(result).toBe(false);
  });




  test('4.5 Block with unique uuid will   be added to the chain addblock method tested debit debit ', () => {
    let block = new Block('2020/1/1', { debit: -310, tid: 'a66' });
    let newBlock = new Block('2020/1/1', { debit: -36.66, tid: 'aaa66' });
    let adaChain = new Chain();
    adaChain.addBlock(block);
    let result = adaChain.adBlock(newBlock);
    expect(result).toBe(true);
  });

  test('4.6 Block with unique uuid will  be added to the chain addblock method tested debit credit', () => {
    let block = new Block('2020/1/1', { debit: -190, tid: 'aay7b7b' });
    let newBlock = new Block('2020/1/1', { credit: 99.66, tid: 'aaay7bb' });
    let adaChain = new Chain();
    adaChain.addBlock(block);
    let result = adaChain.adBlock(newBlock);
    expect(result).toBe(true);
  });

  test('4.7 Block with unique uuid will   be added to the chain addblock method tested credit debit ', () => {
    let block = new Block('2020/1/1', { credit: 810, tid: '12b6ba' });
    let newBlock = new Block('2020/1/1', { debit: -76.66, tid: '12bbaaa' });
    let adaChain = new Chain();
    adaChain.addBlock(block);
    let result = adaChain.adBlock(newBlock);
    expect(result).toBe(true);
  });

  test('4.8 Block with unique uuid will be added to the chain addblock method tested credit credit ', () => {
    let block = new Block('2020/1/1', { credit: 8, tid: 'aera' });
    let newBlock = new Block('2020/1/1', { credit: 56.66, tid: 'aeraa9' });
    let adaChain = new Chain();
    adaChain.addBlock(block);
    let result = adaChain.adBlock(newBlock);
    expect(result).toBe(true);
  });

});

//reliability
describe('\n\n 5 System testing. Overal functionality. Trying to break functionality providing acceptable data', () => {
  let adaChain ;
  beforeEach(()=>{
    adaChain=new Chain();
    let block =  new Block('1/1/2020',  {credit: 81.17, tid: '912b6ba' });
    let block2 = new Block('1/2/2020', { debit: -76.66,  tid: '812bbaaa' });
    let block3 = new Block('1/4/2020', { debit: -176.66, tid: '712bbaaa' });
    let block4 = new Block('1/5/2020', { credit: 810.97, tid: '612b6ba' });
    let block5 = new Block('1/1/2021', { debit: -576.36, tid: '512bbaaa' });
    let block6 = new Block('4/2/2022', { debit: -716.16, tid: '412bbaaa' });
    
    adaChain.addblock(block);
    adaChain.addblock(block2);
    adaChain.addblock(block3);
    adaChain.addblock(block4);
    adaChain.addblock(block5);
    adaChain.addblock(block6);

    
  });
  test('5.1 Valid blocks in the chain isvalid function should return true', () => {
    expect(adaChain.isvalid()).toBe(true);
  });
  test('5.2 Changing   value  in the 1st added Block. Let\'s make a million   ', () => {
   let tamperedBlock= adaChain.chain[1];
    tamperedBlock.transaction.credit=1000000;
      expect(adaChain.isvalid()).toBe(true);
  });
 test('5.2 Changing   value  in the last added Block. Another way Let\'s make a  hundret  ', () => {
   let tamperedBlock= adaChain.lastblock().transaction.debit=-616;
      expect(adaChain.isvalid()).toBe(true);
  });
  
});
