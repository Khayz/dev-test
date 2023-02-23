import translate from './index';
import { describe, test } from 'vitest';
describe('Translation Function', () => {
	test('Should translate string correctly', () => {
		expect(translate('USERNAME')).toBe('Username');
	});

	test('Should not translate if string is not added at the list', () => {
		expect(translate('NOT_IN_THE_LIST')).toBe('NOT_IN_THE_LIST');
	});
});
