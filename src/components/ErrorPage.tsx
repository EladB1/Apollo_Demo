import { ErrorProps } from '../interfaces/ErrorProps';

const ErrorPage = (props: ErrorProps) => {
    return (
        <div className="container-fluid">
            <div className="row text-center h-100">
                <h1 className="display-1 text-danger ">{props.statusCode}</h1>
                <p>{props.message}</p>
            </div>
        </div>
    );
};

export default ErrorPage;