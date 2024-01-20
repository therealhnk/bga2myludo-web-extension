import type { PlasmoMessaging } from "@plasmohq/messaging";
import boardGameArenaRepository from "~core/repositories/boardGameArenaRepository";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    const message = await boardGameArenaRepository.getTable(req.body.tableId);
    res.send({ message })
}

export default handler