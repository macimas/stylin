// ==UserScript==
// @name         semi-better vordebugger
// @namespace    https://github.com/macimas
// @version      2.0-dev1

// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRYhWNgGOmAEZkjJCT0nx6Wvnv3Dm4vnCEkJPTf39+fHvYzbNy4Ee4IRmTLP3z4QBcHCAgIwB3BSG/L0R3BRFdbsYBRB7AQo2jL3a1kGe6j7E25A7bc3cpQPKeULAf0pnQTdAReB8Asv/L0KlkOKJ5TStARBNMAPss3B6xn2Bywniy9RDuA1mDAHUBULkAG2IIcWcx3QyBJ5g29EED2IcznpPoaGQx4CAy4A0iOAmRASdDDAMEQeHn4BdmGE6MXbwj4KHszbNmzlcGAwYgsB1zYc46yugDZEeQAqtSGxBpELhjwXDDqABYGBgaGDx8+0L1ZDgOM9OqOjQJcAADzNlkCLFjS4wAAAABJRU5ErkJggg==
// @description  an attempt to improve the vordebugger
// @author       macimas (https://macimas.github.io)

// @match        https://www.youtube.com/*
// @grant        none

// @run-at       document-end
// ==/UserScript==

const mmm = window.mmm;
if (!mmm?.ok) return;

const db = mmm.v3_db;
const uimsg = mmm.v3_uimsg;

const config = mmm.config({
	id: "mdt2_vdbg",
	GM_info
}, [
	["text", {
		id: "width",
		value: "480px"
	}],
	["text", {
		id: "height",
		value: "calc(100vh - 64px)"
	}],
	["text", {
		id: "ddd_text",
		value: "Ni: KOR VERSION: %version% (Rev. %revision% %branch%)",
		info: [
			"variables: %version%, %revision%, %branch%"
		]
	}],
	["toggle", {
		id: "expander_on_bottom",
		value: true
	}],
	["toggle", {
		id: "dark_expander",
		value: false,
		info: [
			"Makes the expander darker.",
			"Requires dark mode."
		]
	}],
	["toggle", {
		id: "left_aligned",
		value: false,
		info: [
			"Aligns vdbg to the left."
		]
	}],
	["toggle", {
		id: "expose_uimsg_keys",
		value: false,
		info: [
			"Exposes uimsg keys for translating vdbg.",
			"If you do not know what this means, it's best you keep it off."
		]
	}]
]);

mmm.register_config({
	id: "mdt2_vdbg",
	name: "semi-better vordebugger",
	use: config
});

const css = new mmm.css_manager();

