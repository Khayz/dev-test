import { createJWT } from '../modules/auth.js';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

// File path
const __dirname = dirname(fileURLToPath(import.meta.url)).replace(
	'\\api\\handlers',
	'\\data'
);
const file = join(__dirname, 'users.json');

// Configure lowdb to write to JSONFile
const adapter = new JSONFile(file);
const db = new Low(adapter);
await db.read();
db.data ||= { users: [] };

/**
 * @name updateUser
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const updateUser = async (req, res, next) => {
	if (req.statusCode === 401) {
		next({ type: 'auth' });
	}

	let { users } = await db.data;

	db.data.users = await users.map((user) =>
		req.user.email === user.email ? { ...user, ...req.body } : user
	);

	await db.write();

	const user = await findUser(req.user.email);
	res.json(user[0]);
};

/**
 * @name Signin
 * @param {*} req
 * @param {*} res
 * @param {function} next
 */
export const signin = async (req, res, next) => {
	const user = await findUser(req.body.email);
	console.log({ user, b: req.body });
	const isValid = user.length > 0 && req.body.password === user[0].password;
	if (!isValid) {
		const error = { type: 'input' };
		return next(error);
	}

	const { email, guid } = user[0];
	const token = createJWT({ email, guid });
	res.json({ token });
};

/**
 * @name findUser
 * @param {*} email
 * @returns
 */
async function findUser(email) {
	const { users } = await db.data;
	return users.filter((user) => user.email === email);
}

/**
 * @name getUser
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const getUser = async (req, res, next) => {
	if (req.statusCode === 401) {
		next({ type: 'auth' });
	}

	const user = await findUser(req.user.email);
	delete user[0]._id;
	delete user[0].guid;
	delete user[0].isActive;
	res.json(user[0]);
};
