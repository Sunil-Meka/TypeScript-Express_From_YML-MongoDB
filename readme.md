This is a MicroService Project using openapi-generator-plus package to convert a yml file to typescript express code.

Procedure:

1- The OAS(OPEN API SPECIFICATION) are written in the yml file, here it is openapi.yml(the specs in yml are openapi 3.0.2 version)

2- Create a yarn project using command 'yarn init' inside the empty folder(this is project folder), this will create a package.json file in the specified project folder.

3- install these packages:
	 command 'yarn add openapi-generator-plus'
	 command 'yarn add @openapi-generator-plus/typescript-express-passport-server-generator'

4- write a config file to generate typescript code, here it is config.yml
	- this config file contains:
		- input of the yml
		- output folder need to be specified for typescipt code
		- generator need to be specified, which is @openapi-generator-plus/typescript-express-passport-server-generator

5- write the scripts in package.json:
	- "generate": "openapi-generator-plus -c config.yml"
	- "start": "nodemon src/index.ts"

6- the command 'yarn generate' will generate typecript code

7- the generator will generate only models,validations,structure,etc but not implementation code
	- the implementation code has to be written manually in typescript, here it is src/impl
	- in the implementation code we have to handle database management, here it is firestore from firebase

8- once the implementation code is completed, the project is ready to test and deploy

9- Test the endpoints(routes) locally, these routes are found in dist/api/{service}/index.ts
	- Swagger UI can be used for testing the API
	- To generate swagger UI, hit the {API}/api-docs in browser, here it is "http://localhost:8000/api-docs"

10- Now deploy the microservice in cloud(like GCP,AZURE,AWS,etc)
