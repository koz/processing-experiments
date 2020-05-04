const startCase = require('lodash.startcase');

const defaultVersion = 'v1.0'

const getHTMLContent = ({category, experiment, version}) => `
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8" />
    <title>${startCase(category)} - ${startCase(experiment)}</title>
    <meta name="description" content="" />
    <meta id="version" content="${version || defaultVersion}" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <script src="../../../p5.js"></script>
    <script src="../../../lodash.js"></script>
    <script src="../../../saveCanvas.js"></script>
    <script src="sketch.js"></script>
  </head>
  <body></body>
</html>
`

const getReadmeContent = ({category, experiment, version, description}) => `
# ${startCase(category)}
## ${startCase(experiment)}
${description || ''}

### ${version || defaultVersion}
Initial approach.
`

module.exports = {
  getHTMLContent,
  getReadmeContent
}