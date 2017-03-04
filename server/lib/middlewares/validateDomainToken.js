/*jslint node: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

'use strict';

var config = require('../../config.js'),
	AccountService = require('../services/accounts'),
    winstonLogger = require("../winston-logger");

function validateDomain(service) {
	
	return function validate(req, res, next) {
		
		if (service instanceof AccountService) {
			
			service.validateDomain(req.headers.host, function (err, doc) {
				if (err) {
					winstonLogger.error('[validateDomain middleware] ' + err);
					return next(err);
				}

				if (doc === null) {
					//winstonLogger.warn('[validateDomain middleware] account not found');
					next(new Error('account not found'));
				} else {
					//winstonLogger.info('[validateDomain middleware] OK');
					req.query.domain = doc.domain_token;
					next();
				}
			});
			
		} else {
			next(new Error('service is not available'));
		}
		
	};
}


module.exports = validateDomain;
