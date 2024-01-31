# Movie/TV show Recommendations


## Description of Deliverable


### Elevator Pitch

With all the new streaming services offered on the internet, trying to find good Movies and TV Shows is an extremely long and difficult process. The ***Movie Recommendation application*** allows users to login, select movies they have watched in the past, rate the movies, recieve a list of Movies and TV shows recommended for them, and provide a link **straight to the streaming service** that is showing that piece of media. Once a user has made their initial ratings of movies, they can continue to add to their watched Movies and TV/shows list so that they can recieve better recommendations. Users can also add movies to their watchlist so they can store which movies they may be interested in and view the media later. 


### Website Rough Sketch

![Website Sketch](https://github.com/AldenKim/startup/blob/main/MovieWebsite.JPG)


### Key Features

- Secure login to ensure user security (HTTPS)
- User ability to select movies they have watched before
- User ability to rate movies to recieve personalized Movie/TV show recommendations
- Provide direct links to streaming services that offer the Movie/TV show
- Ability to add movies to a watchlist for future streaming
- Ability to mark a movie as watched from watchlist to ensure more recommendations
- Display of recommended Movies/TV shows in different categories
- Persistent storage of user data
- Ability to search for title of media
- Administrative features monitoring and editing user data and questions for user ratings
- Implementation of a recommendation algorithm


### Technologies And How They Will Be Used
- **HTML**: Good structure for HTML website. Multiple different HTML pages (login, picking movies already watched, recommendation list, etc.). Hyperlink usage for different streaming services.
- **CSS**: Good styling for the best user experience. Use of colors to emphasize certain parts of the page. Good practices of whitespace and responsive design.
- **JavaScript**: Will provide ***Authentication***. Provides users with prompts to login or create an account, displays user info back, applies recommendations based on user input, and makes backend calls for data retrieval and making updates.
- **Backend Service**: Endpoints for logging in, retrieving user input of Movies/TV shows, handle user input of ratings, and manages user watchlist.
- ***Database data***: Stores profiles, Movie/TV show ratings and watchlist. Ensures all user data is store securely. Movies that are shown to users are pulled from the database.
- ***WebSocket***: Realtime updates that users make to their profile, watchlist, movie list, and ratings. Realtime data of movies recommended for the user. Potential notification system so users can recieve updates on movies, TV shows, application updates, and other recommendations they may like.
- **React**: Use the React framework for this website. Will provide a better and more interactive interface which will overall give a boost to the user experience on the website.



## HTML Deliverable
- Cloned HTML simon repository and deployed it with deployment script so it is available with `simon` sub domain (https://simon.mymovierecommendations.click/)
- Links to GitHub on application front page and others.
- ***HTML Pages***: HTML Pages for each component of Movie Recommendation startup
- ***HTML Tags***: Good use of HTML tags including BODY, NAV, MAIN, HEADER, FOOTER
- ***Links***: Links between all pages (index, ratings, recommendations, about, watchlist)
- ***Textual Content***: Application textual content added throughout.
- ***3rd Party Service***: Placeholders for 3rd party service calls such as pulling from news sources and informations form streaming services.
- ***Images***: Applications images added throughout.
- ***Logging in***: Placeholders for logging in and username display after login on the ratings page.
- ***Database***: Database data placeholders in multiple pages including watchlist, movie recommendation list, movies rate list, etc.
- ***Websocket***: Websocket data placeholders in multiple pages added, including checking who is online, see who is ratings, and other people's ratings.



## CSS Deliverable
- Clones CSS simon repository and deployed it with deployment script so it is available with `simon` sub domain (https://simon.mymovierecommendations.click/)
