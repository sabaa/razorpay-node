'use strict';
const chai = require('chai');
const {assert} = chai;
const rzpInstance = require('../razorpay');
const mocker = require('../mocker');
const equal = require('deep-equal');
const {getDateInSecs} = require('../../dist/utils/razorpay-utils');
function done () {}

module.exports.test7_0 = function () {
{
    let expectedParams = {
        skip: 0,
        count: 10
    };
    mocker.mock({ url: '/refunds' });
    rzpInstance.refunds.all().then(response => {
        assert.ok(equal(response.__JUST_FOR_TESTS__.requestQueryParams, expectedParams), 'skip & count are passed as default queryparams');
        done();
    });
}}

module.exports.test7_1 = function () {
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
    mocker.mock({ url: '/refunds' });
    rzpInstance.refunds.all({
        from: fromDate,
        to: toDate,
        count: 25,
        skip: 5
    }).then(response => {
        assert.ok(equal(response.__JUST_FOR_TESTS__.requestQueryParams, expectedParams), 'from & to dates are converted to ms');
        assert.equal(response.__JUST_FOR_TESTS__.url, `/v1/refunds?from=${ fromDateInSecs }&to=${ toDateInSecs }&count=25&skip=5`, 'Params are appended as part of request');
        done();
    });
}}

module.exports.test7_2 = function () {
{
    let paymentId = 'pay_sometestId';
    let params = { payment_id: paymentId };
    mocker.mock({ url: `/payments/${ paymentId }/refunds` });
    rzpInstance.refunds.all(params).then(response => {
        assert.equal(response.__JUST_FOR_TESTS__.url, `/v1/payments/${ paymentId }/refunds?count=10&skip=0`, 'Url is formed');
        done();
    });
}}

module.exports.test7_3 = function () {
{
    assert.throws(rzpInstance.refunds.fetch, '`refund_id` is mandatory', 'Should throw exception when refundId is not provided');
}}

module.exports.test7_4 = function () {
{
    let refundId = 'rfn_sometestId';
    mocker.mock({ url: `/refunds/${ refundId }` });
    rzpInstance.refunds.fetch(refundId).then(response => {
        assert.equal(response.__JUST_FOR_TESTS__.url, `/v1/refunds/${ refundId }`, 'Fetch refund url formed correctly');
        done();
    });
}}

module.exports.test7_5 = function () {
{
    let paymentId = 'pay_sometestId';
    let refundId = 'rfn_sometestId';
    let params = { payment_id: paymentId };
    mocker.mock({ url: `/payments/${ paymentId }/refunds/${ refundId }` });
    rzpInstance.refunds.fetch(refundId, params).then(response => {
        assert.equal(response.__JUST_FOR_TESTS__.url, `/v1/payments/${ paymentId }/refunds/${ refundId }`, 'Url is formed');
        done();
    });
}}
