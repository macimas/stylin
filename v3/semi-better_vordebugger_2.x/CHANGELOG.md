# changelogs
yep! also dates are based on GMT+8. just to let u know :)

also as of `2.0-dev1`, userscript now requires [mmm Library](https://macimas.github.io/stylin/v3/mmm/v3.user.js?raw=true) to be installed. it lets me reuse stuff without having to copy and paste, and lets me create configs for my userscripts :)

## `2.0-dev2` (July 28, 2024)
minor fixes :p

- fixed StarTube button duplication
- renamed preset "Centered Layout" to "Center Aligned"
- `expose_uimsg_keys` now actually works

## `2.0-dev1` (July 27, 2024)
rewrote most of the script and added a bunch of stuff.<br>
it's still not done, there's still things i want to polish up but i think it's mostly good enough to release something

### css merge & settings
- no longer depends on the userstyle as it has been integrated into script, along with its settings tweakable within vdbg in "semi-better vordebugger" category!
  - settings are prefixed with `mdt2_vdbg`
- there are also new settings for you to tweak
  - `left_aligned` - aligns the vdbg to the left<br>
    *(`false` by default)*
  - `ddd_text` - change the build text<br>
    *(`Ni: KOR VERSION: %version% (Rev. %revision% %branch%)` by default)*
  - `expose_uimsg_keys` - translation stuff<br>
    *(`false` by default)*
- settings related to StarTube were not ported, however a "StarTube" tab should appear if you have it installed

### presets
- overhauled presets section! presets are now put into collapsible categories
  - incredibly wip. subject to change
  - "System" - the v3 presets
  - "Custom" - add your own custom presets<br>
    *(sorry, you can't create presets yet)*
- added new presets
  - "Ads" - toggles ads
  - "Player Ads" - toggles ads in video player
  - "Compact Masthead" - makes masthead more compact, of course!
- "Cardification" preset will now enable "Centered Layout" when toggled on, to prevent a broken layout
- "Centered Layout" now doesn't disable "Appbar Fusion"

### config
- brought back expander categories!
  - expanders are open by default
  - if all settings in an expander are hidden, it will also hide
- search bar is now sticky
- you can now hover on a preset's icon to show a brief description of what it does
- improve styling of input boxes
- partially fix page not being patched when vdbg is opened too fast<br>
  *(it still happens, however you may now reopen vdbg to patch it without having to reload page)*

### uimsg
- vdbg is now fully translatable with Uimsg!<br>
  *(you will need to enable `expose_uimsg_keys` first, to expose uimsg keys)*<br>
  *(sorry, you can't translate config items and categories yet)*
- languages can now be individually downloaded
- delete button is now an X icon button
- reset button for `en` lang
- your current HL is now consistently shown
- relabled buttons

### utilities
- renamed "Debug Log" to "Utilities"
- moved config buttons to Utilities, now relabled to "Export/Import/Reset V3 db"
- simplified "Import V3 db", clicking on button will now directly show file picker

### vdbg expander
- you can now click on the entire expander to show/hide vdbg instead of having to specifically click the arrow button
- closed expander is now slightly rounded

### minor stuff
- expanders now tell you when you're hovered on them
- expander titles are now bold if they are open
- search bar now has a little search icon
- textbox items in config and uimsg are now stylized