# generator-nando-polymer [![Build Status](https://secure.travis-ci.org/someuser/generator-nando-polymer.png?branch=master)](https://travis-ci.org/someuser/generator-nando-polymer)

A generator for [Yeoman](http://yeoman.io).

## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

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

When you install generator-nando-polymer go to your project folder and type: 

```
$ yo nando-polymer
```

You'll be prompted with various questions:

What's your name?	( Defaulting to my name )
What's your application name?
What's is your app custom tag? 	( It refers in <x-component> the 'x' part. Every webComponent must have a dash ).
If your application is going to use a server with socket.io enter a number port.

The first three questions are mandatory, the last if you don't type anything just doesn't add the server scaffolding.
After answering the initial questions, yeoman starts downloading every npm module and bower package needed. The resulting folder structure is similar to this:

	rootFolder
	|- gruntfile.js variuos tasks like watch, compass, cssmin and a couple of my own
	|- package.json 
	|- tareas
	|   |- polyconcat.js    assembles in one .hmtl file .css and .js files. These files are orquestred in gruntfile.js
	|   |- specAPoly.js     Takes a file.spec.js file and turns it into file.js for Polymer testing
	|- public
	    |- html
	    |   |- index.html
	    |   |- folderWithTheNameOfYourApp
	    |   |- various failes with skeleton of your component App
	    |- bower_components/	have Jquery and Polymer
	    |- bower.json

If you use [bracket editor](http:brackets.io) select your index.html and start live editing. Optionally You'd like to install XUnit extension.

When you type a number port, it's added various files like an app.js where is the logic to initiate the server. Yeoman downloads Express and Socket.io modules and It's added on index.html some sample code for verify everithing went ok on the server.

To start the server on another terminal type: 'npm start' or 'node app.js', launch your browser and type 'localhost:YOUR_PORT'. You'll see some test text.

To start polymerizing, on another terminal window type 'grunt' and start editing your files on public/html/folderOfYourApp/. Once you finish for distribution, on your root folder you can type

	grunt build
    
and everything will be concatenated, minified, copied, cleaned on root/dist/ folder.

Here is an [introduction video](https://www.youtube.com/watch?v=KIhIpqE_hZA). I'm better writing but I think Its explained how to use the generator and my workflow.

### To create a Component

type 

```
$ yo nando-polymer:componente componentName
```

With it, you'll create a folder componentName/ with the files needed. You'll be asked with more questions:
Import this to another component (N))?	It's a Y/N question. If you type Y:
Type path to the other component:		You must type relative path to the other component

You can check on when importing components that it's added a link to the created one.

If you notice a file *.spec.html: this file is used to work in isolation on your component. You can pass objects, probe styles before adding it to your project. It conceived as a sandbox playground for testing your component alone.

### License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
-------------------------------------------------------
generator-nando-polymer
=======================

A Yeoman generator for an alternative Polymer workflow
