import boardGameArenaRepository from "~/core/repositories/boardGameArenaRepository";

export default async function getBgaTable(tableId: string) {
    return boardGameArenaRepository.getTable(tableId);
}
