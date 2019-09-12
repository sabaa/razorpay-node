'use strict';
const Promise = require('promise');
const chai = require('chai');
const {assert} = chai;
const rzpInstance = require('../razorpay');
const mocker = require('../mocker');
const equal = require('deep-equal');
const {getDateInSecs, normalizeDate, normalizeNotes} = require('../../dist/utils/razorpay-utils');
const {runCallbackCheckTest, runParamsCheckTest, runURLCheckTest, runCommonTests} = require('../../dist/utils/predefined-tests.js');
const SUB_PATH = '/subscriptions', FULL_PATH = `/v1${ SUB_PATH }`, TEST_SUBSCRIPTION_ID = 'sub_sometestid', apiObj = rzpInstance.subscriptions;
const runIDRequiredTest = params => {
    let {apiObj, methodName, methodArgs, mockerParams} = params;
    mocker.mock(mockerParams);
};
function done () {}

module.exports.test8_0 = function () {
{
    apiObj[methodName](...methodArgs).then(() => {
        done(new Error(`method ${ methodName } does not` + ` check for Subscription ID`));
    }, err => {
        done();
    });
}}

module.exports.test8_1 = function () {
{
    apiObj.cancel(TEST_SUBSCRIPTION_ID, null).then(() => {
        done(new Error('Datatype is not checked for the arguments'));
    }, () => {
        done();
    });
}}
