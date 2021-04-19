		//
	//keycode
	// 0 - 9 			a-z 			f1-f12  			numpad 0 - numpad9
	//48-57			65-90		112-123		96-105
	//







(function ($) {
		var settings = {
						limit:4,
						queue:[],time:[],cmd:[],
						dispqueue:[0],dispcounter:[0,0,0,0],//display
						groupqueuecount:[],counterlast:[],
						//disporder:[0,1,2,3],
						//disphide:[1,0,0,0],disptime:[0,0,0,0],
						//
						counterno	:[1,2,3,4],
						//
						//calkey		:[49,50,51,52],//key 1 -4
						//recalkey	:[53,54,55,56],//key 5 -8
						//resetkey	:27,// key esc
						
						calkey		:[97,98,99,100],//keypad 1 -4
						recalkey	:[101,102,103,104],//keypad 5 -8
						resetkey	:109,// keypad -
						//
						blinktime	:8000,
						title_queue:"หมายเลข",
						title_counter:"ช่องบริการ",
						footertext:"QcardVer2.5by <a href='http://hosting.m108.com'>m108.com</a>",
						isrefresh:1
		};

		var currentTime = new Date();
		var timer_time;
		var o,k,c,d,ck,rk,cl,gc;
		
		var disp_counter ;
		var disp_counter_no ;
		var disp_queue ;
		var audio = [];
		var soundNames = ['0','1','2','3','4','5','6','7','8','9','10','20','100','ed','please', 'number', 'at', 'channel', 'service','ka','silent'];
		//var soundNames = [ 'number', 'at', 'channel', 'service','ka','silent'];
		// soundManager.debugMode = false; // disable debug output
		soundManager.url = 'swf/'; // path to directory containing SoundManager2 .SWF file
		
		soundManager.useFlashBlock = false; // skip for now. See the flashblock demo when you want to start getting fancy.
		soundManager.soundfolder = 'sound/';
		//soundManager.flashVersion = 9; 
		soundManager.flashVersion = 8;
		//soundManager.useHighPerformance = true; // reduces delays
		soundManager.flashLoadTimeout = 500; 
		//soundManager.useHTML5Audio = true; 
		//soundManager.preferFlash = false; 
		soundManager.ontimeout(function(status) { 
			// no flash, go with HTML5 audio 
			//alert('test');
			//soundManager.useHTML5Audio = true; 
			//soundManager.preferFlash = false; 
			//soundManager.reboot(); 
			//playlistId ++;
			loading_dialog.css('visibility','hidden');
			queueframe.css('visibility','visible');
		});

	$.extend({
	
		ckget:function(){
			return $.JSONCookie('test');
		},
		
		ckpost:function(o){
			$.JSONCookie('test', o, {path: '/'});
		},
		
		 addFromnum:function(number1){

			var s_num1 = number1.toString();
			for(i=0;i<s_num1.length;i++){

				if((s_num1.length)>=2 && s_num1[i]==1 && (s_num1.length-i)==1){
					audio.playlist[audio.playlist.length] = "ed";
				}else if((s_num1.length-i)==2 && s_num1[i]==2){
					audio.playlist[audio.playlist.length] = "20";
				}else{
					if(!((s_num1.length-i)==2 && s_num1[i]==1) && !(s_num1[i]==0)){
						audio.playlist[audio.playlist.length] =s_num1[i].toString();
					}
				}
				if((s_num1.length-i)==3){
					audio.playlist[audio.playlist.length] = "100";
				}else if((s_num1.length-i)==2){
					audio.playlist[audio.playlist.length] = "10";
				}
			}
		},
		
		playAudio2:function(playlistId,callback){
			playlistId = playlistId ? playlistId : 0;
			if(playlistId == audio.playlist.length){
				if (callback && typeof(callback) === "function") {  
					callback();  
				}
			}
			var sound = soundManager.getSoundById(audio.playlist[playlistId]);
			sound.play({volume:80,onfinish:function(){
                playlistId ++;
                $.playAudio2(playlistId,callback);
			}});
		},
		
		loadAudio:function(playlistId,callback){
			playlistId = playlistId ? playlistId : 0;
			// show loading
			$("#loadnum").html(playlistId.toString()+'/'+soundNames.length.toString());
			if(playlistId == soundNames.length){
			   if (callback && typeof(callback) === "function") {  
					callback();  
				}
			}
    
			// Standard Sound Manager play sound function...
			soundManager.onready(function() {
				soundManager.createSound({
					id: soundNames[playlistId],
					url: soundManager.soundfolder+soundNames[playlistId]+'.mp3',
					// ...with a recursive callback when play completes
			        autoLoad: true,
					//autoPlay: true,
					//volume: 0,
					onload: function(){
						playlistId ++;
						//alert(playlistId);
						$.loadAudio(playlistId,callback);
					}
				});
			});
		},

		playQueueSound:function(queue,channel){
			audio.playlist = [];
			audio.playlist[audio.playlist.length] = "please";
			audio.playlist[audio.playlist.length] = "number";
			$.addFromnum(queue);
			audio.playlist[audio.playlist.length] = "at";
			audio.playlist[audio.playlist.length] = "channel";
			audio.playlist[audio.playlist.length] = "service";
			$.addFromnum(channel);
			audio.playlist[audio.playlist.length] = "ka";
			$.playAudio2(0);
		}
		
	});

	$.fn.extend({
	
	

		queuestackctrl:function(){
			$.l = o.dispqueue;
			$.m = o.counterno;
			if($.k.length >0){
				$.k.shift();
				$.c.shift();
				$.d.shift();
			}
			o.isrefresh = 1;
		},
		
		dispqueuescreen:function(i,dispqueue,dispcounter){
			disp_queue.eq(i).html($.sprintf('%03d',dispqueue));
			disp_counter_no.eq(i).html($.sprintf('%02d',dispcounter));
		},	
		
	disprefresh:function(isstart){
		
		var currentTime = new Date();
		var timer_time = currentTime.getTime();
			
		$.l = o.dispqueue;
		$.m = o.counterno;
		$.f = o.dispcounter;
			

		if($.k.length >=1 && o.isrefresh==1){

			o.isrefresh = 0;

			for(i=0;i<$.m.length;i++){

			if(i ==0){
			o.isrefresh = 0;
			
			

			if($.k.length >=1){

				if($.d[0]=='c'){
				
				if(!$.gc[i]){
					$.gc[i]=1;
				}else{
				if($.gc[i]==999){
					o.limit=0;
					window.location.reload();
				}else{
					$.gc[i]++;
					}
				}
				
				cl[($.k[0]-1)] = $.gc[i];
				$.l[i] = $.gc[i];
				}else if($.d[0]=='r'){
				$.l[i] = cl[$.k[0]-1];
				}
				$.f[i] = $.m[($.k[0]-1)];

			}
			this.dispqueuescreen(i,$.l[i],$.f[i]);

				disp_counter.eq(i).addClass("blink");

				disp_counter.eq(i).attr('blink_exp',(timer_time+o.blinktime).toString());

				o.isrefresh = 0;

				$.playQueueSound($.l[i],$.f[i]);
			}
			
			}

			}else{
				blink_exp = disp_counter.attr('blink_exp');

				if(timer_time > blink_exp){

					disp_counter.removeClass("blink");
					disp_counter.removeAttr('blink_exp');
					this.queuestackctrl();
				}
			}
			
		
		},
		qcard:function(g){

			mainframe = this;
			mainframe.css("margin-top", ($(window).height() - 580)/2  + 'px');
			mainframe.css("margin-left", ($(window).width() - 790)/2  + 'px');
			o=settings;

			cks = $.ckget();

			if(cks.limit){
				$.extend(o, cks);
			}

		
		$.k = o.queue;
		$.c = o.time;
		$.d = o.cmd;
		ck =o.calkey;
		rk =o.recalkey;
		cl = o.counterlast;
		$.gc = o.groupqueuecount;
		mainframe.append("<div class=\"queueframe\" ></div>");
		
		queueframe = mainframe.find(".queueframe");
		queueframe.append("<div class=\"disp_title\" ><div class=\"disp_queue\" >"+o.title_queue+"</div><div class=\"disp_counter_no\"><div>"+o.title_counter+"</div></div></div>");
		queueframe.append("<div class=\"disp_counter\" ><div class=\"disp_queue\" ></div><div class=\"disp_counter_no\"></div><div class=\"disp_help\"></div></div>");
		queueframe.append("<div class=\"disp_footer\" ><div>"+o.footertext+"</div></div>");

		mainframe.append("<div  id=\"disp_dialog\" ><div class=\"menu\"></div><div class=\"content\"></div>");
		mainframe.append("<div  id=\"loading_dialog\" ><div style=\"float:left\"><img src=\"image/loading_big.gif\"  title=\"loading\"  ></div><div  style=\"float:left\">Loading&nbsp;</div><div style=\"float:left\" id=\"loadnum\">12</div></div>");
		
		$(".disp_help").html("<div style=\"margin-top:20px;margin-right:20px;float:right\"><img src=\"image/24_faq.png\"  title=\"Help\"  class=\"btn_dialog_help\"></div>");
		$("#disp_dialog div.menu" ).html("<img src=\"image/24_close.png\"  title=\"close\"  class=\"btn_dialog_close\">");
		$("#disp_dialog div.content" ).load("htm/help.htm");
		$(".btn_dialog_help").click(function(){
			$("#disp_dialog").css('visibility','visible');
		});
		$(".btn_dialog_close").click(function(){
			$("#disp_dialog").css('visibility','hidden');
		});
		
		disp_counter = mainframe.find(".disp_counter");
		disp_counter_no = disp_counter.find(".disp_counter_no");
		disp_queue = disp_counter.find(".disp_queue");
		loading_dialog = mainframe.find("#loading_dialog");
		
		queueframe.css('visibility','hidden');
		$.loadAudio(0,function(){
			loading_dialog.css('visibility','hidden');
			queueframe.css('visibility','visible');
		});
		
		g.everyTime(1000,function(i) {mainframe.disprefresh();});
		
		g.keyup(function(e){
			g.stopTime();
			mstime = currentTime.getTime();
			if (e.keyCode == o.resetkey) {//esc -> reset
				o.limit=0;
				window.location.reload();
			}else{
				for(i=0;i<ck.length;i++){
					if (e.keyCode == ck[i]) {
						$.c[$.k.length]=mstime;
						$.d[$.k.length]='c';
						$.k[$.k.length] =i+1;
					}else if(e.keyCode == rk[i]){
						$.c[$.k.length]=mstime;
						$.d[$.k.length]='r';
						$.k[$.k.length] =i+1;
					}
				}
			}
			g.everyTime(1000,function(i) {mainframe.disprefresh();});
		});
	
		mainframe.dispqueuescreen(0,0,0);
	
		$(window).unload( function () { 
			$.ckpost(o);
		} );
	

	
	}
	});
})(jQuery);	
	
