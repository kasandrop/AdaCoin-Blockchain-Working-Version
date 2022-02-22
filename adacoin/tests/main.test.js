const { Chain } = require('../src/chain.js');
const { Block } = require('../src/block.js');


describe('\n\n 0 Properties of JAVASCRIPT - not  included in the test ', () => {
  describe('\n 0 Checking if  the float variable can hold    money properly', () => {

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
    test('0.6 addition    proving float  can not hold money properly ', () => {
      let price1 = Number("1.53");
      let price2 = Number("0.51");

      expect(price1 + price2).toBe(2.04);
    });
    test('0.7 addition    proving float  can not hold money properly initialization of Number obj with a string  should do the math', () => {
      let n1 = "1.53";
      let n2 = "0.51";
      let price1 = Number(n1);
      let price2 = Number(n2);
      expect(price1 + price2).toBe(2.04);
    });
     test('0.8 addition    proving float  can not hold money properly  initialization of Number obj with a decimal  should do the math', () => {
        let price1 = Number(1.53);
        let price2 = Number(0.51);

        expect(price1 + price2).toBe(2.04);
      });
      test('0.9 addition    proving float  can not hold money properly initialization of Number obj with a decimal  should do the math', () => {
        let n1 = 1.53;
        let n2 = 0.51;
         let n3= 2.99;
        let price1 = Number(n1);
        let price2 = Number(n2);
         let price3 = Number(n3);
        expect(price1 + price2+price3).toBe(5.03);
      });
  });
});
describe('\n\nUNIT TESTS  1 -2 - 3 Block  object  white box testing', () => {

  //unit test
  describe('\n\n 1 Reliability and robustness of helper method isDateValid() ', () => {

    test('1.1 Today day is  valid', () => {
      let today = new Date();
      let block = new Block(today.toLocaleString().slice(0, 9), { credit: '100.13', tid: 'aaa' });
      expect(block.isDateValid()).toBe(true);
    });

    test('1.2 When Date is correct  "2022/02/19" then  valid result', () => {
      let block = new Block('2022/02/19', { credit: '10.13', tid: 'ayaa' });
      expect(block.isDateValid()).toBe(true);
    });


    test('1.3 Yesterday  day is  valid', () => {
      let today = new Date();
      let yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      let block = new Block(yesterday.toLocaleString().slice(0, 9), { debit: '410.13', tid: 'aya345a' });
      expect(block.isDateValid()).toBe(true);
    });

    test('1.4 Tomorrow date is invalid', () => {
      let today = new Date();
      let tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      let block = new Block(tomorrow.toLocaleString().slice(0, 9), { credit: '100.13', tid: 'aaa' });
      expect(block.isDateValid()).toBe(false);
    });

    test('1.5 When Date is missing then  invalid result', () => {
      let block = new Block({ credit: '10.13', tid: 'ayaa' });
      expect(block.isDateValid()).toBe(false);
    });

    test('1.6 When Date is wrong   "2000/2/31" then  invalid result', () => {
      let block = new Block("31/02/2000", { credit: '10.53', tid: 'ayaa' });
      expect(block.isDateValid()).toBe(false);
    });
    test('1.7 When Date is malformed   "546/rrtyuv0" then  invalid result', () => {
      let block = new Block("546/rrtyuv0", { credit: '104.13', tid: 'ayaa' });
      expect(block.isDateValid()).toBe(false);
    });

    test('1.8 When Date is correct  2021/05/28 then  valid result', () => {
      let block = new Block('2021/05/28', { credit: '10.13', tid: 'ayaa' });
      expect(block.isDateValid()).toBe(true);
    });
    test('1.9 Transactions with no data at all', () => {
      let block = new Block();
      expect(block.isDateValid()).toBe(false);
    });

  });



  describe('\n\ 2 Correctness and reliability of  isValidTransactionProperties() helper  method', () => {
    describe('negative,  positive test cases, error guessing ', () => {
      test('2.1 Valid type of transaction >credit< ', () => {
        let block = new Block('2022/01/01', { credit: '311.00', tid: 'aaga2' });
        expect(block.isValidTransactionProperties()).toBe(true);
      });
      test('2.2 Valid type of transaction >debit< ', () => {
        let block = new Block('2022/20/16', { debit: '-1.22', tid: 'aagha35' });
        expect(block.isValidTransactionProperties()).toBe(true);
      });

      test('2.3 Invalid type of transaction >Credit< (Capital letter)', () => {
        let block = new Block('2021/10/31', { Credit: '51.22', tid: 'hfgaaa' });
        expect(block.isValidTransactionProperties()).not.toBe(true);
      });
      test('2.4 Invalid type of transaction >Debit<  (Capital letter)', () => {
        let block = new Block('2022/01/15', { Debit: '-33.22', tid: 'aaa' });
        expect(block.isValidTransactionProperties()).not.toBe(true);
      });
      test('2.5 Transactions with  missing type  not allowed ', () => {
        let block = new Block('2021/05/28', { tid: 'aaa' });
        expect(block.isValidTransactionProperties()).toBe(false);
      });
      test('2.6 Transactions with both  types  not allowed ', () => {
        let block = new Block('2022/01/15', { debit: '-33.22', credit: '33.56', tid: 'aaa' });
        expect(block.isValidTransactionProperties()).toBe(false);
      });

    });
    /*
     
    Baundary Value Analysis tests 3.1-3.12
    conditions
    1) if type is credit
    2) if type is debit
    3) debit (negative range) values are: >= -1000 and < 0.
    4) credit  (position range) values are: > 0 and <= 1000.
    
    
    
      */

    describe('\n\ 3 Correctness and reliability of  isValidTransactionCriterias() helper  method', () => {
      describe('Baundary Value Analysis ', () => {
        test('3.1  Type:debit values inside the  range <-1000;0) Lower Boundary -LEFT   ', () => {
          let block = new Block('2021/05/28', { debit: '-1000.01', tid: 'aaa' })
          expect(block.isValidTransactionCriterias()).toBe(false);
        });

        test('3.2  Type:debit values inside the  range <-1000;0) Lower Boundary -CENTER   ', () => {
          let block = new Block('2021/05/28', { debit: '-1000.00', tid: 'aaa' });
          expect(block.isValidTransactionCriterias()).toBe(true);
        });
        test('3.3  Type:debit values inside the  range <-1000;0) Lower Boundary -RIGHT ', () => {
          let block = new Block('2021/05/28', { debit: '-999.99', tid: 'aaa' });
          expect(block.isValidTransactionCriterias()).toBe(true);
        });



        test('3.4  Type:debit values inside the  range <-1000;0) HIGHER Boundary -LEFT   ', () => {
          let block = new Block('2021/05/28', { debit: '-0.01', tid: 'aaa' });
          expect(block.isValidTransactionCriterias()).toBe(true);
        });
        //zero should be rejected
        test('3.5  Type:debit values inside the  range <-1000;0) HIGHER Boundary -CENTER  ', () => {
          let block = new Block('2021/05/28', { debit: '0.00', tid: 'aaa' });
          expect(block.isValidTransactionCriterias()).toBe(false);
        });
        test('3.6  Type:debit values inside the  range <-1000;0) HIGHER Boundary -RIGHT  ', () => {
          let block = new Block('2021/05/28', { debit: '0.01', tid: 'aaa' });
          expect(block.isValidTransactionCriterias()).toBe(false);
        });




        test('3.7  Type:credit values inside the  range (0;1000> Lower Boundary -LEFT   ', () => {
          let block = new Block('2021/05/28', { credit: '-0.01', tid: 'aaa' });
          expect(block.isValidTransactionCriterias()).toBe(false);
        });
        //0 should be rejected 
        test('3.8  Type:credit values inside the  range (0;1000> Lower Boundary -CENTER   ', () => {
          let block = new Block('2021/05/28', { credit: '0.00', tid: 'aaa' });
          expect(block.isValidTransactionCriterias()).toBe(false);
        });
        test('3.9  Type:credit values inside the  range (0;1000> Lower Boundary -RIGHT ', () => {
          let block = new Block('2021/05/28', { credit: '0.01', tid: 'aaa' });
          expect(block.isValidTransactionCriterias()).toBe(true);
        });



        test('3.10 Type:credit values inside the  range (0;1000> HIGHER Boundary -LEFT   ', () => {
          let block = new Block('2021/05/28', { credit: '999.99', tid: 'aaa' });
          expect(block.isValidTransactionCriterias()).toBe(true);
        });
        test('3.11 Type:credit values inside the  range (0;1000> HIGHER Boundary -CENTER  ', () => {
          let block = new Block('2021/05/28', { credit: '1000.00', tid: 'aaa' });
          expect(block.isValidTransactionCriterias()).toBe(true);
        });
        test('3.12 Type:credit values inside the  range (0;1000> HIGHER Boundary -RIGHT  ', () => {
          let block = new Block('2021/05/28', { credit: '1000.01', tid: 'aaa' });
          expect(block.isValidTransactionCriterias()).toBe(false);
        });


        //Baundary Value Analysis tests for two decimal places
        test('3.13 Decimal places exactly  two  for credit .higher boundary ', () => {
          let block = new Block('2021/05/28', { credit: '67.013,', tid: 'aaa' });
          expect(block.isValidTransactionCriterias()).toBe(false);
        });

        test('3.14 Decimal places exactly  two  for debit.higher boundary ', () => {
          let block = new Block('2021/05/28', { debit: '-77.013', tid: 'aaa' });
          expect(block.isValidTransactionCriterias()).toBe(false);
        });

        test('3.15 Decimal places exactly  two  for credit .lower boundary ', () => {
          let block = new Block('2021/05/28', { credit: '100.2', tid: 'aaa' });
          expect(block.isValidTransactionCriterias()).toBe(false);
        });

        test('3.16 Decimal places exactly  two  for debit  .lower boundary ', () => {
          let block = new Block('2021/05/28', { debit: '-100.3', tid: 'aaa' });
          expect(block.isValidTransactionCriterias()).toBe(false);
        });

      });
      describe('Negative and positive test cases,error guessing', () => {
        //error guessing
        test('3.17 Transactions with missing id not allowed  for debit ', () => {
          let block = new Block('2021/05/28', { debit: '-100.34' });
          expect(block.isValidTransactionCriterias()).toBe(false);
        });
        test('3.18 Transactions with missing id not allowed  for credit ', () => {
          let block = new Block('2021/05/28', { credit: '7.39' });
          expect(block.isValidTransactionCriterias()).toBe(false);
        });
        test('3.19 Transactions with missing id and missing type  not allowed ', () => {
          let block = new Block('2021/05/28', {});
          expect(block.isValidTransactionCriterias()).toBe(false);
        });

        test('3.20 Transactions with integer amount not allowed  for credit ', () => {
          let block = new Block('2021/05/28', { debit: - 100 });
          expect(block.isValidTransactionCriterias()).toBe(false);
        });
        test('3.21 Transactions with integer amount not allowed  for debit', () => {
          let block = new Block('2021/05/28', { credit: 7 });
          expect(block.isValidTransactionCriterias()).toBe(false);
        });

      });
    });

  });

});
describe('\n\n 4 Integration tests   -4 -', () => {
  describe('\n\n 4 Correctness of the block ', () => {
    describe('Negative and positive test cases', () => {
      test('4.1  Today day is  valid', () => {
        let today = new Date();
        let block = new Block(today.toLocaleString().slice(0, 9), { credit: '100.13', tid: 'aaa' });
        expect(block.validTransaction()).toBe(true);
      });

      test('4.2  When Date is correct  "2022/02/19" then  valid result', () => {
        let block = new Block('2022/02/19', { credit: '10.13', tid: 'ayaa' });
        expect(block.validTransaction()).toBe(true);
      });


      test('4.3  Yesterday  day is  valid', () => {
        let today = new Date();
        let yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        let block = new Block(yesterday.toLocaleString().slice(0, 9), { debit: '-410.13', tid: 'aya345a' });
        expect(block.validTransaction()).toBe(true);
      });

      test('4.4  Tomorrow date is invalid', () => {
        let today = new Date();
        let tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        let block = new Block(tomorrow.toLocaleString().slice(0, 9), { credit: '100.13', tid: 'aaa' });
        expect(block.validTransaction()).toBe(false);
      });

      test('4.5  When Date is missing then  invalid result', () => {
        let block = new Block({ credit: '10.13', tid: 'ayaa' });
        expect(block.validTransaction()).toBe(false);
      });

      test('4.6  When Date is wrong   "2000/2/31" then  invalid result', () => {
        let block = new Block("31/2/2000", { credit: '10.53', tid: 'ayaa' });
        expect(block.validTransaction()).toBe(false);
      });
      test('4.7  When Date is malformed   "546/rrtyuv0" then  invalid result', () => {
        let block = new Block("546/rrtyuv0", { credit: '104.13', tid: 'ayaa' });
        expect(block.validTransaction()).toBe(false);
      });

      test('4.8  When Date is correct  2021/05/28 then  valid result', () => {
        let block = new Block('2021/05/28', { credit: '10.13', tid: 'ayaa' });
        expect(block.validTransaction()).toBe(true);
      });

      test('4.9  Valid type of transaction >credit< ', () => {
        let block = new Block('2022/1/1', { credit: '311.00', tid: 'aaga2' });
        expect(block.validTransaction()).toBe(true);
      });
      test('4.10 Valid type of transaction >debit< ', () => {
        let block = new Block('2022/2/16', { debit: '-1.22', tid: 'aagha35' });
        expect(block.validTransaction()).toBe(true);
      });

      test('4.11 Invalid type of transaction >Credit< (Capital letter)', () => {
        let block = new Block('2021/10/31', { Credit: '51.22', tid: 'hfgaaa' });
        expect(block.validTransaction()).not.toBe(true);
      });
      test('4.12 Invalid type of transaction >Debit<  (Capital letter)', () => {
        let block = new Block('2022/1/15', { Debit: '-33.22', tid: 'aaa' });
        expect(block.validTransaction()).not.toBe(true);
      });
      test('4.13 Transactions with  missing type  not allowed ', () => {
        let block = new Block('2021/05/28', { tid: 'aaa' });
        expect(block.validTransaction()).toBe(false);
      });
      test('4.14 Transactions with both  types  not allowed ', () => {
        let block = new Block('2022/1/15', { debit: '-33.22', credit: '33.56', tid: 'aaa' });
        expect(block.validTransaction()).toBe(false);
      });
    });
    describe('Baundary Value Analysis ', () => {


      test('4.15 Type:debit values inside the  range <-1000;0) Lower Boundary -LEFT   ', () => {
        let block = new Block('2021/05/28', { debit: '-1000.01', tid: 'aaa' })
        expect(block.validTransaction()).toBe(false);
      });

      test('4.16 Type:debit values inside the  range <-1000;0) Lower Boundary -CENTER   ', () => {
        let block = new Block('2021/05/28', { debit: '-1000.00', tid: 'aaa' });
        expect(block.validTransaction()).toBe(true);
      });
      test('4.17 Type:debit values inside the  range <-1000;0) Lower Boundary -RIGHT ', () => {
        let block = new Block('2021/05/28', { debit: '-999.99', tid: 'aaa' });
        expect(block.validTransaction()).toBe(true);
      });



      test('4.18 Type:debit values inside the  range <-1000;0) HIGHER Boundary -LEFT   ', () => {
        let block = new Block('2021/05/28', { debit: -0.01, tid: 'aaa' });
        expect(block.validTransaction()).toBe(true);
      });
      //zero should be rejected
      test('4.19 Type:debit values inside the  range <-1000;0) HIGHER Boundary -CENTER  ', () => {
        let block = new Block('2021/05/28', { debit: '0.00', tid: 'aaa' });
        expect(block.validTransaction()).toBe(false);
      });
      test('4.20 Type:debit values inside the  range <-1000;0) HIGHER Boundary -RIGHT  ', () => {
        let block = new Block('2021/05/28', { debit: '0.01', tid: 'aaa' });
        expect(block.validTransaction()).toBe(false);
      });




      test('4.21 Type:credit values inside the  range (0;1000> Lower Boundary -LEFT   ', () => {
        let block = new Block('2021/05/28', { credit: '-0.01', tid: 'aaa' });
        expect(block.validTransaction()).toBe(false);
      });
      //0 should be rejected 
      test('4.22 Type:credit values inside the  range (0;1000> Lower Boundary -CENTER   ', () => {
        let block = new Block('2021/05/28', { credit: '0.00', tid: 'aaa' });
        expect(block.validTransaction()).toBe(false);
      });
      test('4.23 Type:credit values inside the  range (0;1000> Lower Boundary -RIGHT ', () => {
        let block = new Block('2021/05/28', { credit: '0.01', tid: 'aaa' });
        expect(block.validTransaction()).toBe(true);
      });



      test('4.24 Type:credit values inside the  range (0;1000> HIGHER Boundary -LEFT   ', () => {
        let block = new Block('2021/05/28', { credit: '999.99', tid: 'aaa' });
        expect(block.validTransaction()).toBe(true);
      });
      test('4.25 Tpe:credit values inside the  range (0;1000> HIGHER Boundary -CENTER  ', () => {
        let block = new Block('2021/05/28', { credit: '1000.00', tid: 'aaa' });
        expect(block.validTransaction()).toBe(true);
      });
      test('4.26 Type:credit values inside the  range (0;1000> HIGHER Boundary -RIGHT  ', () => {
        let block = new Block('2021/05/28', { credit: '1000.01', tid: 'aaa' });
        expect(block.validTransaction()).toBe(false);
      });
    });

    //Baundary Value Analysis tests for two decimal places
    describe('Baundary Value Analysis', () => {
      test('4.27 Decimal places exactly  two  for credit .higher boundary ', () => {
        let block = new Block('2021/05/28', { credit: '67.013,', tid: 'aaa' });
        expect(block.validTransaction()).toBe(false);
      });

      test('4.28 Decimal places exactly  two  for debit.higher boundary ', () => {
        let block = new Block('2021/05/28', { debit: '-77.013', tid: 'aaa' });
        expect(block.validTransaction()).toBe(false);
      });

      test('4.29 Decimal places exactly  two  for credit .lower boundary ', () => {
        let block = new Block('2021/05/28', { credit: '100.2', tid: 'aaa' });
        expect(block.validTransaction()).toBe(false);
      });

      test('4.30 Dcimal places exactly  two  for debit  .lower boundary ', () => {
        let block = new Block('2021/05/28', { debit: '-100.3', tid: 'aaa' });
        expect(block.validTransaction()).toBe(false);
      });

    });
    //error guessing
    describe('error guessing', () => {
      test('4.31 Transactions with missing id not allowed  for debit ', () => {
        let block = new Block('2021/05/28', { debit: '-100.34' });
        expect(block.validTransaction()).toBe(false);
      });
      test('4.32 Transactions with missing id not allowed  for credit ', () => {
        let block = new Block('2021/05/28', { credit: '7.39' });
        expect(block.validTransaction()).toBe(false);
      });
      test('4.33 Transactions with missing id and missing type  not allowed ', () => {
        let block = new Block('2021/05/28', {});
        expect(block.validTransaction()).toBe(false);
      });

      test('4.34 Transactions with integer amount not allowed  for credit ', () => {
        let block = new Block('2021/05/28', { debit: - 100 });
        expect(block.validTransaction()).toBe(false);
      });
      test('4.35 Transactions with integer amount not allowed  for debit', () => {
        let block = new Block('2021/05/28', { credit: 7 });
        expect(block.validTransaction()).toBe(false);
      });
      test('4.36 Transactions with no data at all', () => {
        let block = new Block();
        expect(block.validTransaction()).toBe(false);
      });

    });

  });

});





