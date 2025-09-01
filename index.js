const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connecté à MongoDB Atlas'))
.catch(err => console.error('Erreur de connexion MongoDB:', err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

const exerciseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);


app.post('/api/users/:_id/exercises', async (req, res) => {
  const { description, duration, date } = req.body;

  try {
    const user = await User.findById(req.params._id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const exercise = new Exercise({
      userId: user._id,
      description,
      duration: parseInt(duration),
      date: date ? new Date(date) : new Date()
    });

    await exercise.save();

    res.json({
      username: user.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString(),
      _id: user._id
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/users', async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    const newUser = new User({ username });
    await newUser.save();
    res.json({
      username: newUser.username,
      _id: newUser._id
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/api/users', async (req, res) => {
  try {

    const users = await User.find({}, 'username _id');
    res.json(users); 
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/api/users/:_id/logs', async (req, res) => {
  try {
    const { from, to, limit } = req.query;

    const user = await User.findById(req.params._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

   
    let exercises = await Exercise.find({ userId: user._id });

  
    if (from) {
      const fromDate = new Date(from);
      exercises = exercises.filter(e => e.date >= fromDate);
    }
    if (to) {
      const toDate = new Date(to);
      exercises = exercises.filter(e => e.date <= toDate);
    }

   
    if (limit) {
      exercises = exercises.slice(0, parseInt(limit));
    }

 
    const log = exercises.map(e => ({
      description: e.description,
      duration: e.duration,
      date: e.date.toDateString()
    }));

    res.json({
      username: user.username,
      count: log.length,
      _id: user._id,
      log
    });

  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});









const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
