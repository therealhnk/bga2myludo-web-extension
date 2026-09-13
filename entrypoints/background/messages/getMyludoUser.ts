import myludoRepository from "~/core/repositories/myludoRepository";

export default async function getMyludoUser() {
    return myludoRepository.getUser();
}
