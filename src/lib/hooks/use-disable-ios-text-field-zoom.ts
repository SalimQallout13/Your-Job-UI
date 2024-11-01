import { useEffect } from "react";

// Hook for disabling the zoom on iOS text fields
export const useDisableIosTextFieldZoom = () => {

	useEffect(() => {
		if (checkIsIOS()) {
			disableIosTextFieldZoom();
		}
	}, []);

	// Fonction for disabling the zoom on iOS text fields
	const disableIosTextFieldZoom = (): void => {
		const el = document.querySelector('meta[name=viewport]');

		if (el !== null) {
			let content: string | null = el.getAttribute('content');
			const re = /maximum-scale=[0-9.]+/g;

			if (content && re.test(content)) {
				content = content.replace(re, 'maximum-scale=1.0');
			} else if (content) {
				content = [content, 'maximum-scale=1.0'].join(', ');
			}

			el.setAttribute('content', content || '');
		}
	};

	// Fonction for checking if the device is iOS
	// https://stackoverflow.com/questions/9038625/detect-if-device-is-ios/9039885#9039885
	const checkIsIOS = (): boolean => {
		// @ts-expect-error ts-migrate(2531)
		return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	};

};
