import 'bootstrap/dist/css/bootstrap.css';
import { useCallback } from 'react';
import type { Configuration } from '~core/models/configuration';

type Props = {
    configuration?: Configuration;
    onConfigurationUpdated: (configuration: Configuration) => void;
}

export default function CustomPlace({ configuration, onConfigurationUpdated }: Props) {
    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        onConfigurationUpdated({ ...configuration, place: event.target.value });
    }, [configuration, onConfigurationUpdated]);

    return (
        <div>
            <div>
                <div>Override default place : </div>
                <div><input type='text' value={configuration?.place} onChange={onChange} /></div>
            </div>
        </div>
    )
}