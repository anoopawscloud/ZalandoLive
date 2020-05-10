$(document).ready(function(){
	
	// Lift card and show stats on Mouseover
	$('#product-card').hover(function(){
			$(this).addClass('animate');
			$('div.carouselNext, div.carouselPrev').addClass('visible');			
		 }, function(){
			$(this).removeClass('animate');			
			$('div.carouselNext, div.carouselPrev').removeClass('visible');
	});	
	
	// Flip card to the back side
	$('#view_details').click(function(){		
		$('div.carouselNext, div.carouselPrev').removeClass('visible');
		$('#product-card').addClass('flip-10');
		setTimeout(function(){
			$('#product-card').removeClass('flip-10').addClass('flip90').find('div.shadow').show().fadeTo( 80 , 1, function(){
				$('#product-front, #product-front div.shadow').hide();			
			});
		}, 50);
		
		setTimeout(function(){
			$('#product-card').removeClass('flip90').addClass('flip190');
			$('#product-back').show().find('div.shadow').show().fadeTo( 90 , 0);
			setTimeout(function(){				
				$('#product-card').removeClass('flip190').addClass('flip180').find('div.shadow').hide();						
				setTimeout(function(){
					$('#product-card').css('transition', '100ms ease-out');			
					$('#cx, #cy').addClass('s1');
					setTimeout(function(){$('#cx, #cy').addClass('s2');}, 100);
					setTimeout(function(){$('#cx, #cy').addClass('s3');}, 200);				
					$('div.carouselNext, div.carouselPrev').addClass('visible');				
				}, 100);
			}, 100);			
		}, 150);			
	});			
	
	// Flip card back to the front side
	$('#flip-back').click(function(){		
		
		$('#product-card').removeClass('flip180').addClass('flip190');
		setTimeout(function(){
			$('#product-card').removeClass('flip190').addClass('flip90');
	
			$('#product-back div.shadow').css('opacity', 0).fadeTo( 100 , 1, function(){
				$('#product-back, #product-back div.shadow').hide();
				$('#product-front, #product-front div.shadow').show();
			});
		}, 50);
		
		setTimeout(function(){
			$('#product-card').removeClass('flip90').addClass('flip-10');
			$('#product-front div.shadow').show().fadeTo( 100 , 0);
			setTimeout(function(){						
				$('#product-front div.shadow').hide();
				$('#product-card').removeClass('flip-10').css('transition', '100ms ease-out');		
				$('#cx, #cy').removeClass('s1 s2 s3');			
			}, 100);			
		}, 150);			
		
	});	

	
	/* ----  Image Gallery Carousel   ---- */
	
	var carousel = $('#carousel ul');
	var carouselSlideWidth = 335;
	var carouselWidth = 0;	
	var isAnimating = false;
	
	// building the width of the casousel
	$('#carousel li').each(function(){
		carouselWidth += carouselSlideWidth;
	});
	$(carousel).css('width', carouselWidth);
	
	// Load Next Image
	$('div.carouselNext').on('click', function(){
		var currentLeft = Math.abs(parseInt($(carousel).css("left")));
		var newLeft = currentLeft + carouselSlideWidth;
		if(newLeft == carouselWidth || isAnimating === true){return;}
		$('#carousel ul').css({'left': "-" + newLeft + "px",
							   "transition": "300ms ease-out"
							 });
		isAnimating = true;
		setTimeout(function(){isAnimating = false;}, 300);			
	});
	
	// Load Previous Image
	$('div.carouselPrev').on('click', function(){
		var currentLeft = Math.abs(parseInt($(carousel).css("left")));
		var newLeft = currentLeft - carouselSlideWidth;
		if(newLeft < 0  || isAnimating === true){return;}
		$('#carousel ul').css({'left': "-" + newLeft + "px",
							   "transition": "300ms ease-out"
							 });
	    isAnimating = true;
		setTimeout(function(){isAnimating = false;}, 300);			
	});
});

const DEFAULT_STREAM = "https://d7b6438397fc.us-west-2.playback.live-video.net/api/video/v1/aws.ivs.us-west-2.592423023374.channel.BhYpNiqtxalR.m3u8";

