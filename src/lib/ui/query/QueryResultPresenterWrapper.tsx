import {ErrorStateWrapper} from "../../states";
import {LoadingStateWrapper} from "../../states/LoadingStateWrapper";
import {QueryResultPresenter, QueryResultPresenterProps} from "./QueryResultPresenter";

type Props<T> = Pick<QueryResultPresenterProps<T>, 'result' | 'success'> &
    Partial<Pick<QueryResultPresenterProps<T>, 'error' | 'loading' | 'empty'>>;

export function QueryResultPresenterWrapper<T>({
                                                   result,
                                                   success,
                                                   error: error = () => <ErrorStateWrapper/>,
                                                   loading = () => <LoadingStateWrapper/>,
                                                   empty = () => <></>,
                                               }: Props<T>) {
    return (
        <QueryResultPresenter
            result={result}
            success={success}
            error={error}
            empty={empty}
            loading={loading}
        />
    );
}
