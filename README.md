## Previewing SVG files

To accurately preview SVG files for print, especially when dealing with specific dimensions and rendering, the following steps are recommended:

1.  **Check SVG dimensions**: Use `grep -i "viewBox\|width\|height" file.svg` to quickly ascertain the native `viewBox`, `width`, and `height` attributes of the SVG.

2.  **Render SVG to PNG using Chrome headless**: To ensure consistent rendering across different environments (e.g., matching a print shop's rendering engine), use Chrome in headless mode to convert the SVG to a PNG at its native dimensions. This can be done with the command:
    `/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --headless --screenshot=/tmp/preview.png --window-size=<width>,<height> "file:///full/path/to/file.svg"`
    Replace `<width>` and `<height>` with the dimensions obtained from the `grep` command, and `/full/path/to/file.svg` with the absolute path to your SVG file.

3.  **Open PNG in Preview**: Once the PNG is generated, open it in a reliable image viewer like macOS Preview for final inspection:
    `open -a "Preview" /tmp/preview.png`