import type { PlasmoMessaging } from "@plasmohq/messaging";
import myludoRepository from "~core/repositories/myludoRepository";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    const message = await myludoRepository.getUser();
    res.send({ message });
}

export default handler