//Decision table testing to have all possible combination
describe('\n\n 5 - 6 - 7  Unit tests  of  Chain class white box testing', () => {
  describe('\n5 Unit test of addBlock() ', () => {
    describe('Decision table testing ', () => {
      test('5.1 Block with existing uuid will not be added to the chain addblock method  debit debit ', () => {
        let block = new Block('2020/01/10', { debit: '-310.66', tid: 'aaa' });
        let newBlock = new Block('2020/01/21', { debit: '-36.66', tid: 'aaa' });
        let adaChain = new Chain();
        adaChain.addBlock(block);
        let result = adaChain.addBlock(newBlock);
        expect(result).toBe(false);
      });

      test('5.2 Block with existing uuid will not be added to the chain addblock method tested debit credit', () => {
        let block = new Block('2020/11/19', { debit: '-190.45', tid: 'aaabb' });
        let newBlock = new Block('2020/10/18', { credit: '99.66', tid: 'aaabb' });
        let adaChain = new Chain();
        adaChain.addBlock(block);
        let result = adaChain.addBlock(newBlock);
        expect(result).toBe(false);
      });

      test('5.3 Block with existing uuid will not be added to the chain addblock method tested credit debit ', () => {
        let block = new Block('2020/01/01', { credit: '810.67', tid: 'bbaaa' });
        let newBlock = new Block('2020/10/01', { debit: '-76.66', tid: 'bbaaa' });
        let adaChain = new Chain();
        adaChain.addBlock(block);
        let result = adaChain.addBlock(newBlock);
        expect(result).toBe(false);
      });

      test('5.4 Block with existing uuid will not be added to the chain addblock method tested credit credit ', () => {
        let block = new Block('2020/01/01', { credit: '8.04', tid: 'aeraa45' });
        let newBlock = new Block('2020/01/01', { credit: '56.66', tid: 'aeraa45' });
        let adaChain = new Chain();
        adaChain.addBlock(block);
        let result = adaChain.addBlock(newBlock);
        expect(result).toBe(false);
      });

      test('5.5 Block with unique uuid will   be added to the chain addblock method tested debit debit ', () => {
        let block = new Block('2020/01/10', { debit: '-310.04', tid: 'a66' });
        let newBlock = new Block('2020/01/10', { debit: '-36.66', tid: 'aaa66' });
        let adaChain = new Chain();
        adaChain.addBlock(block);
        let result = adaChain.addBlock(newBlock);
        expect(result).toBe(true);
      });

      test('5.6 Block with unique uuid will  be added to the chain addblock method tested debit credit', () => {
        let block = new Block('2020/01/10', { debit: '-190.99', tid: 'aay7b7b' });
        let newBlock = new Block('2020/01/01', { credit: '99.66', tid: 'aaay7bb' });
        let adaChain = new Chain();
        adaChain.addBlock(block);
        let result = adaChain.addBlock(newBlock);
        expect(result).toBe(true);
      });

      test('5.7 Block with unique uuid will   be added to the chain addblock method tested credit debit ', () => {
        let block = new Block('2020/01/01', { credit: '810.02', tid: '12b6ba' });
        let newBlock = new Block('2020/01/01', { debit: '-76.66', tid: '12bbaaa' });
        let adaChain = new Chain();
        adaChain.addBlock(block);
        let result = adaChain.addBlock(newBlock);
        expect(result).toBe(true);
      });

      test('5.8 Block with unique uuid will be added to the chain addblock method tested credit credit ', () => {
        let block = new Block('2020/01/01', { credit: '8.01', tid: 'aera' });
        let newBlock = new Block('2020/01/01', { credit: '56.66', tid: 'aeraa9' });
        let adaChain = new Chain();
        adaChain.addBlock(block);
        let result = adaChain.addBlock(newBlock);
        expect(result).toBe(true);
      });
    });
  });
  describe('\n 6. isValid method', () => {
    let adaChain;
    beforeEach(() => {
      adaChain = new Chain();
      let block = new Block('2021/05/28', { credit: '81.17', tid: '912b6ba' });
      let block2 = new Block('2021/05/28', { debit: '-76.66', tid: '812bbaaa' });
      let block3 = new Block('2021/05/28', { debit: '-176.66', tid: '712bbaaa' });
      let block4 = new Block('2021/05/28', { credit: '810.97', tid: '612b6ba' });
      let block5 = new Block('2021/05/28', { debit: '-576.36', tid: '512bbaaa' });
      let block6 = new Block('2021/05/28', { debit: '-716.16', tid: '412bbaaa' });

      adaChain.addBlock(block);
      adaChain.addBlock(block2);
      adaChain.addBlock(block3);
      adaChain.addBlock(block4);
      adaChain.addBlock(block5);
      adaChain.addBlock(block6);


    });
    test('6.1 Valid blocks in the chain isValid function should return true', () => {
      expect(adaChain.isValid()).toBe(true);
    });
    test('6.2 Changing   value of transaction type in the 1st added Block will cause  function to return false \n \t\t\t (for example  in credit) ', () => {
      let tamperedBlock = adaChain.chain[1];
      tamperedBlock.transaction.credit = '1000000.00';
      expect(adaChain.isValid()).toBe(false);
    });
    test('6.3 Changing   value  in the last added Block.will cause  function to return false   \n \t\t\t (for example  in debit) ', () => {
      let tamperedBlock = adaChain.lastBlock().transaction.debit = '-616.66';
      expect(adaChain.isValid()).toBe(false);
    });

  });
  describe('\n 7. Correctness of balance()  method', () => {
    let adaChain;
    beforeEach(() => {
      adaChain = new Chain();
      let block = new Block('2021/05/28', { credit: '81.17', tid: '912b6ba' });
      let block2 = new Block('2021/05/28', { debit: '-76.66', tid: '812bbaaa' });
      let block3 = new Block('2021/05/28', { debit: '-176.66', tid: '712bbaaa' });
      let block4 = new Block('2021/05/28', { credit: '176.66', tid: '612b6ba' });
      let block5 = new Block('2021/05/28', { credit: '76.66', tid: '512bbaaa' });
      let block6 = new Block('2021/05/28', { debit: '-716.16', tid: '412bbaaa' });

      adaChain.addBlock(block);
      adaChain.addBlock(block2);
      adaChain.addBlock(block3);
      adaChain.addBlock(block4);
      adaChain.addBlock(block5);
      adaChain.addBlock(block6);


    });

    describe(' Baundary Value Analysis tests ', () => {
      test('7.1 Correctness of the function (81.17-76.66-176.66+176.66+76.66-716.16)===-634.99', () => {
        expect(adaChain.balance()).toBe(-634.99);
      });
      test('7.2Correctness of the function (81.17-76.66-176.66+176.66+76.66-716.16)!==-634.00', () => {
        expect(adaChain.balance()).not.toBe(-635.00);
      });
      test('7.3 Correctness of the function (81.17-76.66-176.66+176.66+76.66-716.16)!==-634.98', () => {
        expect(adaChain.balance()).not.toBe(-634.98);
      });
      test('7.4 Correctness of the function adding block with credit 634.99 to make  balance 0', () => {
        let block7 = new Block('2021/05/29', { credit: '634.99', tid: '412bytbaaa' });
        adaChain.addBlock(block7);
        expect(adaChain.balance()).toBe(0);
      });
    });
  });
});










