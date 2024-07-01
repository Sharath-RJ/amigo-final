export interface fluencyServiceInterface {
    FLuencyAnalysics(text: string, user:string): Promise<any>;
}
