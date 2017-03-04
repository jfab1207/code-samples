/*jslint node: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/**
 * purpose :      Helper for handling interactions with the collections in mongo
 * collections :  all
 */

'use strict';

var async = require('async'),
	_extend = require('util')._extend,
	winstonLogger = require("../../../winston-logger"),
	parseQuery = require("../../../utils/parseQueryString"),
	getObjectSize = require("../../../utils/getObjectSize");



exports.addStrategy = function(dbStrategies, collections) {

    //////------- private method
	var tasks;
	
	function callbackQueryFn(err, doc) {
		if (err) {
			return err;
		}
		
		return doc;
	}	
	
	tasks = {
		
		buildStore: function(req, res, next) {

            var query = {
					domain: req.query.domain
				},
				params = {
					query: {}
				},
				projection = parseQuery(req.query.projection) || {}, 
				translateProjection = {},
				storeProjection = {},
				uid = req.params.uid;
			
			if (projection.translate) {
				translateProjection[projection.translate] = 1;
				translateProjection._id = 0;
			}
			if (projection.store) {
				storeProjection[projection.store] = 1;
			}

			var findPanelLang = function (callbackQueryFn) {
				
				winstonLogger.info('[merging - buildstore] 2. getting panel language');
				dbStrategies.queryOne({
					"query": { "language": req.query.lang },
					"projection" : translateProjection,
					"collection": collections.panel_translate
				}, {}, callbackQueryFn);
			};
			
			//countries_currencies
			var findCountries = function (result, callbackQueryFn) {
				
				winstonLogger.info('[merging - buildstore] 1. getting countries and currencies');
				dbStrategies.queryOne({
					"query": {},
					"projection" : {},
					"collection": collections.countries_currencies
				}, result, callbackQueryFn);
			};

			var findStore = function (result, callbackQueryFn) {

				winstonLogger.info('[merging - buildstore] 3. getting store data');
				dbStrategies.queryOne({
					"query": _extend({ "uid" : uid }, query),
					"projection" : storeProjection,
					"collection": collections.stores
				}, result, callbackQueryFn);
			};
					
			async.waterfall([
				findPanelLang,
				findCountries,
				findStore
			], function (err, results) {

				if (err) {
					winstonLogger.error('[buildStore-helpers : async callback] ' + err);
					return res.status(500).send({});
				}

				return res.status(200).send(results);
			});

			
        }

    };
    
    return tasks;

};


