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
Used to generate javadocs. Only works with JDK/JRE 8. So please install version 8.

```
java -version
```

If version is greater than 8, find the current versions and remove them

```
sudo apt list --installed | egrep -i `jre|jdk'
```
**Example**
```
sudo apt remove default-jre openjdk-11-jre default-jre-headless openjdk-11-jre-headless
sudo apt autoremove
```

Install version 8 with javadoc
```
sudo apt-get install openjdk-8-jdk
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
This is no `cmdtest`. Warning `apt install yarn` will not work.
```
npm install --global yarn
```

### `doxygen` ###
Used to generate documentation from C++ source code.

[Installing Doxygen](https://www.doxygen.nl/manual/install.html)
[Installing Doxybook2](https://github.com/matusnovak/doxybook2)

check to see if *doxygen* is installed
```
doxygen --version
```

Apt Install
```
sudo apt install doxygen
```

On ubuntu 22 it will prompt you to restart services. You should answer `<OK>` and restart the services.

### `doxybook2` ###
Used to make pretty html version from ugly doxygen XML.

[Binary Releases](https://github.com/matusnovak/doxybook2/releases)

Install locally, and make sure to update PATH to find it.
```
mkdir -p local
wget https://github.com/matusnovak/doxybook2/releases/download/v1.4.0/doxybook2-linux-amd64-v1.4.0.zip
cd local
unzip ../doxybook2-linux-amd64-v1.4.0.zip
cat << EOF >> ~/.bashrc
if [ -d ~/local/bin ]; then
        PATH=${PATH}:~/local/bin
        export PATH
fi
EOF
. ~/.bashrc
```

Test
```
doxybook2 -v
```

### `python3` ###
Need to make sure python 3.4 or better is installed. It is assumed the executable is named `python3`

## EOS Documentation Scripts ##
Clone the engineering repo.

```
git clone https://github.com/eosnetworkfoundation/docsgen
cd docsgen
```
Follow the instructions in the README.md to
* initialize
* generate documentation
* run services

### ShellCheck

Used to check syntax and find bugs. Git action calls this on every push.
You can add it to your editor.
`Installation IDE`
- [Visual Studio](https://marketplace.visualstudio.com/items?itemName=timonwong.shellcheck)
- [Atom](https://atom.io/packages/linter-shellcheck)
- [JetBrains](https://plugins.jetbrains.com/plugin/10195-shellcheck)
`Installation Command line`
- [Install](https://github.com/koalaman/shellcheck#installing)

Run it from the command line if you like
```
shellcheck scripts/install_leap.sh
```
