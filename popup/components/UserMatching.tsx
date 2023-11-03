import { faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useState } from 'react';
import type { Configuration } from '~core/models/configuration';
import '~popup/index.scss';
import { CustomUsersModel } from '~popup/models/CustomUsersModel';

type Props = {
    configuration: Configuration;
    onConfigurationUpdated: (configuration: Configuration) => void;
}

export default function UserMatching({ configuration, onConfigurationUpdated }: Props) {
    const [customUsersModel, setCustomUsersModel] = useState<CustomUsersModel>({ addedUser: { bgaUser: '', myludoUser: '' }, users: [] });

    useEffect(() => {
        if (configuration) {
            setCustomUsersModel(current => { return { ...current, users: configuration.users } })
        }
    }, [configuration]);

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

        setCustomUsersModel({ users: usersUpdatedSorted, addedUser: { bgaUser: '', myludoUser: '' } });
        onConfigurationUpdated({ ...configuration, users: usersUpdatedSorted });
    }, [configuration, onConfigurationUpdated, customUsersModel]);

    const removeUser = useCallback((index: number) => {
        const usersUpdated = customUsersModel.users.filter((o, i) => i !== index);
        setCustomUsersModel({ ...customUsersModel, users: usersUpdated });
        onConfigurationUpdated({ ...configuration, users: usersUpdated });
    }, [configuration, onConfigurationUpdated, customUsersModel]);

    return (
        <div className='user-matching'>
            <div className="message">{chrome.i18n.getMessage("userMatching")}</div>
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
                        <td>
                            <button title={chrome.i18n.getMessage("addOrUpdateUser")} onClick={addUser}>
                                <FontAwesomeIcon icon={faUserPlus} size="lg" />
                            </button>
                        </td>
                    </tr>
                    {customUsersModel.users.map((o, index) =>
                        <tr key={`${o.bgaUser}_${o.myludoUser}`}>
                            <td>{o.bgaUser} </td>
                            <td>{o.myludoUser} </td>
                            <td>
                                <button title={chrome.i18n.getMessage("delete")} onClick={() => removeUser(index)}>
                                    <FontAwesomeIcon icon={faTrash} size="lg" />
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div >
    )
}