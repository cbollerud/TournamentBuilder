

Task:
Build a League Tournament Builder

## Technology:
Feel free to use nodejs frameworks, npm libraries.
Preference of DB: Any document based NoSQL DB, CouchDB preferred

## Requirements:

### Part 1 - Server Side APIs:
* Expose Public APIs to get the following info
  * List of upcoming games
  * List of past games
  * List of Teams
  * Team Info

### Part 2 - Server Side APIs:
* Expose Admin APIs to get the following info
  * only Admin can perform these operations and only through exposed APIs
  * Create/Update/Delete Tournament (soccerseasons)
  * Create/Update/Delete Games (fixtures)
  * Create/Update/Delete Teams (teams)

### Part 3 - Server Side Jobs
* Build a simple Server Side Batch Job to
  * Read and populate Barclays Premier League or any other league tournament info
  * feel free to use any available public data, or perform web scraping

Loaded SoccerSeason ID: 398, Premier League


## USAGE:
Update config.js to point to valid, running CouchDB instance.
Run "node loadPremierLeague.js" to create and populate DB instance
Note: This can be run anytime and will update and recreate missing data.
Run "node app.js" to start application.

* Upcoming Games:
  * http://localhost:8400/games/
* Past Games:
  * http://localhost:8400/games/past
* Teams:
  * http://localhost:8400/teams
* Team Detail:
  * http://localhost:8400/teams/<team id>

* Get token for admin calls:
  * http://localhost:8400/auth/token
  * Note: Use token on header of admin requests:
    * Authentication: Bearer \<token\>


## References
http://api.football-data.org/documentation


### Couch DB
http://localhost:5984/
http://localhost:5984/_utils/docs/

