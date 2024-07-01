interface Analysis {
    english_sentence_structures: string
    filler_and_repetitive_words: string
    fluency_score: string
    feedback_for_improvement: string[]
}

interface Voice {
    text: string
    analysis: Analysis
}
export interface amigoRepository {
    fluencyAnalysis(voice: Voice, user: string): Promise<any>
}
