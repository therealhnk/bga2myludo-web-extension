import 'bootstrap/dist/css/bootstrap.css';
import { useCallback, useEffect, useState, type ChangeEventHandler } from 'react';
import type { MappedUser } from '~core/models/mappedUser';
import configurationService from '~core/services/configurationService';

export default function CustomUsers() {
    const [users, setUsers] = useState<MappedUser[]>([]);
    const [addedUser, setAddedUser] = useState<MappedUser>({ bgaUser: '', myludoUser: '' });

    useEffect(() => {
        configurationService.get()
            .then((result) => { setUsers(result.users); });
    }, []);

    const addUser = useCallback(() => {
        const usersUpdated = [...users, addedUser];

        setUsers(usersUpdated);
        setAddedUser({ bgaUser: '', myludoUser: '' });
        configurationService.setUsers(usersUpdated);
    }, [users, addedUser]);

    return (
        <div>
            <div>
                <div>Override BGA usernames : </div>
                <table>
                    <thead>
                        <tr>
                            <th className="col-md-4" data-field="bga_user" data-editable="true" data-align="center">BGA User</th>
                            <th className="col-md-4" data-field="myludo_user" data-editable="true">Myludo User</th>
                            <th className="col-md-4" data-field="actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((o, index) =>
                            <tr>
                                <td><input type='text' defaultValue={o.bgaUser} /></td>
                                <td><input type='text' defaultValue={o.myludoUser} /></td>
                                <td><button>delete</button></td>
                            </tr>
                        )}
                        <tr>
                            <td>
                                <input
                                    type='text'
                                    value={addedUser.bgaUser}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setAddedUser(current => { return { ...current, bgaUser: event.target.value } })
                                    }} />
                            </td>
                            <td>
                                <input
                                    type='text'
                                    value={addedUser.myludoUser}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setAddedUser(current => { return { ...current, myludoUser: event.target.value } })
                                    }} />
                            </td>
                            <td><button onClick={addUser}>add</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}