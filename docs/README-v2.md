# README for FUEL

This is the engine which will run FUEL packages.
It will run on node 18+.
It requires a local browser to handle its UI.

## Overview

This is captured better elsewhere, but this engine is a combination of:
- local web server
- global extension framework to allow for non-browser APIs
- package extension framework to allow for dynamic content
- packaging framework for bundling web content and extensions

The goal is too allow for portable applications built using web technologies that can use functionality beyond what the browser normally provides.

The engine code is all Javascript running on Node.
The extensions are all launched from Javascript running on Node.
The web content is run by launching in the local browser of your choice.

## Installation

Ultimately I will want to "install" this for the best user experience.
This wil involve:
- generating my cert chain
- installing my root cert
- creating a folder for installed packages
- ensuring proper rights are enabled for package folders
- updating the HOSTS file?

## Packaging

This should be super simple.

You simply give the packager:
- a folder containing web content (e.g. /my-web-app/*)
- the initial entry point for the web content (e.g. /my-web-app/index.html)

The packager should do the rest (with a little prompting)
- figuring out what files go in the package
- creating the manifest
- figuring out adminstrative details (who is the author, what is the license)
- zipping, signing, and possibly encrypting the package

## Running

You will generally follow on of these paths:
- Given a package you downloaded, run it as a guest. This will limit the extensions it can use and is temporary.
- Given a package you downloaded, install it to your machine. This gives access to all extensions.
- Run an existing installed package.

