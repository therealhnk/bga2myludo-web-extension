import 'bootstrap/dist/css/bootstrap.css';
import { useCallback } from 'react';
import type { Configuration } from '~core/models/configuration';

type Props = {
    configuration: Configuration;
    onConfigurationUpdated: (configuration: Configuration) => void;
}

export default function AutoSubmit({ configuration, onConfigurationUpdated }: Props) {
    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        onConfigurationUpdated({ ...configuration, autoSubmit: event.target.checked });
    }, [configuration, onConfigurationUpdated]);

    return (
        <div>
            <div>
                <div>Auto submit : </div>
                <div><input type='checkbox' checked={configuration.autoSubmit} onChange={onChange} /></div>
            </div>
        </div>
    )
}