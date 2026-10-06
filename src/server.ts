import { createApp } from './app.ts';

const PORT = 8000;
const HOST = 'localhost';

const app = createApp();

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});