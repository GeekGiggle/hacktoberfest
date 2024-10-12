const colors = document.querySelectorAll(".color");
const generateBtn = document.getElementById("generate-btn");

generateBtn.addEventListener("click", generatePalette);

function generatePalette() {
	colors.forEach((color) => {
		if (!color.classList.contains("locked")) {
			const randomColor = generateRandomColor();
			color.style.backgroundColor = randomColor;
			color.querySelector(".hex-code").textContent = randomColor;
		}
	});
}

function generateRandomColor() {
	const hex = Math.floor(Math.random() * 16777215).toString(16);
	return `#${hex.padStart(6, "0")}`;
}

colors.forEach((color) => {
	color.querySelector(".lock-btn").addEventListener("click", () => {
		color.classList.toggle("locked");
		const lockButton = color.querySelector(".lock-btn");
		lockButton.textContent = color.classList.contains("locked")
			? "Unlock"
			: "Lock";
	});
});
