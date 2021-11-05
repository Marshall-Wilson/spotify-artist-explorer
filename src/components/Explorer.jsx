import React, {useState} from 'react';
import Traverser from './Traverser';
import Input from './Input';

const Explorer = () => {
    const [startName, setStartName] = useState('');
    const [endName, setEndName] = useState('');
    const [searching, setSearching] = useState(false);

    const beginSearch = () => {
        setSearching(true);
    }

    return (
        <div className="explorer">
            {searching ? 
                <Traverser startName={startName} endName={endName}/>:
                <Input setStartName={setStartName} setEndName={setEndName} beginSearching={beginSearch}/>
            }
        </div>
    )
}

export default Explorer
