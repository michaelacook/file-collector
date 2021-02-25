# File Collector

A simple program to programmatically output an array of files. This is useful when you need a list of files but manually compiling a list would be too labour intensive. Basically `fs.readdir()` with options.

## Installation

`npm install -g file-collector`

## Usage

`file-collector [path=[path]] [exclude=[exclude]] [filter=[filter]] [extension=[extension]]`

Running `file-collector` with no arguments will output a `.js` file in the current working directory that exports an array of all files in the current working directory. To specify a different directory to scan, use the argument `path=[path]`.

To exclude files that contain a term use the argument `exclude=[term]`.

To return only files that contain a term, use the argument `filter=[term]`.

To return only files of a certain file extension use the argument `extension=.[extension]`

E.g:

`file-collector exclude=personal extension=.html`

## License

MIT
