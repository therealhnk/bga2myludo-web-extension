import { useCallback } from 'react';
import type { Configuration as ConfigurationModel } from '~core/models/configuration';
import '~popup/index.scss';

type Props = {
    configuration: ConfigurationModel;
    onConfigurationUpdated: (configuration: ConfigurationModel) => void;
}

export default function Configuration({ configuration, onConfigurationUpdated }: Props) {
    const onChangeAutoSubmit = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        onConfigurationUpdated({ ...configuration, autoSubmit: event.target.checked });
    }, [configuration, onConfigurationUpdated]);

    const onChangeCustomPlace = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        onConfigurationUpdated({ ...configuration, place: event.target.value });
    }, [configuration, onConfigurationUpdated]);

    const onChangeAddTableLink = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        onConfigurationUpdated({ ...configuration, addTableLink: event.target.checked });
    }, [configuration, onConfigurationUpdated]);

    return (
        <div className='configuration'>
            <div className="message">Auto submit</div>
            <div><input type='checkbox' checked={configuration.autoSubmit} onChange={onChangeAutoSubmit} /></div>
            <div className="message">Override default place</div>
            <div><input type='text' value={configuration.place} onChange={onChangeCustomPlace} /></div>
            <div className="message">Add table link in comments</div>
            <div><input type='checkbox' checked={configuration.addTableLink} onChange={onChangeAddTableLink} /></div>
        </div>
    )
}