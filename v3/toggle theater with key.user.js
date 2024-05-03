// ==UserScript==
// @name         toggle theater with key
// @namespace    https://github.com/macimas
// @version      1.0
// @description  toggle theater with key. yeah!
// @author       macimas (https://macimas.github.io)
// @match        www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

window.addEventListener("keydown", event => {
    const theater_button = document.querySelector("div.ytp-size-toggle-small, div.ytp-size-toggle-large");
    const is_upsell = document.querySelector("#upsell-video .ytp-size-toggle-large");

    if (theater_button && event.code == "KeyT") {
        const video_player = document.querySelector("#movie_player");

        if (is_upsell) {
            alert("hello! this is the channel trailer speaking! thank you for pressing the theater key! as a reward, you get a pointless button for your work :D")
        }
        if (document.activeElement == video_player) {
            theater_button.click();
        }
    }
});