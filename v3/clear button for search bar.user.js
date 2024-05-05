// ==UserScript==
// @name         clear button for search bar
// @namespace    https://github.com/macimas
// @version      1.0
// @description  probably dirty attempt to add a button to clear search bar
// @author       macimas
// @match        www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

const spitfire = document.querySelector(".spitfire-body-container.v3");
let search_bar_container, search_bar;

const fuckery = new MutationObserver(() => {
    search_bar_container = document.querySelector("#masthead-search-terms");
    search_bar = document.querySelector("#masthead-search-term");

    if (search_bar_container && search_bar) {
        fuckery.disconnect();
        exec();
    }
});

fuckery.observe(spitfire, { childList: true });

function exec() {
    const video_player = document.querySelector("#movie_player");

    const clear_button = document.createElement("button");
    search_bar_container.append(clear_button);

    clear_button.className = "mdt2-button-clear-search-bar hidden";
    clear_button.innerText = "X";

    clear_button.addEventListener("click", event => {
        clear_button.classList.add("hidden");
        event.preventDefault();
        search_bar.value = "";

        setTimeout(() => {
            search_bar.focus();
        }, 0);
    });

    function change_it() {
        if (search_bar.value.length > 0) {
            clear_button.classList.remove("hidden");
        } else {
            clear_button.classList.add("hidden");
        }
    }

    search_bar.addEventListener("input", change_it);
    change_it();

    const css = `
        .mdt2-button-clear-search-bar {
            position: absolute;
            top: 0;
            right: 0;

            padding: 0 10px;

            height: 100%;
        }

        .mdt2-button-clear-search-bar.hidden
        { display: none }
    `;

    const style = document.createElement("style");
    style.innerText = css;
    search_bar_container.append(style);
}