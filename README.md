<<<<<<< HEAD
# generator-nando-polymer [![Build Status](https://secure.travis-ci.org/someuser/generator-nando-polymer.png?branch=master)](https://travis-ci.org/someuser/generator-nando-polymer)

A generator for [Yeoman](http://yeoman.io).

## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-nando-polymer from npm, run:

```
$ npm install -g generator-nando-polymer
```

Finally, initiate the generator:

```
$ yo nando-polymer
```

### Usage

When you first install generator-nando-polymer this is the structure you'll find:

rootFolder
|- app.js       In this file there will be configured by default socket.io with express.js
|- config.rb    Configuration file for use compass
|- gruntfile.js variuos tasks like watch, compass, cssmin and a couple of my own
|- package.json 
|- tareas
|   |- polyconcat.js    assembles in one .hmtl file .css and .js files. These files are orquestred in gruntfile.js
|   |- specAPoly.js     Takes a file.spec.js file and turns it into file.js for Polymer testing
|- public
    |- html
        |- index.html   Index if the app with a little test for socket.io
        |- folderWithTheNameOfYourApp
        |- various failes with skeleton of your component App

Type 'node app.js' and if you use [bracket editor](http:brackets.io) select your index.html and start live editing. If everything went OK, you shall see some 'Connected to WebSocket!' message.

To start polymerizing, on another terminal window type 'grunt' and start editing your files on public/html/folderOfYourApp/

To create a Component, type 

```
$ yo nando-polymer:componente 'componentName'
```

With it, you'll create a folder componentName/ with the files needed. See the video // TODO

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
=======
generator-nando-polymer
=======================

A Yeoman generator for an alternative Polymer workflow
>>>>>>> a9c66fa013031280ac82f7e6e371a07619339c01
