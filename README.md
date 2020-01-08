[![Build Status](https://travis-ci.org/EasyAgreementProject/EasyAgreement.svg?branch=master)](https://travis-ci.org/EasyAgreementProject/EasyAgreement)
[![Coverage Status](https://coveralls.io/repos/github/EasyAgreementProject/EasyAgreement/badge.svg?branch=master)](https://coveralls.io/github/EasyAgreementProject/EasyAgreement?branch=master)
[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

# EasyAgreement
This project is a meant as a platform for simplify the communication process between student, academic tutor and external tutor concerning the compilation and acceptance of Learning Agreement document.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See 
deployment for notes on how to deploy the project on a live system.


### Prerequisites
First of all, you will need a machine running Ubuntu.

What things you need to install the software and how to install them

*	Download and install ‘MongoDB’ database software from here: https://bit.ly/2sOVMn8

*	Optional - Download and install ‘MongoDB Compass’ Mongo graphical interface from here: https://bit.ly/2PM0fzG

* If necessary, install curl with the following command: `sudo apt install curl`

*	Download and install ‘Node.js' with the following commands:
```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

*	We suggest download of 'Visual Studio Code' IDE from here: https://bit.ly/34MfLQm


### Installing

A step by step series that tell you how to get a development env running

#### Clone EasyAgreement project ####

1. Open your terminal

2. If necessary, execute the following command: `sudo apt install git`

3. Execute the following command: `git clone https://github.com/EasyAgreementProject/EasyAgreement.git`


#### MongoDB database creation: ####

1.	Open your terminal.

2.	Go into directory ‘EasyAgreement’.

3.	Execute the following command: `source installdb.sh`


#### Pdftk install: ####
1.	`sudo add-apt-repository ppa:malteworld/ppa`

2.	`sudo apt update`

3.	`sudo apt install pdftk` 

#### Node.js server running: ####

1.	Go to your project cloned directory 'EasyAgreement’.

2.	Execute the following command: `node server.js`


#### Web addresses to launch the software and to control system: ####

*	Mongo Compass admin interface reachable through localhost:27017 address

* EasyAgreement start page reachable through web browser via localhost:8080 address


## Deployment
1.	Follow the installation instructions
2.	Go to localhost:8080

## Code Style: ##

1.	Go to your project cloned directory 'EasyAgreement’

2.	`npm install standard --save-dev`

3.	`npm install -g npx`

4.	`npx standard pathFile`, if you want automatically format code run `npx standard pathFile --fix`

It's possible run complex path expressions, see to: https://github.com/standard/standard

## Authors

Project manager: 
* **Domenico Marino** - *EasyAgreement* - [DomenicoM92](https://github.com/DomenicoM92)
* **Francesco Califano** - *EasyAgreement* - [FranCali](https://github.com/FranCali)

Team Members:
* **Alessio Ambruoso** - *EasyAgreement* - [aleambruoso](https://github.com/aleambruoso)
* **Armando Soddisfatto** - *EasyAgreement* - [asoddix](https://github.com/asoddix)
* **Luigi Pasetti** - *EasyAgreement* - [F0xd1e](https://github.com/F0xd1e)
* **Marco Borrelli** - *EasyAgreement* - [marcol8b](https://github.com/marcol8b)
* **Marco Ciano** - *EasyAgreement* - [marcociano](https://github.com/marcociano)
* **Roberto Veneruso** - *EasyAgreement* - [rveneruso](https://github.com/rveneruso)
* **Salvatore Amideo** - *EasyAgreement* - [Salvo1108](https://github.com/Salvo1108)
* **Veronica Volpicelli** - *EasyAgreement* - [Chouch0](https://github.com/Chouch0)


## License

This project is totally open source and free to use.
