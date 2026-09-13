import boardGameArenaRepository from "~/core/repositories/boardGameArenaRepository";

export default async function getBgaUser() {
    return boardGameArenaRepository.getUser();
}
