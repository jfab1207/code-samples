/*jslint node: true , bitwise: true*/
'use strict';

var router = require('express').Router();

var validateDomain = require('../../../middlewares/validateDomainToken');

exports.addRoutes = function (merginHelper, accountService) {
	
	router.get('/:uid', validateDomain(accountService), merginHelper.buildStore);
	
	return router;
};
