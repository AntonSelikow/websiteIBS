Ext.define('TimerApp.view.Main', {
	extend : 'Ext.tab.Panel',
	xtype : 'main',
	requires : [ 'Ext.TitleBar', 'Ext.picker.Picker' ],
	config : {
	items: [{
		styleHtmlContent : true,
		scrollable : true,
		initialize : function() {
			var initTime = 600;
			var tickingTime;
			var x;
			var started = false;
			var sound = document.getElementById('alarmSound');
			
			var bottomToolbar = {
				xtype : 'toolbar',
				ui : 'dark', 
				docked : 'bottom',
				layout : {
					pack : 'center',
					type : 'vbox'
				},
				items : [ {
					xtype : 'button',
					itemId : 'startButton',
					ui : 'confirm',
					text : 'start',
					disabled : true,
					width : '33.3%',
					handler : function() {
						timerStart();
					}
				}, {
					xtype : 'button',
					ui : 'decline',
					text : 'stop',
					width : '33.3%',
					handler : function() {
						timerStop();
					}
				}
				, {
					xtype : 'button',
					ui : 'normal',
					text : 'reset',
					width : '33.3%',
					handler : function() {
						timerReset();
					}
				} 
				]
			};
			
			var topToolbar = {
				xtype : 'toolbar',
				title: 'Timer',
				ui : 'dark', 
				docked : 'top',
				items : [ {
					align : 'stretch', 
					docked : 'right',
					padding: '5',
					text : 'Set Timer',
					handler : function() {
						pickerTime.show();
					}
				} ]
			};
			var ticking = function(time, id) {
				started = true;
				initTime = time;
				sTime = parseTime(initTime);
				if (time > 0) {
					x = setTimeout(function() {ticking(--time, id)}, 1000);
				} else {
					sound.play();
				}
				dataView.getStore().getAt(0).set('time', sTime);
			};
			
			var timerStart = function() {
				sound.load();
				ticking(initTime, 'ct1');
				var buttonStart = Ext.ComponentQuery.query('#startButton')[0];
				buttonStart.disable();
			};
			
			var timerStop = function() {
				clearTimeout(x);
				started = false;
				var buttonStart = Ext.ComponentQuery.query('#startButton')[0];
				buttonStart.enable();
			};
			
			var timerReset = function() {
				sound.pause();
				sound.currentTime = 0;
				timerStop();
				initTime = tickingTime;
				started = false;
				dataView.getStore().getAt(0).set('time', parseTime(initTime));
			};
			
			var parseTime = function(initTime) {
				min = Math.floor(initTime / 60) % 60;
				sec = initTime % 60;
				min = (min < 10) ? "0" + min : min;
				sec = (sec < 10) ? "0" + sec : sec;
				sTime = min + ":" + sec;
				return sTime;
			};
			
			var dataView = Ext.create('Ext.DataView', {
				fullscreen : true,
				store : {
					fields : [ 'time' ],
					data : [{
						time : 'Zeit einstellen und Start drücken'
					}]
				},
				itemTpl : '<div><font size="28px"><center><br><br>{time}</center></font></div>'
			});
			
			var pickerTime = Ext.create('Ext.picker.Picker', {
				doneButton: 'Set Time',
				slots : [ {
					name : 'time',
					data: [  {text: '1 Minute', value: 60},
	        				 {text: '2 Minuten', value: 120},
	        				 {text: '3 Minuten', value: 180},
	        				 {text: '4 Minuten', value: 240},
	        				 {text: '5 Minuten', value: 300},
	        				 {text: '6 Minuten', value: 360},
	        				 {text: '7 Minuten', value: 420},
	        				 {text: '8 Minuten', value: 480},
	        				 {text: '9 Minuten', value: 540},
	        				 {text: '10 Minuten', value: 600},
	        				 {text: '11 Minuten', value: 660},
	        				 {text: '12 Minuten', value: 720},
	        				 {text: '13 Minuten', value: 780},
	        				 {text: '14 Minuten', value: 840},
	        				 {text: '15 Minuten', value: 900},
	        				 {text: '16 Minuten', value: 960},
	        				 {text: '17 Minuten', value: 1020},
	        				 {text: '18 Minuten', value: 1080},
	        				 {text: '19 Minuten', value: 1140},
	        				 {text: '20 Minuten', value: 1200
    				}]// Ende data
				}], // Ende slots
				listeners : {
					change : function(pickerTime, value, oldValue) {
						var buttonStart = Ext.ComponentQuery.query('#startButton')[0];
						buttonStart.enable();
						if (started) {
							timerStop();
						}
						tickingTime = value.time;
						timerReset();
					} // Ende change
				} // Ende listeners
			}); // create()
			
			// Standardeinstellung Picker
			pickerTime.setValue({time : 600}, true);
			
			Ext.Viewport.add(topToolbar);
			Ext.Viewport.add(bottomToolbar);
			Ext.Viewport.add(dataView);
			
			} // Ende initialize
		}] // Ende items Ext.define
	}// Ende config
});