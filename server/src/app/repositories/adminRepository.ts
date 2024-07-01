export interface adminRepository {
    getAllUsers(): Promise<any>
    blockUser(id: any): Promise<any>
    unblockUser(id: any): Promise<any>
    publishPost(id: string): Promise<any>
    getPostDetails(id: string): Promise<any>
    getPosts(): Promise<any>
    updateUser(id: string, updatedUser: any): Promise<any>
}