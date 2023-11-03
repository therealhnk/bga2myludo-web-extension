import { useCallback } from 'react';
import type { Configuration } from '~core/models/configuration';
import '~popup/index.scss';

type Props = {
    configuration: Configuration;
    onConfigurationUpdated: (configuration: Configuration) => void;
}

export default function CustomPlace({ configuration, onConfigurationUpdated }: Props) {
    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        onConfigurationUpdated({ ...configuration, place: event.target.value });
    }, [configuration, onConfigurationUpdated]);

    return (
        <div className='user-matching'>
            <div className="message">Override default place</div>
            <div><input type='text' value={configuration.place} onChange={onChange} /></div>
        </div>
    )
}