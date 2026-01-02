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

    document.getElementById("language-toggle").addEventListener("click", () => {
        switchLanguage(localStorage.getItem("language"));
    });
})

const formatter = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Vienna",
    timeZoneName: "shortOffset"
})

const utcOffset = formatter.formatToParts(new Date()).find(it => it.type === "timeZoneName").value
document.getElementById("timezone").textContent = utcOffset

const languages = Object.freeze({
    ENGLISH: {
        key: "en",
        emoji: "🇬🇧",
        next: "SPANISH"
    },
    SPANISH: {
        key: "es",
        emoji: "🇪🇸",
        next: "CATALAN"
    },
    CATALAN: {
        key: "ca",
        emoji: "🏴󠁥󠁳󠁣󠁴󠁿",
        next: "ENGLISH"
    }
});

function toTitleCase(string) {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase()
}

const switchLanguage = (language) => {
    localStorage.setItem("language", languages[localStorage.getItem("language")]?.next || "ENGLISH");

    if (languages[language] === undefined) return
    const languageElement = languages[language]

    document.getElementById("current-language").innerHTML = toTitleCase(languageElement.key)
    document.getElementById("current-language-emoji").innerHTML = toTitleCase(languageElement.emoji)

    document.getElementsByTagName("html")[0].lang = languageElement.key;
}

if (window.origin === "https://mona.cat") {
    switchLanguage("CATALAN")
} else {
    switchLanguage("ENGLISH")
}