import boardGameArenaRepository from "~/core/repositories/boardGameArenaRepository";

export default async function getBgaFriends() {
    return boardGameArenaRepository.getFriends();
}