(function(){
uimsg.set({
	placeholder: !config.get("create_uimsg_keys"),
	skip_if_present: true
}, {
	"mdt2_vdbg.title.utilities": "Utilities",
	"mdt2_vdbg.title.logs": "Logs",
	"mdt2_vdbg.title.config": "Config",
	"mdt2_vdbg.title.presets": "Presets",
	"mdt2_vdbg.title.uimsg": "Uimsg",
	"mdt2_vdbg.title.your_hl": "Your current HL is:",
	"mdt2_vdbg.subtitle.logs": [
		"This logs every error thrown by the page, including errors caused by other scripts.",
		"Many scripts/extensions made for modern YouTube are not compatible with V3.",
		"Make sure to always disable other scripts/extensions before concluding that V3 is causing errors."
	],
	"mdt2_vdbg.subtitle.goto_utilities": "To export/import/reset your config & uimsg, go to Utilities.",
	"mdt2_vdbg.subtitle.reload_config": "Reload the page to see your changes after changing config.",
	"mdt2_vdbg.subtitle.reload_uimsg": "Reload the page to see your changes after changing uimsg.",
	"mdt2_vdbg.subtitle.presets": "Quick and toggleable presets, for when you don't want to tinker into config much.",
	"mdt2_vdbg.subtitle.all_settings": "All available and toggleable settings. Please note that some settings may be incompatible with each other, which may result in issues with page rendering.",
	"mdt2_vdbg.subtitle.manage_languages": "Manage your stored languages here.",
	"mdt2_vdbg.button.reload": "⟳ Reload",
	"mdt2_vdbg.button.reload_no_v3": "Reload (No V3)",
	"mdt2_vdbg.button.update_logs": "Update logs",
	"mdt2_vdbg.button.export_db": "Export V3 db",
	"mdt2_vdbg.button.import_db": "Import V3 db",
	"mdt2_vdbg.button.reset_db": "Reset V3 db",
	"mdt2_vdbg.button.change_hl": "Change HL",
	"mdt2_vdbg.button.create_language": "Create language",
	"mdt2_vdbg.button.import_language": "Import language",
	"mdt2_vdbg.prompt.are_you_sure": "Are you sure?",
	"mdt2_vdbg.prompt.will_reset_config": "This will reset your config, and reload the page.",
	"mdt2_vdbg.prompt.will_reset_language": "This will reset the language.",
	"mdt2_vdbg.prompt.will_remove_language": "This will remove the language.",
	"mdt2_vdbg.tooltip.export_language": "Export language",
	"mdt2_vdbg.tooltip.reset_language": "Reset language",
	"mdt2_vdbg.tooltip.remove_language": "Remove language",
	"mdt2_vdbg.category.All": "All available settings.",
	"mdt2_vdbg.category.All checked": "All checked settings.",
	"mdt2_vdbg.category.All unchecked": "All unchecked settings.",
	"mdt2_vdbg.category.All text inputs": "All text input settings.",
	"mdt2_vdbg.category.NEWEST": "Newly added settings.",
	"mdt2_vdbg.category.Layout": "Settings related to the general layout of the site.",
	"mdt2_vdbg.category.Center Align Layout": "Settings related to centered layout of the site.",
	"mdt2_vdbg.category.Flexy Layout": "No description.",
	"mdt2_vdbg.category.Gaia Bar": "Settings related to the top bar containing Google services.",
	"mdt2_vdbg.category.Guide": "Settings related to the sidebar.",
	"mdt2_vdbg.category.Masthead Expanded": "Settings related to the expanded masthead.",
	"mdt2_vdbg.category.Video Player": "Settings related to the video player.",
	"mdt2_vdbg.category.Playlist": "Settings related to playlists.",
	"mdt2_vdbg.category.Watch Layout": "Settings related to the watch page layout.",
	"mdt2_vdbg.category.Feed Layout": "Settings related to feeds and video cards.",
	"mdt2_vdbg.category.Search": "Settings related to the search page.",
	"mdt2_vdbg.category.Internal Client": "No description.",
	"mdt2_vdbg.category.Internal Server": "No description.",
	"mdt2_vdbg.category.Distiller": "Settings related to comments and backstage/community posts.",
	"mdt2_vdbg.category.Data API": "No description.",
	"mdt2_vdbg.category.CSS (Styling)": "Settings related to additional CSS tweaks.",
	"mdt2_vdbg.category.Resources": "Settings related to resources and player sizes.",
	"mdt2_vdbg.preset_category.system": "System",
	"mdt2_vdbg.preset_category.custom": "Custom",

	// "mdt2_vdbg.item.mdt2_vdbg.width.label": "Width",
	// "mdt2_vdbg.item.mdt2_vdbg.height.label": "Height",
	// "mdt2_vdbg.item.mdt2_vdbg.ddd_text.label": "Version text",
	// "mdt2_vdbg.item.mdt2_vdbg.dark_expander.label": "Dark expander",
	// "mdt2_vdbg.item.mdt2_vdbg.left_aligned.label": "Left aligned",
	// "mdt2_vdbg.item.mdt2_vdbg.create_uimsg_keys.label": "Create uimsg keys"
});

config.on("*", (key, value) => {
	console.log(key, value);
	css.update();
});

css.add({
	id: "main"
}, () => (`
:root {
	--mdt2-vdbg-page-color-1-light: #d14836;
	--mdt2-vdbg-page-color-1-dark: #f35b48;
	--mdt2-vdbg-page-color-2-light: #4d90fe;
	--mdt2-vdbg-page-color-2-dark: #4d90fe;
	--mdt2-vdbg-page-color-3-light: #3d9400;
	--mdt2-vdbg-page-color-3-dark: #54af13;
}

#vor_debugger_container
{ z-index: 2000000000 }

.vordebugger.expanded {
	overflow: hidden;
	display: flex;
	flex-direction: column-reverse;

	width: ${config.get("width")};
	min-width: 100px;
	max-height: ${config.get("height")};
}

.vdbg-titlebar {
	flex-shrink: 0;
	display: flex;
	justify-content: space-between;
}

.vordebugger:not(.expanded) .vdbg-titlebar {
	border-top-left-radius: 3px;
	border-top-right-radius: 3px;
}

.vdbg-titlebar-actions
{ padding-right: 15px }

.vordebugger.expanded .vdbg-content {
	display: flex;
	flex-direction: column;

	border-width: 1px;
	border-bottom-width: 0px;
}

.vdbg-content .ddd-build-info {
	padding: 7px 10px;
	border-bottom: 1px solid var(--color-ddd, #e6e6e6);
}

.dark-mode .vdbg-content .ddd-build-info {
	color: #fff;
	background: #000;
}

/* improve scrolling */

.vor_smartnav, .smartnav, .smartnav_slotlist {
	overflow: hidden;
	display: flex;
}

.smartnav, .smartnav_slotlist, .smartadd.selected
{ width: 100% }

.smartadd_content {
	overflow-y: scroll;
	height: 100%;
}

.vor_smartnav .smartnav {
	display: flex;
	flex-direction: column;
}

.smartnav_bot_height_offset
{ flex-shrink: 0 }

.internal-config-section.outside
{ position: relative }

/* tabs and headers */

.vor_smartnav .smartnav .smartadd .smartadd_title:after
{ height: 3px }


/**
.vor_smartnav .smartadd .smartadd_title::before {
	font-size: 16px;
	vertical-align: bottom;
}

.vor_smartnav .smartadd .smartadd_content .logview-title:first-child .logview-title-name::before {
	position: absolute;
	top: 16px;
	left: -16px;
	opacity: 16%;
	font-size: 100px;
	vertical-align: unset;
}

.vor_smartnav .smartadd:nth-child(1) .smartadd_title::before,
.vor_smartnav .smartadd:nth-child(1) .smartadd_content .logview-title:first-child .logview-title-name::before
{ content: "🛠 " }

.vor_smartnav .smartadd:nth-child(2) .smartadd_title::before,
.vor_smartnav .smartadd:nth-child(2) .smartadd_content .logview-title:first-child .logview-title-name::before
{ content: "⚙ " }

.vor_smartnav .smartadd:nth-child(3) .smartadd_title::before,
.vor_smartnav .smartadd:nth-child(3) .smartadd_content .logview-title:first-child .logview-title-name::before
{ content: "🗨 " }
/**/


.vor_smartnav .smartadd_title
{ color: var(--color-666, #666) }

.vor_smartnav .smartadd_title:hover
{ color: var(--color-222, #222) }


.vor_smartnav .smartadd.selected:nth-child(1) .smartadd_title,
.vor_smartnav .smartadd.selected:nth-child(1) .logview-title-name
{ color: var(--mdt2-vdbg-page-color-1-light) }

.vor_smartnav .smartadd:nth-child(1) .smartadd_title::after
{ background: var(--mdt2-vdbg-page-color-1-light) }

.dark-mode .vor_smartnav .smartadd.selected:nth-child(1) .smartadd_title,
.dark-mode .vor_smartnav .smartadd.selected:nth-child(1) .logview-title-name
{ color: var(--mdt2-vdbg-page-color-1-dark) }

.dark-mode .vor_smartnav .smartadd:nth-child(1) .smartadd_title::after
{ background: var(--mdt2-vdbg-page-color-1-dark) }


.vor_smartnav .smartadd.selected:nth-child(2) .smartadd_title,
.vor_smartnav .smartadd.selected:nth-child(2) .logview-title-name
{ color: var(--mdt2-vdbg-page-color-2-light) }

.vor_smartnav .smartadd:nth-child(2) .smartadd_title::after
{ background: var(--mdt2-vdbg-page-color-2-light) }

.dark-mode .vor_smartnav .smartadd.selected:nth-child(2) .smartadd_title,
.dark-mode .vor_smartnav .smartadd.selected:nth-child(2) .logview-title-name
{ color: var(--mdt2-vdbg-page-color-2-dark) }

.dark-mode .vor_smartnav .smartadd:nth-child(2) .smartadd_title::after
{ background: var(--mdt2-vdbg-page-color-2-dark) }


.vor_smartnav .smartadd.selected:nth-child(3) .smartadd_title,
.vor_smartnav .smartadd.selected:nth-child(3) .logview-title-name,
.vor_smartnav .smartadd.selected:nth-child(3) .logview-updater-extra
{ color: var(--mdt2-vdbg-page-color-3-light) }

.vor_smartnav .smartadd:nth-child(3) .smartadd_title::after
{ background: var(--mdt2-vdbg-page-color-3-light) }

.dark-mode .vor_smartnav .smartadd.selected:nth-child(3) .smartadd_title,
.dark-mode .vor_smartnav .smartadd.selected:nth-child(3) .logview-title-name
.dark-mode .vor_smartnav .smartadd.selected:nth-child(3) .logview-updater-extra
{ color: var(--mdt2-vdbg-page-color-3-dark) }

.dark-mode .vor_smartnav .smartadd:nth-child(3) .smartadd_title::after
{ background: var(--mdt2-vdbg-page-color-3-dark) }

/* improve sections */

.vordebugger .logview-title {
	cursor: unset;
	padding: 10px;
}

.vordebugger .logview-subtitle
{ width: unset }

.logview-updater
{ margin-right: unset }

/* improve categories */

.internal-config.goog-scrollbar {
	overflow-x: hidden;
	padding: 5px 10px;
	max-height: unset;
}

.internal-config-section.yt-uix-expander
{ padding-top: unset }

.dark-mode .internal-config-section + .internal-config-section
{ border-color: var(--color-b8) }

.internal-config-section .internal-config-section-title {
	margin-bottom: unset;
	padding: 5px 5px;

	text-transform: none;
}

.internal-config-section .internal-config-section-title::after
{ all: unset }

.internal-config-section .internal-config-section-title::before {
	content: "";

	display: inline-block;
	position: relative;
	top: 3px;

	margin-right: 12px;

	border: 5px solid transparent;
	border-top-color: #999;

	cursor: pointer;
}

.internal-config-section:not(.yt-uix-expander-collapsed) .internal-config-section-title::before {
	top: -3px;

	border-top-color: transparent;
	border-bottom-color: #999;
}

.internal-config-section .internal-config-section-title:hover
{ color: var(--color-222, #222) }

/* improve checkboxes */

.dark-mode .internal-setting .yt-uix-form-input-checkbox-element
{ border-color: var(--color-c6) }

.dark-mode .internal-setting .yt-uix-form-input-checkbox-container:hover:has(input:not([checked])) .yt-uix-form-input-checkbox-element
{ border-color: var(--color-b9) }

/* improve textboxes */

.internal-setting.uimsg-setting .title {
	position: relative;

	margin-left: 25px;

	color: var(--color-444, #444);
	font-weight: normal;
}

.internal-setting.uimsg-setting .title::before {
	content: ">>";
	position: absolute;
	margin-left: -24px;
}

.internal-setting.uimsg-setting .create-playlist,
.internal-setting.uimsg-setting .yt-uix-form-input-container {
	display: flex;
	flex-direction: row-reverse;
	gap: 5px;
}

.internal-setting.uimsg-setting .playlist-create-form-playlist-name,
.internal-setting.uimsg-setting input
{ width: 100% }

/* improve logs */

.vordebugger .logview-stream
{ max-height: unset }

/* improve config */

.internal-config-section .content {
	margin-top: -7px;
	padding: 2px;
	padding-bottom: 10px;
}

.internal-setting {
	margin-top: 5px;
	line-break: anywhere;
}

.internal-config > .internal-setting:first-child
{ margin-top: unset }

.internal-setting > span
{ margin-right: 5px }

.internal-setting-description {
	margin-left: 25px;
	margin-bottom: 5px;
	max-width: unset;
}

/*
** === for userscript v2 ===
*/

#vor_debugger_container .hid
{ display: none }

.logview-subtitle:first-child
{ margin-top: unset }

.logview-subtitle:not(:last-child)
{ margin-bottom: 10px }

.mdt2-vdbg-search-config.logview-title {
	z-index: 1;
	position: sticky;
	top: 0;
	background: var(--color-fff, #fff);
}

.internal-config.logview-subtitle {
	margin: unset;
	padding: 10px;
	padding-bottom: unset;
}

/* icons */

:root {
	--mdt2-vdbg-icon-unset: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABTSURBVHgBxZJRCgAgCEMturQn8NhFH30kq4gZvY8gB27IREhSf8ysIlFVJx39s5CUnaMHzWMTrJwHKCGd4D9XPUA6fYPsNw7XlaPXY3tw4kkTaRrNZymJidb3KwAAAABJRU5ErkJggg==");
	--mdt2-vdbg-icon-question-mark: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD4SURBVHgBnVPBDYJAENy7XMJXKxArMHYgHWgFQgf65MW9gJ92YA1WIB1YAnQgXxICzpojmghyOMmE24OZ3eX2RBzHeyHEmYhmNA1F27ZaQawRXKuqOmitSxtlkiQuHpoTCwQtgiV4A12yQ4GEa8dxHpKjMAyLCWKG21UrhzKAHrLMmVgHZu8LvQZN0+zQ3wol5kxsLYyJnQGwxR/uToa5QZtZ34eq11XKiN6tBHVdU5qmF5jaGXwgA12lVK/YxsA3HISk31ga/m0wirEW8pH39BplHhac950mjDLocQKuoIT4xBtmpEeBMZ4ZTcEV+FhENO0uMPguHJ/Z7VcrJO4WQgAAAABJRU5ErkJggg==");
	--mdt2-vdbg-icon-search: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAE+SURBVHgBrVIxboNAELwjljBUzg94gsuURIg+P7B/kLgCKh8VouMJzhPSg0S6dMkTnB/QAQ1k1los4hwJUjzSscfe3dzs3ArxT8jxT5IkrpRyj7Hu+36FVIn4HEXRYYrgZpikabpHoI0OxpLTDsgefN8XeZ6/6ggMvnmLmxTNEeOmaW5pdF2345widTqCxakOKTccd2EYZqP1DAdXXBYpLLUKAJc+dV0fLje0bZsx+VpMlYDFSvwBNlVPgMUPiqZpPl1usG17w9NSR7BgghgqTk+I16iGUizLeoSRilW+6AjOfQCzFBs1hSMuukdPHMfJcx8URVF6nvcJEqrVYV/e6Ckxv6OcYRhb9MRy3BNSzADU0eH3wUgQqiAI4m8KfgPUVVBnkU+ccofuNMRMoHZFZg//KG2W+h8gs2mIa+ELkIiGAFYDFcIAAAAASUVORK5CYII=");
	--mdt2-vdbg-icon-download: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADWSURBVHgB7VHNCcIwFH5KoVdHqBvoBnWTOoKXQnuRngo96QQ6gk6gI7iB2UCvDYT4PUg0LSZYvPaDx/vJ+/1CFEBd15ollDOlPzE2IJq4DhjfQqVOyNpXG9Ban8uy3Fk/chu0bbuP4ziDmVAXqdFCSnn0bmC2SKAuX5oIyKooCtFpgIIDT8DD3AabplkopbjJzISekKVbjLo7n8YkZv1peZ7fcOva+mz3J5uazPsLIOqEwg3Mim1fXkQBuGz78N7AkPcT3Fwm8UEfsoZC8AZ8p6Dh4J+pXiuQTTwV/iSxAAAAAElFTkSuQmCC");
	--mdt2-vdbg-icon-remove: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACfSURBVHgBrZPJDcQgDEXtVEIr6WA6mVxpgOU2pUwHaYVOiB2Z5BAMkeBLZMHvf8QGMEshhK/33vQ4Zpgt/ws/nHNbzvlHn3srRGo7s+y5AhDxT69EzWghxSxMEg+gBlBbrbWpV8PWKAxKqWp+BCghoJmrAZUQ0MysBQY1dwpDizi0jS2gN8C5iHQ0Py0zS/pWYYx4bsUYt7eXqdyDKToA1kx9BopjraAAAAAASUVORK5CYII=");
	--mdt2-vdbg-icon-reset: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFgSURBVHgBrVLdbYNADL4jKHlNN2CD0g3SCapOEDZI8hgQAh74EU90A5igyQTNBtAN2KA8gsRPP6OjQpRUqpJPsuzz+ezPPjN2I/jUYdv2erVa7WBqEIV8XddlnPMMpnM8HvOrCTzP2yIwgrlm8yiQzNF1PQqCYFeWZfKTgBy4jMTxQtWqqsrAqPB9fyMYbUeMFLB56BMgQIFKRWWiaU9Li5iPoS0qgrhnqe+Dc0s8jv94/D56zNq2/SQti8MZSTj0G5uBGNxTGIZq0zQa7BdIxm4B/db84Z8YhqhBWejiBIqJYRhX6bmuq0qSRD92xneeJOFXIQqce1ym2IdUDO4XFotFv2QoRnNgQ4LHUUyOy9fpxgmmFopoMAuIM27hix4KJoS4ruvENM0LzQdVVVmW6as3dIkkB9rGPgEFLJdLjRygvh/txByo8gHs4sHBZ2gqULZoa2CUQxKsdkSrze6Jbw63n4sGcunhAAAAAElFTkSuQmCC");
	--mdt2-vdbg-icon-add: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA7SURBVHgB7dGxCgAgCATQs7++L7jPLhpaGmyoIcUHgoOIeMDXJPVZ3kzDpQQLbDWnZ+1I2pMLXBVjFAMPBg5keLxb1wAAAABJRU5ErkJggg==");

	--mdt2-vdbg-icon-centered-layout: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABMSURBVHgB3VNBCgAgCNPw077AZxcevAiGtUPQLorKZBPZzCYBGAQCJoDBkey8UFXOfa95hCVIdzA2XhNUEiQXTtE2serBEj64wvtfWExFHv4EnPa7AAAAAElFTkSuQmCC");
	--mdt2-vdbg-icon-appbar-fusion: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACKSURBVHgBrZBLDoAwCERp44W8mduurJv2Oh6pV3DZlYLBhBqJH5yEtAnMCwyAUS7nvIJBHowyA8y6zCCE8Dgb8wmd1qAt4M8N8KSR6hOAjZHqDLkFCPOhBuJfmCeuBqKGmFIapBlDjQylZwfjzKJu4Jyb8SnSTOI/bVJoRgXgYKm19tIsIdwrYNUGszI/+hwyXlIAAAAASUVORK5CYII=");
	--mdt2-vdbg-icon-cardification: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAuSURBVHgB7dKxDQAACAJBdGsmYGyNK2hjjFdQUj0wZDWSAg0kzTH0Bxt8Byc6SLhBCBdmKhDoAAAAAElFTkSuQmCC");
	--mdt2-vdbg-icon-dark-mode: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFKSURBVHgBlVNBboNADDRbhOgtP2jzgubYCxJ5QdUXVHlBcwUOIQIBtzYvaK+9tS+AJ/CD8IQcCwfouGGbzUJSZSTjXZuxvV4vkYYoitwsy17SNM11H2y3us2UizAMJ7Ztr7quW0KobdsFDfEEWasGIcmWZeVMVnzlSPYQ2h0E4MyGYcxURxAEpUaWR3pTjyJ4o2U+QpIk7NtCJIn1treTQObVGDGO4xvWvu+/Qk0hVe9iPe3tJJB9NhZACPEo157nMUk2dd7v9/9BRgOgsgd1D1IBtVbJMsApuPKcCt4HidBEtUE6dpiHuXojOriCLzqNCXqRj1RyVIFLhzs+hwrV8BSWakUGfxCEr+SZLsMGDV3+NrGu65C00T0HXH3Zc+iKP0VRfDuO82Ga5jW29//wN03TLPB+diSPoEI+GsgdHWakon2zP/t5+MMPBcCE9IsrwZ8AAAAASUVORK5CYII=");
	--mdt2-vdbg-icon-gbar: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABGSURBVHgB3ZJBCgAgCATX6NO+wGfX3WQLlKDmqIcdZYHnEbY0s4ENDUm6T1PVxSqa1Rn4O5lJ9JO0gbDkE5s6g4grPfiACavCHmb5qXyZAAAAAElFTkSuQmCC");
	--mdt2-vdbg-icon-advertisements: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGjSURBVHgBdVPLbcJAEPUa8zmSDtxBnA7sCqCDJBUARz4StjiAuIA7SAmkAtxB3AFOBfgICOG8Z+1aY0esNNrZ2Zk3b9/uKqsxVquV3263B0VRDLF0GYOfKqVSuNF0Os1kvjJOGIb9Xq+3RPLYxB6PR8TZtu1lVaDU/nK5RMjPKwAWdzqdIzY9AZ6i2xud9Xr9g6naI6Pb7RYQxGaAnRvFCWwiCsgkEyw81pQ+0F3MJ1H8hc6fhpmec/rdbneP5bvIDWygLUWA54417SMKzrTNZrMzUsFykTt0QE9SJ92z7vyrabsUFhr58PvaygFxB44Uh8NxnPFiseD5P7jebrfe/X73wXRk6WsVw6UGhfV/ZOgaw5L5fJ6aIHKpwUgmEuDUQM70OT2xTq7X6wR6kL4UPOU1fosACwMkB5hjQ5PGm4Bo/QbTEuAgAkwobwVXOQbQCw0+Aa1WqzVqAETqydmowWQ2m5Xg/B8Ql8C+yInZpHyJ6BKSjth05ftA8U4W8ynrmvpngkihYJKbRyU/EzuzuPaZ5NBPm0CvVv0mKPYBtBOZ/wdq9cqJpxYY7wAAAABJRU5ErkJggg==");
}

.mdt2-vdbg-icon {
	display: inline-block;
	width: 16px;
	height: 16px;
	background: var(--mdt2-vdbg-icon-unset);
}

.mdt2-vdbg-icon.download
{ background: no-repeat var(--mdt2-vdbg-icon-download) }

.mdt2-vdbg-icon.remove
{ background: no-repeat var(--mdt2-vdbg-icon-remove) }

.mdt2-vdbg-icon.reset
{ background: no-repeat var(--mdt2-vdbg-icon-reset) }

.mdt2-vdbg-icon.add
{ background: no-repeat var(--mdt2-vdbg-icon-add) }

.logview-extra-buttons > .mdt2-vdbg-icon:hover,
.mdt2-vdbg-preset-item .mdt2-vdbg-icon:hover
{ filter: brightness(0) }

.dark-mode .logview-extra-buttons > .mdt2-vdbg-icon:hover,
.dark-mode .mdt2-vdbg-preset-item .mdt2-vdbg-icon:hover
{ filter: brightness(2) }

/* input */

.mdt2-vdbg-input {
	position: relative;
	display: flex;
	gap: 5px;
}

.mdt2-vdbg-input::before {
	content: "";
	position: absolute;
	top: 50%;
	left: 8px;
	transform: translateY(-50%);
	width: 16px;
	height: 16px;
	background: no-repeat var(--mdt2-vdbg-icon-search);
}

.mdt2-vdbg-input input {
	padding-left: 28px;
	width: 100%;
}

.mdt2-vdbg-textarea {
	resize: none;
	width: auto;
	height: auto;
}

/* expander */

.internal-config-section.yt-uix-expander:not(.yt-uix-expander-collapsed) .yt-uix-expander-head
{ font-weight: bold }

.internal-config-section .yt-uix-expander-head
{ position: relative }

.content > .mdt2-vdbg-input {
	margin-top: 5px;
	margin-bottom: 10px;
}

.mdt2-vdbg-expander-buttons {
	display: inline-block;

	position: absolute;
	right: 0px;

	margin-top: 3px;

	height: 16px;
}

.mdt2-vdbg-expander-buttons > div
{ margin-right: 5px }

/* presets */

.mdt2-vdbg-presets-section.logview-title {
	padding: 5px 10px;
}

.mdt2-vdbg-presets-container {
	display: flex;
	flex-wrap: wrap;
	gap: 5px;

	margin-top: 5px;
}

.mdt2-vdbg-preset-item {
	flex-grow: 0.5;

	padding: 5px 10px;
	padding-left: 8px;

	border: 1px solid var(--color-b8, #dbdbdb);
}

.mdt2-vdbg-preset-item .mdt2-vdbg-icon {
	-webkit-transform: translateY(3px);
	margin-right: 5px;
}

.mdt2-vdbg-preset-item:hover .mdt2-vdbg-icon
{ background: no-repeat var(--mdt2-vdbg-icon-question-mark) !important }

.mdt2-vdbg-preset-item-buttons {
	display: flex;
	justify-content: flex-end;

	margin-top: 2px;
}

.mdt2-vdbg-preset-item-buttons .jfk-button
{ min-width: 24px }

.mdt2-vdbg-preset-item-buttons .jfk-button-default
{ margin-right: 5px }

.mdt2-vdbg-input-presets > div {
	padding: 5px;
	width: unset;
	line-height: 0;
}

.mdt2-vdbg-preset-editor-container {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

/* buttons */

.logview-updater > button:not(:last-child)
{ margin-right: 5px }

.logview-extra-buttons
{ margin-bottom: -5px }

.logview-extra-buttons > *
{ margin-right: unset }

.logview-extra-buttons button.jfk-button {
	margin-bottom: 5px;
	margin-right: 5px;
}

/* tabs */

.mdt2-vdbg-smartnav-tabs
{ padding-left: 5px }

.smartnav .mdt2-vdbg-smartnav-tabs .smartadd,
.vor_smartnav .smartnav .mdt2-vdbg-smartnav-tabs .smartadd_title {
	display: inline-block;
	position: relative;
	left: unset;
	min-width: fit-content;
}

.mdt2-vdbg-smartnav-tabs .smartadd.selected
{ width: unset }

.smartadd_name > span {
	vertical-align: bottom;
	font-size: 16px;
}
`));

css.add({
	id: "left_aligned",
	if: () => config.get("left_aligned")
}, (`
#vor_debugger_container {
	right: unset !important;
	left: 0px;
	margin-left: 15px;
	margin-right: unset;
}

#vor_debugger_container .hitbox-area + .vordebugger:not(.expanded) {
	left: 0px;
	right: unset;
}
`));

css.add({
	id: "expander_on_bottom",
	if: () => !config.get("expander_on_bottom")
}, (`
.vordebugger.expanded
{ flex-direction: column }
`));

css.add({
	id: "dark_expander",
	if: () => config.get("dark_expander")
}, (`
.dark-mode .vdbg-titlebar {
	background-image: linear-gradient(to bottom, var(--color-ccc) 0, var(--color-e5) 100%);
	color: white;
}
`));

css.update();
})();

