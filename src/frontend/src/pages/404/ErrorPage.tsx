import { ErrorResponse, Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError() as ErrorResponse;

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <div>
                <h3>{error.status}</h3>
                <i>{error.statusText && error.statusText === 'Not Found' ? 'This page could not be found' : error.statusText}</i>
            </div>
            <p>Return <Link to="/">home</Link></p>
        </div>
    );
}