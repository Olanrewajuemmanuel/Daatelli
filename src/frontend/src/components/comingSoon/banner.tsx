/**
 * Use on pages to inform users that a feature is under development
 */
function ComingSoonBanner() {
    return <div className="alert alert-warning text-slate-800 bg-yellow-200 my-5 flex items-center justify-center w-full lg:w-1/2 mx-auto">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span className="text-sm">Feature is under development</span>
    </div>
}

export default ComingSoonBanner;