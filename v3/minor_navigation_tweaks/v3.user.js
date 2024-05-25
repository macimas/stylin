// ==UserScript==
// @name         minor navigation tweaks
// @namespace    https://github.com/macimas
// @version      1.1

// @description  yep!
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

        "Raise volume": "[ArrowUp]<br>(if player is focused)",
        "Lower volume": "[ArrowDown]<br>(if player is focused)",

        "Seek forward 5 seconds": "[ArrowRight]",
        "Seek back 5 seconds": "[ArrowLeft]",
        "Seek forward 10 seconds": "[L]",
        "Seek back 10 seconds": "[J]",
        "Seek forward 1 frame": "[>]",
        "Seek back 1 frame": "[<]",
        "Seek to 0% - 90%": "[0] .. [9]",
        "Seek to start": "[Home]",
        "Seek to end": "[End]",

        "Increase playback speed": "[Shift] + [>]",
        "Decrease playback speed": "[Shift] + [<]"
    },
    "Subtitle controls": {
        "Toggle subtitles": "[C]",
        "Rotate through text opacities": "[O]",
        "Rotate through window opacities": "[W]",
        "Increase font size": "[+]",
        "Decrease font size": "[-]",
    },
    "Playlist controls": {
        "Next": "[Shift] + [N]",
        "Previous": "[Shift] + [P]"
    },
    "Site navigation": {
        "Focus search bar": "[/]",
        "Toggle guide": "[Z]",
        "Show keyboard shortcuts": "[Shift] + [?]"
    }
}

const hk_helper_container = document.createElement("div");
hk_helper_container.classList = "mdt2-hk-helper-container mdt2-hk-helper-container-hidden";

const hk_helper_body = document.createElement("div");
hk_helper_body.classList = "mdt2-hk-helper-body yt-card";

const hk_helper_close_button = document.createElement("button");
hk_helper_close_button.innerText = "[x]";
hk_helper_close_button.classList = "mdt2-hk-helper-close-button";

const hk_helper_header = document.createElement("h1");
hk_helper_header.innerText = "Keyboard shortcuts";

const hk_helper_items = document.createElement("div");
hk_helper_items.classList = "mdt2-hk-helper-items";

hk_helper_container.append(hk_helper_body);
spitfire.append(hk_helper_container);
hk_helper_body.append(hk_helper_close_button);
hk_helper_body.append(hk_helper_header);
hk_helper_body.append(hk_helper_items);

function hk_helper_hide(method) {
    hk_helper_container.classList[method]("mdt2-hk-helper-container-hidden")
}

hk_helper_close_button.addEventListener("click", () => {
    hk_helper_hide("add");
});

hk_helper_container.addEventListener("click", event => {
    if (event.target == hk_helper_container) {
        hk_helper_hide("add");
    }
});

for (const section in hk_helper_template) {
    const section_label = section;
    const section_items = hk_helper_template[section];

    const container = document.createElement("div");
    const header = document.createElement("h1");
    header.innerText = section_label;
    container.append(header);
    hk_helper_items.append(container);

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

    .mdt2-hk-helper-body {
        position: relative;

        overflow-y: auto;

        padding: 16px;

        width: fit-content;
        height: 90vh;

        background: var(--color-e5, #fff);
    }

    .mdt2-hk-helper-body::after {
        content: "very wip";
        font-size: 21px;

        position: absolute;
        bottom: 16px;
        right: 16px;
    }

    .mdt2-hk-helper-close-button {
        position: absolute;
        right: 16px;
    }

    .mdt2-hk-helper-body > h1 {
        font-size: 21px;
    }

    .mdt2-hk-helper-items {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        max-height: 100%;
        min-width: 520px;
    }

    .mdt2-hk-helper-items > div {
        margin: 16px;
    }

    .mdt2-hk-helper-items h1 {
        margin-bottom: 6px;
    }

    .mdt2-hk-helper-item-container {
        display: flex;
        justify-content: space-between;
        gap: 12px;

        padding: 6px 0px;
    }

    .mdt2-hk-helper-item-container {
        border-top: 1px solid var(--color-bf, #0003);
    }

    .mdt2-hk-helper-item-hk {
        text-align: right;
    }
`;

const style = document.createElement("style");
style.innerHTML = css;
style.id = "mdt2-hk-helper";
style.type = "text/css";
spitfire.append(style);

window.addEventListener("keydown", event => {
    const player = document.querySelector("#movie_player");
    const play_button = document.querySelector(".ytp-button-play");
    const search_bar = document.querySelector("#masthead-search-term");

    const on_body = document.activeElement == document.body;
    const on_player = document.activeElement == player || document.activeElement == play_button;
    const on_search_bar = document.activeElement == search_bar;
    const is_focused = (on_body || on_player);

    if (is_focused && event.code == "Slash" && event.shiftKey) {
        event.preventDefault();
        return hk_helper_hide("toggle");
    }

    const toggle_guide_button = document.querySelector("#yt-masthead #appbar-guide-button, .guide-module-toggle");

    if (is_focused && search_bar && !on_search_bar && event.code == "Slash") {
        event.preventDefault();
        return search_bar.focus();
    }

    if (is_focused && toggle_guide_button && event.code == "KeyZ") {
        event.preventDefault();
        toggle_guide_button.click();
    }

    if (event.code == "ArrowUp" || event.code == "ArrowDown") {
        return;
    }

    if (is_focused && event.code == "Escape") {
        hk_helper_hide("add");
    }

    if (player) {
        if (on_body && event.code != "Escape") {
            player.focus();
        }

        if (on_player && event.code == "Escape") {
            return player.blur();
        }
    }

    const theater_button = document.querySelector("div.ytp-size-toggle-small, div.ytp-size-toggle-large");
    const theater_button_is_upsell = document.querySelector("#upsell-video .ytp-size-toggle-large");

    if (is_focused && theater_button && event.code == "KeyT") {
        theater_button.click();

        if (theater_button_is_upsell) {
            alert("hello! this is the channel trailer speaking! thank you for pressing the theater key! as a reward, you get a pointless button for your work :D")
        }
    }

    const playlist_bar_prev = document.querySelector("#watch7-playlist-bar-controls .yt-uix-button-icon-playlist-bar-prev");
    const playlist_bar_next = document.querySelector("#watch7-playlist-bar-controls .yt-uix-button-icon-playlist-bar-next");

    if (is_focused && playlist_bar_prev && event.code == "KeyP" && event.shiftKey) {
        playlist_bar_prev.click();
    }

    if (is_focused && playlist_bar_next && event.code == "KeyN" && event.shiftKey) {
        playlist_bar_next.click();
    }
});