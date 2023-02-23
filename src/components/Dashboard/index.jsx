import { useEffect, useState } from 'react';
import translate from '../../Translation';
import Balance from './Balance';
import EditUserInfo from './EditUserInfo';
import { fetchUserData, handleSaveUserData } from './handlers';

import './style.css';
import UserInfo from './UserInfo';
const t = translate;

const Dashboard = ({ token }) => {
	const [user, setUser] = useState({});
	const [edit, setEdit] = useState(false);
	const [showBalance, setShowBalance] = useState(false);

	useEffect(() => {
		fetchUserData(setUser, token);
	}, []);

	let render = <></>;
	if (showBalance) {
		render = <Balance balance={user.balance} />;
	} else {
		render = edit ? (
			<EditUserInfo user={user} setUser={setUser} />
		) : (
			<UserInfo user={user} />
		);
	}
	return (
		<div className='dashboard'>
			<img className='dashboard__avatar' src={user.picture} />
			<div className='dashboard__actions'>
				<button
					onClick={setShowBalance.bind(null, !showBalance)}
					disabled={edit}>
					{showBalance ? t('DASHBOARD') : t('BALANCE')}
				</button>
				<button
					disabled={showBalance}
					onClick={
						edit
							? handleSaveUserData.bind(null, token, user, setEdit)
							: setEdit.bind(null, !edit)
					}>
					{edit ? t('SAVE') : t('EDIT')}
				</button>
			</div>
			{render}
		</div>
	);
};

export default Dashboard;
