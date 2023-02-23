import translate from '../../../Translation';
import { handleInputValue } from '../handlers';

const t = translate;

const inputTypes = {
	picture: 'text',
	age: 'number',
	eyeColor: 'text',
	company: 'text',
	email: 'email',
	password: 'text',
	phone: 'tel',
	address: 'text',
	first: 'text',
	last: 'text',
};

const inputRequired = ['password', 'email', 'first', 'last'];

const EditUserInfo = ({ setUser, user }) => {
	return (
		<div className='edit-user'>
			{Object.keys(user).map(
				(item) =>
					item !== 'balance' && (
						<form className='edit-user__form' key={item}>
							<label>{t(item.toUpperCase())}:</label>
							<input
								required={inputRequired.some((input) => input === item)}
								type={inputTypes[item]}
								pattern={item === 'phone' ? '[0-9]{3}-[0-9]{3}-[0-9]{4}' : ''}
								className='user-info__item'
								value={user[item]}
								onChange={handleInputValue(setUser, item)}
								key={item}
							/>
						</form>
					)
			)}
		</div>
	);
};

export default EditUserInfo;
