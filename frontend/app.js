const input = document.getElementById("url-input");
const button = document.getElementById("shorten-btn");
const result = document.getElementById("result");

button.addEventListener("click", async() => {
    const url = input.value.trim();
    if (!url) 
        return alert("Please enter a URL.");

    const res = await fetch("http://localhost:3000/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),

    });

    const data = await res.json();
    if (data.short) {
        result.innerHTML = `Short URL: <a href="${data.short}" target="_blank">${data.short}</a>`;
    } else {
        result.textContent = "Failed to shorten URL";
    }
});