# Rapido Theme Starter
This theme development setup is meant to speed up the process of theming Drupal sites. It uses Gulp, Jekyll and BrowserSync to have a live-reloading environment to develop a Drupal theme based on bootstrap.

## Local System Preparation for Theme Generation

To regenerate the theme, you'll need the following things installed on your local machine.

1. [Ruby](https://jekyllrb.com/docs/installation/) - Ruby and RubyGems
2. [Jekyll](http://jekyllrb.com/) - `$ gem install jekyll`
  - Used for local development to quickly show markup that will be used to apply theming to.
3. [NodeJS](http://nodejs.org) - use the installer on the site.
  - Used to install dependencies for Gulp.
4. [GulpJS](https://github.com/gulpjs/gulp) - `$ npm install -g gulp` (mac users may need sudo) and `$ npm install gulp -D`
  - Used to generate the sass to css and process js files
5. [Install Drupal Bootstrap](https://www.drupal.org/project/bootstrap) since these theme files are a subtheme of bootstrap.

## Local Installation

1. Inside this directory, run `npm install`. This will read the projects package.json and install all the dependencies gulp needs.

# Usage

## Default Gulp Workflow

Run the following command to launch BrowserSync and watch files for changes and triggering tasks to rebuild the themes assets.
- `gulp`

## index.html
Once BrowserSync is running you can start moifying sass and the index.html file to develop patterns. Copy and Paste Drupal markup from something like a view into the index.html then theme it. Then final adjustments can be done in Drupal directly.