// Initialize player
(function() {
  // Register Twitch as playback technology for video.js
  registerTwitchTechForVideoJs(videojs, {});

  // Initialize video.js player and get Twitch player instance
  const videojsPlayer = videojs("twitch-videojs", {
    techOrder: ["TwitchWhiteLabel"]
  });
  const twitchPlayer = videojsPlayer.getTwitchPlayer();
  window.videojsPlayer = videojsPlayer;
  window.twitchPlayer = twitchPlayer;

  // Show the "big play" button when the stream is paused
  const videoContainerEl = document.querySelector("#twitch-videojs");
  videoContainerEl.addEventListener("click", () => {
    if (videojsPlayer.paused()) {
      videoContainerEl.classList.remove("vjs-has-started");
    } else {
      videoContainerEl.classList.add("vjs-has-started");
    }
  });

  // Enables Twitch's quality plugin
  videojsPlayer.enableTwitchQualityPlugin();

  // Set volume to 75%
  videojsPlayer.volume(0.75);

  // Logs low latency setting, latency value, and quality after
    const PlayerState = videojsPlayer.getTwitchTech().PlayerState;
    let interval;
    twitchPlayer.addEventListener(PlayerState.PLAYING, () => {
      interval = setInterval(() => {
      //    console.log('-------------------');
       //   console.log(`This stream is ${twitchPlayer.isLiveLowLatency() ? '' : 'not '}playing in ultra low latency mode`);
         // console.log(`You have been watching for ${twitchPlayer.getPosition().toFixed(2)}s`);
        //  console.log(`Latency: ${twitchPlayer.getLiveLatency().toFixed(2)}s`); 
        //  console.log(`Quality: ${twitchPlayer.getQuality().name}`);
          console.log('-------------------');
      }, 10000);
  });

  twitchPlayer.addEventListener(PlayerState.IDLE, () => {
    clearInterval(interval);
  });

  // Log errors
  const PlayerEvent = videojsPlayer.getTwitchTech().PlayerEvent;
  twitchPlayer.addEventListener(PlayerEvent.ERROR, (type, source) => {
    console.warn('PlayerEvent.ERROR event', type, source);
  });

  // Cleanup
  function cleanUp() { 
//    $("#quiz").addClass("drop");
  //  $("make-3D-space").unbind();
  //  $("TShirtFront").unbind();
 $(".answer").unbind("click").removeClass("correct").removeClass("wrong");
  };
  
  // Trigger quiz
  function triggerQuiz(metadataText) {
            cleanUp();
location.reload();
    
    let obj = JSON.parse(metadataText);
    
   // $("#TShirtFront").text(obj.TShirtFront);
    console.log('RECEIVED METADATA');
    
  };

  // Log and display timed metadata
  twitchPlayer.addEventListener(PlayerEvent.METADATA, (metadata) => {
    if (metadata.type === 'text/plain') {
      const metadataText = metadata.data;
//      cleanUp();

      //$("#quiz").removeClass("drop").show();
      //$("#waiting").hide();
 // $("#make-3D-space").fadeOut();   
      console.log('RECIEVED METADATA');
     let objxx = JSON.parse(metadataText);
      console.log('PARSING COMPLETE');
      console.log(metadataText);
      console.log(objxx.TShirtFront);
      console.log('TEXT PRINTED');
      // $("#TShirtFront").text(objxx.TShirtFront);  
var img = document.createElement("img");
img.src = objxx.TShirtFront;
      img.height = 490;
      img.width = 325;
var src = document.getElementById("TShirtFront");
 src.innerHTML = "";

src.appendChild(img);
      
      $("#Pricy").text(objxx.otherParam[0]);
      console.log(objxx.otherParam[0]);
      $("#Namey").text(objxx.otherParam[1]);
      $("#descry").text(objxx.otherParam[2]);
      $("#sizy").text(objxx.otherParam[3]);
      
      var img = document.createElement("img");
img.src = objxx.otherParam[4];
      img.height = 490;
      img.width = 325;
var src = document.getElementById("back1");
       src.innerHTML = "";

src.appendChild(img);
      
            var img = document.createElement("img");
img.src = objxx.otherParam[5];
      img.height = 490;
      img.width = 325;
var src = document.getElementById("back2");
       src.innerHTML = "";

src.appendChild(img);
      
                  var img = document.createElement("img");
img.src = objxx.otherParam[6];
      img.height = 490;
      img.width = 325;
var src = document.getElementById("back3");
       src.innerHTML = "";

src.appendChild(img);
     
      
       $("#make-3D-space").show();   
      //triggerQuiz(metadataText);
    }
  });
  
//  $("#quiz").hide();
//  $("#waiting").show();
  $("#make-3D-space").hide();
 /* $("#product-card").hide();
  $("#product-front").hide();
  $("#view_details").hide();
  $("#product-back").hide();
  $("#carousel").hide();
  $("#flip-back").hide();
  $("#cy").hide();
  $("#cx").hide(); */

  // Play default stream
  videojsPlayer.src(DEFAULT_STREAM);
})();