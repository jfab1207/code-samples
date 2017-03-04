/*jslint node: true, devel: true, nomen: true, indent: 4, maxerr: 50 */


var ObjectID = require('mongodb').ObjectID;
var _extend = require('util')._extend;

function MongoDBStrategy() {
    
    'use strict';
    
    var MongoStrategy = {};
	
	var domainNotRequired = ['countries_currencies', 'taxonomy', 'panel_translate', 'shop_translate', 'domains', 'users'];
	    
    ////// private method

    /*--------------------------------------------------------------
     * since http has no notion of type and everything is a string,
     * some data needs to be properly converted with parse int
     *-------------------------------------------------------------*/
	function parseParams (skip, limit) {
		skip = parseInt(skip, 10);
		limit = parseInt(limit, 10);
		
        return {
            skip : isNaN(skip) ? 0 : skip,
            limit : isNaN(limit) ? 40 : limit
        };
    }
    
    MongoStrategy.findAndModify = function (params, done) {
        
		if (domainNotRequired.indexOf(params.collection.s.name) === -1 && typeof params.query.domain !== 'string') {
			return done(new Error('[invalid document] missing domain name') , null);
		}
        
        params
            .collection
            .findAndModify(params.query, function (err, result) {
            
            if (err) {
                return done(new Error(err) , null);
            }
            return done(err, result);
        });
    };
    
    MongoStrategy.mapReduce = function(params, done) {
		
		
		if (domainNotRequired.indexOf(params.collection.s.name) === -1 && typeof params.query.domain !== 'string') {
			return done(new Error('[invalid document] missing domain name') , null);
		}
		
//		if (typeof params.productCategory === 'object' && params.productCategory !== null) {
//			console.log('[MongoStrategy.mapReduce] product category> ', params.productCategory.slug);
//			productCategories[params.productCategory.domain] = params.productCategory;
//		}
			
		params
          .collection
          .mapReduce(
			params.mapFunc, 
			params.reduceFunc, 
			{ 
				query: params.query, 
				out: { inline: 1}, 
				scope: {
					productCategory : params.productCategory,
					_extend: _extend
				} 
			}, function (err, result) {

				if(err) {
					//console.log('process.env', process.env);
					return done(new Error(err) , null);
				}
	//			console.log(result);
				return done(err, result);
			});
    };
    
    MongoStrategy.remove = function(params, done) {
        
		if (typeof params.query.domain !== 'string') {
			return done(new Error('[invalid document] missing domain name') , null);
		}
        
		if (typeof params.query._id === 'string') {
            params.query._id = new ObjectID(params.query._id);
        } 
        params
          .collection
          .remove(params.query, function (err, result) {
            
            if(err) {
                return done(new Error(err) , null);
            }
            return done(err, result);
        });
    };
    
    MongoStrategy.save = function(params, done) {
        
		if (typeof params.document.domain !== 'string') {
			return done(new Error('[invalid document] missing domain name') , null);
		}
//        if (typeof params.document._id === 'string') {
//            params.document._id = new ObjectID(params.document._id);
//        } 
        
        params
          .collection
          .save(params.document, function (err, result) {
            
            if(err) {
                return done(new Error(err) , null);
            }
            return done(err, result.ops[0]);
        });
    };
    
	// only for inserting multiple docs at a time ( array of docs )
    MongoStrategy.insert = function(params, done) {
        
        params
          .collection
          .insert(params.arr, function (err, result) {
            
            if(err) {
                return done(new Error(err) , null);
            }
            return done(err, result.ops[0]);
        });
    };
    
    MongoStrategy.update = function(params, done) {
        
        if (typeof params.criteria._id === 'string') {
            params.criteria._id = new ObjectID(params.criteria._id);
            if (params.update._id) {
                delete params.update._id;
            }
        } 
		
        params.options = params.options || {}; 
        //console.log(params.options);
        params.collection.update(params.criteria, params.update, params.options, function (err, response) {
            if(err) {
                return done(new Error(err) , null);
            }
			
			return done(err, response);
        });
    };
    
    MongoStrategy.queryOne = function(params, done) {
		
		if (domainNotRequired.indexOf(params.collection.s.name) === -1 && typeof params.query.domain !== 'string') {
			return done(new Error('[invalid document] missing domain name') , null);
		}
		
        params
          .collection
          .findOne(params.query, params.projection, function (err, doc) {
             
            if(err) {
                return done(new Error(err) , null);
            }
            
            return done(err, doc);
        });
    };
    
    MongoStrategy.query = function(params, done) {
        
        var p = parseParams(params.skip, params.limit),
			cnt,
			arr = params.query._id && params.query._id.$in;
		
		if (domainNotRequired.indexOf(params.collection.s.name) === -1 && typeof params.query.domain !== 'string') {
			return done(new Error('[invalid document] missing domain name') , null);
		}
		
		if (arr instanceof Array) {
			cnt = arr.length;
			while (cnt > 0) {
				cnt -= 1;
				if (typeof arr[cnt] === 'string' && arr[cnt].length === 24) {
			        arr[cnt] = new ObjectID(arr[cnt]);
				} 
			}
		}
		
        params
          .collection
          .find(params.query, params.projection)
          .sort(params.sort)
          .skip(p.skip)
          .limit(p.limit)
          .toArray(function (err, docs) {
             
            if(err) {
                return done(new Error(err) , null);
            }

            return done(err, docs);
        });
    };
	
    
    MongoStrategy.countDocs = function(params, done) {
        
		if (domainNotRequired.indexOf(params.collection.s.name) === -1 && typeof params.query.domain !== 'string') {
			return done(new Error('[invalid document] missing domain name') , null);
		}
		
        params
          .collection
          .count(params.query, function (err, total) {
             
            if(err) {
                return done(new Error(err) , null);
            }

            return done(err, total);
        });
    };
	
    
    MongoStrategy.queryStream = function(params, done) {
		
		if (domainNotRequired.indexOf(params.collection.s.name) === -1 && typeof params.query.domain !== 'string') {
			return done(new Error('[invalid document] missing domain name') , null);
		}
		
		return done(
			null, 
			params.collection
			.find(params.query, params.projection)
			.sort(params.sort)
			.skip(params.skip)
			.limit(params.limit) );
    };
    
    MongoStrategy.aggregate = function(params, done) {
        
		var domain = params.agg instanceof Array && params.agg[0] && params.agg[0].$match && params.agg[0].$match.domain;
		if (domainNotRequired.indexOf(params.collection.s.name) === -1 && typeof domain !== 'string') {
			return done(new Error('[invalid document] missing domain name') , null);
		}
		
        var obj, key, value, arr = [];
        params
          .collection
          .aggregate(params.agg)
          .toArray(function (err, docs) {
            
            if(err) {
                return done(new Error(err) , null);
            }

            return done(err, docs);
        });
    };
    
    return MongoStrategy;

}

module.exports = MongoDBStrategy;