const vdbg = document.querySelector("#vor_debugger_container");
const vdbg_expander = vdbg.querySelector(".vdbg-titlebar");
const vdbg_expander_button = vdbg.querySelector(".vdbg-titlebar-actions");
const vdbg_expander_buttons = vdbg.querySelectorAll(".vdbg-titlebar-action");

const vdbg_smartnav = vdbg.querySelector(".smartnav");

const vdbg_debug = vdbg.querySelector(".smartadd:nth-child(1) .smartadd_content");
const vdbg_config = vdbg.querySelector(".smartadd:nth-child(2) .smartadd_content");
const vdbg_uimsg = vdbg.querySelector(".smartadd:nth-child(3) .smartadd_content");

vdbg.classList.add("mdt2");

// prevent v3 from managing uimsg
vdbg_uimsg.classList.remove("append_uimsg");

/*
== make entire expander clickable ==
*/

vdbg_expander.addEventListener("click", event => {
	for (const node of vdbg_expander_buttons) {
		const button = node.querySelector(".working");

		if (node.style.display != "none") {
			button.click();
			break;
		}
	}
});

vdbg_expander.style.zIndex = "1";
vdbg_expander.style.cursor = "pointer";
vdbg_expander_button.style.pointerEvents = "none";

/*
== prep stuff ==
*/

