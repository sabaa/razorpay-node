'use strict';
const chai = require('chai');
const assert = chai.assert;
const equal = require('deep-equal');
const {normalizeDate, isNumber, normalizeBoolean, normalizeNotes, getDateInSecs, isDefined, getTestError, validateWebhookSignature} = require('../../dist/utils/razorpay-utils');
function done () {}

module.exports.test12_0 = function () {
{
    let date = 'Aug 25, 2016';
    assert.equal(normalizeDate(date), getDateInSecs(date), 'Returns date in secs');
}}

module.exports.test12_1 = function () {
{
    assert.equal(isNumber('0.3'), true, 'Number check');
    assert.equal(isNumber('abc'), false, 'Number check with alphabets');
}}

module.exports.test12_2 = function () {
{
    assert.equal(normalizeBoolean(undefined), undefined, 'When undefined is passed, just return it');
    assert.equal(normalizeBoolean(true), 1, 'Boolean check with true');
    assert.equal(normalizeBoolean(false), 0, 'Boolean check with false');
}}

module.exports.test12_3 = function () {
{
    assert.ok(equal(normalizeNotes({
        note1: 'This is note1',
        note2: 'This is note2'
    }), {
        'notes[note1]': 'This is note1',
        'notes[note2]': 'This is note2'
    }), 'Transforms the notes');
}}

module.exports.test12_4 = function () {
{
    assert.ok(!isDefined() && isDefined(''), 'Checks if the argument is defined');
}}

module.exports.test12_5 = function () {
{
    const error = getTestError('', '', '');
    assert.ok(error.constructor.name === 'Error', 'Gets common error for all tests');
}}

module.exports.test12_6 = function () {
{
    const respBody = '{"a":1,"b":2,"c":{"d":3}}', secret = '123456', correctSignature = '2fe04e22977002e6c7cb553adab8b460cb' + '9e2a4970d5953cb27a8472752e3bbc', wrongSignature = 'sdfafds';
    assert.ok(validateWebhookSignature(respBody, correctSignature, secret) && !validateWebhookSignature(respBody, wrongSignature, secret), 'Validates webhook signature');
}}
