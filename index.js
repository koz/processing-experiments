const { program } = require('commander')
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

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
        }
    ])

    const {category, newCategoryName, experimentName} = answers
    const categoryName = newCategoryName || category;

    if (newCategoryName) {
      /* Create category folder */
      fs.mkdirSync(path.join(experimentsPath, newCategoryName))
    }

    /* Create experiment folder */
    fs.mkdirSync(path.join(experimentsPath, categoryName, experimentName))
  })

program.parse(process.argv);