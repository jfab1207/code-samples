/*global define, FastClick */
/**
 * @name configFn
 * @desc sets the routes in config
 * @param --
 * @returns --
 * @memberOf app
 */
(function () {
    
    'use strict';
    
     /* @ngInject */ 

	var baseUrl = '/store-panel/store';
	
    function configFn($urlRouterProvider, $locationProvider, $stateProvider, securityAuthorizationProvider) {
		
		
		/*-----------------------------------------------------
         * return value : config Object for home route
         *----------------------------------------------------*/
        function storeConfigFn() {
			
            return {

				url : baseUrl,
				views : {
					"topBar" : {
                        controller: 'BarController as barCtrl',
                        templateUrl : 'topbar/topbar.tpl.html'
					},
					"" : {
                        templateUrl : 'store/store.tpl.html',
                        controller : 'StoreController as storeCtrl'
                    },
					"content@store" : {
                        controller: 'ContentController as contentCtrl',
                        templateUrl : 'store/content/content.tpl.html'
					},
					"notes@store" : {
                        controller: 'NotesController as notesCtrl',
                        templateUrl : 'store/notes/notes.tpl.html'
					}
                },

                resolve : { /* @ngInject */ 
					authUser: securityAuthorizationProvider.requireAuthenticatedUser,
                    // set localStorage
                    storage: ["storageManager", "authUser", function (manager, authUser) {
                        if (typeof authUser !== 'undefined') {
							manager.setLocalStorage(authUser.slug);
						}
                    }],
                    commonData: ["itemManager", "authUser", function (manager, authUser) {
						return manager.getStoreData(authUser);
                    }]
                }
            };
		}
		
		/*-----------------------------------------------------
         * return value : config Object for home route
         *----------------------------------------------------*/
        function storeInfosConfigFn() {
			
            return {

				url : '/infos',
				views : {
                    "@" : {
                        controller: 'InfosController as infosCtrl',
                        templateUrl : 'store/infos/infos.tpl.html'
					},
					"topBar@" : {
                        controller: 'EditBarController as editbarCtrl',
                        templateUrl : 'topbar/editbar.tpl.html'
					}
                }
            };
		}
		
		/*-----------------------------------------------------
         * return value : config Object for home route
         *----------------------------------------------------*/
        function storeProductsConfigFn() {
			
            return {

				url : '/products',
				views : {
                    "@" : {
                        controller: 'ProductsController as prodsCtrl',
                        templateUrl : 'store/products/products.tpl.html'
					},
					"topBar@" : {
                        controller: 'EditBarController as editbarCtrl',
                        templateUrl : 'topbar/editbar.tpl.html'
					}
                }
            };
		}
		/*-----------------------------------------------------
         * return value : config Object for home route
         *----------------------------------------------------*/
        function storeProductTypesConfigFn() {
			
            return {

				url : '/product-types',
				views : {
                    "@" : {
                        controller: 'ProductTypesController as typesCtrl',
                        templateUrl : 'store/product-types/types.tpl.html'
					},
					"topBar@" : {
                        controller: 'EditBarController as editbarCtrl',
                        templateUrl : 'topbar/editbar.tpl.html'
					}
                },

                resolve : { /* @ngInject */ 
					taxonomy: ["itemManager", "commonData", function (manager, commonData) {
						var store = commonData && commonData.stores,
							categories = store && store.categories;
						return manager.getTaxonomy(categories);
                    }]
                }
            };
		}
		
		/*-----------------------------------------------------
         * return value : config Object for home route
         *----------------------------------------------------*/
        function storeLanguagesConfigFn() {
			
            return {

				url : '/languages-currencies',
				views : {
                    "@" : {
                        controller: 'LangCurrenciesController as langCtrl',
                        templateUrl : 'store/languages/languages-currencies.tpl.html'
					},
					"topBar@" : {
                        controller: 'EditBarController as editbarCtrl',
                        templateUrl : 'topbar/editbar.tpl.html'
					}
                }
            };
		}
		
		/*-----------------------------------------------------
         * return value : config Object for home route
         *----------------------------------------------------*/
        function storeContactConfigFn() {
			
            return {

				url : '/contact',
				views : {
                    "@" : {
                        controller: 'ContactController as contactCtrl',
                        templateUrl : 'store/contact/contact.tpl.html'
					},
					"topBar@" : {
                        controller: 'EditBarController as editbarCtrl',
                        templateUrl : 'topbar/editbar.tpl.html'
					}
                }
            };
		}
		
		/*-----------------------------------------------------
         * return value : config Object for home route
         *----------------------------------------------------*/
        function storeShippingConfigFn() {
			
            return {

				url : '/shipping',
				views : {
                    "@" : {
                        controller: 'ShippingController as shippingCtrl',
                        templateUrl : 'store/shipping/shipping.tpl.html'
					},
					"topBar@" : {
                        controller: 'EditBarController as editbarCtrl',
                        templateUrl : 'topbar/editbar.tpl.html'
					}
                }
            };
		}
		/*-----------------------------------------------------
         * return value : config Object for home route
         *----------------------------------------------------*/
        function storeCriteriasConfigFn() {
			
            return {

				url : '/products-criterias',
				views : {
                    "@" : {
                        controller: 'ProductCriteriasController as critCtrl',
                        templateUrl : 'store/product-criterias/criterias.tpl.html'
					},
					"topBar@" : {
                        controller: 'EditBarController as editbarCtrl',
                        templateUrl : 'topbar/editbar.tpl.html'
					}
                }
            };
		}
		/*-----------------------------------------------------
         * return value : config Object for home route
         *----------------------------------------------------*/
        function storePOSConfigFn() {
			
            return {

				url : '/points-of-sales',
				views : {
                    "@" : {
                        controller: 'PointsOfSalesController as posCtrl',
                        templateUrl : 'store/points-of-sales/pointsofsales.tpl.html'
					},
					"topBar@" : {
                        controller: 'EditBarController as editbarCtrl',
                        templateUrl : 'topbar/editbar.tpl.html'
					}
                }
            };
		}
		/*-----------------------------------------------------
         * return value : config Object for home route
         *----------------------------------------------------*/
        function storeSocialsConfigFn() {
			
            return {

				url : '/socials',
				views : {
                    "@" : {
                        controller: 'SocialsController as socCtrl',
                        templateUrl : 'store/socials/socials.tpl.html'
					},
					"topBar@" : {
                        controller: 'EditBarController as editbarCtrl',
                        templateUrl : 'topbar/editbar.tpl.html'
					}
                }
            };
		}
				/*-----------------------------------------------------
         * return value : config Object for home route
         *----------------------------------------------------*/
        function storeSeoConfigFn() {
			
            return {

				url : '/seo',
				views : {
                    "@" : {
                        controller: 'SeoController as seoCtrl',
                        templateUrl : 'store/seo/seo.tpl.html'
					},
					"topBar@" : {
                        controller: 'EditBarController as editbarCtrl',
                        templateUrl : 'topbar/editbar.tpl.html'
					}
                }
            };
		}
		
		
		
		///// ----  STATES DEF
		$stateProvider.state('store', storeConfigFn());
		$stateProvider.state('store.infos', storeInfosConfigFn());         //
		$stateProvider.state('store.products', storeProductsConfigFn());   //
		$stateProvider.state('store.types', storeProductTypesConfigFn());  //
		$stateProvider.state('store.languages', storeLanguagesConfigFn()); //
		$stateProvider.state('store.contact', storeContactConfigFn());     //
		$stateProvider.state('store.shipping', storeShippingConfigFn());   //
		$stateProvider.state('store.criterias', storeCriteriasConfigFn()); //
		$stateProvider.state('store.pos', storePOSConfigFn());             //
		$stateProvider.state('store.socials', storeSocialsConfigFn());     //
		$stateProvider.state('store.seo', storeSeoConfigFn());             //
		

		
		// $urlMatcherFactory.caseInsensitive(true); for a similar result.
		$urlRouterProvider.rule(function ($injector, $location) {
			var url = $location.path() || baseUrl,
				hasTrailingSlash = url[url.length-1] === '/',
				base = location.pathname && location.pathname.split('/')[2],
				normalized = base && (base.split('#')[0]).toLowerCase();

			if (normalized && ('store' !== normalized)) {
				location.replace(url);
			} else if (hasTrailingSlash) {
				return url.substr(0, url.length - 1);
			}
		});
        
        $locationProvider.html5Mode({
          enabled: true //          , requireBase: false
        });
    }
    

    function runFn(itemManager, storageManager,security, $state, $rootScope, $document, $window) {
		
		$window.onpopstate = function(event) {
			
			var newState = 'store',
				currentState = $state.current.name,
				currentPage,
				pathname = $window.location.pathname,
				path = pathname && pathname.split('/'),
				notify,
				section,
				routeParams = {};
			
			if (!(path instanceof Array) || path.length < 2) {
				$window.location.replace('/store-panel');
			} else if (path[2] !== newState) {
				$window.location.replace(pathname);
			} else {
				
				switch (path[3]) {
					case 'product-types': newState += '.types'; break;
					case 'languages-currencies': newState += '.languages'; break;
					case 'products-criterias': newState += '.criterias'; break;
					case 'points-of-sales': newState += '.pos'; break;
					default: 
						
						if ('string' === typeof path[3]) {
							newState += '.' + path[3]; // [2] [3] e.g.- store.seo
						}
						break;
				}
				
				if (currentState !== newState && 'string' === typeof newState) {
					notify = newState.split('.').length > currentState.split('.').length;
					$state.go(newState, routeParams, {reload:true, notify: notify});
				}
			}
		};
		
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
			var scrollTop = toState.name===fromState.name ? 90 : 0;
			$document[0].body.scrollTop = scrollTop;
			$document[0].documentElement.scrollTop = scrollTop;
		});
		
    }
    
        
    angular
        .module('appStore')
        .config(configFn)
        .run(runFn);
    
}());
