/**
 * @name handleSubmit
 * @description make call to server to signin with credentials
 * if something went wrong, a error message will be show
 * @param {*} data
 * @returns
 */
export const handleSubmit = async (inputData, cb, cb2) => {
	try {
		const response = await fetch('http://localhost:3001/signin', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			mode: 'cors',
			body: JSON.stringify(inputData),
		});

		const data = await response.json();
		if ('message' in data) {
			return cb(data.message);
		}

		cb2(data.token);
	} catch (error) {
		cb('Error with auth, please try again');
	}
};

/**
 * @name handleInputChange
 * @description handle inputs value to set depending on which type it is.
 * @param {*} type
 * @param {*} cb
 * @returns
 */
export const handleInputChange = (type, cb) => (event) => {
	cb((prevValue) => ({ ...prevValue, [type]: event.target.value }));
};