const quotes_no_result = [
	"You might have misspelled something.",
	"Maybe try again?",
	"Dont give up, searcher!",
	"It probably has a different name than you think.",
	"Maybe you're searching the wrong thing?",
	"Do you think it really exists?",
	"Anyway, how's your day going?",
	"Sorry.",
	"🍌 Empathy banana is here for you.",
	"That's all we know."
];

function getNoResultQuote() {
	let text = "No results found.";

	if (Math.random() < 0.1) {
		text += "\n" + quotes_no_result[Math.floor(Math.random() * quotes_no_result.length)];
	}

	return text;
}

async function openFilePicker(callback) {
	const picker = await window.showOpenFilePicker();
	if (!picker[0]) return;

	const reader = new FileReader();
	const file = await picker[0].getFile();

	reader.addEventListener("load", () => {
		callback(reader.result, reader);
	});

	if (file) reader.readAsText(file);
}

const hplate_utility_buttons = [
	mmm.hplate.button(uimsg("mdt2_vdbg.button.export_db"), "action", {
		onclick: () => {
			mmm.download_uri({
				type: "text/json",
				filename: "v3 config.json",
				uri: localStorage.v3_local_db
			});
		}
	}),
	mmm.hplate.button(uimsg("mdt2_vdbg.button.import_db"), "action", {
		onclick: () => {
			openFilePicker((result) => {
				try {
					const json = JSON.parse(result);
					if (!json?.config?.db?.yt || !json?.uimsg?.db) throw "json is invalid";

					localStorage.v3_local_db = result;
					history.go();
				} catch (err) {
					alert("I don't think that's valid");
					console.error(err);
				}
			});
		}
	}),
	mmm.hplate.button(uimsg("mdt2_vdbg.button.reset_db"), "primary", {
		onclick: () => {
			const is_reset = confirm([
				uimsg("mdt2_vdbg.prompt.are_you_sure"),
				uimsg("mdt2_vdbg.prompt.will_reset_config")
			].join("\n"));
			if (!is_reset) return;

			window.localStorage.removeItem("v3_local_db");
			history.go();
		}
	})
];

