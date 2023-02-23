import strings from './strings';

export default function translate(string) {
	return string in strings ? strings[string] : string;
}
