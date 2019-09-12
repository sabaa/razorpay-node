'use strict';
const chai = require('chai');
const assert = chai.assert;
const nodeify = require('../../dist/utils/nodeify');
function done () {}

module.exports.test11_0 = function () {
{
    let data = 'some success data';
    nodeify(Promise.resolve(data), (err, response) => {
        assert.equal(response, data, 'Passes the resolved data');
        assert.isNotOk(err, 'Error should be passed as null');
        done();
    });
}}

module.exports.test11_1 = function () {
{
    let errorMsg = 'some error';
    nodeify(Promise.reject(errorMsg), (err, response) => {
        assert.equal(err, errorMsg, 'Callback is invoked with error');
        assert.isNotOk(response, 'Response is null');
        done();
    });
}}
