'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('HomeCtrl', ['$scope', 'syncData', function($scope, syncData) {
        syncData('syncedValue').$bind($scope, 'syncedValue');
    }])

    .controller('ChatCtrl', ['$scope', 'syncData', function($scope, syncData) {
        $scope.newMessage = null;

        // constrain number of messages by limit into syncData
        // add the array into $scope.messages
        $scope.messages = syncData('messages', 10);

        // add new messages to the list
        $scope.addMessage = function() {
            if( $scope.newMessage ) {
                $scope.messages.$add({text: $scope.newMessage});
                $scope.newMessage = null;
            }
        };
    }])

    .controller('LoginCtrl', ['$scope', 'loginService', '$location', function($scope, loginService, $location) {
        $scope.email = null;
        $scope.pass = null;
        $scope.confirm = null;
        $scope.createMode = false;
        $scope.remember = false;

        $scope.login = function(cb) {
            $scope.err = null;
            if( !$scope.email ) {
                $scope.err = 'Please enter an email address';
            }
            else if( !$scope.pass ) {
                $scope.err = 'Please enter a password';
            }
            else {

                loginService.login($scope.email, $scope.pass, $scope.remember, function(err, user) {
                    $scope.err = err? err + '' : null;
                    if( !err ) {
                        cb && cb(user);
                    }
                });
            }
        };

        $scope.createAccount = function() {
            $scope.err = null;
            if( assertValidLoginAttempt() ) {
                loginService.createAccount($scope.email, $scope.pass, function(err, user) {
                    if( err ) {
                        $scope.err = err? err + '' : null;
                    }
                    else {
                        // must be logged in before I can write to my profile
                        $scope.login(function() {
                            loginService.createProfile(user.uid, user.email);
                            $location.path('/account');
                        });
                    }
                });
            }
        };

        function assertValidLoginAttempt() {
            if( !$scope.email ) {
                $scope.err = 'Please enter an email address';
            }
            else if( !$scope.pass ) {
                $scope.err = 'Please enter a password';
            }
            else if( $scope.pass !== $scope.confirm ) {
                $scope.err = 'Passwords do not match';
            }
            return !$scope.err;
        }
    }])

    .controller('DashboardCtrl', ['$scope', 'loginService', '$location', function($scope, loginService, $location) {
        //TODO
    }]) //end dashboard controller

    .controller('WaitlistCtrl', ['$scope', '$firebase', 'syncData', function($scope, $firebase, syncData) {

        $scope.waitingList = "";
        var ref = new Firebase('https://tonto.firebaseio.com/LOCATION/1/WAITLIST');

        $scope.waitingList  = syncData('LOCATION/1/WAITLIST', 10);


        $scope.name = '';
        $scope.partySize = '';
        $scope.tel = '';

        $scope.add = function (x,y,z)
        {
            var time = $scope.startTime();

            ref.push({name: x, size: y, tel: z, time: time});
            $scope.name = '';
            $scope.partySize = '';
            $scope.tel = '';
        };


        $scope.deleteItem = function(x) {

         var customer = ref.child(x)
         customer.remove();

        };

        $scope.checkTime = function(i){
            if (i < 10)
            {
                i = "0" + i;
            }
            return i;
        };

        $scope.startTime = function() {
            var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();

            // add a zero in front of numbers<10
            m = checkTime(m);
            s = checkTime(s);

            //Check for PM and AM
            var day_or_night = (h > 11) ? "PM" : "AM";

            //Convert to 12 hours system
            if (h > 12)
                h -= 12;

            //Add time to the headline and update every 500 milliseconds
            $scope.time = (h + ":" + m + ":" + s + " " + day_or_night);
//            setTimeout(function() {
//                $scope.startTime()
//            }, 500);
            return $scope.time;
        };

    }]) //end dashboard controller

    .controller('CustomerViewCtrl', ['$scope', '$firebase', function($scope,  $firebase) {

        var ref = new Firebase('https://tonto.firebaseio.com');

        var active_ordersRef = ref.child('LOCATION/1/ACTIVE_ORDER').limit(8);
        var archive_ordersRef = ref.child('LOCATION/1/ARCHIVE_ORDER').limit(8);

        $scope.orders = $firebase(active_ordersRef);
        $scope.archiveItems = $firebase(archive_ordersRef);

//
//        var canvas = document.getElementById("myCanvas");
//        var pause = true;
//        var circle = []; //circles array
//        var isCanvasSupported = false;
//        var context = '';
//        if (canvas.getContext){
//            isCanvasSupported = true;
//            context = canvas.getContext('2d');
//        }
//
//        var addCircleBtn = document.getElementById("addCircle");
//        var startBtn = document.getElementById("startAnim");
//        var stopBtn = document.getElementById("stopAnim");
//        var totalCircleBtn = document.getElementById("totalCircles");
//        var aminStatusBtn = document.getElementById("aminStatus");
//        var resetAnimBtn = document.getElementById("resetAnim");
//
//        var radiusWidth = 100;
//        var interTime = 50;
//        var defaultOption = {};
//        defaultOption.x = 100;
//        defaultOption.y = 100;
//
//        var counter;
//        var temp = "Customer Name"
//
//        $scope.circles = circle;
//
//        if(isCanvasSupported){
////            addCircle();
//            setInterval(function(){
//                if(pause){
//                    animateCircle();
//                }
//            }, interTime);
//            canvas.addEventListener('click', function(e){
//                console.log(e);
//                var x;
//                var y;
//
//                var thisradius = (radiusWidth*Math.random());
//                if (e.offsetX || e.offsetY) {
//                    x = e.offsetX;
//                    y = e.offsetY;
//                }
//                else {
//                    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
//                    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
//                }
//                x -= canvas.offsetLeft;
//                y -= canvas.offsetTop;
//
//                console.log(x, y);
//                //addCircle(thisx, thisy, thisradius);
////                addCircle(x, y, thisradius);
//            }, false);
//
//            if(addCircleBtn){
//                addCircleBtn.addEventListener('click', function(e){
//                    var thisradius = (radiusWidth*Math.random());
//                    addCircle(undefined, undefined, thisradius)
//                }, false);
//            }
//
//            if(startBtn){
//                startBtn.addEventListener('click', function(){
//                    pause = true;
//                    aminStatusChange();
//                },false);
//            }
//
//            if(resetAnimBtn){
//                resetAnimBtn.addEventListener('click', function(){
//                    circle = [];
//                    addCircle();
//                });
//            }
//
//            if(stopBtn){
//                stopBtn.addEventListener('click', function(){
//                    pause = false;
//                    aminStatusChange();
//                },false);
//            }
//            aminStatusChange();
//        }else{
//            alert('Canvas is not supported in you browser.')
//        }
//
//        function degree(value){
//            return value * (Math.PI / 180);
//        }
//
//        function addCircle(x, y, radius, name){
//
//            counter++;
//
//            // If x is not defined
//            if(typeof x == 'undefined'){
//                //get the random position between 1 and canvas.width
//                x = getRandomInt(1,canvas.width);
//            }
//
//            // If y is not defined
//            if(typeof y == 'undefined'){
//                //get the random position between 1 and canvas.height
//                y = getRandomInt(1,canvas.height);
//            }
//
//            // If radius is not defined
//            if(typeof radius == 'undefined'){
//                radius = (radiusWidth*Math.random());
//            }
//
//            // Check if x and y are not in the four corner otherwise the circle will stuck
//            if(x < radius){
//                x = radius;
//            }else if(x > (canvas.width-radius)){
//                x = (canvas.width-radius);
//            }
//
//            if(y < radius){
//                y = radius;
//            }else if(y > (canvas.height-radius)){
//                y = (canvas.height-radius);
//            }
//
//            //add the circle on the place of x and y
//            circle.push({x:x,
//                xvc:(3*Math.random()),
//                y:y,
//                yvc:(3*Math.random()),
//                radius:radius,
//                color: 'rgba(' + (Math.random()*238).toFixed(0) + ', ' +
//                    (Math.random()*238).toFixed(0) + ', ' +
//                    (Math.random()*238).toFixed(0) + ', 1.0)',
//                customer_name: name
//            });
//
//            totalCircle();
//        }
//
//        function animateCircle(){
//            context.clearRect(0, 0, canvas.width, canvas.height);
//            circle.forEach(function(circle){
//                context.beginPath();
//                //context.arc(circle.x, circle.y, circle.radius, degree(0), degree(360), false);
//                context.arc(circle.x, circle.y, circle.radius, degree(0), degree(360), false);
//                context.fillStyle = circle.color;
//                context.closePath();
//                context.fill();
//                context.strokeStyle ='rgba(0,0,0,255)';
//
//                context.font = "bold 16px sans-serif";
//                context.textAlign= "center";
//                context.strokeText(circle.customer_name, circle.x, circle.y)
//
//                changePosition(circle);
//            });
//        }
//
//        function changePosition(circle){
//            if (circle.x + circle.xvc + circle.radius > canvas.width ||
//                circle.x + circle.xvc - circle.radius < 0){
//                circle.xvc = -circle.xvc;
//            }
//
//            if (circle.y + circle.yvc + circle.radius > canvas.height ||
//                circle.y + circle.yvc - circle.radius  < 0) {
//                circle.yvc= -circle.yvc;
//            }
//
//            circle.x += circle.xvc;
//            circle.y += circle.yvc;
//        }
//
//        function totalCircle(){
//            if(totalCircleBtn) totalCircleBtn.innerText  = circle.length;
//        }
//
//        function aminStatusChange(){
//            if(aminStatusBtn) aminStatusBtn.innerText  = (pause == false)?"Stopped":"Running";
//        }
//
//        /**
//         * Returns a random integer between min and max
//         * Using Math.round() will give you a non-uniform distribution!
//         */
//        function getRandomInt (min, max) {
//            return Math.floor(Math.random() * (max - min + 1)) + min;
//        }
//
////        start order integration
//
//        ref.once('value', function(ref)
//        {
//            ref.forEach(function(order)
//            {
//
//                var name = order.child('customer').val();
//                var thisradius = (radiusWidth*Math.random());
//                if(order.$index != 0) {
//                    addCircle(undefined, undefined, thisradius, name)
//                }
//            })
//
//        });
//
//        ref.on('value', function(ref)
//        {
//            var thisradius = (radiusWidth*Math.random());
//            var name = ref.child('customer').val();
//            addCircle(undefined, undefined, thisradius, name)
//        })
//
////        syncData('LOCATION/1/ACTIVE_ORDER').$bind($scope, 'circles');
//
//

    }]) //end dashboard controller

    .controller('MenuCtrl', ['$scope', '$firebase', 'syncData' ,function($scope, $firebase, syncData) {

        //binds scope.menu to database MenuItems
        syncData('LOCATION/1/MENU_ITEM').$bind($scope, 'menu');

        $(document).ready(function() {
            $('#no').novacancy({
                'reblinkProbability': 0.1,
                'blinkMin': 0.2,
                'blinkMax': 0.6,
                'loopMin': 8,
                'loopMax': 10,
                'color': '#ffffff',
                'glow': ['0 0 80px #ffffff', '0 0 30px #008000', '0 0 6px #0000ff']
            });

            $('#vacancy').novacancy({
                'blink': 1,
                'off': 1,
                'color': 'Red',
                'glow': ['0 0 80px Red', '0 0 30px FireBrick', '0 0 6px DarkRed']
            });
        });

    }])
    //end menu controller

    .controller('EditMenuCtrl', ['$scope', '$firebase', 'syncData' ,function($scope, $firebase, syncData) {
        $scope.newMenuItem = null;

        //binds scope.menu to database MenuItems
        syncData('LOCATION/1/MENU_ITEM').$bind($scope, 'menu');

//
// $scope.menu2 = syncData('MenuItems', 30);
        $scope.oneAtATime = true;

        $scope.newMenuItem= {name: '', category: '', class: '', description: '', icon: '', price: '', shortname:''};
//        $scope.addItem = function() {
//            var newItemNo = $scope.items.length + 1;
//            $scope.items.push('Item ' + newItemNo);
//        };


        $scope.addItem = function() {

            if( $scope.newMenuItem.name && $scope.newMenuItem.description &&  $scope.newMenuItem.price) {
                $scope.menu.$add({
                    category: $scope.newMenuItem.category,
                    class: $scope.newMenuItem.class,
                    description: $scope.newMenuItem.description,
                    icon: $scope.newMenuItem.icon,
                    name: $scope.newMenuItem.name,
                    price: $scope.newMenuItem.price,
                    shortname: $scope.newMenuItem.shortname,
                    side:'',
                    special: ''
                });
            }
            else{
                alert('Please provide the required information.')
            }
            $scope.newMenuItem = null;

        };

        $scope.deleteItem = function(x) {

            $scope.menu.$remove(x);

        };

        $scope.open = function ()
        {
            var modalInstance = $modal.open(
                {
                    templateUrl: 'myModalContent.html',
                    controller: ModalInstanceCtrl,
                    resolve:
                    {
                        sides: function ()
                        {
                            return $scope.sides;
                        }
                    }
                });

            modalInstance.result.then(function (selectedSide)
            {
                $scope.selected = selectedSide;
            }, function ()
            {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        var ModalInstanceCtrl = function ($scope, $modalInstance, sides)
        {
            $scope.sides = sides;

            $scope.selected =
            {
                side: $scope.sides[0]
            };

            $scope.ok = function ()
            {
                $modalInstance.close($scope.selected.side);
            };

            $scope.cancel = function ()
            {
                $modalInstance.dismiss('cancel');
            };
        };

    }])
    //end menu controller

    .controller('HelpCtrl',['$scope', '$firebase', 'FBURL', function($scope, $firebase, FBURL) {


    }])
    .controller('SmsCtrl',['$scope', '$firebase', 'FBURL', function($scope, $firebase, FBURL) {

        var ref = new Firebase('https://tonto.firebaseio.com/LOCATION/1/GENERAL_SMS');

        $scope.tel = '';
        $scope.message = '';

        $scope.sendSms = function (x,y)
        {
            ref.push({tel: x, message: y});
            $scope.tel = '';
            $scope.message = '';
        };

    }])


    .controller('KitchenCtrl', ['$scope', '$firebase', 'FBURL', function($scope, $firebase, FBURL) {

        var ref = new Firebase('https://tonto.firebaseio.com');

        var active_ordersRef = ref.child('LOCATION/1/ACTIVE_ORDER');

        $scope.orders = $firebase(active_ordersRef);

        var lastOrderIDRef = ref.child('LOCATION/1/LAST_ORDER_ID');

        var lastOrderID;
        var initTrigger = true;
        var printRef;

        $scope.print = false;


        lastOrderIDRef.on('value', function(lastIDOrderSnapshot)
        {
            lastOrderID = lastIDOrderSnapshot.val();
        })



        lastOrderIDRef.on('value', function()
        {


            if(initTrigger)
            {
                initTrigger = false;
            }
            else if($scope.print)
            {
                printRef = active_ordersRef.child(lastOrderID);

                var popUp = window.open('', 'PopUp', 'width=100,height=100');
                popUp.document.writeln("<br/><br/>");
                popUp.document.writeln("Order Number: " + lastOrderID + "<br/>");

                printRef.once('value', function(orderSnapshot)
                {
                    popUp.document.writeln(orderSnapshot.child('togo').val() + "<br/>");
                    popUp.document.writeln("Customer: " + orderSnapshot.child('customer').val() + "<br/>");
                    popUp.document.writeln("Time: " + orderSnapshot.child('time').val() + "<br/></br></br>");

                    orderSnapshot.child('ITEM').forEach(function(itemSnapshot)
                    {

                        popUp.document.writeln(itemSnapshot.child('name').val() + ":&emsp;" + itemSnapshot.child('side').val() +":&emsp;" + itemSnapshot.child('special').val() + "<br/><br/>");

                    })

                });
                popUp.document.writeln("<br/><br/>");
                popUp.print();
                popUp.close();
            }
        })


//

        $scope.deleteItem = function (x) {
            var itemRef = active_ordersRef.child(x);
            itemRef.remove();
        };

        $scope.deleteOrder = function (x)
        {
            //Selected Order ID goes here
            var orderID;
            //Get Item's Order ID child
            var orderIDRef = ref.child(x + '/id');

            orderIDRef.once('value', function(orderIDsnapshot)
            {
                //set value for Selected Order ID
                orderID = orderIDsnapshot.val();
            });

            //Take a snapshot of all items in the database
            ref.once('value', function(allItemsSnapshot)
            {
                //For each item in all items, run function below
                allItemsSnapshot.forEach(function(itemSnapshot)
                {
                    //Get the current item's Order ID
                    var tempOrderID = itemSnapshot.child('id').val();

                    //If the current item's Order ID and the Selected Order ID are equal, remove current item from the database
                    if(tempOrderID == orderID)
                    {
                        itemSnapshot.ref().remove();
                    }
                });
            });
        };



    }])

    .controller('KitchenTouchCtrl', ['$scope', '$firebase', 'FBURL', function($scope, $firebase, FBURL) {


        var ref = new Firebase('https://tonto.firebaseio.com');

        var active_ordersRef = ref.child('LOCATION/1/ACTIVE_ORDER');
        var archive_ordersRef = ref.child('LOCATION/1/ARCHIVE_ORDER');
        var smsQ_Ref = ref.child('LOCATION/1/SMS_Q');

        $scope.orders = $firebase(active_ordersRef);
        $scope.archiveItems = $firebase(archive_ordersRef);

        $scope.deleteItem = function (x,item) {
            var itemRef = active_ordersRef.child(x);
            var orderId = x;
            var smsRef = smsQ_Ref.child(x);

            // -5 in date construction string represents GMT -5 (Eastern Standard Time)
            archive_ordersRef.child(x).set({customer: item.customer, id: item.id, price: item.price, time_submitted: item.time,
                time_served: new Date( new Date().getTime() - 4 * 3600 * 1000).toUTCString().replace( / GMT$/, "" ), status: "served", togo: item.togo, phone: item.phone
            })

            angular.forEach(item.ITEM,function(item,x)
            {
                archive_ordersRef.child(orderId).child('ITEM').child(x).set({name: item.name, special: item.special, side: item.side});
            })
            if(item.sms){
                smsRef.remove();
            }
            itemRef.remove();
        };

        $scope.deleteOrder = function (x)
        {
            //Selected Order ID goes here
            var orderID;
            //Get Item's Order ID child
            var orderIDRef = ref.child(x + '/id');

            orderIDRef.once('value', function(orderIDsnapshot)
            {
                //set value for Selected Order ID
                orderID = orderIDsnapshot.val();
            });

            //Take a snapshot of all items in the database
            ref.once('value', function(allItemsSnapshot)
            {
                //For each item in all items, run function below
                allItemsSnapshot.forEach(function(itemSnapshot)
                {
                    //Get the current item's Order ID
                    var tempOrderID = itemSnapshot.child('id').val();

                    //If the current item's Order ID and the Selected Order ID are equal, remove current item from the database
                    if(tempOrderID == orderID)
                    {
                        itemSnapshot.ref().remove();
                    }
                });
            });
        };



    }])

    .controller('ArchiveCtrl', ['$scope', '$firebase', 'FBURL', function($scope, $firebase, FBURL) {


        var ref = new Firebase('https://tonto.firebaseio.com');

        var active_ordersRef = ref.child('LOCATION/1/ACTIVE_ORDER');
        var archive_ordersRef = ref.child('LOCATION/1/ARCHIVE_ORDER').limit(20);

        $scope.orders = $firebase(active_ordersRef);
        $scope.archiveItems = $firebase(archive_ordersRef);

        $scope.archiveItem = function (x,item) {
            var itemRef = archive_ordersRef.child(x);
            var orderId = x;

            // -5 in date construction string represents GMT -5 (Eastern Standard Time)
            active_ordersRef.child(x).set({customer: item.customer, id: item.id, price: item.price, time_submitted: item.time,
                time_served: new Date( new Date().getTime() - 4 * 3600 * 1000).toUTCString().replace( / GMT$/, "" ), status: "served", togo: item.togo
            })

            angular.forEach(item.ITEM,function(item,x)
            {
                active_ordersRef.child(orderId).child('ITEM').child(x).set({name: item.name, special: item.special, side: item.side});
            })

            itemRef.remove();
        };
    }])


    .controller('OrderCtrl', ['$scope', '$firebase', 'FBURL','syncData', '$modal', '$log', 'firebaseRef', function($scope, $firebase, FBURL, syncData, $modal, $log, firebaseRef)
    {
        //Get Root Ref
        var ref = new Firebase("https://tonto.firebaseio.com/");

        //3 way bind scope.menu to MENU table
        syncData('LOCATION/1/MENU_ITEM').$bind($scope, 'menu');

        //Get Active Orders Ref
        var active_ordersRef = ref.child('LOCATION/1/ACTIVE_ORDER');
        var smsQ_Ref = ref.child('LOCATION/1/SMS_Q');

        $scope.current_order = [];
        $scope.total_price = 0.00;
        $scope.togo = false;
        $scope.sms = false;
        var setTogo ="";
        var setSms = "";

        //Get Last Order ID from Firebase and add 1 for Order ID (every time the value changes) - Multiuser System
        var orderID;
        var lastOrderIDRef = ref.child('LOCATION/1/LAST_ORDER_ID');

        $scope.alerts = [];

        $scope.addAlert = function() {
            $scope.alerts.push({type: 'success', msg: 'Order Submitted' });
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        lastOrderIDRef.on('value', function(lastIDOrderSnapshot)
        {
            orderID = lastIDOrderSnapshot.val() + 1;
        })

        $scope.addItem = function(x)
        {
            $scope.current_order.push({name: x.name, description: x.description, price: x.price,
                special: x.special, category: x.category, side: 'Chips', class: x.class, icon: x.icon});
            console.log("current order is :" + $scope.current_order);
            $scope.total_price = $scope.total_price + parseFloat(x.price);
        }


        $scope.deleteItem = function(e,f)
        {
            $scope.current_order.splice(e,1);
            $scope.total_price = $scope.total_price - parseFloat(f.price);
        }


        $scope.addOrder = function()
        {


            if(!$scope.customer)
            {
                alert("Please enter a name for the order.");
            }
            else if(!$scope.current_order.length)
            {
                alert("Please enter items for the order.");
            }
            else
            {

                if($scope.togo)
                {
                    setTogo = "TO-GO";
                }
                if($scope.sms){
                    setSms = true;
                }

                // -5 in date construction string represents GMT -5 (Eastern Standard Time)
                active_ordersRef.child(orderID).set({customer: $scope.customer, id: orderID, price: $scope.total_price, phone: '1' + $scope.phone,
                    time: new Date( new Date().getTime() - 4 * 3600 * 1000).toUTCString().replace( / GMT$/, "" ), status: "submitted", togo: setTogo, sms: setSms})


                angular.forEach($scope.current_order,function(item,index)
                {
                    active_ordersRef.child(orderID).child('ITEM').child(index +1).set({name: item.name, special: item.special, class: item.class, side: item.side});
                })

                if(setSms){
                    smsQ_Ref.child(orderID).set({customer: $scope.customer, id: orderID, price: $scope.total_price, phone: '1' + $scope.phone,
                        time: new Date( new Date().getTime() - 4 * 3600 * 1000).toUTCString().replace( / GMT$/, "" ), status: "submitted", togo: setTogo, sms: setSms})
                }

                lastOrderIDRef.set(orderID);
                $scope.total_price= 0.00;
                $scope.current_order = [ ];
                $scope.customer = "";
                $scope.phone = "";

                $scope.togo ="";
                setTogo="";

                $scope.sms ="";
                setSms = "";

            }
        }


        $scope.sides = ['No Side', 'Chips', 'Salad', 'Salad Style'];
        $scope.modItems = ['cheez ','ched ','jack ','BC ','cucum ','fried ','onion ','peprs ', 'carot ', 'slaw ', 'sauce ', 'bun ', 'rare ', 'mdrar ', 'med ', 'well ', 'plain ', 'letuc ', 'tom ', 'tofu ', 'salVg ', 'balVg ', 'soyVg ', 'appVg ', 'cut.5 ', 'apple ', 'pork ', 'chckn ', 'jerk ', 'aioli ', 'grens ', 'spicy ', 'ltspc ', 'vegan ', 'grOns ', 'frdPO ', 'mayo ', 'mustd ', 'nut ', 'peanut ', 'kmchi ', 'pnapp ', 'grEgg'];
        $scope.modTypes = ['86: ', 'ADD: ', 'SUB: ', 'OTS: '];
        $scope.modString = "";



        $scope.open = function (item)
        {
            var modalInstance = $modal.open(
                {
                    templateUrl: 'myModalContent.html',
                    controller: ModalInstanceCtrl,
                    resolve:
                    {
                        sides: function ()
                        {
                            return $scope.sides;
                        },

                        modTypes: function()
                        {
                            return $scope.modTypes;
                        },

                        modItems: function()
                        {
                            return $scope.modItems;
                        }
                    }
                });

            modalInstance.result.then(function (selected)
            {
                item.side = selected.side;
                item.special = selected.modString;
            }, function ()
            {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        var ModalInstanceCtrl = function ($scope, $modalInstance, sides, modTypes, modItems)
        {
            $scope.sides = sides;

            $scope.modTypes = modTypes;

            $scope.modItems = modItems;

            $scope.selected =
            {
                side: $scope.sides[1],
                modString: ""
            };

            $scope.ok = function ()
            {
                $modalInstance.close($scope.selected);
            };

            $scope.cancel = function ()
            {
                $modalInstance.dismiss('cancel');
            };
        };
    }])

    .controller('AccountCtrl', ['$scope', 'loginService', 'changeEmailService', 'firebaseRef', 'syncData', '$location', 'FBURL', function($scope, loginService, changeEmailService, firebaseRef, syncData, $location, FBURL) {
        $scope.syncAccount = function() {
            $scope.user = {};
            syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user').then(function(unBind) {
                $scope.unBindAccount = unBind;
            });
        };
        // set initial binding
        $scope.syncAccount();

        $scope.logout = function() {
            loginService.logout();
        };

        $scope.oldpass = null;
        $scope.newpass = null;
        $scope.confirm = null;

        $scope.reset = function() {
            $scope.err = null;
            $scope.msg = null;
            $scope.emailerr = null;
            $scope.emailmsg = null;
        };

        $scope.updatePassword = function() {
            $scope.reset();
            loginService.changePassword(buildPwdParms());
        };

        $scope.updateEmail = function() {
            $scope.reset();
            // disable bind to prevent junk data being left in firebase
            $scope.unBindAccount();
            changeEmailService(buildEmailParms());
        };

        function buildPwdParms() {
            return {
                email: $scope.auth.user.email,
                oldpass: $scope.oldpass,
                newpass: $scope.newpass,
                confirm: $scope.confirm,
                callback: function(err) {
                    if( err ) {
                        $scope.err = err;
                    }
                    else {
                        $scope.oldpass = null;
                        $scope.newpass = null;
                        $scope.confirm = null;
                        $scope.msg = 'Password updated!';
                    }
                }
            };
        }
        function buildEmailParms() {
            return {
                newEmail: $scope.newemail,
                pass: $scope.pass,
                callback: function(err) {
                    if( err ) {
                        $scope.emailerr = err;
                        // reinstate binding
                        $scope.syncAccount();
                    }
                    else {
                        // reinstate binding
                        $scope.syncAccount();
                        $scope.newemail = null;
                        $scope.pass = null;
                        $scope.emailmsg = 'Email updated!';
                    }
                }
            };
        }



    }])

;

