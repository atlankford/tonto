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
        $routeProvider.when('/waitlist', {
            authRequired: true, // must authenticate before viewing this page
            templateUrl: 'partials/waitlist.html'
        });
        $routeProvider.when('/order', {
            authRequired: true, // must authenticate before viewing this page
            templateUrl: 'partials/order.html'

        });
        $routeProvider.when('/sms', {
            authRequired: true, // must authenticate before viewing this page
            templateUrl: 'partials/sms.html'

        });
        $routeProvider.when('/menu', {
            templateUrl: 'partials/menu.html'


        });
        $routeProvider.when('/help', {
            authRequired: true, // must authenticate before viewing this page
            templateUrl: 'partials/help.html'
        });
        $routeProvider.when('/dashboard', {
            authRequired: true, // must authenticate before viewing this page
            templateUrl: 'partials/dashboard.html'

        });
        $routeProvider.when('/kitchen', {
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
            authRequired: true, // must authenticate before viewing this page
            templateUrl: 'partials/kitchen-touch.html'

        });
        $routeProvider.when('/archive', {
            authRequired: true, // must authenticate before viewing this page
            templateUrl: 'partials/archived-orders.html'

        });

        $routeProvider.otherwise({redirectTo: '/dashboard'});
    }]);