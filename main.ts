// Restart hry
input.onButtonPressed(Button.A, function () {
    attempt = 0
    gameOver = false
    basic.clearScreen()
})
let attempt = 0
let gameOver = false
// Nastavení Pinu
pins.setPull(DigitalPin.P8, PinPullMode.PullNone)
pins.setPull(DigitalPin.P12, PinPullMode.PullNone)
const playerPin = DigitalPin.P8
const playerPin2 = DigitalPin.P12
let player1: Number = pins.digitalReadPin(playerPin)
let player2: Number = pins.digitalReadPin(playerPin2)
// Nahodný čas
let randomNumber = Math.floor(Math.random() * 6)
let time = [
    100,
    200,
    500,
    1000,
    2000
]
let gameTime = time[randomNumber]
basic.forever(function () {
    player1 = pins.digitalReadPin(playerPin)
    player2 = pins.digitalReadPin(playerPin2)
    if (gameOver == true) {
        gameOver = false
        basic.pause(3000)
    }
    while (attempt > 5 && gameOver != true) {

        if (player1 < 1) {
            basic.showLeds(`
                . . # . .
                . # . # .
                . # . # .
                . # # # .
                . # . # .
                `)
            attempt++
            gameOver = true
        } else if (player2 < 1) {
            basic.showLeds(`
                . # # . .
                . # . # .
                . # # . .
                . # . # .
                . # # . .
                `)
            attempt++
            gameOver = true
        } else if (player1 < 1 && player2 < 1) {
            basic.showLeds(`
                . . # # .
                . # . . .
                . # . . .
                . # . . .
                . . # # .
                `)
            attempt++
            gameOver = true
        } else {
            basic.pause(gameTime)
            music.playTone(262, music.beat(BeatFraction.Whole))
            player1 = pins.digitalReadPin(playerPin)
            player2 = pins.digitalReadPin(playerPin2)
            basic.pause(500)
            if (player1 == player2) {
                basic.showLeds(`
                    . # # . .
                    . # . # .
                    . # # . .
                    . # . # .
                    . # . . #
                    `)
                attempt++
                gameOver = true
            } else if (player1 < player2) {
                basic.showLeds(`
                    # # . . #
                    # . # # #
                    # # . . #
                    # . . . #
                    # . . . #
                    `)
                attempt++
                gameOver = true
            } else if (player2 < player1) {
                basic.showLeds(`
                    # # . # .
                    # . # . #
                    # # . # .
                    # . # . .
                    # . # # #
                    `)
                attempt++
                gameOver = true
            }
        }
    }
})
