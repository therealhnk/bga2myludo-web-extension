import { List, ListItem, ListItemText } from "@mui/material";

export default function Releases() {
    return (
        <div className="releases">
            <div className="title">{chrome.i18n.getMessage("releasesTitle")}</div>
            <div>
                <List dense>
                    <ListItem>
                        <ListItemText
                            primary='version 2.0.0.0 (05/10/2023)'
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
                            secondary='- Update game list/r/n- Fix duplicate table comparison' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.1.0.1 (21/09/2023)'
                            secondary='Update game list' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='version 1.1.0.0 (20/09/2023)'
                            secondary='- Add table link on Myludo/r/n- Add warning on duplicate table/r/n- Encode BGA information' />
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
        </div>
    )
}