const hplate_reload_buttons = [
	mmm.hplate.button(uimsg("mdt2_vdbg.button.reload_no_v3"), "standard", {
		onclick: () => {
			// const confirmation = confirm([
			// 	"Are you sure?",
			// 	"This will temporarily disable V3 after page reload.",
			// 	"To re-enable V3, just refresh the page."
			// ].join("\n"))
			// if (!confirmation) return;

			const href = window.location.href;
			window.location.href = href.replace("v3cv=1", "")
				+ (-1 < href.indexOf("?") ? "&" : "?")
				+ "v3cv=0";
		}
	}),
	mmm.hplate.button(uimsg("mdt2_vdbg.button.reload"), "default", {
		onclick: () => history.go()
	})
];

const template_presets = [
	{
		label: "Centered Layout",
		icon: "centered-layout",
		info: [
			"Toggles center-aligned layout and appbar.",
			"When toggled off, this will turn off related settings in Cardification to prevent a broken layout."
		],
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
			at_off: {
				"CARDIFIED_PAGE": false,
				"INDIVIDUAL_CARDS": false
			}
		}
	},
	{
		label: "Appbar Fusion",
		icon: "appbar-fusion",
		info: "Autohide appbar on certain pages.",
		toggles: {
			default: [
				"MASTHEAD_APPBAR_FUSION",
				"APPBAR_GUIDE_IS_PART_OF_MASTHEAD_POSITIONER"
			]
		}
	},
	{
		label: "Cardification",
		icon: "cardification",
		info: [
			"Toggles cardified layout, except for watch page.",
			"For cardified layout in watch page, toggle Watch8.",
			"",
			"When toggled on, this will turn on related settings in Centered Layout to prevent a broken layout.",
			"Said settings will not be turned off when this is toggled off."
		],
		toggles: {
			default: [
				"CARDIFIED_PAGE",
				"INDIVIDUAL_CARDS"
			],
			at_on: {
				"APPBAR_GUIDE": true,
				"SITE_CENTER_ALIGNED": true,
				"MASTHEAD_APPBAR_LAUNCH": true,
				"PROMINENT_UPLOAD_BUTTON": true,
				"APPBAR_GUIDE_BUTTON_SIMPLE_STYLE": true,
				"FLEX_WIDTH_ENABLED_SNAP": true,
				"NEW_APPBAR_GUIDE_ICONS": true,
				"APPBAR_GUIDE_PINNING": true,
				"GUIDE_LIBRARY_SHOW_COUNT": true,
				"APPBAR_GUIDE_SCROLL": true,
				"CENTER_ALIGN_MODERN_SIZE_RULES": true,
				"SITE_AS_GIANT_CARD": true
			}
		}
	},
	{
		label: "Watch8",
		icon: "cardification",
		info: [
			"Toggles cardified layout for watch page.",
			"Intended to be used with Cardification."
		],
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
		label: "Gbar",
		icon: "gbar",
		info: "Toggles the black bar containing Google's services.",
		toggles: {
			default: [
				"USING_GBAR"
			]
		}
	},
	{
		label: "Dark Mode",
		icon: "dark-mode",
		info: "Toggles dark mode.",
		toggles: {
			default: [
				"DARK_MOD"
			],
			at_on_confirmation: () => {
				const startube = document.querySelector("#startube13-settings-window");

				if (startube) {
					const confirmation = confirm("StarTube currently does not natively support dark mode. Do you really want to enable?");
					return confirmation;
				}

				return true;
			}
		}
	},
	{
		label: "Ads",
		icon: "advertisements",
		info: [
			"Toggle advertisements.",
			"For ads in video player, toggle Player Ads."
		],
		toggles: {
			default: [
				"AD_ITEM_ALLOWED_ADSLOTRENDERER",
				"AD_ITEM_ALLOWED_FAKEVIDEORENDERER1",
				"AD_ITEM_ALLOWED_BANNERPROMORENDERER",
				"AD_ITEM_ALLOWED_WHATTOWATCH_MASTHEAD_AD"
			]
		}
	},
	{
		label: "Player Ads",
		icon: "advertisements",
		info: "Toggle advertisements in video player.",
		toggles: {
			default: [
				"PLAYER_USE_ADSIGNALINFO",
				"PLAYER_CAN_PLAY_ADSLOTS",
				"PLAYER_ADMARKER_SHOWING"
			]
		}
	},
	{
		label: "Compact Masthead",
		info: "Makes masthead more compact.",
		toggles: {
			default: [
				"TOP_GUIDE_MINI",
				"MASTHEAD_APPBAR_FUSION",
				"APPBAR_GUIDE_IS_PART_OF_MASTHEAD_POSITIONER"
			]
		}
	},
];

