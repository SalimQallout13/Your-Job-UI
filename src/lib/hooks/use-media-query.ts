import { useState, useEffect } from 'react';

// Définir un type pour les requêtes médias spécifiques
type MediaQueryType = 'desktop' | 'tablet' | 'mobile';

const mediaQueryMap: Record<MediaQueryType, string> = {
	desktop: '(min-width: 1024px)',
	tablet: '(min-width: 768px) and (max-width: 1023px)',
	mobile: '(max-width: 767px)',
};

export const useMediaQuery = (query: MediaQueryType) => {
	const mediaQuery = mediaQueryMap[query as MediaQueryType] || query;

	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const media = window.matchMedia(mediaQuery);
		if (media.matches !== matches) {
			setMatches(media.matches);
		}

		const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

		media.addEventListener('change', listener);
		return () => media.removeEventListener('change', listener);
	}, [matches, mediaQuery]);

	return matches;
};
