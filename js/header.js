fetch("/js/header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header").innerHTML = data;
});

function ensureKalenderFooter() {
    if (!document.getElementById("kalender")) {
        const footer = document.createElement("footer");
        footer.id = "kalender";
        document.body.appendChild(footer);
    }

    const hasKalenderScript = Array.from(document.scripts).some(script => {
        return (script.src || "").includes("/js/kalender.js") || (script.src || "").includes("/js/kalendar.js");
    });

    if (!hasKalenderScript) {
        const script = document.createElement("script");
        script.src = "/js/kalender.js";
        script.setAttribute("data-kalender-auto", "true");
        document.body.appendChild(script);
    }
}

document.addEventListener("DOMContentLoaded", ensureKalenderFooter);
