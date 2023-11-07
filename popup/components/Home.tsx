import EmailIcon from '@mui/icons-material/Email';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import '~popup/index.scss';
import DiscordIcon from './DiscordIcon';
import GithubIcon from './GithubIcon';

export default function Home() {
    return (
        <div className="home">
            <div className="title">{chrome.i18n.getMessage("welcomeTitle")}</div>
            <div className="message">{chrome.i18n.getMessage("welcomeMessageLine1")}</div>
            <div className="message">{chrome.i18n.getMessage("welcomeMessageLine2")}</div>
            <List dense>
                <ListItem component="a" href="https://discord.gg/Xwp8VFVP37" target='_blank'>
                    <ListItemIcon>
                        <DiscordIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sur le discord de Myludo" />
                </ListItem>

                <ListItem component="a" href="mailto:bga2myludo@gmail.com">
                    <ListItemIcon>
                        <EmailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Par Email à bga2myludo@gmail.com" />
                </ListItem>

                <ListItem component="a" href="https://github.com/therealhnk/bga2myludo-web-extension/issues" target='_blank'>
                    <ListItemIcon>
                        <GithubIcon />
                    </ListItemIcon>
                    <ListItemText primary="Via Github" />
                </ListItem>
            </List>
        </div >
    )
}