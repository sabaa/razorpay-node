'use strict';
const Promise = require('promise');
const chai = require('chai');
const {assert} = chai;
const rzpInstance = require('../razorpay');
const mocker = require('../mocker');
const equal = require('deep-equal');
const {getDateInSecs, normalizeDate, normalizeNotes} = require('../../dist/utils/razorpay-utils');
const {runCallbackCheckTest, runParamsCheckTest, runURLCheckTest, runCommonTests} = require('../../dist/utils/predefined-tests.js');
const SUB_PATH = '/invoices', FULL_PATH = `/v1${ SUB_PATH }`, TEST_INVOICE_ID = 'inv_8l7Qvjbguwm3Dq', apiObj = rzpInstance.invoices;
const runIDRequiredTest = params => {
    let {apiObj, methodName, methodArgs, mockerParams} = params;
    mocker.mock(mockerParams);
};
function done () {}

module.exports.test3_0 = function () {
{
    apiObj[methodName](...methodArgs).then(() => {
        done(new Error(`method ${ methodName } does not` + ` check for Invoice ID`));
    }, err => {
        done();
    });
}}

module.exports.test3_1 = function () {
{
    mocker.mock({
        url: `${ SUB_PATH }/${ TEST_INVOICE_ID }/notify_by/${ undefined }`,
        method: 'POST'
    });
    apiObj[methodName](TEST_INVOICE_ID, undefined).then(() => {
        done(new Error('medium parameter is not checked for'));
    }).catch(() => {
        assert.ok('medium parameter is checked');
        done();
    });
}}
