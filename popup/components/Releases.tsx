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
                            primary='version 3.8.4 (24/02/2025)'
                            secondary='Update supported games (+34)'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.8.3 (24/02/2025)'
                            secondary='Update supported games (+12)'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.8.2 (18/02/2025)'
                            secondary='Fix Myludo switching urls'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.8.1 (11/01/2025)'
                            secondary='Update supported games (+44)'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.8.0 (18/11/2024)'
                            secondary='Add link on last results page'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.7.1 (13/11/2024)'
                            secondary={
                                <span>
                                    Fix notifications calculated day
                                    <br />
                                    Fix play comparison when player contains specials characters
                                    <br />
                                    Update supported games (+11)
                                </span>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.7.0 (12/11/2024)'
                            secondary={
                                <span>
                                    Fix bga notifications api
                                    <br />
                                    Update supported games (+38)
                                    <br />
                                    Update framework version
                                </span>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.6.5 (20/09/2024)'
                            secondary='Update supported games (+32), Merci Firebird !'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.6.4 (17/09/2024)'
                            secondary='Update win condition for solo games'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.6.3 (17/09/2024)'
                            secondary='fix win condition for coop games'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.6.2 (17/09/2024)'
                            secondary='Update win condition for coop games'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.6.1 (16/09/2024)'
                            secondary='Update supported games (+4)'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.6.0 (29/08/2024)'
                            secondary={
                                <span>
                                    Fix rules for considering a table as abandonned
                                    <br />
                                    Update supported games (+1)
                                </span>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.5.1 (21/08/2024)'
                            secondary='Update supported games (+16)'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.5.0 (16/08/2024)'
                            secondary='Fix win condition for solo and coop games'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.4.18 (07/08/2024)'
                            secondary='Update supported games (~1)'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.4.17 (01/08/2024)'
                            secondary={
                                <span>
                                    Update framework version
                                    <br />
                                    Update supported games (+32)
                                </span>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.4.16 (17/06/2024)'
                            secondary='Update supported games (+2, ~2)'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.4.15 (10/06/2024)'
                            secondary='Update supported games (+7)'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.4.14 (29/05/2024)'
                            secondary='Update supported games (~8)'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.4.13 (27/05/2024)'
                            secondary='Update supported games (+29)'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.4.12 (29/04/2024)'
                            secondary={
                                <span>
                                    Update framework version
                                    <br />
                                    Update supported games (+13, ~8)
                                </span>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.4.11 (02/04/2024)'
                            secondary='Update supported games (+13, ~1)'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.4.10 (14/03/2024)'
                            secondary={
                                <span>
                                    Update framework version
                                    <br />
                                    Update supported games (+3)
                                    <br />
                                    Fix new plays tab design
                                </span>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.4.9 (11/03/2024)'
                            secondary='Update supported games (+11)'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.4.8 (29/02/2024)'
                            secondary='Update supported games (+8)'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.4.7 (19/02/2024)'
                            secondary='Update supported games (+2)'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.4.6 (17/02/2024)'
                            secondary='Update supported games (+10)'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.4.5 (09/02/2024)'
                            secondary='Fix minutes ago on notifications'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.4.4 (09/02/2024)'
                            secondary='Update supported games (+11)'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.4.3 (08/02/2024)'
                            secondary='Fix time ago and alarms on notifications'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.4.2 (08/02/2024)'
                            secondary='Refactoring notifications'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.4.1 (22/01/2024)'
                            secondary='Technical update'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.4.0 (02/02/2024)'
                            secondary={
                                <span>
                                    Add Notifications from BGA for ended tables
                                    <br />
                                    Update supported games (+11, ~1)
                                    <br />
                                    Fix quota issue
                                </span>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.3.2 (22/01/2024)'
                            secondary='Update supported games (+1)'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.3.1 (21/01/2024)'
                            secondary={
                                <span>
                                    Fix configuration upload on Firefox
                                    <br />
                                    Update supported games (~3)
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
                                    Update supported games (+10)
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
                            secondary='Update supported games (+5)'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 3.1.6 (12/12/2023)'
                            secondary='Update supported games (+4)'
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
                            secondary='Update supported games (+9)'
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
                            secondary='Update supported games (+11)'
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
                            secondary='Update supported games (+2)'
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
                            secondary='Update supported games (+1)'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 2.2.5 (06/11/2023)'
                            secondary='Update supported games (+1)'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 2.2.4 (06/11/2023)'
                            secondary='Update supported games (~1)'
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
                            secondary='Update supported games (+6)'
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
                            secondary='Update supported games (+9)'
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
                                    Update supported games (~1)
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
                            secondary='Update supported games (+13)' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.1.0.2 (25/09/2023)'
                            secondary={
                                <span>
                                    Update supported games (~2)
                                    <br />
                                    Fix duplicate table comparison
                                </span>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.1.0.1 (21/09/2023)'
                            secondary='Update supported games (~1)' />
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
                            secondary='Update supported games (~1)' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.14 (09/09/2023)'
                            secondary='Update supported games (~5)' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.13 (08/09/2023)'
                            secondary='Update supported games (~13)' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.12 (06/09/2023)'
                            secondary='Add alpha and beta games support (+235)' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.11 (01/09/2023)'
                            secondary='Fix wording' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.10 (01/09/2023)'
                            secondary='Update supported games (+4)' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.9 (30/08/2023)'
                            secondary='Update supported games (+1)' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.8 (30/08/2023)'
                            secondary='Update supported games (+1)' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.7 (24/08/2023)'
                            secondary='Update supported games (+1)' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.6 (16/08/2023)'
                            secondary='Update supported games (+1)' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.0.0.5 (09/08/2023)'
                            secondary='Update supported games (+5)' />
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
                            secondary='Update supported games (+10)' />
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
                            secondary='Update supported games (+8)' />
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