const template_tags = {
	APPBAR_GUIDE: ["CA"],
	APPBAR_GUIDE_BUTTON_SIMPLE_STYLE: ["CA"],
	APPBAR_GUIDE_IS_PART_OF_MASTHEAD_POSITIONER: ["CA", "AF"],
	APPBAR_GUIDE_PINNING: ["CA"],
	APPBAR_GUIDE_SCROLL: ["CA"],
	APPBAR_MINI_CINEMA_WILL_MOVE_GUIDE: ["LA"],
	BODY_LEGACY_BACKGROUND: ["EP", "LA"],
	CARDIFIED_PAGE: ["CA", "CARD"],
	CARDIFIED_PAGE_LESS_PADDED: ["CA", "CARD"],
	CENTER_ALIGN_MODERN_SIZE_RULES: ["CA"],
	FIX_WATCH_HEADLINE_EDITOR_STYLING: ["W7"],
	GUIDE_AUTO_EXPAND_ON_WATCH: ["LA"],
	GUIDE_USER_ITEM_GO_TO_LIBRARY: ["LA"],
	GUIDE_USE_APPBAR_TOAST_NOTIFICATION: ["CA"],
	INDIVIDUAL_CARDS: ["CA", "CARD"],
	INDIVIDUAL_CARDS_WATCH: ["CA", "CARD"],
	LEFT_ALIGN_GUIDE_FIXED: ["LA"],
	LEGACY_STYLING_FUN: ["EP", "LA", "CA"],
	NEW_APPBAR_GUIDE_ICONS: ["CA"],
	REVERSE_CARDIFIED: ["CA", "CARD"],
	SITE_AS_GIANT_CARD: ["CA"],
	SITE_CENTER_ALIGNED: ["CA"],
	SITE_LEFT_ALIGNED: ["LA"],
	SITE_LEGACY_ALIGNED: ["EP"],
	WATCH7_TEXT_RATING: ["W7"],
	WATCH_HEADLINE_NOT_EXPANDER: ["W7"]
}

/*
== patience ==
*/

const patience_notice = mmm.htemplate([
	["div", {
		className: "logview-title"
	}, [
		["span", {
			className: "logview-title-name",
			innerText: "Patching... Please wait a moment!"
		}]
	]]
]);

function patience(parentNode) {
	const nodes = [];

	for (const node of parentNode.children) {
		node.style.display = "none";
		nodes.push(node);
	}

	parentNode.append(patience_notice);

	return nodes;
}

function createSection(data) {
	const htemplate = mmm.htemplate([
		["div", {
			className: "logview-title"
		}, [
			["div", {
				className: "logview-title-top"
			}, [
				["span", {
					className: "logview-title-name",
					innerText: data.title
				}]
			]]
		]]
	]);

	return htemplate;
}

function createHeader(data) {
	const section = createSection({
		title: data.title
	});
	const section_title_top = section.querySelector(".logview-title-top");
	const subtitle_text = [];

	const hplate_title = [
		["span", {
			className: "logview-title-name",
			innerText: data.title
		}]
	];

	if (data.show_reload_buttons) {
		section_title_top.append(mmm.htemplate([
			["div", {
				className: "logview-updater"
			}, (function(){
				if (data.is_old_layout) {
					return [hplate_reload_buttons[1]];
				} else {
					return hplate_reload_buttons
				}
			})()]
		]));
	}

	if (data.show_configuration_subtitle) {
		subtitle_text.push(uimsg("mdt2_vdbg.subtitle.reload_config"));
	}

	if (data.show_uimsg_subtitle) {
		subtitle_text.push(uimsg("mdt2_vdbg.subtitle.reload_uimsg"));
	}

	if (subtitle_text.length != 0 && !data.show_old_layout) {
		subtitle_text.push(uimsg("mdt2_vdbg.subtitle.goto_utilities"));
	}

	if (subtitle_text.length != 0) {
		section.append(mmm.htemplate([
			["div", {
				className: "logview-subtitle",
				innerText: subtitle_text.join("\n")
			}]
		]));
	}

	return section;
}

/*
== ddd text
*/

(function(){
	const vdbg_ddd = vdbg.querySelector(".ddd-build-info");
	const vdbg_ddd_text = vdbg_ddd.innerText;

	function changeDDD() {
		const data = vdbg_ddd_text
			.replaceAll(/[\(\)]/g, "")
			.split(" ");

		vdbg_ddd.innerText = config.get("ddd_text")
			.replaceAll("%version%", data[3])
			.replaceAll("%revision%", data[5])
			.replaceAll("%branch%", data[6]);
	}

	config.on("ddd_text", changeDDD);
	changeDDD();
})();

/*
== patch page buttons
*/

const vdbg_tabs_container = vdbg_smartnav.querySelector(".smartnav_bot_height_offset");
vdbg_tabs_container.classList.add("mdt2-vdbg-smartnav-tabs");

const hplate_tab_button = (content) => (
	["div", {
		className: "smartadd"
	}, [
		["div", {
			className: "smartadd_title"
		}, [
			["span", {
				className: "smartadd_name"
			}, content]
		]]
	]]
);

function createTabButton(data) {
	const button = mmm.htemplate([
		["div", {
			className: "smartadd"
		}, [
			["div", {
				className: "smartadd_title"
			}, [
				["span", {
					className: "smartadd_name",
					innerText: data.label
				}]
			]]
		]]
	]);

	button.setAttribute("data-tag", data.id);

	vdbg_tabs_container.append(button);

	return button;
}


(function(){
	const buttons = {
		"Debug Log": {
			id: "utilities",
			label: uimsg("mdt2_vdbg.title.utilities")
		},
		"Configuration": {
			id: "config",
			label: uimsg("mdt2_vdbg.title.config")
		},
		"Uimsg": {
			id: "uimsg",
			label: uimsg("mdt2_vdbg.title.uimsg")
		}
	};

	for (const page of vdbg_smartnav.querySelectorAll(".smartadd")) {
		const content = page.querySelector(".smartadd_content");
		const title = page.querySelector(".smartadd_title");
		const text = title.innerText.trim();
		const data = buttons[text];
		if (!data) continue;

		const button = createTabButton(data);

		title.style.display = "none";
		button.addEventListener("click", () => {
			title.click();
			for (const selected of vdbg_smartnav.querySelectorAll(".smartadd.selected")) {
				selected.classList.remove("selected");
			}

			page.classList.add("selected");
			button.classList.add("selected");
		});

		if (data.id == "config") {
			button.click();
		}
	}
})();

/*
== patch debug ==
*/

(function(){
	const logview_stream = vdbg_debug.children[0];
	const nodes = [...logview_stream.children];
	nodes[1] = null;

	const title_section = createHeader({
		title: uimsg("mdt2_vdbg.title.utilities"),
		show_reload_buttons: true
	});

	title_section.append(mmm.htemplate([
		["div", {
			className: "logview-extra-buttons"
		}, hplate_utility_buttons]
	]));

	const logs_section = createHeader({
		title: uimsg("mdt2_vdbg.title.logs")
	});
	const subtitle = mmm.htemplate([
		["div", {
			className: "logview-subtitle",
			innerText: uimsg("mdt2_vdbg.subtitle.logs")
		}]
	]);
	logs_section.append(subtitle);

	const update_logs = logview_stream.querySelector(".logview-title-top").querySelector(".logview-updater");
	update_logs.querySelector(".jfk-button-text").innerText = uimsg("mdt2_vdbg.button.update_logs");
	logs_section.querySelector(".logview-title-top").append(update_logs);

	logview_stream.prepend(title_section, logs_section);
	for (const node of nodes) node?.remove();
})();

/*
== patch config ==
*/

new MutationObserver((list, observer) => {
	observer.disconnect();

	const nodes = patience(vdbg_config);

	setTimeout(() => {
		appendStarTubeButton();
		patchConfig();
		patience_notice.remove();
	});
}).observe(vdbg, { subtree: true, attributes: true });

function appendStarTubeButton() {
	const startube_button = vdbg_config.querySelector("#startube13-settings button");
	if (!startube_button) return;

	startube_button.remove();

	const button = mmm.htemplate([
		hplate_tab_button(["StarTube"])
	]);

	button.setAttribute("vdbg-tab", "StarTube");

	button.addEventListener("click", () => {
		startube_button.click()
	});

	vdbg_tabs_container.append(button);
}

const all_options = [
	"All",
	"All checked",
	"All unchecked",
	"All text inputs"
];

