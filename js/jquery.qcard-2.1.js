
// soundManager.debugMode = false; // disable debug output
soundManager.url = 'swf/'; // path to directory containing SoundManager2 .SWF file
soundManager.flashVersion = 8;
soundManager.useFlashBlock = false; // skip for now. See the flashblock demo when you want to start getting fancy.

soundManager.soundfolder = 'sound2/';
var audio = [];
/*
 function playQueueSound(queue,channel){
	audio.playlist = [];
	audio.playlist[audio.playlist.length] = soundManager.soundfolder+"silent.mp3";
	audio.playlist[audio.playlist.length] = soundManager.soundfolder+"number.mp3";
	addFromnum(queue);
	audio.playlist[audio.playlist.length] = soundManager.soundfolder+"silent.mp3";
	audio.playlist[audio.playlist.length] = soundManager.soundfolder+"channel.mp3";
	audio.playlist[audio.playlist.length] = soundManager.soundfolder+"service.mp3";
	addFromnum(channel);
	// Start
	playAudio(0);
 }
 
 function addFromnum(number1){
	//var number1 = 26;
	var s_num1 = number1.toString();
	for(i=0;i<s_num1.length;i++){
	//alert(i+'|'+s_num1[i]);
	if((s_num1.length)>=2 && s_num1[i]==1 && (s_num1.length-i)==1){
		audio.playlist[audio.playlist.length] = soundManager.soundfolder+"ed.mp3";
	}else if((s_num1.length-i)==2 && s_num1[i]==2){
		audio.playlist[audio.playlist.length] = soundManager.soundfolder+"20.mp3";
	}else{
		if(!((s_num1.length-i)==2 && s_num1[i]==1) && !(s_num1[i]==0)){
			audio.playlist[audio.playlist.length] =soundManager.soundfolder+s_num1[i]+".mp3";
		}
	}
	if((s_num1.length-i)==3){
		audio.playlist[audio.playlist.length] =soundManager.soundfolder+ "100.mp3";
	}else if((s_num1.length-i)==2){
		audio.playlist[audio.playlist.length] = soundManager.soundfolder+"10.mp3";
	}
	}
 }
  */
function playAudio(playlistId){
    // Default playlistId to 0 if not supplied
    playlistId = playlistId ? playlistId : 0;
    // If SoundManager object exists, get rid of it...
    if (audio.nowPlaying){
        audio.nowPlaying.destruct();
        // ...and reset array key if end reached
        if(playlistId == audio.playlist.length){
            //playlistId = 0;
        }
    }
    // Standard Sound Manager play sound function...
    soundManager.onready(function() {
        audio.nowPlaying = soundManager.createSound({
            id: 'sk4Audio',
            url: audio.playlist[playlistId],
            autoLoad: true,
            autoPlay: true,
            volume: 50,
            // ...with a recursive callback when play completes
            onfinish: function(){
                playlistId ++;
                playAudio(playlistId);
            }
        })
    });
}

//playQueueSound(19,12);

		//
	//keycode
	// 0 - 9 			a-z 			f1-f12  			numpad 0 - numpad9
	//48-57			65-90		112-123		96-105
	//
