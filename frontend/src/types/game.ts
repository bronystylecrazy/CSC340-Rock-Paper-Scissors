export interface GameResults {
    rounds: number
    nameWon: string
    results: GameResult[]
}

export interface GameResult {
    round: number,
    firstPlayer: PlayerState
    secondPlayer: PlayerState
}

export interface PlayerState {
    label: string
    result: string
}
export interface GameResultsState {
    gameResult: GameResults
}