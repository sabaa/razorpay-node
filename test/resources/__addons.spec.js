'use strict';
const Promise = require('promise');
const chai = require('chai');
const {assert} = chai;
const rzpInstance = require('../razorpay');
const mocker = require('../mocker');
const SUB_PATH = '/addons', FULL_PATH = `/v1${ SUB_PATH }`, TEST_ADDON_ID = 'addon_sometestid', apiObj = rzpInstance.addons;
const {runCommonTests} = require('../../dist/utils/predefined-tests.js');
const runIDRequiredTest = params => {
    let {apiObj, methodName, methodArgs, mockerParams} = params;
    mocker.mock(mockerParams);
};
function done () {}

module.exports.test1_0 = function () {
{
    apiObj[methodName](...methodArgs).then(() => {
        done(new Error(`method ${ methodName } does not` + ` check for Addon ID`));
    }, err => {
        done();
    });
}}
