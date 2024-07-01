export interface mockRepository{
    submitQuestion(total_score: number, proficiency_level: string, feedback: string, id:string): Promise<any>
    previousFeedback(id:string): Promise<any>
}