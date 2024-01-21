import { useCallback } from 'react';

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0
}

export const useIntersection = (getItemsCallback: (page: number) => void) => {
const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
        if (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const page = Number((entry.target as HTMLElement).dataset.page);
                    getItemsCallback(page + 1);
                    observer.unobserve(entry.target);
                }
            });
        }
    }, []);

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    return { observer, observerCallback }
}

