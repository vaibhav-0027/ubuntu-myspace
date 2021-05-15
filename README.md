<h1>Ubuntu-MySpace</h1>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <!-- <li><a href="#usage">Usage</a></li> -->
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

{TO BE ADDED}

### Built With

The following technologies were used in creating this application:
* [React JS](https://reactjs.org)
* [Node JS](https://nodejs.org)
* [PostgreSQL](https://www.postgresql.org)
* [Express](http://expressjs.com/)
* [Reactstrap](https://reactstrap.github.io)
* [SASS](https://sass-lang.com/)

## Getting Started

These steps will help you setup this project in your device

## Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```
  
* postgres
  ```sh
  (For Linux)
  sudo apt install postgresql postgresql-contrib 
  ```

## Installation

1. Create a new postgres database called ```ubuntu-myspace``` in your device.
2. Create a new user if there is no already existing user in postgres.
3. For using ```File Explorer``` part of the application, 
	* Generate a set of [S3](https://s3.console.aws.amazon.com/s3/home) credentials
	* Create a public bucket named ```ubuntu-myspace```
4. Create a ```config.js``` file in server main directory.
5. ```
	const config = {
		"postgres": {
		  "username": "YOUR POSTGRES USERNAME",
		  "password": "YOUR POSTGRES PASSWORD FOR THAT USER",
		  "database": "ubuntu-myspace",
		  "host": "127.0.0.1",
		  "dialect": "postgres"
		},
		"host": "http://localhost:8080",
		"clientHost": "http://localhost:3000",
		"s3Credentials": {
		  "AWSAccessKeyId": "GET FROM AWS S3",
		  "AWSSecretKey": "GET FROM AWS S3"
		}
	};
	module.exports = config;
   ```
6. Open terminal 1, and execute following commands:
	```sh
	cd client
	npm i
	npm run start
	```
7. Open terminal 2, and execute following commands:
	```sh
	cd server
	npm i
	npm run dev
	```
	
<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- CONTACT -->
## Contact

Vaibhav - [@vaibhav-0027](https://www.linkedin.com/in/vaibhav-0027/) - vaibhavdhingra10@gmail.com

Project Link: [https://github.com/vaibhav-0027/ubuntu-myspace](https://github.com/vaibhav-0027/ubuntu-myspace)
