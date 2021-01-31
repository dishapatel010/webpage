const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const video_link = urlParams.get("url");
const player = new Plyr("#player");

function change_src() {
	player.source = {
		type: "video",
		title: "Example title",
		sources: [
			{
				src: atob(video_link),
				type: "video/mp4",
				//   size: 720
			},
		],
		// poster: poster
	};

	player.play();
}
if (video_link) {
	change_src();
}
//  ------------------Theme Toggle------------------
var darkMode = document.getElementById("darkMode");
var darkLabel = "darkModeLabel";
var darkLang = "Dark";
var lightLang = "Light";

window.addEventListener("load", function () {
	if (darkMode) {
		initTheme();
		darkMode.addEventListener("change", function () {
			resetTheme();
		});
	}
});

function initTheme() {
	var darkThemeSelected =
		localStorage.getItem("darkMode") !== null &&
		localStorage.getItem("darkMode") === "dark";
	darkMode.checked = darkThemeSelected;
	darkThemeSelected
		? document.body.setAttribute("data-theme", "dark")
		: document.body.removeAttribute("data-theme");
	darkThemeSelected
		? (document.getElementById(darkLabel).innerHTML = darkLang)
		: (document.getElementById(darkLabel).innerHTML = lightLang);
	resetTheme();
}

function resetTheme() {
	if (darkMode.checked) {
		document.body.setAttribute("data-theme", "dark");
		localStorage.setItem("darkMode", "dark");
		document.getElementById(darkLabel).innerHTML = darkLang;
		$("body").css("background-color", "#222222");

		$("body > nav > div > a").css("color", "#620afa");
		$("body > nav")
			.removeClass("navbar-light bg-light")
			.addClass("navbar-dark bg-dark");
		// #hex to Filter https://codepen.io/sosuke/pen/Pjoqqp
		$("img").css(
			"filter",
			"invert(10%) sepia(100%) saturate(7114%) hue-rotate(267deg) brightness(94%) contrast(109%)"
		);
	} else {
		document.body.removeAttribute("data-theme");
		localStorage.removeItem("darkMode");
		document.getElementById(darkLabel).innerHTML = lightLang;
		$("body").css("background-color", "white");
		$("body > nav")
			.removeClass("navbar-dark bg-dark")
			.addClass("navbar-light bg-light");
		$("img").css("filter", "");
	}
}
//  ----------------------------------------------
