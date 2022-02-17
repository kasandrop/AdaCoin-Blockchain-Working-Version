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
    let block = new Block("19/01/2022", { debit: - 100.3});
    expect(block.validtransaction()).toBe(false);
  });
   test('2.22  Transactions with missing id not allowed  for credit ', () => {
    let block = new Block("19/01/2022", { credit:7.3});
    expect(block.validtransaction()).toBe(false);
  });
   test('2.23  Transactions with missing id and missing type  not allowed ', () => {
    let block = new Block("19/01/2022", { });
    expect(block.validtransaction()).toBe(false);
  });
   test('2.24  Transactions with  missing type  not allowed ', () => {
    let block = new Block("19/01/2022", {tid: 'aaa' });
    expect(block.validtransaction()).toBe(false);
   });
});
  
describe('\n\n 3 Correctness of the block ',()=>{
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


describe('\n\n 3 Reliability and robustness of helper method isdatevalid', () => {

  test('3.1 today day is  valid', () => {
    let today = new Date();
    new Block(new Intl.DateFormat('en-GB').format(today));
    expect(adacoin.isvalid()).toBe(true);
  });
  test('3.2 yesterday  day is  valid', () => {
    let today = new Date();
    let yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    new Block(new Intl.DateFormat('en-GB').format(yesterday));
    expect(adacoin.isvalid()).toBe(true);
  });

  test('3.3 Tomorrow date is invalid', () => {
    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let block = new Block(new Intl.DateTimeFormat('en-GB').format(tomorrow), { credit: 100.13, tid: 'aaa' });
    expect(block.validtransaction()).toBe(false);

  });

  test('3.4 When Date is missing then  invalid result', () => {
    let block = new Block({ credit: 10.13, tid: 'ayaa' });
    expect(block.validtransaction()).toBe(false);
  });
  test('3.5 When Date is wrong   "31/2/2000" then  invalid result', () => {
    let block = new Block("31/2/2000", { credit: 10.13, tid: 'ayaa' });
    expect(block.validtransaction()).toBe(false);
  });
  test('3.5 When Date is malformed   "546/rrtyuv0" then  invalid result', () => {
    let block = new Block("546/rrtyuv0", { credit: 10.13, tid: 'ayaa' });
    expect(block.validtransaction()).toBe(false);
  });

})