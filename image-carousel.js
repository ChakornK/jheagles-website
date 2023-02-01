var cfImg = document.getElementsByClassName("coverflow__image");

function setupCoverflow(coverflowContainer) {
	var coverflowContainers;

	if (typeof coverflowContainer !== "undefined") {
		if (Array.isArray(coverflowContainer)) {
			coverflowContainers = coverflowContainer;
		} else {
			coverflowContainers = [coverflowContainer];
		}
	} else {
		coverflowContainers = Array.prototype.slice.apply(document.getElementsByClassName("coverflow"));
	}

	coverflowContainers.forEach(function (containerElement) {
		var coverflow = {};

		coverflow.container = containerElement;
		coverflow.images = Array.prototype.slice.apply(containerElement.getElementsByClassName("coverflow__image"));
		coverflow.position = 1;

		coverflow.images.forEach(function (coverflowImage, i) {
			coverflowImage.dataset.coverflowIndex = i + 1;
		});

		coverflow.container.dataset.coverflowPosition = coverflow.position;

		function setPrevImage() {
			coverflow.position = Math.max(1, coverflow.position - 1);
			coverflow.container.dataset.coverflowPosition = coverflow.position;
		}

		function setNextImage() {
			coverflow.position = Math.min(coverflow.images.length, coverflow.position + 1);
			coverflow.container.dataset.coverflowPosition = coverflow.position;
		}

		var i = 0;
		var transitioning = false;
		setInterval(() => {
			if (i < 5) {
				setNextImage();
			} else {
				for (let i = 0; i < cfImg.length; i++) {
					cfImg[i].style.transition = "0s all";
				}
				document.querySelector(".img-carousel").style.opacity = 0;
				setTimeout(() => {
					for (let i = 0; i < 6; i++) {
						setPrevImage();
					}
					document.querySelector(".img-carousel").style.opacity = 1;
				}, 800);
				setTimeout(() => {
					for (let i = 0; i < cfImg.length; i++) {
						cfImg[i].style.transition = null;
					}
				}, 1000);
			}

			i = (i + 1) % 6;
		}, 3000);
	});
}

setupCoverflow();
