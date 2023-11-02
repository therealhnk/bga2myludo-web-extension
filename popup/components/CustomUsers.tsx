import 'bootstrap/dist/css/bootstrap.css';
import { useCallback, useEffect, useState, type ChangeEventHandler } from 'react';
import configurationService from '~core/services/configurationService';
import { CustomUsersModel } from '~popup/models/CustomUsersModel';

export default function CustomUsers() {
    const [customUsersModel, setCustomUsersModel] = useState<CustomUsersModel>({ addedUser: { bgaUser: '', myludoUser: '' }, users: [] });

    useEffect(() => {
        configurationService.get()
            .then((result) => {
                setCustomUsersModel(current => { return { ...current, users: result.users } })
            });
    }, []);

    const addUser = useCallback(() => {
        const userIdx = customUsersModel.users.findIndex(o => o.bgaUser === customUsersModel.addedUser.bgaUser);

        let usersUpdated = customUsersModel.users;

        if (userIdx >= 0) {
            usersUpdated[userIdx].myludoUser = customUsersModel.addedUser.myludoUser.trim();
        }
        else {
            usersUpdated.push({
                bgaUser: customUsersModel.addedUser.bgaUser.trim(),
                myludoUser: customUsersModel.addedUser.myludoUser.trim()
            });
        }

        const usersUpdatedSorted = usersUpdated.sort((a, b) => (a.bgaUser < b.bgaUser ? -1 : 1));;

        configurationService.setUsers(usersUpdated);
        setCustomUsersModel({ users: usersUpdatedSorted, addedUser: { bgaUser: '', myludoUser: '' } });
    }, [customUsersModel]);

    const removeUser = useCallback((index: number) => {
        const usersUpdated = customUsersModel.users.filter((o, i) => i !== index);
        setCustomUsersModel({ ...customUsersModel, users: usersUpdated });
        configurationService.setUsers(usersUpdated);
    }, [customUsersModel]);

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
                        <tr>
                            <td>
                                <input
                                    type='text'
                                    value={customUsersModel.addedUser.bgaUser}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setCustomUsersModel(current => {
                                            const user = { ...current.addedUser, bgaUser: event.target.value };
                                            return { ...current, addedUser: user };
                                        })
                                    }} />
                            </td>
                            <td>
                                <input
                                    type='text'
                                    value={customUsersModel.addedUser.myludoUser}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setCustomUsersModel(current => {
                                            const user = { ...current.addedUser, myludoUser: event.target.value };
                                            return { ...current, addedUser: user };
                                        })
                                    }} />
                            </td>
                            <td><button onClick={addUser}>add</button></td>
                        </tr>
                        {customUsersModel.users.map((o, index) =>
                            <tr key={`${o.bgaUser}_${o.myludoUser}`}>
                                <td><input type='text' defaultValue={o.bgaUser} /></td>
                                <td><input type='text' defaultValue={o.myludoUser} /></td>
                                <td><button onClick={() => removeUser(index)}>delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}