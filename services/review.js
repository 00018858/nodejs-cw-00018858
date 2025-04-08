const fs = require('fs');
const path = require('path');

if (!global.mock_db) {
  global.mock_db = path.join(__dirname, '../data', 'mock_db.json');
}

const reviews = require(global.mock_db);

const reviewService = {
  get() {
    return reviews;
  },

  getById(req) {
    const id = req.params.id;
    return reviews.find(item => item.id === id);
  },

  insert(req) {
    let new_id = genRandId(4);
    const body = req.body;
    const review = {
      title: body.title,
      author: body.author,
      genre: body.genre,
      rating: body.rating,
      insight: body.insight
    };

    reviews.push({
      id: new_id,
      review: review
    });
    writeToFile(reviews);

    return {
      id: new_id,
      review: review
    };
  },

  update(req) {
    const id = req.params.id;
    const index = reviews.findIndex(item => item.id === id);
    if (index === -1) return null;

    reviews[index].review = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      rating: req.body.rating,
      insight: req.body.insight
    };
    writeToFile(reviews);
    return reviews[index];
  },

  delete(req) {
    const id = req.params.id;
    const index = reviews.findIndex(item => item.id === id);
    if (index === -1) return false;
    reviews.splice(index, 1);
    writeToFile(reviews);
    return true;
  }
};

let writeToFile = async (reviews) => {
  await fs.writeFileSync(global.mock_db, JSON.stringify(reviews, null, 4), 'utf8');
};

let genRandId = (count) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < count; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports = reviewService;
