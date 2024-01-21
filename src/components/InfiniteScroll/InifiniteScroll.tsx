import { memo, useEffect, useCallback, useReducer, Reducer } from 'react'
import { useIntersection } from '../../hooks/useIntersection';
import { isRandomUser } from '../../models/User';

export interface InifiniteScrollProps<T> {
    getItems: (page: number) => Promise<T>
}

type InfiniteScrollComponentType = <T>(p: InifiniteScrollProps<T>) => React.ReactElement<InifiniteScrollProps<T>>;

interface InfiniteScrollComponentState {
    items: Record<number, any[]>;
    isFetching: boolean;
    lastPage: number;
}

const InfiniteScrollComponent: InfiniteScrollComponentType = ({ getItems }) => {
    const [state, setState] = useReducer<Reducer<InfiniteScrollComponentState, Partial<InfiniteScrollComponentState>>>(
        (state, newState) => ({...state, ...newState}),
        {items: {}, isFetching: false, lastPage: 0}
    )

    const getItemsOnIntersection = useCallback((p: number) => {
        if(state.isFetching || state.lastPage === p) return;
        setState({isFetching: true, lastPage: p});
    }, [getItems, state.lastPage]);

    const { observer } = useIntersection(getItemsOnIntersection);

    useEffect(() => {
        getItemsOnIntersection(1)
        setState({lastPage: 1})
    }, []);

    useEffect(() => {
        (async () => {
            await getItems(state.lastPage)
            .then((r) => {
                if(isRandomUser(r)) {
                    const newData = {[state.lastPage]: [...r.results]}
                    const newItemsMap = Object.assign(state.items, newData);
                    setState({items: newItemsMap, isFetching: false})
    
                    // update observer targets
                    setTimeout(() => {
                        const observerEntries = document.querySelectorAll('.observer-trigger');
                        observerEntries.forEach((i) => {
                            if (i) {
                                observer.observe(i);
                            }
                        })
                    }, 500)
                } 
            })
        })();
    }, [state.lastPage])

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {Object.entries(state.items).map(([k, elements]) => {
                return (
                <div key={k} 
                    style={{
                        width: '400px',
                        margin: '5px 00pxauto 0',
                        padding: 0
                    }}
                >
                    {elements.map((e, i) => (
                        <div 
                        key={e.email} 
                        className={i === elements.length - 1 ?'observer-trigger' : ''}
                        data-page={k}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid gray',
                            borderRadius: '5px',
                            margin: '5px 0',
                            padding: '10px',
                            backgroundColor: 'aliceblue',
                            textAlign: 'center'
                        }}>
                            <h3>{`page: ${Number(k) + 1} element: ${i+1}`}</h3>
                            <p style={{margin: '2px'}}>{e.name.first} {e.name.last} - {e.gender}</p>
                            <p style={{margin: '2px'}}>{e.email}</p>
                            <p style={{margin: '2px'}}>{e.location.street.name} {e.location.street.number}</p>
                            <p style={{margin: '2px'}}>{e.location.city}, {e.location.country}</p>
                        </div>
                    ))}
                </div>)
            })}
            {state.isFetching && <p>Loading...</p>}
        </div>
    )
}

export const InifiniteScroll = memo(InfiniteScrollComponent)