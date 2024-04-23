setTimeout(() => {
	document.querySelector("html").setAttribute("style", "overflow-x: hidden; scroll-behavior: smooth;");
}, 100);
window.addEventListener("scroll", () => {
	let scroll = this.scrollY;
	var background = document.getElementById("cover-background");
	if (scroll < 250) {
		background.style.opacity = 1;
	} else if (scroll > 450) {
		background.style.opacity = 0;
	} else {
		background.style.opacity = (450 - scroll) / 200;
	}

	var scrollPrompt = document.querySelector(".prompt-container");
	if (scroll < 50) {
		scrollPrompt.style.opacity = 1;
	} else {
		scrollPrompt.style.opacity = 0;
	}

	var nav = document.getElementById("nav");
	if (scroll < 1000) {
		nav.style.transform = "translateY(-64px)";
	} else {
		nav.style.transform = "";
	}
});

document.getElementById("cards").onmousemove = (e) => {
	for (const card of document.getElementsByClassName("card")) {
		const rect = card.getBoundingClientRect(),
			x = e.clientX - rect.left,
			y = e.clientY - rect.top;

		card.style.setProperty("--mouse-x", `${x}px`);
		card.style.setProperty("--mouse-y", `${y}px`);
	}
};

var bg = 0;
setInterval(() => {
	if (bg == 3) {
		document.getElementById("cover-background4").style.opacity = 1;
		document.getElementById("cover-background3").style.opacity = 0;
		document.getElementById("cover-background2").style.opacity = 0;
	} else if (bg == 2) {
		document.getElementById("cover-background4").style.opacity = 0;
		document.getElementById("cover-background3").style.opacity = 1;
		document.getElementById("cover-background2").style.opacity = 0;
	} else if (bg == 1) {
		document.getElementById("cover-background4").style.opacity = 0;
		document.getElementById("cover-background3").style.opacity = 0;
		document.getElementById("cover-background2").style.opacity = 1;
	} else {
		document.getElementById("cover-background4").style.opacity = 0;
		document.getElementById("cover-background3").style.opacity = 0;
		document.getElementById("cover-background2").style.opacity = 0;
	}
	bg = (bg + 1) % 4;
}, 2000);

document.getElementById("feature-nav").addEventListener("click", () => {
	window.scroll({
		top: document.querySelector("#main > div:nth-child(1)").getBoundingClientRect().top + window.scrollY - window.innerHeight / 5,
		behavior: "smooth"
	});
});
document.getElementById("about-nav").addEventListener("click", () => {
	window.scroll({
		top: document.querySelector("#main > div:nth-child(2)").getBoundingClientRect().top + window.scrollY - window.innerHeight / 5,
		behavior: "smooth"
	});
});
document.getElementById("download-nav").addEventListener("click", () => {
	window.scroll({
		top: document.querySelector("#main > div:nth-child(3)").getBoundingClientRect().top + window.scrollY - window.innerHeight / 5,
		behavior: "smooth"
	});
});
document.getElementById("source-nav").addEventListener("click", () => {
	window.scroll({
		top: document.querySelector("#main > div:nth-child(4)").getBoundingClientRect().top + window.scrollY - window.innerHeight / 5,
		behavior: "smooth"
	});
});

document.getElementById("performance-card").addEventListener("click", () => {
	window.scroll({
		top: document.getElementById("performance").getBoundingClientRect().top + window.scrollY - window.innerHeight / 5,
		behavior: "smooth"
	});
});
document.getElementById("design-card").addEventListener("click", () => {
	window.scroll({
		top: document.getElementById("design").getBoundingClientRect().top + window.scrollY - window.innerHeight / 5,
		behavior: "smooth"
	});
});
document.getElementById("user-card").addEventListener("click", () => {
	window.scroll({
		top: document.getElementById("user").getBoundingClientRect().top + window.scrollY - window.innerHeight / 5,
		behavior: "smooth"
	});
});

var img_theme = "dark";
var img_color = "blue";
for (const colors of document.getElementsByClassName("color")) {
	colors.addEventListener("click", (e) => {
		for (const dots of document.getElementsByClassName("color")) {
			dots.classList.remove("selected");
		}
		e.target.classList.add("selected");
		img_color = e.target.classList.value.toString().replace(" color", "").replace(" selected", "").replace(" scrolled", "");
		document.getElementById("color_preview").setAttribute("src", `screenshots/${img_theme}_${img_color}.png`);
	});
}
document.getElementById("dark_preview").addEventListener("change", (e) => {
	img_theme = e.target.checked ? "dark" : "light";
	document.getElementById("color_preview").setAttribute("src", `screenshots/${img_theme}_${img_color}.png`);
});

document.getElementById("download").addEventListener("click", () => {
	document.querySelector("#download div svg").style.display = "none";
	document.querySelector("#download div div.loading").style.display = "";
	document.querySelector("#download div p").innerText = "Starting download...";
	setInterval(() => {
		document.getElementById("download").style.opacity = "0";
	}, 1000);
	setTimeout(() => {
		document.getElementById("download").style.display = "none";
		document.getElementById("download-thanks").style.display = "";
		location.href = "https://github.com/ChakornK/jh-eagles/releases/download/v2.0.1/jh-eagles-v2.0.1.apk";
	}, 1300);
	setTimeout(() => {
		document.getElementById("download-thanks").style.opacity = "1";
	}, 1500);
});

document.getElementById("git-app").addEventListener("click", () => {
	window.open("https://github.com/ChakornK/jheagles-react-native");
});
document.getElementById("git-web").addEventListener("click", () => {
	window.open("https://github.com/ChakornK/jheagles-website");
});

document.querySelectorAll("img").forEach((e) => {
	e.setAttribute("draggable", "false");
});

// SCROLL ANIMATIONS
const elementInView = (el, percentageScroll) => {
	const elementTop = el.getBoundingClientRect().top;
	return elementTop <= (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100);
};

let throttleTimer = false;
const throttle = (callback, time) => {
	if (throttleTimer) return;
	throttleTimer = true;
	setTimeout(() => {
		callback();
		throttleTimer = false;
	}, time);
};

var scrollStyle = document.createElement("style");
scrollStyle.innerHTML = `
	#main *:not(button) {
		opacity: 0;
		transition: 0.5s opacity, 0.3s all;
	}
	#main *.scrolled {
		opacity: 1;
	}
`;
document.head.appendChild(scrollStyle);

const scrollElements = document.querySelectorAll("#main *");
window.addEventListener("scroll", () => {
	throttle(() => {
		scrollElements.forEach((el) => {
			if (elementInView(el, 100)) {
				el.classList.add("scrolled");
			} else {
				el.classList.remove("scrolled");
			}
		});
	}, 250);
});
