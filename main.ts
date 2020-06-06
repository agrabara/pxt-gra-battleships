function doUkryjWrogieStrzaly () {
    for (let value of wrogieStrzaly) {
        value.set(LedSpriteProperty.Brightness, 0)
    }
}

function doUkryjMojeStrzaly () {
    for (let value of mojeStrzaly) {
        value.set(LedSpriteProperty.Brightness, 0)
    }
}

function doUkryjMojeStatki () {
    for (let value of mojeStatki) {
        value.set(LedSpriteProperty.Brightness, 0)
    }
}
function doPokazMojeStatki () {
    for (let value of mojeStatki) {
        value.set(LedSpriteProperty.Brightness, 20)
    }
}

function doUkryjWrogieStatki () {
    for (let value of wrogieStatki) {
        value.set(LedSpriteProperty.Brightness, 0)
    }
}
function doPokazWrogieStatki () {
    for (let value of wrogieStatki) {
        value.set(LedSpriteProperty.Brightness, 20)
    }
}

function doUkryjPlansze () {
    doUkryjMojeStatki()
    doUkryjWrogieStatki()
    doUkryjMojeStrzaly()
    doUkryjWrogieStrzaly()
}

/**
 * Funkcja rysuje planszę z naszymi statkami i strzałami wroga (trafione nie migają)
*/
function doMojaPlansza () {
    basic.clearScreen()
    doUkryjPlansze()
    basic.showIcon(IconNames.Skull)
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

/**
 * Funkcja rysuje planszę z wrogimi statkami (trafionymi) i naszymi strzałami
*/
function doWrogaPlansza () {
    basic.clearScreen()
    doUkryjPlansze()
    basic.showIcon(IconNames.Pitchfork)
    //doPokazWrogieStatki()
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


/**
 * Funkcja strzału komputera
*/
function doStrzalPrzeciwnika () {
    jeszczeraz = 1
    while (jeszczeraz == 1) {
        jeszczeraz = 0
        newx = Math.randomRange(0, 4)
        newy = Math.randomRange(0, 4)
        for (let value of wrogieStrzaly) {
            if (value.get(LedSpriteProperty.X) == newx && value.get(LedSpriteProperty.Y) == newy) {
                jeszczeraz = 1
            }
        }
    }
    wrogieStrzaly.push(game.createSprite(newx, newy))
    wrogieStrzaly[wrogieStrzaly.length - 1].set(LedSpriteProperty.Brightness, 100)
    wrogieStrzaly[wrogieStrzaly.length - 1].set(LedSpriteProperty.Blink, 750)
    for (let value7 of mojeStatki) {
        if (value7.get(LedSpriteProperty.X) == newx && value7.get(LedSpriteProperty.Y) == newy) {
            game.addScore(1)
            wrogieStrzaly[wrogieStrzaly.length - 1].set(LedSpriteProperty.Brightness, 180)
            wrogieStrzaly[wrogieStrzaly.length - 1].set(LedSpriteProperty.Blink, 0)
            wynikwroga += 1
        }
    }
    if (wynikwroga >= 8) {
        // przegrałeś!
        game.setScore(wynikwroga)
        game.gameOver()
    }
}

/**
 * Funkcja strzela - sprawdzamy czy trafiliśmy w statek przeciwnika i czy wygraliśmy
*/
function doStrzelaj () {
    trafiony = 0
    for (let value of wrogieStatki) {
        if (value.get(LedSpriteProperty.X) == kursor.get(LedSpriteProperty.X) && value.get(LedSpriteProperty.Y) == kursor.get(LedSpriteProperty.Y)) {
            juztrafiony = 0
            for (let value2 of mojeStrzaly) {
                if (value2.get(LedSpriteProperty.X) == kursor.get(LedSpriteProperty.X) && value2.get(LedSpriteProperty.Y) == kursor.get(LedSpriteProperty.Y)) {
                    juztrafiony = 1
                }
            }
            if (juztrafiony == 0) {
                // jak już kiedyś trafiłęm statek, to nie zaliczam trafionego
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
        // wygrałeś!!!!
        kursor.set(LedSpriteProperty.Brightness, 0)
        doUkryjPlansze()
        game.addScore(1)
        basic.pause(2000)
        game.addScore(1)
        basic.pause(2000)
        basic.showString("YOU WIN!!!!!")
        basic.pause(2000)
        game.setScore(wynik)
        game.showScore()
        doWrogaPlansza()
        basic.pause(5000)
        game.gameOver()
    }
}

/**
 * Funkcja ustawia statek, albo strzela w zależności od trybu
*/
input.onButtonPressed(Button.A, function () {
    // plansza=0 gdy ukladamy statki
    // 
    // plansza=1 tryb strzelania
    // 
    // plansza=2 gdy strzela przeciwnik
    if (plansza == 0) {
        doUstawStatek()
    } else if (plansza == 1) {
        doStrzelaj()
        basic.pause(2000)
        plansza = 2
    } else {
    	
    }
})
input.onButtonPressed(Button.AB, function () {
    // plansza=0 gdy ukladamy statki
    //           dopiero po ustawieniu 8 statków można grać dalej
    // 
    // plansza=1 tryb strzelania
    // 
    // plansza=2 gdy strzela przeciwnik
    if (plansza == 0 && mojeStatki.length >= 8) {
        kursor.set(LedSpriteProperty.Brightness, 0)
        doUkryjPlansze()
        game.addScore(1)
        basic.pause(2000)
        basic.showString("GO!!!")
        plansza = 1
        doWrogaPlansza()
        kursor.set(LedSpriteProperty.Brightness, 255)
      }
})

input.onButtonPressed(Button.B, function () {
    if (plansza < 2) { 
        // przycisk B działa tylko jak jesteśmy w trybie naszego strzelania
        // lub ustawiania statków
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
    }
})

/**
 * Funkcja obsługuje układanie naszych statków
*/
function doUstawStatek () {
    indeks = 0
    skasowany = 0
    for (let value of mojeStatki) {
        if (value.get(LedSpriteProperty.X) == kursor.get(LedSpriteProperty.X) && value.get(LedSpriteProperty.Y) == kursor.get(LedSpriteProperty.Y)) {
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

/**
 * Funkcja generuje losowo statki wroga, ale tak aby nie nakładały się
*/
function doGenerujStatkiWroga () {
    for (let index = 0; index < 8; index++) {
        jeszczeraz = 1
        while (jeszczeraz == 1) {
            jeszczeraz = 0
            newx = Math.randomRange(0, 4)
            newy = Math.randomRange(0, 4)
            for (let value of wrogieStatki) {
                if (value.get(LedSpriteProperty.X) == newx && value.get(LedSpriteProperty.Y) == newy) {
                    jeszczeraz = 1
                }
            }
        }
        wrogieStatki.push(game.createSprite(newx, newy))
        wrogieStatki[wrogieStatki.length - 1].set(LedSpriteProperty.Brightness, 20)
    }
}

/**
 * Gra z 6, 7, 8 i 9 zajęć CoderDojo-Micto:bit 
 * zdalnie 2020.05.16, 2020.05.23, 2020.05.30, 2020.06.06 obecni: Michalina, Maks, Rafał, Michał
 * 
 * Battleships - gra w statki wersja z komputerem
 * 
 * 1. Gra rozpoczyna się od ułożenia statków (ustawiasz 8)
 *      B - sterowanie kursorem
 *      A - ustawienie/usunięcie statku
 *      A+B - po ustwieniu 8 statków, uruchomienie gry dalej
 * 2. Nasz herb to trójząb (IconNames.Pitchfork)
 * 3. Etap strzelania - pojawia się plansza z oddanymi już strzałami
 *  (na początku jest pusta). 
 *  Trafione statki wroga są jasnymi punktami.
 *  "Pudła" migają bladym kolorem.
 *      B - sterowanie kursorem
 *      A - strzał
 * 4. Wrogi herb to trupia czaszka (IconNames.Skull)
 * 5. Etap strzelania wroga - pojawia się plansza z naszymi statkami (blade)
 *   oddanymi już strzałami wroga. 
 *   Zatopione nasze statki są jasnymi punktami.
 *   "Pudła" migają bladym kolorem.
 *   Komputer losuje i strzela.
 * 6. Kto zatopi statki przeciwnika - wygrywa
 
*/
let skasowany = 0
let indeks = 0
let juztrafiony = 0
let trafiony = 0
let newy = 0
let newx = 0
let jeszczeraz = 0
let wynikwroga = 0
let wynik = 0
let plansza = 0
let wrogieStrzaly: game.LedSprite[] = []
let mojeStrzaly: game.LedSprite[] = []
let wrogieStatki: game.LedSprite[] = []
let mojeStatki: game.LedSprite[] = []
let kursor: game.LedSprite = null
kursor = game.createSprite(0, 0)
kursor.set(LedSpriteProperty.Brightness, 0)
mojeStatki = []
wrogieStatki = []
mojeStrzaly = []
wrogieStrzaly = []
doGenerujStatkiWroga()
doUkryjWrogieStatki()
basic.showString("Battleships")
basic.pause(2000)
plansza = 0
wynik = 0
wynikwroga = 0
kursor.set(LedSpriteProperty.Blink, 250)
kursor.set(LedSpriteProperty.Brightness, 250)



basic.forever(function () {
    if (plansza == 2) {
        // tryb strzeniania wroga
        kursor.set(LedSpriteProperty.Brightness, 0)
        doMojaPlansza()
        basic.pause(2000)
        doStrzalPrzeciwnika()
        basic.pause(5000)
        plansza = 1
        doWrogaPlansza()
        kursor.set(LedSpriteProperty.Brightness, 255)
    }
    basic.pause(100)
})
