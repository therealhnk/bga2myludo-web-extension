import { useCallback } from 'react';
import type { Configuration } from '~core/models/configuration';
import '~popup/index.scss';

type Props = {
    configuration: Configuration;
    onConfigurationUpdated: (configuration: Configuration) => void;
}

export default function AutoSubmit({ configuration, onConfigurationUpdated }: Props) {
    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        onConfigurationUpdated({ ...configuration, autoSubmit: event.target.checked });
    }, [configuration, onConfigurationUpdated]);

    return (
        <div className='user-matching'>
            <div className="message">Auto submit</div>
            <div><input type='checkbox' checked={configuration.autoSubmit} onChange={onChange} /></div>
        </div>
    )
}