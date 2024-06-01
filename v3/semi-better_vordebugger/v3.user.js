// ==UserScript==
// @name         semi-better vordebugger
// @namespace    https://github.com/macimas
// @version      1.0

// @description  an attempt to improve the vordebugger's config page
// @author       macimas (https://macimas.github.io)

// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

const observe_node = document.querySelector(".append_config");
const observer = new MutationObserver((mutation_list, observer) => {
    observer.disconnect();
    init();
});

observer.observe(observe_node, { childList: true });

function alphabeticallySort(array) {
    return array.sort((a, b) => {
        if (a.id > b.id) {
            return 1
        } else {
            return -1
        }
    });
}

function showSections(is_show) {
    const content = document.querySelector(".smartadd_content:has(.internal-config)");
    for (let i = 0; i < content.children.length; i++) {
        const child = content.children[i];
        child.style.display = (is_show) ? null : "none";
    }
}

function getV3LocalDB() {
    return JSON.parse(localStorage.v3_local_db);
}

const template_presets = [
    {
        id: "centered-layout",
        label: "Centered Layout",
        toggles: {
            default: [
                "APPBAR_GUIDE",
                "SITE_CENTER_ALIGNED",
                "MASTHEAD_APPBAR_LAUNCH",
                "PROMINENT_UPLOAD_BUTTON",
                "APPBAR_GUIDE_BUTTON_SIMPLE_STYLE",
                "FLEX_WIDTH_ENABLED_SNAP",
                "NEW_APPBAR_GUIDE_ICONS",
                "APPBAR_GUIDE_PINNING",
                "GUIDE_LIBRARY_SHOW_COUNT",
                "APPBAR_GUIDE_SCROLL",
                "CENTER_ALIGN_MODERN_SIZE_RULES",
                "SITE_AS_GIANT_CARD"
            ],
            at_off: [
                "MASTHEAD_APPBAR_FUSION",
                "APPBAR_GUIDE_IS_PART_OF_MASTHEAD_POSITIONER",
                "SITE_AS_GIANT_CARD"
            ]
        }
    },
    {
        id: "appbar-fusion",
        label: "Appbar Fusion",
        toggles: {
            default: [
                "MASTHEAD_APPBAR_FUSION",
                "APPBAR_GUIDE_IS_PART_OF_MASTHEAD_POSITIONER"
            ]
        }
    },
    {
        id: "cardification",
        label: "Cardification",
        toggles: {
            default: [
                "CARDIFIED_PAGE",
                "INDIVIDUAL_CARDS"
            ]
        }
    },
    {
        id: "watch8",
        label: "Watch8 (Cardification)",
        toggles: {
            default: [
                "WATCH8",
                "INDIVIDUAL_CARDS_WATCH",
                "WATCH7_CREATOR_BAR_LIGHT",
                "WATCH7_EXTRA_ACTIONS_INSIDE_MENU",
                "WATCH7_ACTION_PANELS_USE_ICONS"
            ]
        }
    },
    {
        id: "gbar",
        label: "Gbar",
        toggles: {
            default: [
                "USING_GBAR"
            ]
        }
    },
    {
        id: "dark-mode",
        label: "Dark Mode",
        toggles: {
            default: [
                "DARK_MOD"
            ]
        }
    }
]

const template_config_buttons = [
    {
        label: "Export config",
        type: "action",
        callback: downloadConfig
    },
    {
        label: "Import config",
        type: "action",
        callback: () => {
            const import_config_dialog = document.querySelector(".mdt2-vdbg-import-config-dialog-container");
            if (!import_config_dialog) return;

            import_config_dialog.classList.remove("mdt2-vdbg-import-config-hidden");
        }
    },
    {
        label: "Reset config",
        type: "primary",
        callback: () => {
            const is_reset = confirm("Are you sure?");
            if (!is_reset) return;

            window.localStorage.removeItem("v3_local_db");
            history.go();
        }
    },
    {
        label: "Reload without V3",
        type: "standard",
        callback: () => {
            const href = window.location.href;
            window.location.href = href.replace("v3cv=1", "") + (-1 < href.indexOf("?") ? "&" : "?") + "v3cv=0";
        }
    }
];

