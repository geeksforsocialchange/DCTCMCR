// show / hide menu

const toggleClass = (element, className) => {
	if (element.classList.contains(className)) {
		element.classList.remove(className);
	} else {
		element.classList.add(className);
	}
};

const invertFilter = (element) => {
	if (element.style.filter === "invert(0)") {
		element.style.filter = "invert(1)";
	} else {
		element.style.filter = "invert(0)";
	}
};

const toggleIcon = (element, path1, path2) => {
	if (element.src.includes(path1)) {
		element.src = element.src.replace(path1, path2);
	} else {
		element.src = element.src.replace(path2, path1);
	}
};

const nav = document.querySelector("nav");
const menuBtn = document.querySelector("#menu");

menuBtn.onclick = (e) => {
	e.preventDefault();
	toggleClass(nav, "screen-reader-only");
	invertFilter(menuBtn);
	toggleIcon(menuBtn.firstElementChild, "open", "close");
};

// menu shows by default in case no JS, so hide it on load
menuBtn.click();
