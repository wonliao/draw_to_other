/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {

		app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        console.log('Received Event: ' + id);
	
		var wsUri = "ws://192.168.1.143:8000";		
		websocket = new WebSocket(wsUri);
		websocket.onopen = function(evt) { app.onOpen(evt) };
		websocket.onclose = function(evt) { app.onClose(evt) };
		websocket.onmessage = function(evt) { app.onMessage(evt) };
		websocket.onerror = function(evt) { app.onError(evt) };
		
		console.log('test1');
		 
		oldX = 0;
		oldY = 0;
		drawFlag = false;
		canvasObj = document.getElementById("myCanvas");
		context = canvasObj.getContext("2d");
		
		
		// 畫圖
		canvasObj.addEventListener("touchmove", function(evt) {

			evt.preventDefault();
			var x = evt.touches[0].pageX;
			var y = evt.touches[0].pageY;
			//console.log( x + "," + y );
			
			
			context.strokeStyle = "rgba(255, 255, 255, 1)";
			context.lineWidth = 10;
			context.lineCap = "round";
			context.beginPath();
			context.moveTo(oldX, oldY);
			if (!drawFlag) {
				context.moveTo(x, y);
				drawFlag = true;
				
				
			}
			context.lineTo( x, y );
			
			websocket.send( x + "," + y ); 
			
			context.stroke();
			context.closePath();
			oldX = x;
			oldY = y;

		}, false);
		
		canvasObj.addEventListener("touchend", function() {
			drawFlag = false;
		}, false);
		
		setTimeout( function() { 
			scrollTo(0, 1);
		}, 100);
		
		
		// 清除螢幕 
		var clearObj = document.getElementById("clear_btn");
		clearObj.addEventListener("touchend", function(evt) {
			console.log("clear");
			context.clearRect(0, 0, 320, 480);
		}, false);
		

    },	
	onOpen: function(evt) { 
		console.log("CONNECTED"); 
	},
	onClose: function(evt) { 
		console.log("DISCONNECTED"); 
	},
	onMessage: function(evt) { 
		console.log( "onMessage:" + evt.data );
		
		var temp = evt.data.split(",");
		var x = temp[0];
		var y = temp[1];
		console.log( x + "," + y );
	

		canvasObj = document.getElementById("myCanvas");
		context = canvasObj.getContext("2d");
		
		context.strokeStyle = "rgba(255, 255, 255, 1)";
		context.lineWidth = 10;
		context.lineCap = "round";
		context.beginPath();
		context.moveTo(oldX, oldY);
	
		context.moveTo(x, y);

		context.lineTo( x, y );

		context.stroke();
		context.closePath();
		oldX = x;
		oldY = y;

	},
	onError: function(evt) { 
		console.log( evt.data );
	}
};
