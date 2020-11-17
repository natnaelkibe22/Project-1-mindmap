# Project-1-mindmap

`1. General`
1.1	Purpose
The purpose of this project is to create an interactable mind map web application. A mind map is a type of diagram that is used to organize information and ideas using a hierarchical system centered around a main topic. 

`1.2	Scope`
The scope of the project is to be a web application with a complete frontend user interface that connects to a backend interface that can save state of a user’s mind map session.

`1.3	Objectives`

- building a JavaScript front end interface for the mind map built upon this open source library: https://github.com/hizzgdev/jsmind.
- Build a functional back end that implements a REST API using node.js with the express framework.
- Connect server to a PostgreSQL database to maintain user data.
- Additional features to be added including:

- Zoom in/out
- Topic descriptors 


`2. Requirements`
`2.1	Functional requirements`
•	
- [ ] Front end user interface will display the user’s mind map and provide buttons through an on-screen menu for the user to select to input data. The mind map will be made up of a series of topics and relational lines that connect the topics.
- [ ] 
•	
- [ ] Application must support the ability for user to create or modify existing data from a database that will be used to maintain the state of the mind map. 
- [ ] •	Data will include Names/ID for topics, descriptors for topics, relations for topics and subtopics. The data will be stored in a PostgreSQL database.

`2.2	Usability and Non-Functional requirements`

•	
- [ ] The user must be presented with an interface that allows them to view their mind map and modify their mind map to either, add/delete topics, create/alter descriptors, and to move around topics/change relational lines.

- [ ] •	The application must accurately store user information into a database and save the correct state of the user’s mind map, the user must have the ability to access their own mind map in the exact same state where they previously left it.

- [ ] •	User will be able to access application on a web browser.
- [ ] •	User should not expect performance delays.

`2.3	Data Flow`

•- [ ] 	Data will be maintained using a PostgreSQL database.
- [ ] •	Data will be sent and received between the database and front end application with a backend REST API built using node.js with Express framework.

`3. System Models`
`3.1	Scenario`
Individual: User x
1.)	User starts browser and types URL of mind map web app
2.)	User’s mind map loads onto the page.
3.)	User modifies mind map.
4.)	User leaves page.
5.)	Later will returned to mind map in previous saved state.

`3.2	Use Cases`

•	User will be able to load the mind map, view the mind map, and modify the mind map


 


