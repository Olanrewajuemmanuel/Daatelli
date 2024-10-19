import { ErrorResponse, Link, useRouteError } from "react-router-dom";
import MetaTags from "react-meta-tags";

export default function ErrorPage() {
    const error = useRouteError() as ErrorResponse;

    return (
        <>
            <MetaTags>
                <title>Daatelli | Error</title>
            </MetaTags>
            <div id="error-page" className="grid place-items-center mt-28 space-y-3 inter-body">
                <h1 className="text-2xl font-bold">Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <div>
                    <h3 className="text-center text-red-500 font-semibold">{error.status}</h3>
                    <i className="text-center">Message: {error.statusText && error.statusText === 'Not Found' ? 'This page could not be found' : error.statusText}</i>
                </div>
                <Link to="/">
                    <button className="btn bg-primary text-white">Return to Daatelli</button>
                </Link>
            </div>
        </>
    );
}