import React, {useState, useEffect} from 'react';
import authorize from '../spotifySearch';
import Explorer from './Explorer';

const Loader = () => {

    const [token, setToken] = useState(null);

    useEffect(() => {
        authorize().then(setToken)
    }, [])


    return (
        <div>
            {token ? 
                <Explorer token={token}/>:
                <p>Loading...</p>
            }
        </div>
    )
}

export default Loader
