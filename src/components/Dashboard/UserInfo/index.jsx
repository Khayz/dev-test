import translate from '../../../Translation';

const t = translate;
const UserInfo = ({ user }) => {
	return (
		<div className='user-info'>
			{Object.keys(user).map(
				(item) =>
					item !== 'balance' && (
						<h3 className='user-info__item' key={item}>{`${t(
							item.toUpperCase()
						)}: ${user[item]}`}</h3>
					)
			)}
		</div>
	);
};

export default UserInfo;
