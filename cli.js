const { program } = require('commander')
const inquirer = require('inquirer')
const fs = require('fs')
const fsPromises = fs.promises;
const path = require('path')
const kebabCase = require('lodash.kebabcase');

const { getHTMLContent, getReadmeContent } = require("./src")

const experimentsPath = path.join(__dirname, 'experiments')

program
  .command('create')
  .action(async () => {
    const categories = fs.readdirSync(experimentsPath, { withFileTypes: true}).filter(f => f.isDirectory()).map(f => f.name)
    const answers = await inquirer.prompt([
        {
            type: 'list',
            message: 'Choose a category or create a new one:',
            name: 'category',
            choices: [...categories, 'New category'],
        },
        {
          type: 'input',
          message: 'What is the new category name?',
          name: 'newCategoryName',
          when: (hash => hash.category === 'New category'),
          validate: value => value ? true : 'You need to define the category name'
        },
        {
          type: 'input',
          message: 'What is the experiment name?',
          name: 'experimentName',
          validate: value => value ? true : 'You need to define the experiment name'
        },
        {
          type: 'input',
          message: 'What is the experiment description?',
          name: 'experimentDescription',
        }
    ])

    const {category, newCategoryName, experimentName, experimentDescription} = answers
    const categoryName = newCategoryName || category;

    if (newCategoryName) {
      /* Create category folder */
      fs.mkdirSync(path.join(experimentsPath, kebabCase(newCategoryName)))
    }

    const experimentPath = path.join(experimentsPath, kebabCase(categoryName), kebabCase(experimentName))

    /* Create experiment folder */
    fs.mkdirSync(experimentPath)

    /* Create images folder */
    const imagesPromise = fsPromises.mkdir(path.join(experimentPath, 'images'))
    /* Create index.html */
    const indexPromise = fsPromises.writeFile(path.join(experimentPath, 'index.html'), getHTMLContent({
      category: categoryName,
      experiment: experimentName,
    }))
    /* Create README.md */
    const readmePromise = fsPromises.writeFile(path.join(experimentPath, 'README.md'), getReadmeContent({
      category: categoryName,
      experiment: experimentName,
      description: experimentDescription,
    }))
    /* Create sketch.js */
    const sketchPromise = fsPromises.copyFile(path.join(__dirname, 'src', 'sketchBoilerplate.js'), path.join(experimentPath, 'sketch.js'))
    await Promise.all([imagesPromise, indexPromise, readmePromise, sketchPromise])
  })

program.parse(process.argv);