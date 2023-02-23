/**
 * @name handleInputValue
 * @description handle user value from inputs when the values are changing
 * @param {*} setUser
 * @param {*} user
 * @returns
 */
export const handleInputValue = (setUser, item) => (event) => {
	setUser((prevState) => {
		return {
			...prevState,
			[item]: event.target.value,
		};
	});
};

export const handleSaveUserData = async (token, data, setEdit) => {
	const name = `${data.first} ${data.last}`;

	delete data.first;
	delete data.last;

	const response = await fetch('http://localhost:3001/api/user', {
		method: 'PUT',
		headers: {
			authorization: `Bearer ${token}`,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		mode: 'cors',
		body: JSON.stringify({ ...data, name }),
	});

	setEdit(false);
	return await response.json();
};

export async function fetchUserData(setUser, token) {
	const response = await fetch('http://localhost:3001/api/user', {
		headers: {
			authorization: `Bearer ${token}`,
		},
		method: 'GET',
	});
	const data = await response.json();

	const { first, last } = data.name;
	delete data.name;
	setUser({ ...data, first, last });
}
