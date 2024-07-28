// ==UserScript==
// @name         vore
// @namespace    https://github.com/macimas
// @version      1.0

// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABOCAYAAABhaEsjAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACSElEQVR4nO2c23LrIAxFoXP+/5fpU2Z6HJuLtm6Gvd7aJDZeSAJsktpaa4WI+IluwJuhPADKA6A8AMoDoDwAygOgPADKA6A8gH9PL9Ra//ubq7hvbiPvKu7pf6fzFXk9SbVWlQjcJarda95OUf1Y8yzwiGqNtsy2w01eluiaacfnPSOJR01VVjuw1tr9zBHyRhJmPn+Hi7yZhlvVO61ycXecZXlZatcM2m29Hm/btPXo5BTytFPWKzu+5L11tv/Bs6yYz/M0LsZyOXc91kp7U6RtD6vlXGsN7oTU8kbLOSlakSuSp1lXvGts73yr12UaeRFzwp4c7Y5KnbZS7iRZRPjtaNtaS7GS6LVjJGNVluR6xZGnNeJJ3hM1qb6e12ye9+ZBZRao5mVIbRRp1JXSkYf09lukIuJKURhtpaKypuIKXXmSCzwl6kpxfnr2ISLqJJ0KPwDaIb2sskFlhbHSOO/OsKzJWy7PNJiRrirvLYPFLKPrmZK3Q92zgGk7wGXHQOSD7ahzHhF5VndmQibJEfQEjrLmafvbdOShPbXjoHNE2lpBeUWeFZQHsDRgRDwYyrxzPnXkZd85n1ae1VYLTbad53mke9rIQ/BKdxd5Wb6coi0wbeR5btiRsizPs+EWC3rNlDYfMDKuibW+57btaDtCo/6Z1rxdbn6qbrfIUrCjMYu8SMGWXzX4i1he9qmERxugyPPa+yvFeqSvJ/xyo8Umn1ISrzA0WY2PdL8xEA3vqiSD8gAoD4DyACgPgPIAKA+A8gAoD+AXOzn7qawEuVgAAAAASUVORK5CYII=
// @description  does some silly things :3
// @author       macimas (https://macimas.github.io)

// @match        https://www.youtube.com/*

// @grant        unsafeWindow
// @grant        GM_registerMenuCommand
// ==/UserScript==

function getRandomItem(array) {
	return array[Math.floor(Math.random() * array.length)];
}

GM_registerMenuCommand("Shuffle uimsgs", () => {
	const v3_local_db = unsafeWindow.bakend.updateVorDatabase.__LOCALDB_REFERENCE;
	const hl = document.documentElement.lang;
	const lang = v3_local_db.localdb.uimsg.db[hl];
	const lang_keys = Object.keys(lang);
	const lang_msgs = Object.values(lang);

	for (const key of lang_keys) {
		const msg = getRandomItem(lang_msgs);
		lang[key] = msg;
		lang_msgs.splice(lang_msgs.indexOf(msg), 1);
	}

	for (const [_, value] of Object.entries(v3_local_db)) {
		if (value.toString().includes("LocalDataBase updating...")) value();
	}

	history.go();
});

GM_registerMenuCommand("Break your layout", () => {
	const everything = unsafeWindow.document.querySelectorAll("div, span, img");

	for (const onething of everything) {
		const anotherthing = getRandomItem(everything);
		onething?.parentNode.append(anotherthing);
		anotherthing?.parentNode.append(onething);
	}
});