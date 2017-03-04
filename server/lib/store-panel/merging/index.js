/*jslint node: true , bitwise: true*/
'use strict';

var merginRouter = require('express').Router(),
	winstonLogger = require("../../winston-logger"),
	config = require('../../../config.js'),
	merging = require("./strategies/merging").mergingStrategy();
var AccountService = require('../../services/accounts');

exports.addRoutes = function (db) {
	
	var merginStrategies,
		collections = config && config.mongo && config.mongo.collections,
		accountService = new AccountService(db.collection(config.mongo.collections.domains));
	
	if (!collections) {
		throw new Error('[lib/collections - merging] collections undefined or null');
	}
	
	/*---------------------------------
	 * adding route for products
	 *--------------------------------*/
	// 1. set mongodb strategies
	merginStrategies = merging.init(db);
	
	// 2. routes specifics - helper
	var storeHelper = require('./helpers/store').addStrategy(merginStrategies, collections);
	
	// 3. add routes
	var storeRoutes = require('./routes/store').addRoutes(storeHelper, accountService);
	
	// 4. mount
	merginRouter.use('/store', storeRoutes);

	
	return merginRouter;
};
