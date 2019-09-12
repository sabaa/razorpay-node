'use strict';
const Promise = require('promise');
const chai = require('chai');
const {assert} = chai;
const rzpInstance = require('../razorpay');
const mocker = require('../mocker');
const {getDateInSecs, normalizeDate, normalizeNotes} = require('../../dist/utils/razorpay-utils');
const {runCallbackCheckTest, runParamsCheckTest, runURLCheckTest, runCommonTests} = require('../../dist/utils/predefined-tests.js');
const SUB_PATH = '/plans', FULL_PATH = `/v1${ SUB_PATH }`, TEST_PLAN_ID = 'plan_testid', apiObj = rzpInstance.plans;
const runIDRequiredTest = params => {
    let {apiObj, methodName, methodArgs, mockerParams} = params;
    mocker.mock(mockerParams);
};
function done () {}

module.exports.test6_0 = function () {
{
    apiObj[methodName](...methodArgs).then(() => {
        done(new Error(`method ${ methodName } does not` + ` check for Plan ID`));
    }, err => {
        done();
    });
}}
