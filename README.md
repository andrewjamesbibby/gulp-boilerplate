# gulp-boilerplate
Basic starting point for using gulp


Basic instructions to work with these files:

1/ Clone this repo to local machine ``` https://github.com/andrewjamesbibby/gulp-boilerplate.git  ``` 
2/ Install all node modules ``` npm install ```
3/ Build distribution files ``` gulp build ``` This will combine all css/js into single files and cache bust, and move all files to a newly created 'dist' folder. This folder holds the production files.
4/ To develop the files further, make changes in the 'src' folder and when ready run ``` gulp build ``` again for a new build.
5/ In development run ``` gulp watch ``` to compile any scss and activate browser live reload on the fly.

