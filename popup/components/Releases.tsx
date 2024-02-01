import { List, ListItem, ListItemText } from "@mui/material";
import React from "react";

export default function Releases() {
    return (
        <div className="releases">
            <div className="title">{chrome.i18n.getMessage("releasesTitle")}</div>
            <div>
                <List dense>
                    <ListItem>
                        <ListItemText
                            primary='version 3.4.0 (21/01/2024)'
                            secondary={
                                <span>
                                    Add Notifications for last played games
                                    <br />
                                    Update game list
                                    <br />
                                    Fix quota issue
                                </span>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.3.2 (22/01/2024)'
                            secondary='Update game list'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.3.1 (21/01/2024)'
                            secondary={
                                <span>
                                    Fix configuration upload on Firefox
                                    <br />
                                    Update game list
                                </span>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.3.0 (20/01/2024)'
                            secondary={
                                <span>
                                    Apologies for 3.2.0
                                    <br />
                                    All API calls are made by the background service worker to overcome CORS restrictions
                                    <br />
                                    No more difference between informations from BGA history and BGA end game page
                                    <br />
                                    Update game list
                                </span>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.2.1 (20/01/2024)'
                            secondary='Try to fix version 3.2.0 issues'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.2.0 (19/01/2024)'
                            secondary='Buggy shitty version :-('
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.1.10 (22/12/2023)'
                            secondary='Rollbacked version 3.1.9'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.1.9 (22/12/2023)'
                            secondary='Fix myludo connection status'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.1.8 (22/12/2023)'
                            secondary='Technical update to minimize call to bga api'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.1.7 (20/12/2023)'
                            secondary='Update game list'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.1.6 (12/12/2023)'
                            secondary='Update game list'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.1.5 (08/12/2023)'
                            secondary='fix encoding failed when username contains special characters'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.1.4 (06/12/2023)'
                            secondary='Fix screen regression'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.1.3 (06/12/2023)'
                            secondary='Update game list'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.1.2 (03/12/2023)'
                            secondary='Fix bugs on Firefox for Android'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.1.1 (03/12/2023)'
                            secondary='Fix bugs on Firefox for Android'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.1.0 (28/11/2023)'
                            secondary='Add override games matching'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.0.6 (27/11/2023)'
                            secondary='Update game list'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.0.5 (24/11/2023)'
                            secondary='Technical version'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.0.4 (24/11/2023)'
                            secondary='Technical version'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.0.3 (24/11/2023)'
                            secondary='Technical version'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.0.2 (24/11/2023)'
                            secondary='Fix onboarding on Firefox'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.0.1 (24/11/2023)'
                            secondary='Update game list'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.0.0 (24/11/2023)'
                            secondary={
                                <span>
                                    Big improvements in customization of the behavior of the plugin
                                    <br />
                                    Popup for extension
                                    <br />
                                    Options screen
                                    <br />
                                    BGA/Myludo Status
                                    <br />
                                    Players customization
                                    <br />
                                    Behavior configurations
                                    <br />
                                    Night mode
                                    <br />
                                    Import/export current configuration
                                    <br />
                                    Releases screen
                                </span>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 2.2.7 (07/11/2023)'
                            secondary='Fix score for coop game'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 2.2.6 (06/11/2023)'
                            secondary='Update game list'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 2.2.5 (06/11/2023)'
                            secondary='Update game list'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 2.2.4 (06/11/2023)'
                            secondary='Update game list'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 2.2.3 (30/10/2023)'
                            secondary='Fix when game not found, search on myludo based on game name'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 2.2.2 (26/10/2023)'
                            secondary='Update game list'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 2.2.1 (24/10/2023)'
                            secondary='Fix patching game stats failed when no table found'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 2.2.0 (23/10/2023)'
                            secondary='Open login popup on Myludo if not connected'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 2.1.1 (20/10/2023)'
                            secondary='Update game list'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 2.1.0 (20/10/2023)'
                            secondary={
                                <span>
                                    Add duration on realtime mode
                                    <br />
                                    Security update
                                    <br />
                                    Technical updates
                                </span>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 2.0.9 (13/10/2023)'
                            secondary={
                                <span>
                                    Update game list
                                    <br />
                                    Fix scroll on myludo popup
                                </span>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 2.0.8 (13/10/2023)'
                            secondary='Fix duplicate myludo button on slow connection on history page'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 2.0.7 (13/10/2023)'
                            secondary='Technical version'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 2.0.6 (12/10/2023)'
                            secondary='Technical version'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 2.0.5 (12/10/2023)'
                            secondary='Technical version'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 2.0.4 (12/10/2023)'
                            secondary='Technical version'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 2.0.3 (12/10/2023)'
                            secondary='Technical version'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 2.0.2 (12/10/2023)'
                            secondary='Technical version'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 2.0.1 (11/10/2023)'
                            secondary='Fix abandonned game property from bga history page'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 2.0.0 (05/10/2023)'
                            secondary='Migrate extension on Plasmo framework' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.1.0.3 (25/09/2023)'
                            secondary='Update game list' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.1.0.2 (25/09/2023)'
                            secondary={
                                <span>
                                    Update game list
                                    <br />
                                    Fix duplicate table comparison
                                </span>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.1.0.1 (21/09/2023)'
                            secondary='Update game list' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.1.0.0 (20/09/2023)'
                            secondary={
                                <span>
                                    Add table link on Myludo
                                    <br />
                                    Add warning on duplicate table
                                    <br />
                                    Encode BGA information
                                </span>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.15 (11/09/2023)'
                            secondary='Update game list' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.14 (09/09/2023)'
                            secondary='Update game list' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.13 (08/09/2023)'
                            secondary='Update game list' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.12 (06/09/2023)'
                            secondary='Add alpha and beta games support' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.11 (01/09/2023)'
                            secondary='Fix wording' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.10 (01/09/2023)'
                            secondary='Update game list' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.9 (30/08/2023)'
                            secondary='Update game list' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.8 (30/08/2023)'
                            secondary='Update game list' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.7 (24/08/2023)'
                            secondary='Update game list' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.6 (16/08/2023)'
                            secondary='Update game list' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.5 (09/08/2023)'
                            secondary='Update game list' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.4 (09/08/2023)'
                            secondary='Fix button on end game page' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.3 (07/08/2023)'
                            secondary='Manage online game on Myludo' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.2 (07/08/2023)'
                            secondary='Revert host permissions' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.1 (07/08/2023)'
                            secondary='Fix authorization on Firefox version' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.0 (06/08/2023)'
                            secondary='Update game list' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 0.0.0.6 (03/08/2023)'
                            secondary='Fix for Firefox version' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 0.0.0.5 (03/08/2023)'
                            secondary='Fix for Firefox version' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 0.0.0.4 (03/08/2023)'
                            secondary='Fix for Firefox version' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 0.0.0.3 (03/08/2023)'
                            secondary='Add support for Firefox' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 0.0.0.2 (02/08/2023)'
                            secondary='Update game list' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 0.0.0.1 (08/06/2023)'
                            secondary='Initial version' />
                    </ListItem>
                </List>
            </div>
        </div >
    )
}
