'use strict';
const chai = require('chai');
const {assert} = chai;
const rzpInstance = require('../razorpay');
const mocker = require('../mocker');
const equal = require('deep-equal');
const {getDateInSecs} = require('../../dist/utils/razorpay-utils');
const {runCommonTests} = require('../../dist/utils/predefined-tests.js');
const TEST_PAYMENT_ID = 'pay_sometestId';
function done () {}

module.exports.test5_0 = function () {
{
    let expectedParams = {
        skip: 0,
        count: 10
    };
    mocker.mock({ url: '/payments' });
    rzpInstance.payments.all().then(response => {
        assert.ok(equal(response.__JUST_FOR_TESTS__.requestQueryParams, expectedParams), 'skip & count are passed as default payments queryparams');
        done();
    });
}}

module.exports.test5_1 = function () {
{
    let fromDate = 'Aug 25, 2016';
    let toDate = 'Aug 30, 2016';
    let fromDateInSecs = getDateInSecs(fromDate);
    let toDateInSecs = getDateInSecs(toDate);
    let expectedParams = {
        from: fromDateInSecs,
        to: toDateInSecs,
        count: 25,
        skip: 5
    };
    mocker.mock({ url: '/payments' });
    rzpInstance.payments.all({
        from: fromDate,
        to: toDate,
        count: 25,
        skip: 5
    }).then(response => {
        assert.ok(equal(response.__JUST_FOR_TESTS__.requestQueryParams, expectedParams), 'from & to dates are converted to ms');
        assert.equal(response.__JUST_FOR_TESTS__.url, `/v1/payments?from=${ fromDateInSecs }&to=${ toDateInSecs }&count=25&skip=5`, 'Params are appended as part of request');
        done();
    });
}}

module.exports.test5_2 = function () {
{
    assert.throws(rzpInstance.payments.fetch, '`payment_id` is mandatory', 'Should throw exception when paymentId is not provided');
}}

module.exports.test5_3 = function () {
{
    let paymentId = 'pay_sometestId';
    mocker.mock({ url: `/payments/${ paymentId }` });
    rzpInstance.payments.fetch(paymentId).then(response => {
        assert.equal(response.__JUST_FOR_TESTS__.url, `/v1/payments/${ paymentId }`, 'Fetch payment url formed correctly');
        done();
    });
}}

module.exports.test5_4 = function () {
{
    assert.throws(rzpInstance.payments.capture, '`payment_id` is mandatory', 'Should throw exception when no args are provided');
    try {
        rzpInstance.payments.capture('pay_sometestId');
    } catch (e) {
        assert.equal(e.message, '`amount` is mandatory', 'throw exception when amount is not provided');
    }
}}

module.exports.test5_5 = function () {
{
    let paymentId = 'pay_sometestId';
    let captureAmount = 100;
    let currency = 'INR';
    mocker.mock({
        url: `/payments/${ paymentId }/capture`,
        method: 'POST'
    });
    rzpInstance.payments.capture(paymentId, captureAmount, currency).then(response => {
        assert.equal(response.__JUST_FOR_TESTS__.url, '/v1/payments/pay_sometestId/capture', 'Capture request url formed');
        assert.ok(equal(response.__JUST_FOR_TESTS__.requestBody, {
            amount: captureAmount,
            currency
        }), 'Amount is passed in request body');
        done();
    });
}}

module.exports.test5_6 = function () {
{
    assert.throws(rzpInstance.payments.refund, '`payment_id` is mandatory', 'Throw exception when payment_id is not provided');
}}

module.exports.test5_7 = function () {
{
    let paymentId = 'pay_sometestId';
    let refundAmount = 100;
    mocker.mock({
        url: `/payments/${ paymentId }/refund`,
        method: 'POST'
    });
    rzpInstance.payments.refund(paymentId, {
        amount: refundAmount,
        notes: {
            note1: 'This is note1',
            note2: 'This is note2'
        }
    }).then(response => {
        assert.equal(response.__JUST_FOR_TESTS__.url, '/v1/payments/pay_sometestId/refund', 'Refund request url formed');
        assert.ok(equal(response.__JUST_FOR_TESTS__.requestBody, {
            amount: refundAmount,
            'notes[note1]': 'This is note1',
            'notes[note2]': 'This is note2'
        }), 'Amount & notes are passed in request body');
        done();
    });
}}

module.exports.test5_8 = function () {
{
    assert.throws(rzpInstance.payments.transfer, '`payment_id` is mandatory', 'Throw exception when payment_id is not provided');
}}

module.exports.test5_9 = function () {
{
    let paymentId = 'pay_sometestpayId';
    mocker.mock({
        url: `/payments/${ paymentId }/transfers`,
        method: 'POST'
    });
    rzpInstance.payments.transfer(paymentId, {
        transfers: [{
                account: 'acc_7jO4N6LScw5CEG',
                amount: 100,
                currency: 'INR',
                on_hold: true
            }],
        notes: {
            note1: 'This is note1',
            note2: 'This is note2'
        }
    }).then(response => {
        assert.equal(response.__JUST_FOR_TESTS__.url, '/v1/payments/pay_sometestpayId/transfers', 'Payment transfer request URL formed');
        assert.ok(equal(response.__JUST_FOR_TESTS__.requestBody, {
            'transfers[0][account]': 'acc_7jO4N6LScw5CEG',
            'transfers[0][amount]': 100,
            'transfers[0][currency]': 'INR',
            'transfers[0][on_hold]': 1,
            'notes[note1]': 'This is note1',
            'notes[note2]': 'This is note2'
        }), 'Correct params are passed in request body');
        done();
    });
}}

module.exports.test5_10 = function () {
{
    rzpInstance.payments.bankTransfer().then(() => {
        done(new Error(`method bankTransfer does not check` + ` for payment_id`));
    }, () => {
        done();
    });
}}
