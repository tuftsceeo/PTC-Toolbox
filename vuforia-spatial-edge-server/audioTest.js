var player = require('play-sound')(opts = {})

player.play('hands.mp3', function(err){
	if (err) throw err
})