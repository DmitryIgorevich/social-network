import React from 'react';
import Spinner from '../spinner/spinner';

let withSuspense = (Component) => (props) => {
    return (
        <React.Suspense fallback={<Spinner />}>
            <Component {...props} />
        </React.Suspense>
    )
}
export default withSuspense;