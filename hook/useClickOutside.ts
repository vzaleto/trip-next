import { useEffect } from "react";

// export function useClickOutside(ref: React.RefObject<HTMLElement>, callback: () => void) {
//     useEffect(() => {
//         const handler = (e: MouseEvent) => {
//             if (!ref.current?.contains(e.target as Node)) {
//                 callback();
//             }
//         };
//         document.addEventListener("click", handler);
//         return () => document.removeEventListener("click", handler);
//     }, [ref, callback]);
// }

export function useClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                handler();
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [ref, handler]);
}