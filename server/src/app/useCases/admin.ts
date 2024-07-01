import { adminRepository } from "../repositories/adminRepository";

export  class adminUseCase {
    constructor(private adminRepository: adminRepository) {}
    async getAllUsers(): Promise<any> {
        return await this.adminRepository.getAllUsers()
    }

    async blockUser(id: any): Promise<any> {
        return await this.adminRepository.blockUser(id)
    }
    async unblockUser(id: any): Promise<any> {
        return await this.adminRepository.unblockUser(id)
    }
    async publishPost(id: string) {
        return await this.adminRepository.publishPost(id)
    }
    async getPostDetails(id: string) {
        return await this.adminRepository.getPostDetails(id)
    }
    async getPosts() {
        return await this.adminRepository.getPosts()
    }

    async updateUser(id: string, updatedUser: any) {
        return await this.adminRepository.updateUser(id, updatedUser)
    }
}