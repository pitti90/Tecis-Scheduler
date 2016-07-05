angular.module('idp', [
    'ui.router',
    'ngSanitize',
    'ui.bootstrap',
    'dialogs.main',
    'pascalprecht.translate',
    'restangular',
    'infinite-scroll',
    'tmh.dynamicLocale',
    'angularValidator',
    'ui.select',
    'ngFileUpload',
    'ngIdle',
    'blockUI',
    'ab-base64',
    'prettyXml'
])

    .config(function ($translateProvider, tmhDynamicLocaleProvider) {
        $translateProvider.useLoader('TranslateLoader', {
            paths: [
                "lang/${key}.json"
            ]
        });

        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
        $translateProvider.useMessageFormatInterpolation();
        $translateProvider.preferredLanguage('de');

        tmhDynamicLocaleProvider.localeLocationPattern('/idp.content/assets/lib/angular-i18n/angular-locale_{{locale}}.js');
    })

    .config(function(dialogsProvider){
        dialogsProvider.useBackdrop('static');
        dialogsProvider.useCopy(false);
        dialogsProvider.setSize('sm');
        dialogsProvider.useAnimation(true);
    })

    .config(function($tooltipProvider){
        $tooltipProvider.setTriggers({
            'mouseenter': 'mouseleave',
            'click': 'click',
            'focus': 'blur',
            'customTooltipStart': 'customTooltipEnd',
            'customTooltipStart_PersDaten' : 'customTooltipStop_PersDaten',
            'customTooltipStart_Family' : 'customTooltipStop_Family',
            'never': 'mouseleave' // <- This ensures the tooltip will go away on mouseleave
        });
    })

    .config(function (datepickerConfig) {
        datepickerConfig.startingDay = 1; // Start at monday
    })
    .config(function (datepickerPopupConfig) {
        datepickerPopupConfig.appendToBody = true;
    })
    .config(function(KeepaliveProvider, IdleProvider) {
        IdleProvider.idle(1);
        // Logout nach 10 min
//        IdleProvider.timeout(600);
        IdleProvider.timeout(600);
        KeepaliveProvider.interval(1);
    })
    .config(function(blockUIConfig) {
        blockUIConfig.message = 'Wird geladen...';
        blockUIConfig.delay = 100;
    })
	.config(function ($httpProvider) {
	    $httpProvider.defaults.withCredentials = true;
	})    
	.run(function($rootScope){
		$rootScope.errorMap = $rootScope.errorMap || {};
		$rootScope.successMap = $rootScope.successMap || {};
		$rootScope.infoMap = $rootScope.infoMap || {};
		$rootScope.warnMap = $rootScope.warnMap || {};
		$rootScope.debugMap = $rootScope.debugMap || {};
	})
    .run(function ($rootScope, LocaleService, tmhDynamicLocale, $translate) {
        tmhDynamicLocale.set(LocaleService.getLang().toLowerCase());
        var update = function () {
            var langKey = LocaleService.getLang();
            if (['de', 'en'].indexOf(langKey) === -1) langKey = 'de';
            $translate.use(langKey);
        };
        $rootScope.$on('$localeChangeSuccess', function () {
            update();
        });
        update();
    })
    .run(function ($rootScope, $translate, $locale, datepickerPopupConfig) {
        var update = function () {
            datepickerPopupConfig.currentText = $translate.instant('datepicker.btnToday');
            datepickerPopupConfig.clearText = $translate.instant('datepicker.btnClear');
            datepickerPopupConfig.closeText = $translate.instant('datepicker.btnClose');
            datepickerPopupConfig.datepickerPopup = $translate.instant('datepicker.dateFormat');
        };
        $rootScope.$on('$translateChangeSuccess', function () {
            update();
        });
        update();
    })
    .run(function($rootScope, $window, $timeout) {
        $rootScope.$on('$stateChangeSuccess', function(evt, absNewUrl, absOldUrl){
            $window.scrollTo(0,0);    //scroll to top of page after each route change
        });
        
        $rootScope.fireCustomTooltipStart = function () {
            $timeout(function () {
                $('#tooltipTarget').trigger('customTooltipStart');
            }, 0);
        };

        $rootScope.fireCustomTooltipEnd = function () {
            $timeout(function () {
                $('#tooltipTarget').trigger('customTooltipEnd');
            }, 0);
        };
        
    })
    .run(function($rootScope, $state, Idle, Keepalive, $modal) {
        Idle.watch();
        $rootScope.started = true;

        $rootScope.$on('IdleTimeout', function() {
        	// Only watch if server returned a logout url.
        	
        	$rootScope.logoutTimeOut();
        	$state.go('logout');
        	
        });
    })
    .run(function($rootScope, $state, formUtils, $window){
    	$rootScope.toNextPage = function(response, nextPage){
    		$rootScope.errorMap = $rootScope.idpInfo['errorMap'] || $rootScope.errorMap;
    		$rootScope.successMap = $rootScope.idpInfo['successMap'] || $rootScope.successMap;
    		$rootScope.infoMap = $rootScope.idpInfo['infoMap'] || $rootScope.infoMap;
    		$rootScope.warnMap = $rootScope.idpInfo['warnMap'] || $rootScope.warnMap;
    		$rootScope.debugMap = $rootScope.idpInfo['debugMap'] || $rootScope.debugMap;
    		
    		nextPage = nextPage || $rootScope.idpInfo['fragment'];
    		if (!nextPage) return;
    		if(nextPage=='302' || nextPage=='303' || nextPage=='307'){ // redirect to location header.
    			var redirectUrl = response.headers['Location'];
    			var hash = redirectUrl.split('#')[1];
    			if(hash){
        			$window.location = redirectUrl;
        			$window.location.hash = hash;
    			} else {
        			$window.location = redirectUrl;
    			}
    			return true;
    		}
			if(formUtils.isUrl(nextPage)){
    			var hash = nextPage.split('#')[1];
    			if(hash){
	    			$window.location = nextPage;
	    			$window.location.hash = hash;
    			} else {
        			$window.location = nextPage;    				
    			}
				return true;
			} else {
				if(nextPage!=$rootScope.currentFragment){
					$rootScope.currentFragment = nextPage;
					$state.go(nextPage);
					return true;
				} else {
					return false;
				}
			}
			return false;
    	};
        $rootScope.home = function() {
			$state.go('home');
        }
    })
	.run(function($rootScope, base64, formUtils, $http, $location, $window, $sce, $state){
		$rootScope.idpInfo = $rootScope.idpInfo || {};
		var search = $window.location.search;
		formUtils.loactionSearch(search, $rootScope.idpInfo);

		if(!$rootScope.idpInfo['code']){
			$rootScope.debugMap = formUtils.addMessagesFor("Missing query param code", $rootScope.debugMap);
			$rootScope.requestPossible = false;
		} else {
			$rootScope.code = $rootScope.idpInfo['code'];  
		}
		if(!$rootScope.idpInfo['realm']){
			$rootScope.debugMap = formUtils.addMessagesFor("Missing query param realm", $rootScope.debugMap);
			$rootScope.requestPossible = false;
		} else {
			$rootScope.realm = $rootScope.idpInfo['realm'];  			
		}
        $rootScope.$on('$stateChangeSuccess', function () {
    		var hash = $window.location.hash;
    		if(!hash || hash.length<2) return;
    		if(formUtils.startsWith(hash, '#'))
    			hash = hash.substring(1, hash.length);
    			if(formUtils.startsWith(hash, '/'))
    				hash = hash.substring(1, hash.length);
    		$rootScope.currentFragment = hash;
        });
        $rootScope.cancel = function () {
        	$rootScope.logoutRedirect();
        };    
		$rootScope.logoutRedirect = function() {
	    	if(!$rootScope.realm)return;
	    	var url = '/auth/realms/'+$rootScope.realm+'/protocol/openid-connect/logout';
	    	$rootScope.doGet(true, url, 'zkl.login', $rootScope.login);
	    	
        };
        $rootScope.logoutTimeOut = function(){
	    	if(!$rootScope.realm)return;
	    	var url = '/auth/realms/'+$rootScope.realm+'/protocol/openid-connect/logout';
	    	$rootScope.doGet(true, url, 'zkl.login');
        }
        $rootScope.header = $sce.trustAsResourceUrl(bouncer.baseClientContentUrlWithSlash + 'templates/common/header.html');
        $rootScope.errorHeader = $sce.trustAsResourceUrl(bouncer.baseClientContentUrlWithSlash + 'templates/common/errorHeader.html');
        
        $rootScope.messageFor = function(map, field){
        	map = map || {};
        	field = field || 'global';
        	return formUtils.messageFor(field, map); 
    	};
        $rootScope.debugMessages = function(){
        	$rootScope.debugMap = $rootScope.debugMap || {};
    		return formUtils.globalMessages($rootScope.debugMap); 
    	};
    	$rootScope.errorMessagesFor = function(field){
        	$rootScope.errorMap = $rootScope.errorMap || {};
    		return formUtils.messageFor(field, $rootScope.errorMap);
    	};
    	$rootScope.globalErrorMessages = function(){
        	$rootScope.errorMap = $rootScope.errorMap || {};
    		return formUtils.globalMessages($rootScope.errorMap); 
    	};        
        $rootScope.login = function(messagePrefix, callbackFn) {
        	if(!$rootScope.realm) return;
        	if(!messagePrefix)messagePrefix='zkl.login';
        	if($rootScope.code) {
        		var loginUrl = '/auth/realms/'+$rootScope.realm+'/login-actions/authenticate?code='+ $rootScope.code;
        		loginUrl = formUtils.toAbsUrl(loginUrl);
                var httpConfig = {
                		method : 'GET',
                		url : loginUrl,
                    	headers : formUtils.defaultGetXhrHeaders        	
                };
                $http(httpConfig).then(
            		function(response){
                		var nextPage = formUtils.processResponse(response, $rootScope.idpInfo, messagePrefix);
                		if(callbackFn){
                			callbackFn();
                		} else {
                			$rootScope.toNextPage(response, nextPage);                			
                		}
            		},
            		function (response) {
            			var nextPage = formUtils.processResponse(response, $rootScope.idpInfo, messagePrefix);
                		if(callbackFn){
                			callbackFn();
                		} else {
                			$rootScope.toNextPage(response, nextPage);                			
                		}
                    }    		
                );
        	} else {
        		var loginUrl = '/auth/realms/'+$rootScope.realm+'/profile'; 
        		loginUrl = formUtils.toAbsUrl(loginUrl);        		
        		$window.location = loginUrl;
        	}
        };
        $rootScope.doPost = function (requestPossible, actionUrl, data, messagePrefix, refreshScope) {
    		if(!requestPossible) return;
            $http(
        		{
                	method : 'POST',
                	url : formUtils.toAbsUrl(actionUrl),
                	data : data,
                	headers : formUtils.defaultXhrHeaders, 
                    transformRequest: formUtils.transformRequest
                }            		
            ).then(
        		function(response){
            		var nextPage = formUtils.processResponse(response, $rootScope.idpInfo, messagePrefix);
            		if(!$rootScope.toNextPage(response, nextPage)){
            			if(refreshScope)refreshScope();
            		}
        		},
        		function (response) {
            		var nextPage = formUtils.processResponse(response, $rootScope.idpInfo, messagePrefix);
            		if(!$rootScope.toNextPage(response, nextPage)){
            			if(refreshScope)refreshScope();
            		}
                }    		
            );
        };
        $rootScope.doGet = function (requestPossible, actionUrl, messagePrefix, refreshScope) {
    		if(!requestPossible) return;
            $http(
	    		{
	            	method : 'GET',
	            	url : formUtils.toAbsUrl(actionUrl),
	            	headers : formUtils.defaultXhrHeaders
	            }            
            ).then(
        		function(response){
            		var nextPage = formUtils.processResponse(response, $rootScope.idpInfo, messagePrefix);
            		if(!$rootScope.toNextPage(response, nextPage)){
            			if(refreshScope)refreshScope();
            		}
        		},
        		function (response) {
            		var nextPage = formUtils.processResponse(response, $rootScope.idpInfo, messagePrefix);
            		if(!$rootScope.toNextPage(response, nextPage)){
            			if(refreshScope)refreshScope();
            		}
                }    		
            );
        };
        $rootScope.doLoad = function (actionUrl, datakey, callback) {
            $http(
	    		{
	            	method : 'GET',
	            	url : formUtils.toAbsUrl(actionUrl),
	            	headers : formUtils.defaultXhrHeaders
	            }            
            ).then(
        		function(response){
        			$rootScope.idpInfo[datakey]=response.data[datakey];
            		if(callback)callback();
        		},
        		function (response) {
        			$rootScope.debugMap = formUtils.addMessagesFor(response.statusCode, $rootScope.debugMap);
                }    		
            );
        };
        $rootScope.doGetHtml = function (requestPossible, actionUrl, messagePrefix, refreshScope) {
    		if(!requestPossible) return;
            $http(
	    		{
	            	method : 'GET',
	            	url : formUtils.toAbsUrl(actionUrl),
	            	headers : formUtils.defaultGetHtmlHeaders
	            }            
            ).then(
        		function(response){
            		var nextPage = formUtils.processResponse(response, $rootScope.idpInfo, messagePrefix);
            		if(!$rootScope.toNextPage(response, nextPage)){
            			if(refreshScope)refreshScope();
            		}
        		},
        		function (response) {
            		var nextPage = formUtils.processResponse(response, $rootScope.idpInfo, messagePrefix);
            		if(!$rootScope.toNextPage(response, nextPage)){
            			if(refreshScope)refreshScope();
            		}
                }    		
            );
        };
        $rootScope.getChallenge = function (requestPossible, actionUrl, txId, messagePrefix, refreshScope) {
        	var url = actionUrl;
        	if(txId && txId!=null)
        		url = formUtils.addQueryParam(actionUrl, 'txId',txId);
        	$rootScope.doGet(requestPossible, url, messagePrefix, refreshScope);
        };
        $rootScope.getResetCredentialUrl = function (execution, zkl_flow) {
        	var actionUrl = '/auth/realms/'+$rootScope.realm+'/login-actions/reset-credentials?code='+$rootScope.code;
        	if(execution && execution!=null) actionUrl = actionUrl +'&execution='+execution; 
        	if(zkl_flow && zkl_flow!=null) actionUrl = actionUrl +'&zkl_flow='+zkl_flow; 
    		return  actionUrl;
        };
        $rootScope.getRequiredActionUrl = function(zkl_flow){
        	var actionUrl = '/auth/realms/'+$rootScope.realm+'/profile';
        	if(zkl_flow && zkl_flow!=null) actionUrl = actionUrl +'/'+zkl_flow; 
    		return  actionUrl;
    	};
    	
    	$rootScope.toFragment = function(currentFragment){
    		if(currentFragment == 'home.zugang'){
    			$state.go(currentFragment)
    		}else{
    			$rootScope.getChallenge(true, $rootScope.getRequiredActionUrl(currentFragment), 
    					null, 'zkl.'+currentFragment);    			
    		}
    		
    	}
	});

/* Fix für Windows Phone IE Mobile 10 */
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement("style");
    msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));
    document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
}
