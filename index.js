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
        localStorage.setItem("language", languages[localStorage.getItem("language")]?.next || "ENGLISH");
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

    if (languages[language] === undefined) return
    const languageElement = languages[language]

    document.getElementById("current-language").innerHTML = toTitleCase(languageElement.key)
    document.getElementById("current-language-emoji").innerHTML = toTitleCase(languageElement.emoji)

    let elements = document.getElementsByClassName("lang");
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i]

        if (element.classList.contains(languageElement.key)) {
            element.hidden = false;
        } else {
            element.hidden = true;
        }
    }
}

if (window.origin === "https://mona.cat") {
    switchLanguage("CATALAN")
} else {
    switchLanguage("ENGLISH")
}