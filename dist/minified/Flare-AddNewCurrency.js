(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @namespace FlareCollection
 */
/*:
 * Flare Collection - Currency
 *
 * @plugindesc Allows you to add a new currency or set of currencies to the game
 * such currencies can include things like "clay pot" or "silver coin" they are then
 * used in shops.
 * @author Adam Balan (AKA: DarknessFalls)
 *
 * @help
 * There is no Configuration and Plugin Command.
 *
 * ============================================================================
 *
 * States
 * To make a state to be retained on death, use the following notetag:
 *   <retain on death>
 *
 * ============================================================================
 */
/**
 * Allows us to add a new currency type
 *
 * We want to be able to specify a new currency type
 * or set of types based on currencies that exist.
 *
 * Depends upon the Flare-CurrencyShop Plugin
 */
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var FlareCurrency={};exports.FlareCurrency=FlareCurrency;
},{}]},{},[1])