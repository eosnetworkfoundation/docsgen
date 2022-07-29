# Software Installation #

What to install to setup the documentation generation.
* Software requirements
* Links to instructions on how to install software
* Scripts and Instructions for initial setup of web document content

## Prep ##

sync for latest updates and patches
```
sudo apt update
```

## Webserver ##
Apache is used to serve static files. Docusaurus' `yarn build` will produce static files in a directy named `build`. Move these files to your web root directory to serve the files.

## Docusaurus ##
This is installed by the `initialize_repository.sh` script. The script runs this installation because the docusarus install creates a directy structure.

## Software ##
### `Redocly` ###
Used to generate HTML from yaml files

Nothing to install this is done via Javascript loaded from a CDN.

### `javadoc` ###
Used to generate javadocs. Find avalible versions

```
java -version
sudo apt install default-jre
```

### `node & npm` ###
Used to general markdown from typescript documentation or openapi

Check to see if npm is installed
```
npx --version
```

Instructions on downloading and installing node and npm
[Setup Node and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
Or just apt install

```
sudo apt install npm
```

On ubuntu 22 it will prompt you to restart services. You should answer `<OK>` and restart the services.

Make sure you have the correct version of **node**. Check [Doc6s requirements](https://docusaurus.io/docs/installation).
```
node -v
```

Here are the steps to upgrading node
```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

The path for node may have changed so exit you shell and log back in to check the version .


### `yarn` ###
This is no `cmdtest`. So a default `apt install yarn` will not work.
```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update
sudo apt-get install yarn -y
```

### `doxygen` ###
Used to generate documentation from C++ source code.

[Installing Doxygen](https://www.doxygen.nl/manual/install.html)

check to see if *doxygen* is installed
```
doxygen --version
```

Apt Install
```
sudo apt install doxygen
```

On ubuntu 22 it will prompt you to restart services. You should answer `<OK>` and restart the services.

### `python3` ###
Need to make sure python 3.4 or better is installed. It is assumed the executable is named `python3`

## EOS Documentation Scripts ##
Clone the engineering repo and go into the developer documentation section.

```
git clone https://github.com/eosnetworkfoundation/engineering
cd engineering/developer_documentation
```
Follow the instructions in the README.md to
* initialize
* generate documentation
* run services
