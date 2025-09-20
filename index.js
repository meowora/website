const switchTheme = () => {
    document.getElementsByTagName("html")[0].classList.toggle(
        "lightmode",
        localStorage.getItem("colormode") === "light"
    );
}

if (!localStorage.getItem("colormode")) {
    localStorage.setItem("colormode", "dark");
}
switchTheme();

window.addEventListener("load", () => {
    document.getElementById("theme-toggle").addEventListener("click", () => {
        localStorage.setItem("colormode", localStorage.getItem("colormode") === "light" ? "dark" : "light");
        switchTheme();
    });
})

const formatter = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Vienna",
    timeZoneName: "shortOffset"
})

const utcOffset = formatter.formatToParts(new Date()).find(it => it.type === "timeZoneName").value
document.getElementById("timezone").textContent = utcOffset