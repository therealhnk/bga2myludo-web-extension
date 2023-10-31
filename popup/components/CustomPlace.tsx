import 'bootstrap/dist/css/bootstrap.css';
import { useCallback, useEffect, useState, type ChangeEventHandler } from 'react';
import { Storage } from "@plasmohq/storage"

function CustomPlace() {
    const [place, setPlace] = useState<string>();

    const storage = new Storage()

    useEffect(() => {
        storage.get("place")
            .then((result) => {
                if (result) { setPlace(result); }
            });
    }, []);

    const onChangePlace = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setPlace(event.target.value);
        storage.set("place", event.target.value);
    }, []);

    return (
        <div>
            <div>
                <div>Override default place : </div>
                <div><input type='text' value={place} onChange={onChangePlace} /></div>
            </div>
        </div>
    )
}

export default CustomPlace