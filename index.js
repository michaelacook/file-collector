#!/usr/bin/env node

const fs = require("fs")
const args = process.argv.slice(1)
let path = null
let filter = null
let exclude = null
let extension = null

if (args.length > 1) {
  const options = args.slice(1).map((str) => str.split("="))
  options.forEach((pair) => {
    const [key, value] = pair
    switch (key.toLowerCase()) {
      case "path":
        path = value
        break
      case "filter":
        filter = value
        break
      case "exclude":
        if (value.includes(",")) {
          exclude = value.split(",")
        } else {
          exclude = value
        }
        break
      case "extension":
        extension = value
        break
    }
  })
}

fs.readdir(
  path ? path : "./",
  {
    withFileTypes: true,
  },
  (err, files) => {
    if (err) {
      console.log(
        "Something went wrong and the program couldn't complete the task."
      )
      process.exit()
    }
    let dir = files.map((dirent) => dirent.name)
    if (extension) {
      dir = dir.filter((file) => {
        const ext = file.slice(file.indexOf("."))
        return ext === extension
      })
    }
    if (exclude) {
      if (Array.isArray(exclude)) {
        for (let item of exclude) {
          dir = dir.filter((file) => !file.includes(item))
        }
      } else {
        dir = dir.filter((file) => !file.includes(exclude))
      }
    }
    if (filter) {
      dir = dir.filter((file) => file.includes(filter))
    }
    const stream = fs.createWriteStream("files-array.js")
    stream.write("// import me elsewhere or copy the array :) \n\n")
    stream.write(`export default\n[\n`)
    dir.forEach((file) => {
      stream.write(`  "${file}",\n`)
    })
    stream.write("]")
    stream.end()
    console.log("Your array is in files-array.js in the current working tree")
  }
)
