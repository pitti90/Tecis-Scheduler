function RootCtrl($rootScope, AlertService) {

    $rootScope.state = '';
    $rootScope.navbarCollapse = false;
    $rootScope.subNavbarCollapse = false;

    $rootScope.collapseNavbar = function () {
        $rootScope.navbarCollapse = !$rootScope.navbarCollapse;
    }

    $rootScope.collapseSubNavbar = function () {
        $rootScope.subNavbarCollapse = !$rootScope.subNavbarCollapse;
    }

    $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams, error) {
            $rootScope.state = toState.name;
            if(toState.name === "impressum" || toState.name === "datenschutz"){
                $rootScope.navbarCollapse = true;
            }
        });

    /** Throw an error when a $stateChangeError occurs. Otherwise these errors will remain silent. */
    $rootScope.$on('$stateChangeError',
        function (event, toState, toParams, fromState, fromParams, error) {
            throw new Error("$stateChangeError while transitioning to " + toState.name + ", error: " + error);
        });

    $rootScope.showAlerts = function() {
        return AlertService.alerts.length > 0;
    }

}

angular.module('idp').controller('RootCtrl', RootCtrl)
