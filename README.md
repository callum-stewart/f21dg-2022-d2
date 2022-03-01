# f21dg-2022-d2

Code for front-end web application required for D2 of F21DG 2022

# Project Setup Instructions

All code goes into the `src/` folder. 
Static assets such as CSS files, images, etc go into the `public` folder, and can be found at the `/public/<thing>` URL when loaded.
For example, if you put `hello.jpg` into `public/hello.jpg`, you will find on the server at `http://localhost:8080/public/hello.jpg`.

## `docker-compose` (Recommended Method)
In the project root, execute

```bash
docker-compose up -d
```

You can then monitor the webserver with

```bash
docker-compose logs -f
```

You can stop the webserver with
```bash
docker-compose down
```

## Docker

To build and run in Docker
```bash
docker build . -t webapp

docker run --rm -it -p8080:8080 webapp
```

## Manually

Make sure that you have at least Node 16 installed (the lightweight developement server for serving files requires it).
Make sure you have `npm` installed.

To install all of the packages
```bash
npm install
```

To build the project statically in `dist`.
```bash
npm run build
```

To run a lightweight development server that hosts the content on port 8080
```bash
npm start
```

# Unit testing
We're currently using the [Jest](https://jestjs.io/docs/getting-started) Unit Testing framework to test our Frontend JavaScript. Jest is dependent on the Babel package, which will be installed automaticall by npm; you shouldn't need to make any changes to it, however the config file is `.babelrc`.

Have a look at `fileIO.test.js` for an example of how to use Jest to test your code. 

When developing your Unit Tests, please follow these standards:
1. The filename of your Unit Test should be of the format: `classX.test.js`. i.e. `pyworker.test.js`... 
2. Try to keep things as decoupled as you can; if your class relies on multiple other smaller classes, write brief tests for those smaller classes in addition to the main class you're testing.
3. If you think of something crazy that could break your code, *write a test for it*. Incrementally check your hypothesis' and fix as you go, it'll make life easier in the long run. 
4. Don't import using `const classX = require(...);`. Use `import methodY from "../src/class.js";` instead. 

Once you've finished writing your Unit Tests, you can execute them via `npm test`. This command will run the entire test suite; this shouldn't take longer than a few seconds at most.

Any issues, reach out to Daniel and/or Sebastian (Testing Manager).

# Project TODOs

See Issues.

# D2 Brief

Delivered by two written reports (Design and Test Reports) software, and presentation.

- **Design Manual**: should include top-level design and sufficient documentation to allow modification and reuse by another group of students.
- **Test Report**: should contain sufficient evidence of unit testing and system validation for likely use cases.
- **Presentation**: a seminar style presentation of the project and a demonstration of the tool that you have developed. The seminar and demo should not last more than 30-minutes, excluding questions.

The date and time of the seminar is to be arranged. The seminar is expected to take place shortly after delivery of D2 reports and software. 

The marks for D2 will be distributed after receiving the 2 reports, presentation and software, but are expected to be 15% for each report and 20% for the demo and presentation.

# Uploads

- **Canvas Uploads**:  Design and User manuals and Test Report (as .pdf) including their GitLab logs. Zip of software including GitLab logs.
- **Application Demo**: including link to live application
- **GitLab Projects**: Software system, Design Manual and Test Report.

# Unknowns

A list of unknowns that need to be solved ASAP for implementation to take place.

- What kind of visualisation frameworks are we using?
	- What format is it expecting data to be in? We do not want our UI code performing marshaling, that is more appropriate for Pyodide Python code or the I/O layer JS code.
- Performance limitations
	- What kind of buffer sizes can Pydodie handle?
	- Can we implement streaming to increase the maximum data size that can be handled?
- Data format issues
	- How are we going to control what the time resolution of the graph will be? Will it be user controlled or will we specify what the time base should be?
	- What kind of data format are we expecting the user to use when uploading data?
	- What is the maximum size that we will allow users to upload in?
- Tech stack and testing
	- How are we going to test the Python code outside of JS? Can we dynamically insert Python into JS at runtime?
	- How are we going to test JS code, such as the I/O layer?
	- How are we going to test the visual graph output to ensure it is correct?
	- How are we going to host the static page? GitLab pages? (link to live app needs to be included)
	- How are we going to make it easy to run the code locally for development? Docker?

