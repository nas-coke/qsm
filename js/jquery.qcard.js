//
//
//var currentTime = new Date();
jQuery.extend({
		ckget:function(){
		return $.JSONCookie('test');
		},
		ckpost:function(o){
		$.JSONCookie('test', o, {path: '/'});
		}
});
	jQuery.fn.extend({
/*
		dispqueuectrl:function(options){
			var disp_counter = this.eq(0);
		var disp_counter_no = disp_counter.find(".disp_counter_no").eq(0);
		var disp_queue = disp_counter.find(".disp_queue").eq(0);
		var timer_time = currentTime.getTime();
				//disp_queue.html('000');
				//disp_counter_no.html('01');
				disp_counter.addClass("blink");
				//alert((timer_time+3).toString());
				disp_counter.attr('blink_exp',(timer_time+4000).toString());
		
		},
		dispqueuerefresh:function(options){
		//var disp_counter = $(".disp_counter").eq(0);
		var disp_counter = this.eq(0);
		var disp_counter_no = disp_counter.find(".disp_counter_no").eq(0);
		var disp_queue = disp_counter.find(".disp_queue").eq(0);
		var currentTime = new Date();
		var timer_time = currentTime.getTime();
		
					blink_exp = disp_counter.attr('blink_exp');
					//alert(timer_time+'|'+blink_exp);
					if(timer_time > blink_exp){
					//alert('exp');
					disp_counter.removeClass("blink");
					disp_counter.removeAttr('blink_exp');
					}
		},
		*/
/*		
	qcard:function(){
		
		
		var settings = {limit:4,
						queue:[],time:[],
						dispqueue:[0,0,0,0],dispcounter:[3,4,5,6],counterno:[3,4,5,6],
						disporder:[0,1,2,3],disphide:[1,0,0,0],disptime:[0,0,0,0],isrefresh:1
						};
		var calkey = [49,50,51,52];//key 1 -4
		
		//var disp_counter = $(".disp_counter_no").eq(0);
		//var disp_queue = $(".disp_queue").eq(0);
			var currentTime = new Date();
			var timer_time;
			
			
		//alert(settings);
		//$.JSONCookie('test', settings, {path: '/'});
		//o = $.JSONCookie('test');
		o = $.ckget();
		//alert(o);
		timer_time = currentTime.getTime();
		//$(".disp_counter").dispqueuectrl();
		
		$(".disp").append("<div class=\"disp_counter\" ><div class=\"disp_queue\" ></div><div class=\"disp_counter_no\"></div></div>");
		
		if(!o.limit){
			//$.JSONCookie('test', settings, {path: '/'});
			$.ckpost(settings);
		}
		
		
		
		$(this).everyTime(1000,function(i) {
					
					//timer_time = currentTime.getTime();
					
					//$(".disp_counter").dispqueuerefresh();
					//alert(o.isrefresh);
					$(".disp").disprefresh();
					
		});
					//$(this).html(i);
					//timer_time = i;		
		
					$(this).keyup(function(e){
							o = $.ckget();
						  var currentTime = new Date();
	  mstime = currentTime.getTime();
	  	  $.k = o.queue;
	  $.c = o.time;
	if (e.keyCode == 53) {//5

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
	  o.isrefresh = 1;
	  $.ckpost(o);
	}else if (e.keyCode == 27) {//esc
	//$.get("?o=d");
	//$.JSONCookie('test', {}, {path: '/'});
	$.ckpost({});
	}else{
	for(i=0;i<calkey.length;i++){
	if (e.keyCode == calkey[i]) {
	//alert($.k.length);
	$.k[$.k.length] =i+1;
	$.c[$.k.length]=mstime;
	//$.JSONCookie('test', o, {path: '/'});
	o.isrefresh = 1;
	$.ckpost(o);
	}
	
	}
	
	}
	
	
	});
	
	$(".disp").disprefresh(1);
	
	
		
		},		
*/		
		queuestackctrl:function(){
			//alert('end');
			o = $.ckget();
			$.k = o.queue;
			$.l = o.dispqueue;
			$.m = o.counterno;
			$.c = o.time;
if($.k.length >0){
			//alert(k[0]);
			//alert($.k.length);
			//alert($.k[0]+'|'+$.k.length);
			
			//$.JSONCookie('test', {}, {path: '/'});
			//alert($.k[0]+'|'+$.l[($.k[0] - 1)]+'|'+$.m[($.k[0] - 1)]+'|'+$.k.length);
			
			
			$.k.shift();
			$.c.shift();
			
			if($.k.length >=1){
			o.isrefresh = 1;
			}
			}
			//$.JSONCookie('test', o, {path: '/'});
			$.ckpost(o);
		},
		
		disprefresh:function(isstart){
			o = $.ckget();
			var currentTime = new Date();
			var timer_time = currentTime.getTime();
			
			var disp_counter = this.find(".disp_counter");
			var disp_counter_no = disp_counter.find(".disp_counter_no");
			var disp_queue = disp_counter.find(".disp_queue");
			$.l = o.dispqueue;
			$.c = o.counterno;
			$.f = o.dispcounter;
			order = o.disporder;
			//$.r = o.isrefresh;
			$.k = o.queue;
			//alert($.l[0]);
			
			if(o.isrefresh == 1 ){
			alert($.l[0]+"|"+$.k[0]);
			o.isrefresh = 0;
			$.ckpost(o);
			
			
			
			
			for(i=0;i<$.c.length;i++){
			//alert(i);
			if(i ==0){
			o.isrefresh = 0;
			
			

			if($.k.length >=1){
		//$.c[i] =	$.k[0];
		if(!$.l[i]){$.l[i]=1;}else{
		$.l[i]++;}
		$.f[i] = $.c[($.k[0]-1)];
			}
			disp_queue.eq(order[i]).html($.sprintf('%03d',$.l[i]));
			disp_counter_no.eq(order[i]).html($.sprintf('%02d',$.f[i]));

			//disp_queue.eq(i).html($.sprintf('%03d',l[i]));
			//disp_counter_no.eq(i).html($.sprintf('%02d',c[i]));
			

				
				disp_counter.eq(i).addClass("blink");
				//alert((timer_time+3).toString());
				disp_counter.eq(i).attr('blink_exp',(timer_time+4000).toString());
				//$.r = 0;
				o.isrefresh = 0;
				//alert($.r+'|'+o.isrefresh);
				
			}
			
			}
			//alert(o.isrefresh);
			$.ckpost(o);
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
			
			
		}
	
		});