function transformConfig(container) {
	function getOptions(parentNode, tag) {
		const options = parentNode.querySelectorAll(".internal-setting, .internal-setting-description");
		const transformed_options = [];

		for (const option of options) {
			let data = {};

			if (option.classList.contains("internal-setting")) {
				transformed_options.push(data);
				data.id = option.innerText.trim();
				data.node = option;
				data.tags = [];

				if (tag) data.tags.push(tag);

				data.tags.push("All");

				const checkbox = option.querySelector('input[type="checkbox"]');
				const textbox = option.classList.contains("uimsg-setting");

				if (checkbox && checkbox.checked) {
					data.tags.push("All checked");
				}

				if (checkbox && !checkbox.checked) {
					data.tags.push("All unchecked");
				}

				if (textbox) {
					const input = option.querySelector("input");
					const button = option.querySelector("button");

					if (button) {
						input.addEventListener("input", () => button.click());
						button.remove();
					}

					data.tags.push("All text inputs");
				}
			}

			if (option.classList.contains("internal-setting-description")) {
				data = transformed_options[transformed_options.length - 1];

				if (option.innerText == "No description.") {
					option.remove();
					continue;
				}

				data.description = {};
				data.description.text = option.innerText;
				data.description.node = option;
			}
		}

		return transformed_options;
	}

	const is_sectioned = db.yt_get("VORDEBUGGER_CONFIG_IS_SECTIONED");
	const transformed_options = [];
	const tags = [ ...all_options ];

	const expanders = vdbg_config.querySelectorAll(".internal-config-section.yt-uix-expander");

	for (const expander of expanders) {
		const title_text = expander
			.querySelector(".internal-config-section-title")
			.innerText;
		tags.push(title_text);
		transformed_options.push(...getOptions(expander, title_text));
	}

	return { options: transformed_options, tags: tags };
}

function searchManager(data, callback) {
	let text, tag;

	function update() {
		callback(text, tag);
	}

	update();

	const search_box_hplate = [
		["input", {
			className: "mdt2-vdbg-search-box yt-uix-form-input-text",
			type: "text",
			placeholder: uimsg("GBAR_SERVICE_SEARCH"),
			oninput: (e) => {
				text = e.target.value;
				update();
			}
		}]
	];

	const search_tags_hplate = [
		["select", {
			className: "mdt2-vdbg-search-tags yt-uix-form-input-text",
			oninput: (e) => {
				tag = e.target.value;
				update();
			}
		}, (function(){
			if (!data.tags) return;

			const options = [];

			for (const tag of data.tags) {
				options.push(
					["option", {
						value: tag,
						innerText: tag
					}]
				);
			}

			return options;
		})()]
	];

	const search_hplate = [];

	search_hplate.push(...search_box_hplate);
	if (data.tags) search_hplate.push(...search_tags_hplate);

	const search_htemplate = mmm.htemplate([
		["div", {
			className: "mdt2-vdbg-input"
		}, [
			...search_hplate
		]]
	]);

	return search_htemplate;
}

function patchConfig() {
	const container = vdbg_config.querySelector(".internal-config.goog-scrollbar");
	const transformed_config = transformConfig(container);

	container.remove();
	container.style.display = null;

	function getPresets() {
		const presets = {
			[uimsg("mdt2_vdbg.preset_category.system")]:
				template_presets,
			[uimsg("mdt2_vdbg.preset_category.custom")]:
				JSON.parse(localStorage.mdt2_vdbg_presets || null),
		}

		return presets;
	}

	function togglePreset(data, is_on) {
		const toggles = data.toggles;

		function applySettings(settings) {
			const is_array = Array.isArray(settings);

			if (is_array) {
				const data = {};

				for (const setting of settings) {
					data[setting] = is_on;
				}

				db.yt_set(data);
			}

			if (!is_array) {
				db.yt_set(settings);
			}
		}

		applySettings(toggles.default);

		if (is_on == true && toggles.at_on_confirmation) {
			const confirmation = toggles.at_on_confirmation();
			if (!confirmation) return;
		}

		if (is_on == false && toggles.at_off_confirmation) {
			const confirmation = toggles.at_on_confirmation();
			if (!confirmation) return;
		}

		if (is_on == true && toggles.at_on) {
			applySettings(toggles.at_on);
		}

		if (is_on == false && toggles.at_off) {
			applySettings(toggles.at_off);
		}

		history.go();
	}

	function createPreset(data) {
		return (
			["div", {
				className: "mdt2-vdbg-preset-item"
			}, [
				["span", {
					className: "logview-subtitle mdt2-vdbg-preset-item-label"
				}, [
					["div", {
						className: "mdt2-vdbg-icon",
						title: (Array.isArray(data.info))
							? data.info.join("\n")
							: data.info,
						it: (it) => {
							if (data.icon) {
								it.style.background = `var(--mdt2-vdbg-icon-${data.icon})`;
							}
						}
					}],
					data.label
				]],
				["div", {
					className: "mdt2-vdbg-preset-item-buttons"
				}, [
					mmm.hplate.button("ON", "default", {
						onclick: () => togglePreset(data, true)
					}),
					mmm.hplate.button("OFF", "primary", {
						onclick: () => togglePreset(data, false)
					})
				]]
			]]
		);
	}

	const title_section = createHeader({
		title: uimsg("mdt2_vdbg.title.config"),
		show_reload_buttons: true,
		show_configuration_subtitle: true
	});

	const hplate_presets = mmm.htemplate([
		["span", {}, (function(){
			const categories = [];

			for (const [label, presets] of Object.entries(getPresets())) {
				const hplate = [];

				if (!presets) {
					hplate.push(
						["div", {
							className: "logview-subtitle",
							innerText: "You haven't made one yet."
						}]
					);
				} else {
					for (const preset of presets) {
						hplate.push(createPreset(preset));
					}
				}

				categories.push(mmm.hplate.vdbg_expander({ label }, [
					["div", {
						className: "mdt2-vdbg-presets-container"
					}, hplate]
				]));
			}

			return categories;
		})()]
	]);

	const presets_title_section = createSection({
		title: uimsg("mdt2_vdbg.title.presets")
	});
	const presets_title_section_top = presets_title_section.querySelector(".logview-title-top");

	presets_title_section_top.append(mmm.htemplate([
		["div", {
			className: "logview-updater"
		}, [
			mmm.hplate.button("＋ New custom preset", "default", {
				onclick: mmm.wait_warmly
			})
		]]
	]));

	const presets_title_subtitle = mmm.htemplate([
		["div", {
			className: "logview-subtitle",
			innerText: uimsg("mdt2_vdbg.subtitle.presets")
		}]
	]);

	presets_title_section.append(presets_title_subtitle);

	const presets_list_section = mmm.htemplate([
		["div", {
			className: "logview-title mdt2-vdbg-presets-section"
		}, [
			hplate_presets
		]]
	]);

	const preset_editor_section = createSection({
		title: "Preset editor"
	});
	preset_editor_section.classList.add("hid");
	const preset_editor_section_top = preset_editor_section.querySelector(".logview-title-top");

	preset_editor_section_top.append(mmm.htemplate([
		["div", {
			className: "logview-updater"
		}, [
			mmm.hplate.button("ⓧ Cancel", "primary", {

			}),
			mmm.hplate.button("🖉 Update", "default", {

			}),
			mmm.hplate.button("＋ Create", "default", {

			})
		]]
	]));

	const preset_editor_content = mmm.htemplate([
		["div", {
			className: "logview-subtitle",
			innerText: "Create custom presets."
		}],
		["div", {
			className: "mdt2-vdbg-preset-editor-container"
		}, [
			["div", {
				className: "mdt2-vdbg-input mdt2-vdbg-input-presets"
			}, [
				["div", {
					className: "yt-uix-form-input-text"
				}, [
					["div", {
						className: "mdt2-vdbg-icon"
					}]
				]],
				["input", {
					className: "yt-uix-form-input-text",
					placeholder: "Preset name"
				}]
			]],
			["textarea", {
				className: "mdt2-vdbg-textarea yt-uix-form-input-text",
				placeholder: "Description",
				oninput: (event) => {
					const it = event.target;
					it.style.height = "0px";
					it.style.height = it.scrollHeight + "px";
				}
			}]
		]]
	]);

	preset_editor_section.append(...preset_editor_content);

	const expanders = container.querySelectorAll(".yt-uix-expander-collapsed");

	for (const expander of expanders) {
		expander.classList.remove("yt-uix-expander-collapsed");
	}

	const search_manager = searchManager({ tags: transformed_config.tags }, (text, tag) => {
		text = text
			?.toLowerCase()
			.replaceAll("_", " ");

		const options = transformed_config.options;
		const filtered_options = options.filter((option) => {
			const option_id = option.id
				.replaceAll("_", " ")
				.toLowerCase();
			const option_label = option.label
				?.toLowerCase() || "";
			const option_description = option.description?.text
				.toLowerCase();
			const option_tags = option.tags;

			if (text) {
				const conditions = [
					(option_id.includes(text)),
					(option_label.includes(text)),
					(option_description?.includes(text)),
				];

				if (!mmm.or_if(conditions)) return;
			}

			if (tag) {
				if (!option_tags?.includes(tag)) return;
			}

			return true;
		});

		for (const option of options) {
			option.node.classList.add("hid");
			option.description?.node.classList.add("hid");
		}

		for (const option of filtered_options) {
			option.node.classList.remove("hid");
			option.description?.node.classList.remove("hid");
		}

		for (const expander of expanders) {
			const is_empty = expander.querySelectorAll(".internal-setting:not(.hid)").length == 0;
			if (is_empty) {
				expander.remove();
			} else {
				container.append(expander);
			}
		}
	});

	const search_config_container = mmm.htemplate([
		["div", {
			className: "internal-config logview-subtitle",
			innerText: uimsg("mdt2_vdbg.subtitle.all_settings")
		}],
		["div", {
			className: "logview-title mdt2-vdbg-search-config"
		}, [
			search_manager
		]]
	]);

	vdbg_config.append(
		title_section,
		presets_title_section,
		presets_list_section,
		preset_editor_section,
		...search_config_container,
		container
	);
}

