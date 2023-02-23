export const errors = (err, req, res, next) => {
	if (err.type === 'auth') {
		res.status(401).json({ message: 'unauthorized' });
	} else if (err.type === 'input') {
		res.status(400).json({ message: 'invalid email or password' });
	} else {
		res.status(500).json({ message: 'network connection' });
	}
};
