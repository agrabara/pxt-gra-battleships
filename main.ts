function doUkryjMojeStatki() {
    for (let value of moje_statki) {
        value.set(LedSpriteProperty.Brightness, 0)
    }
}
function doPokażMojeStatki() {
    for (let value of moje_statki) {
        value.set(LedSpriteProperty.Brightness, 250)
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
    skasowane = 0
    indeks = 0
    for (let value of moje_statki) {
        if (value.get(LedSpriteProperty.X) == kursor.get(LedSpriteProperty.X) && value.get(LedSpriteProperty.Y) == kursor.get(LedSpriteProperty.Y)) {
            moje_statki.removeAt(indeks).delete()
            skasowane = 1
        }
        indeks += 1
    }
    if (skasowane == 0 && moje_statki.length < 8) {
        moje_statki.push(game.createSprite(kursor.get(LedSpriteProperty.X), kursor.get(LedSpriteProperty.Y)))
        moje_statki[moje_statki.length - 1].set(LedSpriteProperty.Brightness, 250)
    }
})
input.onButtonPressed(Button.AB, function () {
    if (plansza == 0) {
        doUkryjMojeStatki()
        plansza = 1
    } else {
        doPokażMojeStatki()
        plansza = 0
    }
})
function doGenerujStatkiWroga() {
    for (let index = 0; index < 8; index++) {
        jr = 1
        while (jr == 1) {
            jr = 0
            newx = Math.randomRange(0, 4)
            newy = Math.randomRange(0, 4)
            for (let value of wrogie_statki) {
                if (value.get(LedSpriteProperty.X) == newx && value.get(LedSpriteProperty.Y) == newy) {
                    jr = 1
                }
            }
        }
        wrogie_statki.push(game.createSprite(newx, newy))
        wrogie_statki[wrogie_statki.length - 1].set(LedSpriteProperty.Brightness, 50)
    }
}
let newy = 0
let newx = 0
let jr = 0
let indeks = 0
let skasowane = 0
let plansza = 0
let wrogie_statki: game.LedSprite[] = []
let moje_statki: game.LedSprite[] = []
let kursor: game.LedSprite = null
kursor = game.createSprite(0, 0)
kursor.set(LedSpriteProperty.Blink, 250)
moje_statki = []
wrogie_statki = []
doGenerujStatkiWroga()
plansza = 0
 