/*
== patch uimsg
*/

(function(){
	const button = vdbg_tabs_container.querySelector(".smartadd:nth-child(3)");
	button.addEventListener("click", waitUimsg);

	function waitUimsg() {
		button.removeEventListener("click", waitUimsg);

		setTimeout(() => {
			patchUimsg();
		});
	}
})();

function patchUimsg() {
	const lang = document.documentElement.lang;

	const title_section = createHeader({
		title: uimsg("mdt2_vdbg.title.uimsg"),
		show_reload_buttons: true,
		show_uimsg_subtitle: true
	});

	const sections = mmm.htemplate([
		title_section,
		["div", {
			className: "logview-title"
		}, [
			["div", {
				className: "logview-title-top"
			}, [
				["span", {
					className: "logview-title-name",
					innerText: uimsg("mdt2_vdbg.title.your_hl") + " " + lang
				}],
				["div", {
					className: "logview-subtitle",
					innerText: uimsg("mdt2_vdbg.subtitle.manage_languages")
				}],
				["div", {
					className: "logview-extra-buttons"
				}, [
					mmm.hplate.button(uimsg("mdt2_vdbg.button.change_hl"), "action", {
						onclick: () => {
							const picker = document.querySelector("#yt-picker-language-button");
							const footer = document.querySelector("#yt-picker-language-footer");

							picker.click();
							setTimeout(() => footer.scrollIntoView(), 0);
						}
					}),
					mmm.hplate.button(uimsg("mdt2_vdbg.button.create_language"), "default", {
						onclick: () => {
							const input = prompt([
								"Type the HL you wish to make a language for.",
								"Leave blank to not create a language."
							].join("\n"));

							if (!input) return;

							db.lang_create(input);
							createLanguageEditor(input);
						}
					}),
					mmm.hplate.button(uimsg("mdt2_vdbg.button.import_language"), "default", {
						onclick: () => openFilePicker((result) => {
							try {
								const json = JSON.parse(result);
								console.log(json, typeof json != "object", !Array.isArray(json))
								if (typeof json != "object" || Array.isArray(json)) throw "json is invalid";

								for (const [lang, uimsgs] of Object.entries(json)) {
									db.lang_create(lang, uimsgs);
									createLanguageEditor(lang);
								}
							} catch (err) {
								alert("I don't think that's valid");
								console.error(err);
							}
						})
					})
				]],
				["div", {
					className: "logview-subtitle default-text-red",
					innerText: [
						"You have not created or imported a language for your current HL.",
						"Most text may not be translated."
					].join("\n"),
					if: () => {
						return !db.lang_get(lang);
					}
				}]
			]]
		]],
		["div", {
			className: "internal-config goog-scrollbar"
		}]
	]);

	const languages = sections[2];

	function createLanguageEditor(lang) {
		let is_init = false;
		const is_en = (lang == "en");

		const expander = mmm.htemplate([
			mmm.hplate.vdbg_expander({
				label: lang
			})
		]);

		const expander_head = expander.querySelector(".yt-uix-expander-head");
		expander_head.append(mmm.htemplate([
			["div", {
				className: "logview-extra-buttons mdt2-vdbg-expander-buttons",
				onclick: (event) => event.stopPropagation()
			}, [
				["div", {
					className: `mdt2-vdbg-icon ${(is_en) ? "reset" : "remove"}`,
					title: (is_en)
						? "Reset language"
						: "Remove language",
					onclick: () => {
						const text = [
							uimsg("mdt2_vdbg.prompt.are_you_sure"),
							(is_en)
								? uimsg("mdt2_vdbg.prompt.will_reset_language")
								: uimsg("mdt2_vdbg.prompt.will_remove_language")
						];

						const confirmation = confirm(text.join("\n"));
						if (!confirmation) return;

						db.lang_remove(lang);

						(is_en)
							? history.go()
							: expander.remove();
					}
				}],
				["div", {
					className: "mdt2-vdbg-icon download",
					title: "Export language",
					onclick: () => {
						mmm.download_uri({
							type: "text/json",
							filename: `v3 lang (${lang}).json`,
							uri: JSON.stringify({ [lang]: db.lang_get(lang) })
						});
					}
				}]
			]]
		]));

		const content = expander.querySelector(".content");

		const uimsgs = [];

		expander.addEventListener("click", () => {
			if (is_init) return;
			is_init = true;

			const data = db.lang_get(lang);

			for (const key in data) {
				const value = (data[key] || "")
					.toString()
					.replaceAll("\n", "\\n");

				const setting = mmm.htemplate([
					mmm.hplate.vdbg_setting({
						label: key
					}, [
						["input", {
							className: "yt-uix-form-input-text",
							value: value,
							oninput: (event) => {
								db.uimsg_set(lang, {
									[key]: event.target.value
										.replaceAll("\\n", "\n")
								});
							}
						}]
					])
				]);

				uimsgs.push({
					id: key,
					node: setting,
					input_node: setting.querySelector("input")
				});

				content.append(setting);
			}
		});

		const search_manager = searchManager({}, (query) => {
			query = query
				?.toLowerCase()
				.replaceAll("_", " ");

			const filtered_uimsgs = uimsgs.filter(({ id, node, input_node }) => {
				id = id
					.toLowerCase()
					.replaceAll("_", " ");
				const text = input_node.value
					.toLowerCase()

				if (id.includes(query)) return true;
				if (text.includes(query)) return true;
			});

			for (const uimsg of uimsgs) {
				uimsg.node.classList.add("hid");
			}

			for (const uimsg of filtered_uimsgs) {
				uimsg.node.classList.remove("hid");
			}

			console.log(filtered_uimsgs);
		});

		content.prepend(search_manager);
		languages.append(expander);
	}

	for (const hl in db.lang_get()) {
		createLanguageEditor(hl);
	}

	vdbg_uimsg.append(...sections);
}

console.log("mdt2 vdbg :)");