describe('\n\n INTEGRATION TESTING mixed white box and black box testing', () => {

  //reliability
  describe('\n 8. System testing. Overal functionality. Trying to break functionality providing acceptable data, error guessing ', () => {
    let adaChain;
    beforeEach(() => {
      adaChain = new Chain();
      let block = new Block('2021/05/28', { credit: '81.17', tid: '912b6ba' });
      let block2 = new Block('2021/05/28', { debit: '-76.66', tid: '812bbaaa' });
      let block3 = new Block('2021/05/28', { debit: '-176.66', tid: '712bbaaa' });
      let block4 = new Block('2021/05/28', { credit: '176.66', tid: '612b6ba' });
      let block5 = new Block('2021/05/28', { credit: '76.66', tid: '512bbaaa' });
      let block6 = new Block('2021/05/28', { debit: '-716.16', tid: '412bbaaa' });

      adaChain.addBlock(block);
      adaChain.addBlock(block2);
      adaChain.addBlock(block3);
      adaChain.addBlock(block4);
      adaChain.addBlock(block5);
      adaChain.addBlock(block6);


    });
    test('8.1 Valid blocks in the chain isValid() function should return true', () => {
      expect(adaChain.isValid()).toBe(true);
    });
    test('8.2 Changing   value in the  type of transaction  in the 1st added Block  and its hash  will make chain isValid()  false ', () => {
      let tamperedBlock = adaChain.chain[1];
      tamperedBlock.transaction.credit = '1000000.00';
      tamperedBlock.hash = tamperedBlock.calculateHash();
      expect(adaChain.isValid()).not.toBe(true);
    });
    test('8.3 DANGEROUS !!!Changing   value in the  type of transaction  in the last added Block  and its hash  will NOT  make Chain isValid() false ', () => {
      let tamperedBlock = adaChain.lastBlock();
      tamperedBlock.transaction.debit = '-616.12';
      tamperedBlock.hash = tamperedBlock.calculateHash();
      expect(adaChain.isValid()).toBe(true);
    });
    test('8.4 Balance should not changed after trying to add a series of  faulty blocks\n  \t\t\t debit out of range, credit out of range etc.. \n \t\t  debit value is out of the range \n \t\t  the same ui \n \t\t  transaction type with typo ', () => {
      let balance = adaChain.balance();
      let block7 = new Block('2021/05/28', { debit: '-25.16' });
      adaChain.addBlock(block7);
      //debit value is out of the range 
      let block8 = new Block('2021/05/28', { debit: '716.16', tid: '412byhbaaa' });
      adaChain.addBlock(block8);
      //the same ui
      let block9 = new Block('2021/05/28', { credit: '-7.16', tid: '412byhbaaa' });
      adaChain.addBlock(block9);
      // transaction type with typo
      let block10 = new Block('2021/05/28', { Credit: '6.16', tid: 'uyiubaaa' });
      adaChain.addBlock(block10);
      // transaction type with typo
      let block11 = new Block('2021/05/28', { Debit: '-0.16', tid: '412byjfhghbaaa' });
      adaChain.addBlock(block11);
      let block12 = new Block('2023/05/28', { Credit: '6.16', tid: 'uyiubcxcxaaa' });
      adaChain.addBlock(block12);
      //transaction out of range
      let block13 = new Block('2021/05/28', { debit: '-10000.16', tid: 'p412byjfhghbaaa' });
      adaChain.addBlock(block13);

      expect(adaChain.balance()).toBe(balance);
    });
    test('8.5 BE CAREFUL !!!Changing  credit  type of transaction  in the 1st added Block will change the balance  ', () => {
      let balance = adaChain.balance();
      let tamperedBlock = adaChain.chain[1];
      tamperedBlock.transaction.credit = '1000000.00';
      expect(adaChain.balance()).not.toBe(balance);
    });

    test('8.6 DANGEROUS!! Changing   debit    type of transaction   in the last added Block  and changing a hash. \n \t\t\tAnother way Let\'s make a  hundred   and valid hacked chain', () => {
      let balance = adaChain.balance();
      let tamperedBlock = adaChain.lastBlock();
      tamperedBlock.transaction = { debit: '-0.12', tid: '98s7567aaa' };
      tamperedBlock.hash = tamperedBlock.calculateHash();

      expect(adaChain.balance()).not.toBe(balance);

    });

    test('8.7 DANGEROUS!! Changing   value   type of transaction   in the last added Block  and changing a hash. \n \t\t\t will make a  valid chain or hacked chain', () => {

      let tamperedBlock = adaChain.lastBlock();
      tamperedBlock.transaction = { debit: '-0.12', tid: 'ff987567aaa' };
      tamperedBlock.hash = tamperedBlock.calculateHash();


      expect(adaChain.isValid()).toBe(true);
    });
    test('8.8 Changing   date and hash  in the 1st added Block  should not work  ', () => {
      let tamperedBlock = adaChain.chain[0];
      tamperedBlock.ts = '2021/11/11';
      tamperedBlock.hash = tamperedBlock.calculateHash();
      expect(adaChain.isValid()).not.toBe(true);
    });
  });

});
