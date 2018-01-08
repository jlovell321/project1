
$(document).ready(function(){
		
		
	$('#submit').on('click', function (event) {
			event.preventDefault();

			var photo = $('#image').val();
			console.log('{"url": '+photo+'}');
			console.log('{"url": "https://pbs.twimg.com/profile_images/822547732376207360/5g0FC8XX_400x400.jpg"}"')
			$('#scores').empty();
			$('#faceRectangle').empty();
			$('#title').text("Emotions");
			$('#display').html("<img src='" + photo +  "'alt= 'your image'>");
			

		$(function() {
		        // No query string parameters for this API call.
		        var params = { };

		        $.ajax({
		            // NOTE: You must use the same location in your REST call as you used to obtain your subscription keys.
		            //   For example, if you obtained your subscription keys from westcentralus, replace "westus" in the 
		            //   URL below with "westcentralus".
		            url: "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?" + $.param(params),
		            beforeSend: function(xhrObj){
		                // Request headers, also supports "application/octet-stream"
		                xhrObj.setRequestHeader("Content-Type","application/json");

		                // NOTE: Replace the "Ocp-Apim-Subscription-Key" value with a valid subscription key.
		                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","9c92bf494dd64f25bb84d008e2b29bdf");
		            },
		            type: "POST",
		            // Request body
		            data: '{"url": "'+photo+'"}',
		        }).done(function(data) {
		           
		            

		            // Get emotion confidence scores
		            var scores = data[0].scores;
		            var scoresList = $('#scores');

		            if (data[0].scores.happiness > 0.5) {
		            	$('#emotion').text("Major Emotion: Happiness");
		            	$('#recommend').text("Wo there cowboy!! What's got you all excited?! Well we're glad you're happy; here are some song recommendations to keep you smiling! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida sit amet neque in sagittis. Nunc scelerisque nulla eu tincidunt finibus. In tristique nisi sed diam tristique, euismod blandit urna commodo. Suspendisse id varius ex. Phasellus mi ipsum, placerat quis lorem vitae, maximus convallis magna. Proin tempor, nulla nec rutrum dignissim, ante ante scelerisque justo, vitae lobortis mi magna vel sem. In et congue mi. Suspendisse urna lectus, elementum ut posuere a, rhoncus a libero. Morbi vel metus a nunc lacinia tincidunt quis sed risus. Pellentesque elementum elit risus, a ultrices neque rhoncus sed. Quisque rhoncus consectetur fermentum. Phasellus non convallis velit. Praesent nec dolor in augue scelerisque auctor id et mauris. Quisque pulvinar sit amet felis suscipit molestie. Donec est diam, congue a nisl at, molestie vulputate nulla. Nulla hendrerit, quam et tempus rutrum, est massa facilisis urna, quis consequat arcu felis non ante.");
		            	$('#playList').html("<iframe src='https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWSqmBTGDYngZ' width='300' height='380' frameborder='0' allowtransparency='true'></iframe>");
		            } else if (data[0].scores.anger > 0.5) {
		            	$('#emotion').text("Major Emotion: Anger");
		            	$('#recommend').text("You mad bro?! You gonna do something about it?! Well how about listening to our angry playlist?! its GMO free! https://pbs.twimg.com/profile_images/822547732376207360/5g0FC8XX_400x400.jpg");
		            	$('#playList').html("<iframe src='https://open.spotify.com/embed/user/gmcauchi94/playlist/5Zmi1L2g2uUbGJNgq5VHXM' width='300' height='380' frameborder='0' allowtransparency='true'></iframe>");
		            } else if (data[0].scores.sadness > 0.5) {
		            	$('#emotion').text("Major Emotion: Sadness");
		            	$('#recommend').text("No one loves you. Your exe's new bae is hotter than you. And the Goverrnment faked the moon landing. Here are some songs to keep you sad. https://pbs.twimg.com/profile_images/822547732376207360/5g0FC8XX_400x400.jpg");
		            	$('#playList').html("<iframe src='https://open.spotify.com/embed/user/funnybunny000000/playlist/4EoPt05ztUjVaujcWbUL2Z' width='300 'height='380' frameborder='0' allowtransparency='true'></iframe>");
		            }


		            // Append to DOM
		            for(var prop in scores) {
		                scoresList.append("<li> " + prop + ": " + scores[prop] + "</li>")
		            }
		        }).fail(function(err) {
		            alert("Error: " + JSON.stringify(err));
		        });
	    });


  


			
	})


});