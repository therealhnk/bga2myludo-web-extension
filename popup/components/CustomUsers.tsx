import 'bootstrap/dist/css/bootstrap.css';
import { useCallback, useEffect, useState, type ChangeEventHandler } from 'react';
import configurationService from '~core/services/configurationService';

export default function CustomUsers() {
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
                <div>Override BGA users : </div>
                <table id="my_table_id"
                    data-id-field="id">
                    <thead>
                        <tr>
                            <th className="col-md-1" data-field="id" data-sortable="true" data-align="center">#</th>
                            <th className="col-md-4" data-field="name" data-editable="true">Name</th>
                            <th className="col-md-7" data-field="description" data-editable="true" data-editable-emptytext="Custom empty text.">Description</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}