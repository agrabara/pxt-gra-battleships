function doPokazWrogieStatki() {
    for (let value2 of wrogieStatki) {
        value2.set(LedSpriteProperty.Brightness, 20)
    }
}
function doPokazMojeStatki() {
    for (let value2 of mojeStatki) {
        value2.set(LedSpriteProperty.Brightness, 20)
    }
}
function doUkryjWrogieStrzaly() {
    for (let value32 of wrogieStrzaly) {
        value32.set(LedSpriteProperty.Brightness, 0)
    }
}
function doUkryjWrogieStatki() {
    for (let value32 of wrogieStatki) {
        value32.set(LedSpriteProperty.Brightness, 0)
    }
}
function doUkryjMojeStatki() {
    for (let value of mojeStatki) {
        value.set(LedSpriteProperty.Brightness, 0)
    }
}
function doUkryjMojeStrzaly() {
    for (let value32 of mojeStrzaly) {
        value32.set(LedSpriteProperty.Brightness, 0)
    }
}
function doUkryjPlansze() {
    doUkryjMojeStatki()
    doUkryjWrogieStatki()
    doUkryjMojeStrzaly()
    doUkryjWrogieStrzaly()
}
function doStrzelaj() {
    trafiony = 0
    for (let value3 of wrogieStatki) {
        if (value3.get(LedSpriteProperty.X) == kursor.get(LedSpriteProperty.X) && value3.get(LedSpriteProperty.Y) == kursor.get(LedSpriteProperty.Y)) {
            juztrafiony = 0
            for (let value of mojeStrzaly) {
                if (value.get(LedSpriteProperty.X) == kursor.get(LedSpriteProperty.X) && value.get(LedSpriteProperty.Y) == kursor.get(LedSpriteProperty.Y)) {
                    juztrafiony = 1
                }
            }
            if (juztrafiony == 0) {
                wynik += 1
                trafiony = 1
            }
        }
    }
    mojeStrzaly.push(game.createSprite(kursor.get(LedSpriteProperty.X), kursor.get(LedSpriteProperty.Y)))
    mojeStrzaly[mojeStrzaly.length - 1].set(LedSpriteProperty.Brightness, 100)
    mojeStrzaly[mojeStrzaly.length - 1].set(LedSpriteProperty.Blink, 750)
    if (trafiony == 1) {
        game.addScore(1)
        mojeStrzaly[mojeStrzaly.length - 1].set(LedSpriteProperty.Brightness, 180)
        mojeStrzaly[mojeStrzaly.length - 1].set(LedSpriteProperty.Blink, 0)
    }
    if (wynik >= 8) {
        game.gameOver()
    }
}
input.onButtonPressed(Button.B, function () {
    if (kursor.get(LedSpriteProperty.X) >= 4) {
        kursor.set(LedSpriteProperty.X, 0)
        if (kursor.get(LedSpriteProperty.Y) >= 4) {
            kursor.set(LedSpriteProperty.Y, 0)
        } else {
            kursor.change(LedSpriteProperty.Y, 1)
        }
    } else {
        kursor.change(LedSpriteProperty.X, 1)
    }
})
input.onButtonPressed(Button.A, function () {
    if (plansza == 0) {
        doUstawStatek()
    } else if (plansza == 1) {
        doStrzelaj()
        plansza = 2
    } else {

    }
})
function doGenerujStatkiWroga() {
    for (let index = 0; index < 8; index++) {
        jeszczeraz = 1
        while (jeszczeraz == 1) {
            jeszczeraz = 0
            newx = Math.randomRange(0, 4)
            newy = Math.randomRange(0, 4)
            for (let value4 of wrogieStatki) {
                if (value4.get(LedSpriteProperty.X) == newx && value4.get(LedSpriteProperty.Y) == newy) {
                    jeszczeraz = 1
                }
            }
        }
        wrogieStatki.push(game.createSprite(newx, newy))
        wrogieStatki[wrogieStatki.length - 1].set(LedSpriteProperty.Brightness, 20)
    }
}
function doUstawStatek() {
    indeks = 0
    skasowany = 0
    for (let value5 of mojeStatki) {
        if (value5.get(LedSpriteProperty.X) == kursor.get(LedSpriteProperty.X) && value5.get(LedSpriteProperty.Y) == kursor.get(LedSpriteProperty.Y)) {
            mojeStatki.removeAt(indeks).delete()
            skasowany = 1
        }
        indeks += 1
    }
    if (skasowany == 0 && mojeStatki.length < 8) {
        mojeStatki.push(game.createSprite(kursor.get(LedSpriteProperty.X), kursor.get(LedSpriteProperty.Y)))
        mojeStatki[mojeStatki.length - 1].set(LedSpriteProperty.Brightness, 180)
    }
}
input.onButtonPressed(Button.AB, function () {
    // plansza=0 gdy ukladamy statki
    //
    // plansza=1 tryb strzelania
    //
    // plansza=2 gdy strzela przeciwnik
    //
    if (plansza == 0 && mojeStatki.length - 1 >= 1) {
        plansza = 1
        doMojaPlansza()
    } else {
        plansza = 0
        doWrogaPlansza()
    }
})
function doMojaPlansza() {
    basic.clearScreen()
    doUkryjPlansze()
    basic.showString("M")
    basic.pause(3000)
    doPokazMojeStatki()
    for (let value of wrogieStrzaly) {
        value.set(LedSpriteProperty.Brightness, 100)
        value.set(LedSpriteProperty.Blink, 750)
        for (let value2 of mojeStatki) {
            if (value.get(LedSpriteProperty.X) == value2.get(LedSpriteProperty.X) && value.get(LedSpriteProperty.Y) == value2.get(LedSpriteProperty.Y)) {
                value.set(LedSpriteProperty.Brightness, 180)
                value.set(LedSpriteProperty.Blink, 0)
            }
        }
    }
}
function doStrzalPrzeciwnika() {
    jeszczeraz = 1
    while (jeszczeraz == 1) {
        jeszczeraz = 0
        newx = Math.randomRange(0, 4)
        newy = Math.randomRange(0, 4)
        for (let value42 of wrogieStrzaly) {
            if (value42.get(LedSpriteProperty.X) == newx && value42.get(LedSpriteProperty.Y) == newy) {
                jeszczeraz = 1
            }
        }
    }
    wrogieStrzaly.push(game.createSprite(newx, newy))
    wrogieStrzaly[wrogieStrzaly.length - 1].set(LedSpriteProperty.Brightness, 100)
    wrogieStrzaly[wrogieStrzaly.length - 1].set(LedSpriteProperty.Blink, 750)
    for (let value of mojeStatki) {
        if (value.get(LedSpriteProperty.X) == newx && value.get(LedSpriteProperty.Y) == newy) {
            game.addScore(1)
            wrogieStrzaly[wrogieStrzaly.length - 1].set(LedSpriteProperty.Brightness, 180)
            wrogieStrzaly[wrogieStrzaly.length - 1].set(LedSpriteProperty.Blink, 0)
            wynikwroga += 1
        }
    }
    if (wynikwroga >= 8) {
        game.gameOver()
    }
}
function doWrogaPlansza() {
    basic.clearScreen()
    doUkryjPlansze()
    basic.showString("W")
    basic.pause(3000)
    doPokazWrogieStatki()
    for (let value of mojeStrzaly) {
        value.set(LedSpriteProperty.Brightness, 100)
        value.set(LedSpriteProperty.Blink, 750)
        for (let value2 of wrogieStatki) {
            if (value.get(LedSpriteProperty.X) == value2.get(LedSpriteProperty.X) && value.get(LedSpriteProperty.Y) == value2.get(LedSpriteProperty.Y)) {
                value.set(LedSpriteProperty.Brightness, 180)
                value.set(LedSpriteProperty.Blink, 0)
            }
        }
    }
}
let skasowany = 0
let indeks = 0
let newy = 0
let newx = 0
let jeszczeraz = 0
let juztrafiony = 0
let trafiony = 0
let wynikwroga = 0
let wynik = 0
let plansza = 0
let wrogieStrzaly: game.LedSprite[] = []
let mojeStrzaly: game.LedSprite[] = []
let wrogieStatki: game.LedSprite[] = []
let mojeStatki: game.LedSprite[] = []
let kursor: game.LedSprite = null
kursor = game.createSprite(0, 0)
kursor.set(LedSpriteProperty.Blink, 250)
mojeStatki = []
wrogieStatki = []
mojeStrzaly = []
wrogieStrzaly = []
doGenerujStatkiWroga()
doUkryjWrogieStatki()
basic.pause(2000)
plansza = 0
wynik = 0
wynikwroga = 0
basic.forever(function () {
    if (plansza == 2) {
        doStrzalPrzeciwnika()
        plansza = 1
    }
    basic.pause(100)
})
 