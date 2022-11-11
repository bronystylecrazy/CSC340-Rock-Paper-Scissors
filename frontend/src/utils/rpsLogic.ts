export const RPSCheck = (p1: string, p2: string): string => {
    if (p1 === "rock") {
        if (p2 === "rock") {
            return "tie";
        } else if (p2 === "paper") {
            return "lose";
        } else {
            return "win";
        }
    }
    if (p1 === "paper") {
        if (p2 === "rock") {
            return "win";
        } else if (p2 === "paper") {
            return "tie";
        } else {
            return "lose";
        }
    }
    if (p1 === "scissors") {
        if (p2 === "rock") {
            return "lose";
        } else if (p2 === "paper") {
            return "win";
        } else {
            return "tie";
        }
    }
    return "error";
}

export const RPSMessage = (result: string): string => {
    if (result === "win") {
        return "Player 1 win!";
    } else if (result === "lose") {
        return "Player 2 win!";
    } else if (result === "tie") {
        return "Tied!";
    }
    return "Error";
}