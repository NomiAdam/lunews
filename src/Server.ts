import dotenv from 'dotenv';
dotenv.config();

import App from './App';

const PORT: number = parseInt(<string>process.env.PORT) || 3333;
App.bootstrap().app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
