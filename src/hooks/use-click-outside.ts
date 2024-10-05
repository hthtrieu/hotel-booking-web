import { useEffect } from "react";

function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: (event: MouseEvent | TouchEvent) => void) {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            // Check if the reference exists and if the clicked target is inside the element
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
}

export default useOnClickOutside;
