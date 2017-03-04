/**
 * @name customedStyles
 * @desc directives for prepending a style tag inside the <head/>
 *       general css customization for H1/background/borders etc.
 * @param utilityService
 * @returns --
 * @memberOf : 'directives.utilities'
 */

(function () {
    
    'use strict';
    
	angular.module('directives.utilities.customedStyles', []);

    
    /**
     * @ngInject
     */
    
    function veCustomedStyles (utilityService) {
        
        var directive;
		
		////-----
        function linkFn(scope, element, attrs){

			var stylesListener,
				getObjectSize = angular.copy(utilityService.getObjectSize);
			
			stylesListener = attrs.$observe("veCustomedStyles", function (styleObj) {
				var outputSheet = '',
					styles = scope.$eval(attrs.veCustomedStyles),
					size = getObjectSize(styles),
					tags = {},
					selector;
				
				if (size) {
					for (selector in styles) {
						if (styles.hasOwnProperty(selector) && styles[selector] instanceof Array) {
							if (selector.indexOf('-')>-1) {
								outputSheet += '.' + selector + '{' + styles[selector].join(';') + '}';
							} else {
								outputSheet += selector + '{' + styles[selector].join(';') + '}';
							}
							
						}
					}
					angular.element(document).find('head').prepend('<style type="text/css">' + outputSheet + '</style>');
					getObjectSize = null;
					stylesListener();
					attrs.veCustomedStyles = '';
				}
			});
			
			
			
			scope.$on("$destroy", function () {
				// destroying stylesListner
				stylesListener();
			});
			
        }
		
        directive = {
            link: linkFn
        };
        
        return directive;
    }
	
	angular
      .module('directives.utilities.customedStyles')
      .directive('veCustomedStyles', veCustomedStyles);
    
}());
