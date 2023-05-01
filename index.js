const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/auth/login',require('./Routes/login'));
app.use('/auth/users',require('./Routes/login'));
app.use('/auth',require('./Routes/register'));
app.use('/api/doc',require('./Routes/upload'));
app.use('/api/users',require('./Routes/upload'));
app.use('/api/create',require('./Routes/Api'));
app.use('/api',require('./Routes/Api'));
app.use('/api/items',require('./Routes/Api'));
app.use('/api',require('./Routes/Api'));
app.use('/api',require('./Routes/Api'));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
