# sources/

Empty on purpose. The prototype builds from Archivo's published binaries in `../upstream/archivo/`
(pinned and hash-verified), so no source files are needed yet. Every transformation happens in
`../scripts/`, which keeps both Upright and Italic byte-faithful to what Omnibus ships.

If the family later needs glyph-level edits, which the brief currently rules out, Archivo's
`.glyphs` sources from the same commit go here as a converted UFO/designspace. Retalic would then
be built with fontmake instead of the binary transform.
