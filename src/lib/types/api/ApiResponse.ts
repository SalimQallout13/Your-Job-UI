interface IApiResponseSuccess<T> {
	status: 'success';
	data: T;
}

interface IApiResponseError {
	status: 'error';
	error: string;
}

export type ApiResponse<T> = IApiResponseSuccess<T> | IApiResponseError;