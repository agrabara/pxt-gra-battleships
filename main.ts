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
function doUkryjMojeStatki() {
    for (let value of mojeStatki) {
        value.set(LedSpriteProperty.Brightness, 0)
    }
}
function doPokazMojeStatki() {
    for (let value2 of mojeStatki) {
        value2.set(LedSpriteProperty.Brightness, 180)
    }
}
input.onButtonPressed(Button.A, function () {
    if (plansza == 0) {
        doUstawStatek()
    } else {
        mojeStrzaly.push(game.createSprite(kursor.get(LedSpriteProperty.X), kursor.get(LedSpriteProperty.Y)))
        mojeStrzaly[mojeStrzaly.length - 1].set(LedSpriteProperty.Brightness, 100)
        mojeStrzaly[mojeStrzaly.length - 1].set(LedSpriteProperty.Blink, 750)
        trafiony = 0
        for (let value3 of wrogieStatki) {
            if (value3.get(LedSpriteProperty.X) == kursor.get(LedSpriteProperty.X) && value3.get(LedSpriteProperty.Y) == kursor.get(LedSpriteProperty.Y)) {
                trafiony = 1
                game.addScore(1)
                mojeStrzaly[mojeStrzaly.length - 1].set(LedSpriteProperty.Brightness, 180)
                mojeStrzaly[mojeStrzaly.length - 1].set(LedSpriteProperty.Blink, 0)
            }
        }
    }
})
function doUkryjWrogieStatki() {
    for (let value3 of wrogieStatki) {
        value3.set(LedSpriteProperty.Brightness, 0)
    }
}
input.onButtonPressed(Button.AB, function () {
    // plansza=0 gdy ukladamy statki
    //
    // plansza=1 tryb strzelania
    if (plansza == 0 && mojeStatki.length - 1 >= 1) {
        plansza = 1
        doUkryjMojeStatki()
    } else {
        doPokazMojeStatki()
        plansza = 0
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
let skasowany = 0
let indeks = 0
let newy = 0
let newx = 0
let jeszczeraz = 0
let trafiony = 0
let plansza = 0
let mojeStrzaly: game.LedSprite[] = []
let wrogieStatki: game.LedSprite[] = []
let mojeStatki: game.LedSprite[] = []
let kursor: game.LedSprite = null
kursor = game.createSprite(0, 0)
kursor.set(LedSpriteProperty.Blink, 250)
mojeStatki = []
wrogieStatki = []
mojeStrzaly = []
doGenerujStatkiWroga()
basic.pause(2000)
plansza = 0
basic.forever(function () {

})
 