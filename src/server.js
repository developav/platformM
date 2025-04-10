import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors()); // Разрешаем все источники

app.get('/image-proxy', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send('Отсутствует параметр "url"');
  }

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });

    res.set('Content-Type', response.headers['content-type']);
    res.set('Cache-Control', 'public, max-age=86400'); // кэш на 1 день
    res.send(response.data);
  } catch (error) {
    console.error('Ошибка прокси:', error.message);
    res.status(500).send('Не удалось загрузить изображение');
  }
});

app.listen(PORT, () => {
  console.log(`🟢 Прокси-сервер работает на http://localhost:${PORT}`);
});