import 'bootstrap/dist/css/bootstrap.css';
import { useCallback, useEffect, useState, type ChangeEventHandler } from 'react';
import configurationService from '~core/services/configurationService';

export default function AutoSubmit() {
    const [value, setValue] = useState<boolean>();

    useEffect(() => {
        configurationService.get()
            .then((result) => {
                setValue(result.autoSubmit);
            });
    }, []);

    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.checked);
        configurationService.setAutoSubmit(event.target.checked);
    }, []);

    return (
        <div>
            <div>
                <div>Auto submit : </div>
                <div><input type='checkbox' checked={value} onChange={onChange} /></div>
            </div>
        </div>
    )
}