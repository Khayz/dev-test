import jwt from 'jsonwebtoken';

export const createJWT = (user) => {
	const token = jwt.sign(user, 'cookies');
	return token;
};

export const protect = (req, res, next) => {
	const bearer = req.headers.authorization;
	if (!bearer) {
		req.status = 401;
		next();
	}

	const [, token] = bearer.split(' ');

	if (!token) {
		req.status = 401;
		next();
	}

	try {
		const user = jwt.verify(token, 'cookies');
		req.user = user;
		next();
	} catch (error) {
		req.status = 401;
		next();
	}
};
