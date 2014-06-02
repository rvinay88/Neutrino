'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var NeutrinoGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Neutrino generator!'));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  app: function () {
    // Sass architecture
    var atoms = ["grids", "type", "colors", "helpers"];
      var helpers = ["functions", "mixins", "utilities"];

    var molecules = ["headings", "dividers","links","tables", "forms", "buttons", "lists", "media", "progress", "labels", "badges", "wells", "dropdowns", "tooltips", ];
        var files = ["variables","mixins","extends"];

    var organisms = ["alerts", "button-groups", "breadcrumbs", "pagination", "tabs", "media-object"];
    var templates = ["header", "footer", "navigation", "article", "sidenav", "toolbar", "search"];
    var pages     = ["dashboard", "user-settings"];

    this.mkdir('stylesheets');
    this.mkdir('scripts');
    this.mkdir('markup');
    this.mkdir('images');
    this.mkdir('scss');

    //Generate manifest SCSS file
    this.copy('style.scss', 'style.scss');

    // Generate atoms
    this.copy('_globals.scss', 'scss/atoms/_globals.scss');
    for(var i = 0; i < atoms.length; i++) {
      this.mkdir('scss/atoms/'+atoms[i]);
      if(atoms[i]!='helpers') {
        this.copy('_empty.scss', 'scss/atoms/'+atoms[i]+'/_'+atoms[i]+'.scss');
      }
    }

    //Generate atom helpers
    for(var i = 0; i < helpers.length; i++) {
      this.mkdir('scss/atoms/helpers/'+helpers[i]);
      this.copy('_empty.scss', 'scss/atoms/helpers/'+helpers[i]+'/_'+helpers[i]+'.scss');
    }

    //Generate molecules and internal files
    for(var i = 0; i < molecules.length; i++) {
      this.mkdir('scss/molecules/'+molecules[i]);
      this.copy('_variables.scss','scss/molecules/'+molecules[i]+'/_variables.scss');
      this.copy('_mixins.scss','scss/molecules/'+molecules[i]+'/_mixins.scss');
      this.copy('_extends.scss','scss/molecules/'+molecules[i]+'/_extends.scss');
      this.copy('_template.scss','scss/molecules/'+molecules[i]+'/_'+molecules[i]+'.scss');
    }

    //Generate Organisms and internal files
    for(var i = 0; i < organisms.length; i++) {
      this.mkdir('scss/organisms/'+organisms[i]);
      this.copy('_empty.scss', 'scss/organisms/'+organisms[i]+'/_'+organisms[i]+'.scss');
    }

    //Generate templates

    for(var i = 0; i < templates.length; i++) {
      this.mkdir('scss/templates/'+templates[i]);
      this.copy('_empty.scss', 'scss/templates/'+templates[i]+'/_'+templates[i]+'.scss');
    }

    // Generating Pages

    for(var i = 0; i < pages.length; i++) {
      this.mkdir('scss/pages/'+pages[i]);
      this.copy('_empty.scss', 'scss/pages/'+pages[i]+'/_'+pages[i]+'.scss');
    }

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = NeutrinoGenerator;
