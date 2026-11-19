# Installing Venture Beyond (macOS, Figma, Adobe)

Venture Beyond is three **variable** TrueType fonts. Install all three. Together they make one family,
**Venture Beyond**, with 162 named styles and continuous Weight (100–900) and Width (62–125) axes.

| File (`dist/ttf/`) | What you get |
|---|---|
| `VentureBeyond[wdth,wght].ttf` | Upright: *Thin … Black*, *Condensed …*, *Extended Black*, … |
| `VentureBeyond-Italic[wdth,wght].ttf` | Italic: *… Italic*, e.g. *Extended Black Italic* |
| `VentureBeyond-Retalic[wdth,wght].ttf` | Retalic: *… Retalic*, e.g. *Extended Black Retalic* |

The approved lockup is **VENTURE** in *Extended Black Retalic* over **BEYOND** in *Extended Black Italic*.

Before installing, check the files against `dist/SHA256SUMS`:

```sh
cd typography/venture-beyond/dist && shasum -a 256 -c SHA256SUMS
```

## macOS

1. Quit Figma and any Adobe apps.
2. Select the three `.ttf` files in Finder, double-click them, and click **Install** in Font Book.
   Or copy them to `~/Library/Fonts/`.
3. In Font Book, search for *Venture Beyond*. You should see one family with 162 styles.

**Upgrading or removing:**
- If you installed earlier test builds (`VentureBeyond-ExtendedBlack*.ttf`, v0.100), remove them first.
  They share PostScript names with the new named styles, and Font Book would flag duplicates.
- To uninstall, remove the three files in Font Book (*File → Remove*) or from `~/Library/Fonts/`.
- **Last Duel stays installed alongside.** The families don't collide.

## Figma

- **Desktop app:** fonts installed in macOS show up after you restart Figma.
- **Browser:** needs the Figma font helper (FigmaAgent). It's running on this machine; reload the tab.

In the font picker, choose **Venture Beyond**, then pick a style such as *Extended Black Retalic*.
The **Variable font axes** panel (Type settings → ⚙ → Variable) gives continuous Weight and Width.

How Figma reads the family (checked through the local font helper, without installing):
- Figma takes the family name from name ID 16, which is "Venture Beyond", and lists named
  instances as styles. Archivo-style variable fonts already installed here, such as Public Sans and
  Rubik, appear exactly this way.
- Retalic styles count as slanted (`italic: true`), as Last Duel's Retalic cuts already do in Figma.
  **Pick Retalic by its style name.** Don't use an italic toggle, which can land on either slanted
  style at the same weight and width.

Team libraries: everyone who edits the files needs the fonts installed locally. The OFL allows
uploading them as Figma organization fonts, but wait until the release is approved.

## Adobe (Illustrator, Photoshop, InDesign, After Effects)

1. Install through macOS as above. Don't use Creative Cloud font sync; it's only for Adobe Fonts.
2. Restart the Adobe app. In the font menu, *Venture Beyond* lists all named styles.
3. For in-between values, use the **Variable Font** slider panel: the icon next to the style menu in
   the Character panel (Illustrator/InDesign) or the Properties panel (Photoshop).

Notes:
- Photoshop's and Illustrator's *Faux Italic* buttons fake a slant. **Never** use them on Venture
  Beyond. Choose the *Italic* or *Retalic* style instead.
- If the menu doesn't refresh, quit all Adobe apps and restart them.
- Exported PDFs embed the fonts (`fsType 0` = installable embedding).

## Windows (not the target, but supported)

Right-click the three `.ttf` files and choose **Install for all users**. Classic Office menus use
the legacy family names:
- *Venture Beyond SemiBold* (Regular/Italic)
- *Venture Beyond SemiBold Retalic*

Some long instance names, such as *ExtraCondensed ExtraLight Italic*, go past the 31-character limit
of older Windows text APIs. Archivo has the same limitation. Modern apps aren't affected.

## Web

Don't install anything. Use `dist/woff2/`, following `integration/venture-beyond.css` or
`integration/nextjs.md`.

## License

The SIL Open Font License 1.1 (`LICENSE/OFL.txt`) lets you install, use, embed, bundle and
redistribute the fonts freely. You can't sell them on their own. Keep `OFL.txt` with any copy you share.
