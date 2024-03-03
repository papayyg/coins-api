const app = require('./app/app');
const config = require('./config/config');

const PORT = config.PORT || 3000;

app.listen(PORT, (error) => {
	error ? console.log(error) : console.log(`Listening port ${PORT}`);
});