import { notFound } from 'next/navigation';

// This catch-all route will match any unmatched URLs under /utils/
// and trigger the not-found.tsx file
const UtilsCatchAll = () => {
	notFound();
};

export default UtilsCatchAll;
