var site = urlParams.get('url')

var player = new Clappr.Player({
	source: site,
	poster: "http://clappr.io/poster.png",
	mute: true,
	parentId: "#player",
});