function downloadConfig() {
    const a = document.createElement("a");

    a.href = "data:text/json," + encodeURI(localStorage.v3_local_db);
    a.download = "v3 config.json";
    a.click();

    a.remove();
}

function togglePreset(data, value) {
    const v3_local_db = getV3LocalDB();
    const toggles = data.toggles;

    function applySettings(settings) {
        for (const setting of settings) {
            v3_local_db.config.db.yt[setting] = value;
        }
    }

    console.log(toggles.default);

    applySettings(toggles.default);

    if (data.toggles.at_off && value == false) {
        applySettings(toggles.at_off);
    }

    localStorage.v3_local_db = JSON.stringify(v3_local_db);
    history.go();
}

function createImportConfigDialog() {
    const container = document.createElement("div");
    const dialog = document.createElement("div");
    const exit_button = document.createElement("button");
    const input = document.createElement("input");
    const subtitle = document.createElement("div");

    container.className = "mdt2-vdbg-import-config-dialog-container mdt2-vdbg-import-config-hidden";
    dialog.className = "mdt2-vdbg-import-config-dialog";
    exit_button.className = "mdt2-vdbg-import-config-exit-button";
    exit_button.innerText = "[x]";
    input.type = "file";
    input.accept = ".json";
    subtitle.className = "mdt2-vdbg-subtitle";
    subtitle.innerText = "Import V3 config from file.";

    container.append(dialog);
    dialog.append(exit_button);
    dialog.append(input);
    dialog.append(subtitle);

    function hideDialog() {
        container.classList.add("mdt2-vdbg-import-config-hidden");
    }

    container.addEventListener("click", event => {
        if (event.target == container) hideDialog();
    });

    exit_button.addEventListener("click", hideDialog);

    input.addEventListener("change", () => {
        const reader = new FileReader();
        const file = input.files[0];

        reader.addEventListener("load", () => {
            try {
                const json = JSON.parse(reader.result);
                if (!json?.config?.db?.yt || !json?.uimsg?.db) throw "json is not valid";

                localStorage.v3_local_db = reader.result;
                history.go();
            } catch (err) {
                alert("I don't think that's valid");
                console.error(err);
            }
        });

        if (file) reader.readAsText(file);
    });

    return container;
}

function createButton(text, type = "default") {
    const preset_setting = document.createElement("span");
    preset_setting.className = "preset-setting";

    const button = document.createElement("button");
    button.classList.add("jfk-button");
    button.classList.add("goog-inline-block");
    button.classList.add("jfk-button-" + type);

    const label = document.createElement("span");
    label.className = "jfk-button-text";
    label.innerText = text;

    preset_setting.append(button);
    button.append(label);

    return preset_setting;
}

function init() {
    showSections(false);

    const content = document.querySelector(".smartadd_content:has(.internal-config)");
    const patience = document.createElement("div");

    patience.innerText = "Patching config... This may take a moment!"
    patience.className = "logview-title mdt2-internal-config-patience";
    content.prepend(patience);

    setTimeout(() => {
        patch();
        patience.remove();
        showSections(true);
    }, 0);
}

