"use strict";

angular.module('myApp.routes', ['ngRoute'])

    // configure views; the authRequired parameter is used for specifying pages
    // which should only be available while logged in
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            authRequired: true, // must authenticate before viewing this page
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        });

        $routeProvider.when('/chat', {
            templateUrl: 'partials/chat.html',
            controller: 'ChatCtrl'
        });

        $routeProvider.when('/account', {
            authRequired: true, // must authenticate before viewing this page
            templateUrl: 'partials/account.html',
            controller: 'AccountCtrl'
        });
        $routeProvider.when('/order', {
            authRequired: true, // must authenticate before viewing this page
            templateUrl: 'partials/order.html'

        });
        $routeProvider.when('/menu', {
            templateUrl: 'partials/menu.html',
            controller: 'MenuCtrl'

        });
        $routeProvider.when('/dashboard', {
            authRequired: true, // must authenticate before viewing this page
            templateUrl: 'partials/dashboard.html'

        });
        $routeProvider.when('/kitchen', {
            authRequired: true, // must authenticate before viewing this page
            templateUrl: 'partials/kitchen.html'

        });
        $routeProvider.when('/edit-menu', {
            authRequired: true, // must authenticate before viewing this page
            templateUrl: 'partials/edit-menu.html'

        });

        $routeProvider.when('/login', {
            templateUrl: 'partials/login.html'

        });
        $routeProvider.when('/customer-view', {
            templateUrl: 'partials/customer-view.html'

        });
        $routeProvider.when('/kitchen-touch', {
            templateUrl: 'partials/kitchen-touch.html'

        });
        $routeProvider.when('/archive', {
            templateUrl: 'partials/archived-orders.html'

        });
        $routeProvider.when('/submitted', {
            templateUrl: 'partials/submitted.html'

        });

        $routeProvider.otherwise({redirectTo: '/order'});
    }]);