function getSearchParameters() {
    var prmstr = window.location.search.substr(1);
    return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}

var params = getSearchParameters();

var player = new Clappr.Player({
	source: params.url,
	poster: "https://i.imgur.com/uzKdTXG.jpg",
	mute: true,
	watermark: "https://raw.githubusercontent.com/code-rgb/USERGE-X/alpha/resources/ghosts.png",
        position: 'top-left',
        watermarkLink: "https://github.com/code-rgb/USERGE-X",
	parentId: "#player",
	
});
