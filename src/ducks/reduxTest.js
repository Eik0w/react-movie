const SUCCESS = 'REQUEST_SUCCESS';
const FAILURE = 'REQUEST_FAILURE';
const PENDING = 'REQUEST_PENDING';

const initialState = {
	request: {},
};

function reducer(state = initialState, payload) {
	let i = 0;
	switch (payload.type) {
		case SUCCESS:
			return {
				...state,
				request: {
					status: 'SUCCESS',
				},
			};
		case FAILURE:
			return {
				...state,
				request: {
					status: 'FAILURE',
				},
			};
		case PENDING:
			return {
				...state,
				request: {
					status: 'PENDING',
				},
			};
		default:
			return state;
	}
}

function action(id) {
	return {
		type: PENDING,
		payload: {
			id,
		},
	};
}

function acionThunk(url) {
	return (dispatch, getState, extraArguments) => {
		dispatch();
	};
}
