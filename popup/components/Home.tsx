import EmailIcon from '@mui/icons-material/Email';
import { List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import '~popup/index.scss';
import DiscordIcon from './DiscordIcon';
import GithubIcon from './GithubIcon';

export default function Home() {
    return (
        <div className="home">
            <div className="title">{chrome.i18n.getMessage("welcomeTitle")}</div>
            <div className="message">
                {chrome.i18n.getMessage("welcomeMessageLine1")}
                <br />
                {chrome.i18n.getMessage("welcomeMessageLine2")}
            </div>
            <List dense>
                <ListItemButton href="https://discord.gg/Xwp8VFVP37" target='_blank'>
                    <ListItemIcon>
                        <DiscordIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={<Typography className="message-list">{chrome.i18n.getMessage("contactByDiscord")}</Typography>} />
                </ListItemButton>

                <ListItemButton href="mailto:bga2myludo@gmail.com">
                    <ListItemIcon>
                        <EmailIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={<Typography className="message-list">{chrome.i18n.getMessage("contactByMail")}</Typography>} />
                </ListItemButton>

                <ListItemButton href="https://github.com/therealhnk/bga2myludo-web-extension/issues" target='_blank'>
                    <ListItemIcon>
                        <GithubIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={<Typography className="message-list">{chrome.i18n.getMessage("contactByGithub")}</Typography>} />
                </ListItemButton>
            </List>
        </div >
    )
}