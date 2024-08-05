import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error: any = useRouteError();
    console.log(error);


    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <div>
                <h3>{error.status}</h3>
                <i>{error.statusText && error.statusText === 'Not Found' ? 'This page could not be found' : error.message || error.statusText}</i>
            </div>
            <p>Return <Link to="/">home</Link></p>
        </div>
    );
}