(function ($) {
		var settings = {limit:4,
						queue:[],time:[],cmd:[],
						dispqueue:[0],dispcounter:[0,0,0,0],//display
						groupqueuecount:[],counterlast:[],
						//disporder:[0,1,2,3],
						//disphide:[1,0,0,0],disptime:[0,0,0,0],
						//
						counterno	:[11,12,13,14],
						calkey		:[49,50,51,52],//key 1 -4
						recalkey	:[53,54,55,56],//key 5 -8
						
						//calkey		:[97,98,99,100],//keypad 1 -4
						//recalkey	:[101,102,103,104],//keypad 5 -8
						//
						blinktime	:8000,
						isrefresh:1
						};
		//var calkey = [49,50,51,52];//key 1 -4
		
		//var disp_counter = $(".disp_counter_no").eq(0);
		//var disp_queue = $(".disp_queue").eq(0);
		var currentTime = new Date();
		var timer_time;
		var o,k,c,d,ck,rk,cl,gc;
		
		var disp_counter ;
		var disp_counter_no ;
		var disp_queue ;
		
	$.extend({
		ckget:function(){
		return $.JSONCookie('test');
		},
		ckpost:function(o){
		$.JSONCookie('test', o, {path: '/'});
		},
		 addFromnum:function(number1){
	//var number1 = 26;
	var s_num1 = number1.toString();
	for(i=0;i<s_num1.length;i++){
	//alert(i+'|'+s_num1[i]);
	if((s_num1.length)>=2 && s_num1[i]==1 && (s_num1.length-i)==1){
		audio.playlist[audio.playlist.length] = soundManager.soundfolder+"ed.mp3";
	}else if((s_num1.length-i)==2 && s_num1[i]==2){
		audio.playlist[audio.playlist.length] = soundManager.soundfolder+"20.mp3";
	}else{
		if(!((s_num1.length-i)==2 && s_num1[i]==1) && !(s_num1[i]==0)){
			audio.playlist[audio.playlist.length] =soundManager.soundfolder+s_num1[i]+".mp3";
		}
	}
	if((s_num1.length-i)==3){
		audio.playlist[audio.playlist.length] =soundManager.soundfolder+ "100.mp3";
	}else if((s_num1.length-i)==2){
		audio.playlist[audio.playlist.length] = soundManager.soundfolder+"10.mp3";
	}
	}
 },
 playAudio:function(playlistId){
    // Default playlistId to 0 if not supplied
    playlistId = playlistId ? playlistId : 0;
    // If SoundManager object exists, get rid of it...
    if (audio.nowPlaying){
        audio.nowPlaying.destruct();
        // ...and reset array key if end reached
        if(playlistId == audio.playlist.length){
            //playlistId = 0;
        }
    }
    // Standard Sound Manager play sound function...
    soundManager.onready(function() {
        audio.nowPlaying = soundManager.createSound({
            id: 'sk4Audio',
            url: audio.playlist[playlistId],
            autoLoad: true,
            autoPlay: true,
            volume: 50,
            // ...with a recursive callback when play completes
            onfinish: function(){
                playlistId ++;
                playAudio(playlistId);
            }
        })
    });
},
		playQueueSound:function(queue,channel){
			audio.playlist = [];
			audio.playlist[audio.playlist.length] = soundManager.soundfolder+"silent.mp3";
			audio.playlist[audio.playlist.length] = soundManager.soundfolder+"number.mp3";
		$.addFromnum(queue);
			audio.playlist[audio.playlist.length] = soundManager.soundfolder+"silent.mp3";
			audio.playlist[audio.playlist.length] = soundManager.soundfolder+"channel.mp3";
			audio.playlist[audio.playlist.length] = soundManager.soundfolder+"service.mp3";
			$.addFromnum(channel);
			// Start
			playAudio(0);
		}
	});

	$.fn.extend({
	
	

	queuestackctrl:function(){
			//alert('end');
			//o = $.ckget();
			//$.k = o.queue;
			//$.c = o.time;
			//$.d = o.cmd;
			
			$.l = o.dispqueue;
			$.m = o.counterno;
			
		if($.k.length >0){
			//alert(k[0]);
			//alert($.k.length);
			//alert($.k[0]+'|'+$.k.length);
			
			//$.JSONCookie('test', {}, {path: '/'});
			//alert($.k[0]+'|'+$.l[($.k[0] - 1)]+'|'+$.m[($.k[0] - 1)]+'|'+$.k.length);
			
			
			$.k.shift();
			$.c.shift();
			$.d.shift();
			
			//if($.k.length >=1){
			
			//}
			}
			o.isrefresh = 1;
			//alert(o.isrefresh);
			//$.JSONCookie('test', o, {path: '/'});
			//$.ckpost(o);
		},
	dispqueuescreen:function(i,dispqueue,dispcounter){
				//var disp_counter = this.find(".disp_counter");
			//var disp_counter_no = disp_counter.find(".disp_counter_no");
			//var disp_queue = disp_counter.find(".disp_queue");
		//order = o.disporder;
		//m = o.counterno;
		//alert(m[i]);;
		disp_queue.eq(i).html($.sprintf('%03d',dispqueue));
		disp_counter_no.eq(i).html($.sprintf('%02d',dispcounter));
	},	
	disprefresh:function(isstart){
		
		
		var currentTime = new Date();
		var timer_time = currentTime.getTime();
			
			//var disp_counter = this.find(".disp_counter");
			//var disp_counter_no = disp_counter.find(".disp_counter_no");
			//var disp_queue = disp_counter.find(".disp_queue");
			//$.k = o.queue;
			
			
			$.l = o.dispqueue;
			$.m = o.counterno;
			$.f = o.dispcounter;
			
			//$.r = o.isrefresh;
			
			//alert($.l[0]);
			if($.k.length >=1 && o.isrefresh==1){
			//if(o.isrefresh == 1 ){
			//alert($.l[0]+"|"+$.k[0]);
			o.isrefresh = 0;
			//$.ckpost(o);
			
			
			
			
			for(i=0;i<$.m.length;i++){
			//alert(i);
			if(i ==0){
			o.isrefresh = 0;
			
			

			if($.k.length >=1){
				//$.c[i] =	$.k[0];
				//alert($.k[0]+'|'+$.c[0]+'|'+$.d[0]+'|');
				if($.d[0]=='c'){
				
				if(!$.gc[i]){
					$.gc[i]=1;
				}else{
					$.gc[i]++;
				}
				
				cl[($.k[0]-1)] = $.gc[i];
				$.l[i] = $.gc[i];
				}else if($.d[0]=='r'){
				$.l[i] = cl[$.k[0]-1];
				}
				$.f[i] = $.m[($.k[0]-1)];
				//alert(cl[0]+'|'+cl[1]+'|'+cl[2]+'|'+cl[3]+'|');
			}

			//disp_queue.eq(order[i]).html($.sprintf('%03d',$.l[i]));
			//disp_counter_no.eq(order[i]).html($.sprintf('%02d',$.f[i]));
			this.dispqueuescreen(i,$.l[i],$.f[i]);
			//disp_queue.eq(i).html($.sprintf('%03d',l[i]));
			//disp_counter_no.eq(i).html($.sprintf('%02d',c[i]));
			
			
				
				disp_counter.eq(i).addClass("blink");
				//alert((timer_time+3).toString());
				disp_counter.eq(i).attr('blink_exp',(timer_time+o.blinktime).toString());
				//$.r = 0;
				o.isrefresh = 0;
				//alert($.r+'|'+o.isrefresh);
				$.playQueueSound($.l[i],$.f[i]);
			}
			
			}
			//alert(o.isrefresh);
			//$.ckpost(o);
			//}else if(o.isrefresh == 2){
			//
			//alert($.k[0]+'|'+$.l[($.k[0] - 1)]+'|'+$.m[($.k[0] - 1)]+'|'+$.k.length);
			//alert($.k[0]+'|'+$.c[($.k[0] - 1)]);
			//o.isrefresh = 1;
			//$.ckpost(o);
			}else{
				blink_exp = disp_counter.attr('blink_exp');
				//alert(timer_time+'|'+blink_exp);
				if(timer_time > blink_exp){
					//alert('exp');
					disp_counter.removeClass("blink");
					disp_counter.removeAttr('blink_exp');
					this.queuestackctrl();
				}
			}
			
		
		},
		qcard:function(g){
					//alert(settings);
		//$.JSONCookie('test', settings, {path: '/'});
		//o = $.JSONCookie('test');
		//o = $.ckget();
		mainframe = this;
		mainframe.css("margin-top", ($(window).height() - 580)/2  + 'px');
mainframe.css("margin-left", ($(window).width() - 790)/2  + 'px');
o=settings;
//alert(settings.counterlast[0]);
cks = $.ckget();
//alert(cks.counterlast[0]);
if(cks.limit){
		$.extend(o, cks);
		}
//alert(settings.counterlast[0]);
		//o = settings;
		
		$.k = o.queue;
		$.c = o.time;
		$.d = o.cmd;
		ck =o.calkey;
		rk =o.recalkey;
		cl = o.counterlast;
		$.gc = o.groupqueuecount;
		//alert(o);
		//timer_time = currentTime.getTime();
		//$(".disp_counter").dispqueuectrl();
		$(".disp").append("<div class=\"disp_title\" ><div class=\"disp_queue\" >หมายเลข</div><div class=\"disp_counter_no\"><div>ช่องบริการ</div></div></div>");
		$(".disp").append("<div class=\"disp_counter\" ><div class=\"disp_queue\" ></div><div class=\"disp_counter_no\"></div><div class=\"disp_help\"></div></div>");
		$(".disp").append("<div class=\"disp_footer\" ></div>");
		
		
		disp_counter = this.find(".disp_counter");
		disp_counter_no = disp_counter.find(".disp_counter_no");
		disp_queue = disp_counter.find(".disp_queue");
		
		//if(!o.limit){
			//$.JSONCookie('test', settings, {path: '/'});
			//$.ckpost(settings);
		//}else{
		/*
			//k = o.queue;
			$.k = o.queue;
			$.c = o.time;
			//alert(k[0]);
			//alert($.k.length);
			//alert($.k[0]+'|'+$.k.length);
			//$.JSONCookie('test', {}, {path: '/'});
			if($.k.length >1){
			$.k.shift();
			$.c.shift();
			}
			//$.JSONCookie('test', o, {path: '/'});
			$.ckpost(o);
			*/
			//alert('test');
			
		//}
		
		
		
		g.everyTime(1000,function(i) {$(".disp").disprefresh();});
		
		
					//$(this).html(i);
					//timer_time = i;		
		
					g.keyup(function(e){
					g.stopTime();
							//o = $.ckget();
						  //var currentTime = new Date();
	  mstime = currentTime.getTime();

	//if (e.keyCode == 53) {//5
//
	//$.get("?o=b");
	//ck_data++;
	  //$.JSONCookie('the_cookie', ck_data);
	  //alert(ck_data)

	  //o.limit++;
	  //$.k = o.queue;
	  //$.c = o.time;
	  //$.k[0]++;
	  //$.c[0]=mstime;
	  //o.queue = k;
	  //$.JSONCookie('test', o, {path: '/'});
	  //alert(calkey.length);
	  //o.isrefresh = 1;
	  //$.ckpost(o);
	//}else 
	if (e.keyCode == 27) {//esc
	//$.get("?o=d");
	//$.JSONCookie('test', {}, {path: '/'});
	//$.ckpost({});
	//$.ckpost(settings);
	//o = settings;
	o.limit=0;
	//$.extend(o, settings);
//alert(settings.counterlast[0]);
window.location.reload();
	}else{
	for(i=0;i<ck.length;i++){
	if (e.keyCode == ck[i]) {
	
	
	$.c[$.k.length]=mstime;
	$.d[$.k.length]='c';
	$.k[$.k.length] =i+1;
	//$.JSONCookie('test', o, {path: '/'});
	//o.isrefresh = 1;
	//$.ckpost(o);
	//alert($.k.length);
	}else if(e.keyCode == rk[i]){
		
		$.c[$.k.length]=mstime;
		$.d[$.k.length]='r';
		$.k[$.k.length] =i+1;
	}
	
	}
	
	}
	g.everyTime(1000,function(i) {$(".disp").disprefresh();});
	
	});
	
	//$(".disp").disprefresh(1);
	this.dispqueuescreen(0,0,0);
	
	$(window).unload( function () { 
	
	//alert("Bye now!"); 
	$.ckpost(o);
	} );
		}
	
		});
	
})(jQuery);	
	
