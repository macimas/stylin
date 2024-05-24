// ==UserScript==
// @name         minor navigation tweaks
// @namespace    https://github.com/macimas
// @version      1.0

// @description  navi tweaki
// @author       macimas (https://macimas.github.io)

// @match        www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

const spitfire = document.querySelector(".spitfire-body-container");

const hk_helper_template = {
    "Video controls": {
        "Play/Pause": "[K] or [Space]",
        "Toggle mute": "[M]",
        "Toggle theater": "[T]",
        "Toggle fullscreen": "[F]",
        "Toggle subtitles": "[C]",

        "Raise volume": "[ArrowUp]<br>(if player is focused)",
        "Lower volume": "[ArrowDown]<br>(if player is focused)",

        "Seek forward 5 seconds": "[ArrowRight]",
        "Seek back 5 seconds": "[ArrowLeft]",
        "Seek forward 10 seconds": "[L]",
        "Seek back 10 seconds": "[J]",
        "Seek forward 1 frame": "[>]",
        "Seek back 1 frame": "[<]",
        "Seek to 0% - 90%": "[0] to [9]",
        "Seek to start": "[Home]",
        "Seek to end": "[End]",

        "Increase playback speed": "[Shift] + [>]",
        "Decrease playback speed": "[Shift] + [<]"
    },
    "Playlist controls": {
        "Next": "[Shift] + [N]",
        "Previous": "[Shift] + [P]"
    },
    "Site navigation": {
        "Focus search bar": "[/]",
        "Toggle guide": "[Q]",
        "Show keyboard shortcuts": "[Shift] + [?]"
    }
}

const hk_helper_container = document.createElement("div");
hk_helper_container.classList = "mdt2-hk-helper-container mdt2-hk-helper-container-hidden";

const hk_helper_content = document.createElement("div");
hk_helper_content.classList = "mdt2-hk-helper-content yt-card";

hk_helper_container.append(hk_helper_content);
spitfire.append(hk_helper_container);

const hk_helper_close_button = document.createElement("button");
hk_helper_close_button.innerText = "[x]";
hk_helper_close_button.classList = "mdt2-hk-helper-close-button";
hk_helper_content.append(hk_helper_close_button);

hk_helper_close_button.addEventListener("click", () => {
    hk_helper_container.classList.add("mdt2-hk-helper-container-hidden");
});

for (const section in hk_helper_template) {
    const section_label = section;
    const section_items = hk_helper_template[section];

    const container = document.createElement("div");
    const header = document.createElement("h1");
    header.innerText = section_label;
    container.append(header);
    hk_helper_content.append(container);

    for (const item in section_items) {
        const item_label = item;
        const item_hk = section_items[item]
            .replaceAll("[", "<kbd>")
            .replaceAll("]", "</kbd>");

        const item_container = document.createElement("div");
        const item_container_label = document.createElement("span");
        const item_container_hk = document.createElement("span");

        item_container.classList = "mdt2-hk-helper-item-container";
        item_container_hk.classList = "mdt2-hk-helper-item-hk";

        item_container_label.innerText = item_label;
        item_container_hk.innerHTML = item_hk;

        item_container.append(item_container_label);
        item_container.append(item_container_hk);

        container.append(item_container);
    }
}

const css = `
    .spitfire-body-container .mdt2-hk-helper-container-hidden
    { display: none }

    .mdt2-hk-helper-container {
        z-index: 2000000000;

        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        background: #000a;
    }

    .mdt2-hk-helper-content {
        position: relative;

        overflow-y: auto;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        width: auto;
        height: 90vh;
    }

    .mdt2-hk-helper-close-button {
        position: absolute;
        right: 16px;
    }

    .mdt2-hk-helper-content > div {
        margin: 16px;
    }

    .mdt2-hk-helper-item-container {
        display: flex;
        justify-content: space-between;
        gap: 12px;

        margin: 12px 0;
    }

    .mdt2-hk-helper-item-hk {
        text-align: right;
    }
`;

const style = document.createElement("style");
style.innerText = css;
style.id = "mdt2-hk-helper";
style.type = "text/css";
spitfire.append(style);

window.addEventListener("keydown", event => {
    if (event.code == "Slash" && event.shiftKey) {
        hk_helper_container.classList.toggle("mdt2-hk-helper-container-hidden");
    }

    const toggle_guide_button = document.querySelector("#yt-masthead #appbar-guide-button");
    const search_bar = document.querySelector("#masthead-search-term");

    if (search_bar && document.activeElement != search_bar && event.code == "Slash" && !event.shiftKey) {
        event.preventDefault();
        search_bar.focus();
    }

    if (toggle_guide_button && document.activeElement == document.body && event.code == "KeyQ") {
        event.preventDefault();
        toggle_guide_button.click();
    }

    const player = document.querySelector("#movie_player");
    const play_button = document.querySelector(".ytp-button-play");

    if (event.code == "ArrowUp" || event.code == "ArrowDown") return;

    if (player && document.activeElement == document.body) {
        player.focus();
    }

    const theater_button = document.querySelector("div.ytp-size-toggle-small, div.ytp-size-toggle-large");
    const theater_button_is_upsell = document.querySelector("#upsell-video .ytp-size-toggle-large");

    if (theater_button && event.code == "KeyT") {
        theater_button.click();

        if (theater_button_is_upsell) {
            alert("hello! this is the channel trailer speaking! thank you for pressing the theater key! as a reward, you get a pointless button for your work :D")
        }
    }

    const playlist_bar_prev = document.querySelector("#watch7-playlist-bar-controls .yt-uix-button-icon-playlist-bar-prev");
    const playlist_bar_next = document.querySelector("#watch7-playlist-bar-controls .yt-uix-button-icon-playlist-bar-next");

    if (playlist_bar_prev && event.code == "KeyP" && event.shiftKey) {
        playlist_bar_prev.click();
    }

    if (playlist_bar_next && event.code == "KeyN" && event.shiftKey) {
        playlist_bar_next.click();
    }
});