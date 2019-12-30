# The Movie Database App!

This project was bootstrapped with [Create React App  (CFA)](https://github.com/facebook/create-react-app).

## Main Features
- On page load, a list of the most popular movies are shown
- Above the list of movies is a list of genres that the popular movies can be filtered by.  Only 6 filters are shown initially.  Clicking 'show all' will display all the genres TMDB supports.
- Clicking the genre checkboxes will filter the popular movies results.  Multiple genres can be selected to further filter the results.
- On the text box, you can search a movie and its search results will replace the list of popular movies shown
- Doing a search will hide the genres controls, as TMDB API does not support passing in genre ids in search endpoint
- Clicking on a movie will open a dialog that display more info about the movie.  Particularly, it shows the title, summary, a image, and up to 5 cast members
- The size of the image is dependent on the viewport of the browser. However, it will never be wider than 500px. My intent was to have a responsive design for the dialog and have the image only take up to 50% of the width, and leave the rest of the space to show text info about the movie

## Other Features
- created the TMDB API key as an .env variable
- cached API results in memory so the same results can be retreived from memory instead of making another request
- Used [Grayson bootstrap template](https://bootstrap.themes.guide/greyson/) to help me make decisions for styling and layout
- search query requests are debounced to avoid unnecessary hits to TMDB server
- Responsive design -- the list of filter and list of movies will render differently on various viewport widths. Breakpoints used: 402px, 768px, 992px, 1200px
- All components tested with React Testing Library
- Used `<picture>` html5 element to help render best movie images dependent on viewport width

### How to run locally

In the project directory, run:
```
yarn install
yarn start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br/>
Can also be viewed on project's [Github page](https://jcyl29.github.io/movie-database-app/)

### Tests
```
yarn test
```

### What was modified on top of the create react app project
#### Dependencies added
- classnames: utility function that abstracts away conditionals when inserting classnames to React components
- memory-cache: used to cache API requests
- dialog-polyfill: Added to play with the native `<dialog>` element.
- node-sass: Added for sass support

#### Dev dependencies added
- prop-types: wasn't included in original CFA config
- eslint and assorted plugins: linting javascript
- prettier: added to enforce coding stying to help autoformat code
- @testing-library/jest-dom, jest, @testing-library/react: for using React Test Library
- @react-mock/fetch, node-fetch: added to support mocking of fetch API requests
- gh-pages: publish app to Github pages