'use strict';
const chai = require('chai');
const assert = chai.assert;
const Razorpay = require('../dist/razorpay');
function done () {}

module.exports.test0_0 = function () {
{
    try {
        new Razorpay();
    } catch (e) {
        assert.equal(e.message, '`key_id` is mandatory');
    }
    try {
        new Razorpay({ key_id: 'XXX' });
    } catch (e) {
        assert.equal(e.message, '`key_secret` is mandatory');
    }
}}

module.exports.test0_1 = function () {
{
    let instance = new Razorpay({
        key_id: 'XXX',
        key_secret: 'YYY'
    });
    assert.equal(instance.key_id, 'XXX');
    assert.equal(instance.key_secret, 'YYY');
}}
