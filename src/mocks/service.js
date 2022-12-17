const express = require('express');
const glob = require('glob');
const cors = require('cors');

const corsWhitelist = ['http://192.168.2.38:9000', 'http://localhost:9000'];

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (corsWhitelist.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not '
        + 'allow access from the specified Origin.';

      return callback(new Error(msg), false);
    }

    return callback(null, true);
  },
}));

const wait = (value) => new Promise((resolve) => {
  setTimeout(() => resolve(true), value);
});

glob('src/mocks/**/*.mjs', (err, mocks) => {
  mocks.forEach(async (file) => {
    const projectRoot = __dirname.split('src/mocks')[0];
    const fileData = await import(`${projectRoot}${file}`);
    const data = fileData.default;

    app[data.type.toLowerCase()](data.url, async (req, res) => {
      await wait(data.wait);
      res.status(data.status).send(data.response);
    });
  });

  app.listen(10500, () => console.log('Mock server running at 10500'));
});
