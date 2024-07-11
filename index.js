import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 3000;

// EJS ayarları
app.set('view engine', 'ejs');
app.set('views', './views');

// Statik dosyalar için dizin ayarları
app.use(express.static('public'));

// Ana sayfa route
app.get('/', async (req, res) => {
  const city = req.query.city;
  const apiKey = 'c03294b7544fb42200ffa8ddab19a585';

  if (!city) {
    return res.render('index', { weather: null, city: null });
  }

  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`);
    const weatherData = response.data;
    res.render('index', { weather: weatherData, city: city });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
