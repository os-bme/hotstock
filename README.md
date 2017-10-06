# Hotstock

[![Join the chat at https://gitter.im/os-bme/hotstock](https://badges.gitter.im/os-bme/hotstock.svg)](https://gitter.im/os-bme/hotstock?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Pályázatis portál, ami a [vik.hk által kiírt pályázatok](https://vik.hk/palyazatok) leadására és feldolgozására szolgál.

## Futtatás

**Futtatáshoz hajtsd végre a következőket:**

###### Install Node.js

```bash
$ sudo apt-get install nodejs
```

###### Install Express

```bash
$ npm install express
```

###### Install MongoDB 

```bash
$ sudo apt-get install mongodb
```

###### Webstorm telepítés - ajánlott


###### Robomongo telepítés - ajánlott

## Kezdetleges specifikációja a portálnak

A jelenlegi pályázataink közül a következőket érinti az portál: 

 - [AIT](https://vik.hk/ait-palyazat)
 - [Jegyzet pályázat](https://vik.hk/jegyzetpalyazat)
 - [Szakmai KBME](https://vik.hk/palyazatok/kbme)
 - [Sportösztöndíj](https://vik.hk/sportosztondij)
 - [Konzultáció pályázat](https://vik.hk/konzultacio-palyazat)
 - [Utazási pályázat](https://vik.hk/utazasi-palyazat)
 - [Konferencia pályázat](https://vik.hk/konferencia-palyazat)

A következő pályázatokat (egyelőre) nem kell a portálnak megvalósítania:

- Kar kiváló oktatója
- VIKÖ


### Cél:
Könnyen kezelhető weboldal pályázatok leadására és elbírálására.

### Technikai részletek:
Az portál a MEAN Full Stack Javascript Framwork-re épül, azaz MongoDB , ExpressJS , AngularJS and Node.js alapokra.

### Megvalósítandó funkciók

Autentikáció:

- OAuth (BME vagy AuthSCH) login használata

Pályázóként:

- Aktív pályázatok listázása
- Pályázatra jelentkezés
- Pályázataim eredménye

Pályázat kiíróként:

- Pályázatot lehessen felvenni.
- Pályázati időszak kezdetét és végét is meg kell adni.
- Meg lehet változtatni a pályázási időszak végét (csúszás esetére)
- Archiválni lehessen pályázatot
- Értesítést küldeni az eredményekről a pályázóknak
- Statisztikát lekérni
- Pontozási tábla generálása a HSZI-nek

Bírálóként:

- Névtelen adatokkal dolgozni
- Leadott pályázatok átnézése
- Leadott pályázatok pontozása

Pontozás mente:

- Pontozási csoportok alapján pontozás
- Leadott egész pályázat pontozása
 

Pályázatra jelentkezés menete:

- Adatlap kitöltése
- Kísérőlevél
- Igazolásokat lehessen feltölteni (szövegesen vagy fájlban) [Linket lehessen megosztani egy eseményről]

Online dokumentum tár

- A gyakrabban használt, nem változó dokumentumokat lehessen közösen tárolni.