function patch() {
    const vdbg = document.querySelector("#vor_debugger_container");
    const container = vdbg.querySelector(".internal-config");
    const smartadd_content = vdbg.querySelector(".smartadd_content:has(.internal-config)");
    const logview_section = vdbg.querySelector(".smartadd_content:has(.internal-config) .logview-title");
    const logview_title = vdbg.querySelector(".smartadd_content:has(.internal-config) .logview-title-top");
    const kill_config_buttons_1 = vdbg.querySelectorAll(".logview-extra-buttons");
    const kill_expander_head = vdbg.querySelector(".internal-config-section-title.yt-uix-expander-head");
    const kill_sections = vdbg.querySelector(".internal-config-multiple-sections");
    const transform_options = container.querySelectorAll(".internal-setting, .internal-setting-description");

    let options = [];
    const no_descriptions = [
        "No description.",
        " description."
    ];

    kill_expander_head.style.display = "none";

    if (kill_sections) {
        kill_sections.style.display = "none";
    }

    for (const node of kill_config_buttons_1) {
        node.remove();
    }

    /*
    ** === config actions ===
    */

    const config_buttons = document.createElement("div");
    config_buttons.className = "logview-extra-buttons";
    logview_title.append(config_buttons);
    console.log(config_buttons);

    for (const data of template_config_buttons) {
        const button = createButton(data.label, data.type);
        config_buttons.append(button);

        button.addEventListener("click", data.callback);
    }

    const import_config_dialog = createImportConfigDialog();
    logview_title.after(import_config_dialog);

    /*
    ** === preset toggles ===
    */

    const preset_section = document.createElement("div");
    const preset_subtitle = document.createElement("div");
    const preset_items = document.createElement("div");

    preset_section.className = "mdt2-vdbg-presets-section";
    preset_subtitle.className = "mdt2-vdbg-subtitle mdt2-vdbg-margin-bottom";
    preset_subtitle.innerText = "Quick and toggleable presets, for when you don't want to tinker into config much.";
    preset_items.className = "mdt2-vdbg-presets-container";

    smartadd_content.children[1].after(preset_section);
    preset_section.append(preset_subtitle);
    preset_section.append(preset_items);

    for (const data of template_presets) {
        const item = document.createElement("div");
        const label = document.createElement("span");
        const icon = document.createElement("div");
        const buttons = document.createElement("div");
        const on_button = createButton("ON", "default");
        const off_button = createButton("OFF", "primary");

        item.className = "mdt2-vdbg-preset-item";
        label.className = "mdt2-vdbg-preset-ite m-label";
        label.innerText = data.label;
        icon.className = "mdt2-vdbg-preset-item-icon mdt2-vdbg-preset-item-icon-" + data.id;
        buttons.className = "mdt2-vdbg-preset-item-buttons";

        item.append(label);
        label.prepend(icon);
        item.append(buttons);
        buttons.append(on_button);
        buttons.append(off_button);

        preset_items.append(item);

        on_button.addEventListener("click", () => {
            togglePreset(data, true);
        });

        off_button.addEventListener("click", () => {
            togglePreset(data, false);
        });
    }

    /*
    ** === transform options ===
    */

    for (const node of transform_options) {
        const node_text = node.innerText;

        if (node.classList.contains("internal-setting")) {
            options.push({
                node: node,
                id: node_text.trim()
            });

            continue;
        }

        if (node.classList.contains("internal-setting-description")) {
            if (true && no_descriptions.includes(node_text)) {
                node.remove();
                continue;
            }

            options[options.length - 1].description = {
                node: node,
                text: node_text
            }

            continue;
        }
    }

    function showOption(option, is_show) {
        const visibility = (is_show) ? null : "none";

        option.node.style.display = visibility;
        if (option.description?.node) {
            option.description.node.style.display = visibility;
        }
    }

    function appendOption(option) {
        container.append(option.node);
        if (option.description?.node) {
            container.append(option.description.node);
        }
    }

    const search_header = document.createElement("div");
    search_header.className = "mdt2-vdbg-subtitle mdt2-vdbg-margin-bottom";
    search_header.innerText = "All available and toggleable settings. Please note that some settings may be incompatible with each other, which may result in issues with page rendering.";

    const search_bar = document.createElement("input");
    search_bar.classList = "mdt2-vdbg-config-search-bar yt-uix-form-input-text";
    search_bar.placeholder = "Search";

    container.prepend(search_bar);
    container.prepend(search_header);

    search_bar.addEventListener("input", event => {
        const query = search_bar.value
            .toLowerCase()
            .replaceAll(" ", "_");

        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            const option_id = option.id.toLowerCase();

            showOption(option, option_id.includes(query));
        }
    });

    if (true) {
        const _options = alphabeticallySort(options);

        console.log(_options);

        for (let i = 0; i < _options.length; i++) {
            const option = _options[i];
            appendOption(option);
        }
    }
}