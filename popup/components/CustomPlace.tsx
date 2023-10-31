import 'bootstrap/dist/css/bootstrap.css';
import { useCallback, useEffect, useState, type ChangeEventHandler } from 'react';
import configurationService from '~core/services/configurationService';

export default function CustomPlace() {
    const [value, setValue] = useState<string>();

    useEffect(() => {
        configurationService.get()
            .then((result) => { setValue(result.place); });
    }, []);

    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value);
        configurationService.setPlace(event.target.value);
    }, []);

    return (
        <div>
            <div>
                <div>Override default place : </div>
                <div><input type='text' value={value} onChange={onChange} /></div>
            </div>
        </div>
    )
}