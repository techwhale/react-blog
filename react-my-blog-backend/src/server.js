import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const articlesInfo = {
  'learn-react': {
    name: 'learn-react',
    upvotes: 0,
    comments: []
  },
  'learn-node': {
    name: 'learn-node',
    upvotes: 0,
    comments: []
  },
  'my-thoughts-on-resumes': {
    name: 'my-thoughts-on-resumes',
    upvotes: 0,
    comments: []
  }
}
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/build')))

app.get('/api/articles/:name', (req, res) => {
  const articleName = req.params.name;
  res.status(200).send(articlesInfo[articleName]);
});

app.post('/api/articles/:name/upvote', (req,res) => {
  const articleName = req.params.name;
  articlesInfo[articleName].upvotes += 1;
  res.status(200).send(articlesInfo[articleName]);
});

app.post('/api/articles/:name/comment', (req,res) => {
  const articleName = req.params.name;
  const {username, text} = req.body;
  articlesInfo[articleName].comments.push({username, text});
  res.status(200).send(articlesInfo[articleName]);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});
// app.get('/hello', (req,res) => res.send('Hello!'));
// app.post('/hello', (req,res) => res.send(`Hello ${req.body.name}!`));
app.listen(8000, () => console.log('Listening on port 8000'));
