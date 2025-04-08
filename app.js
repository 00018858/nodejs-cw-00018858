const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

global.mock_db = path.join(__dirname, './data/mock_db.json')

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use('/css', express.static('public/css'))
app.use('/js', express.static('public/js'))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const filePath = path.join(__dirname, 'data', 'reviews.json');
let reviews = [];
if (fs.existsSync(filePath)) {
  const data = fs.readFileSync(filePath);
  reviews = JSON.parse(data);
}

// Displaying all reviews
app.get('/review', (req, res) => {
  res.render('review/index', { title: 'Book Reviews', reviews });
});

// Form for creating a new review
app.get('/review/create', (req, res) => {
  res.render('review/create_update', { title: 'Add New Review' });
});

// Submision of a new review
app.post('/review/create', (req, res) => {
  const { title, author, genre, rating, insight } = req.body;
  const newReview = {
    id: reviews.length + 1,
    title,
    author,
    genre,
    rating,
    insight
  };
  // Adding a new reiew to the array
  reviews.push(newReview);
  fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2));
  res.redirect('/review');
});

// Form for updating the review
app.get('/review/update/:id', (req, res) => {
  // Finding it by its ID
  const review = reviews.find(r => r.id == req.params.id);
  if (review) {
    res.render('review/create_update', { title: 'Edit Review', review });
  } else {
    // Sending a 404 if the review is not found
    res.status(404).send('Review not found');
  }
});

// Submittion of an updated review
app.post('/review/update/:id', (req, res) => {
  const { title, author, genre, rating, insight } = req.body;
  const rIndex = reviews.findIndex(r => r.id == req.params.id);
  if (rIndex !== -1) {
    reviews[rIndex] = {
      // Update with new data
      id: parseInt(req.params.id),
      title,
      author,
      genre,
      rating,
      insight
    };
    // Adding an updated review to the list
    fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2));
    res.redirect('/review');
  } else {
    res.status(404).send('Review not found');
  }
});

// Deleting the review
app.get('/review/delete/:id', (req, res) => {
  reviews = reviews.filter(r => r.id != req.params.id);
  fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2));
  res.redirect('/review');
});

app.get('/', (req, res) => {
  res.redirect('/review');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
