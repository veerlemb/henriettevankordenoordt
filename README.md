# Henriette van Kordenoordt – intuïtieve astrologie

Statische website. Geen database, geen server en geen maandelijkse kosten. Je kunt de site gratis neerzetten op GitHub Pages, Netlify of Cloudflare Pages.

De teksten staan in gewone bestanden. Je hebt geen programma nodig om ze te wijzigen: een teksteditor (of het bewerkscherm van GitHub of Netlify) is genoeg.

## Lokaal bekijken

In deze map, in Terminal:

```bash
python3 -m http.server 43123
```

Open daarna [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Teksten en prijzen wijzigen

Open `index.html` en zoek de tekst die je wilt aanpassen.

| Wat | Zoek op |
| --- | --- |
| Welkomsttekst | `Welkom` |
| Astrologie, €95 | `id="astrologie"` |
| Tarot, €75 | `id="tarot"` |
| Reiki | `id="reiki"` |
| Telefoon | `06 1852 7571` en `+31618527571` |
| E-mail | `henrietkorden@gmail.com` |
| KVK | `90093119` |

Prijzen staan twee keer bij een dienst: groot onder de tekst, en in de mailto-link (`€95` of `€75` in het webadres van de link). Pas beide aan, anders klopt de mail niet met de pagina.

De zin bovenaan de pagina (de meta-omschrijving voor Google) staat in `<meta name="description" …>`. Houd die rond de twee regels.

## Foto’s wijzigen

Foto’s staan in de map `fotos/`. De galerij op de oude site is overgenomen. Een korte uitleg ligt ook in `fotos/LEES-MIJ.txt`.

Een foto vervangen:

1. Zet de nieuwe foto in `fotos/`.
2. Gebruik het liefst dezelfde bestandsnaam, dan hoef je verder niets te doen.
3. Of zoek in `index.html` op `fotos/` en pas de bestandsnaam, `width`, `height` en de alt-tekst aan. De galerij toont geen bijschrift.

Scherper resultaat: foto’s van minstens 1200 pixels breed. De portretten van de oude site zijn klein (ongeveer 300 pixels). Van dichtbij kunnen ze daardoor iets zacht ogen.

Instagram ([henriettevkordenoordt](https://www.instagram.com/henriettevkordenoordt/)) en Facebook ([henriette.kordenoordt](https://www.facebook.com/henriette.kordenoordt)) vragen om inloggen. Daardoor konden die foto’s niet automatisch worden opgehaald. Sla een foto zelf op, zet hem in `fotos/` en voeg in de galerij een extra blok toe. Kopieer een bestaand `<figure>…</figure>` en verander de namen.

## Contactformulier

De knop **Open e-mail** vult een bericht en opent het e-mailprogramma van de bezoeker. Dat werkt op elke host, ook als die geen formulieren aanbiedt. Er wordt niets op de website opgeslagen.

Het formulier heeft ook een Netlify-kenmerk (`data-netlify="true"`). Wil je dat Netlify de berichten in het Netlify-dashboard bewaart in plaats van het e-mailprogramma te openen, haal dan in `js/site.js` de regel `event.preventDefault();` weg. Daarna is een nieuw bezoek aan de site op Netlify nodig zodat Netlify het formulier ziet.

## Gratis online zetten

Publiceer de **hele map** zoals die is. Er is geen build-stap. Het bestand `index.html` moet in de hoofdmap van de site staan, niet in een submap.

### GitHub Pages

1. Maak een gratis account op [github.com](https://github.com).
2. Maak een nieuwe repository en upload alle bestanden (of laat iemand de map pushen).
3. Ga naar **Settings → Pages**.
4. Kies branch `main` en map `/ (root)`. Sla op.
5. Na een minuut staat de site op `https://jouwnaam.github.io/repositorynaam/`.

### Netlify

1. Maak een gratis account op [netlify.com](https://www.netlify.com).
2. **Add new site → Deploy manually** en sleep deze map erin.
3. Of koppel de GitHub-repository. Build command leeg laten. Publish directory: `.` (de hoofdmap). Het bestand `netlify.toml` zegt dat al.

### Cloudflare Pages

1. Maak een gratis account op [cloudflare.com](https://www.cloudflare.com).
2. **Workers & Pages → Create → Pages → Upload assets** en upload deze map.
3. Of koppel GitHub. Geen build command. Output directory: `.`

## Het domein henriettevankordenoordt.nl

Het domein gebruikt nu de nameservers van **Hostnet** (`ns01.hostnet.nl` en `ns02.hostnet.nl`). De website wijst naar het oude Weebly-adres `199.34.228.78`.

Zo koppel je het domein aan de nieuwe site:

1. Zet de nieuwe site eerst online bij GitHub, Netlify of Cloudflare en controleer dat hij er goed uitziet.
2. Log in bij [Hostnet](https://www.hostnet.nl) → **Domeinnamen** → **henriettevankordenoordt.nl** → **DNS-beheer**.
3. Wijzig alleen de records voor de website. Laat TXT-records staan. Er staan geen MX-records (e-mail) op dit domein. Het adres `henrietkorden@gmail.com` is Gmail en verandert niet mee.
4. Wacht daarna een uur tot een dag. Daarna vervangt de nieuwe site de oude. Zet bij de host **HTTPS** aan (bij GitHub: Enforce HTTPS). Dat certificaat is gratis.

### Records bij GitHub Pages

Vervang het A-record `199.34.228.78` van het hoofddomein door deze vier A-records:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

Zet `www` op een CNAME naar `jouwnaam.github.io` (zonder `https://`).

Maak in de repository een bestand `CNAME` met precies één regel:

```text
henriettevankordenoordt.nl
```

Vul bij GitHub Pages ook **Custom domain** in. Controleer de adressen op de [documentatie van GitHub Pages](https://docs.github.com/pages) als dit later niet meer klopt.

### Records bij Netlify of Cloudflare

Het dashboard toont de juiste records nadat je het domein toevoegt. Meestal:

- hoofddomein (`henriettevankordenoordt.nl`): het A-record of ALIAS-record dat zij noemen, in plaats van `199.34.228.78`;
- `www`: een CNAME naar het adres dat zij noemen, bijvoorbeeld `iets.netlify.app` of `iets.pages.dev`.

Gebruik de adressen uit het dashboard. Die kunnen wijzigen; de vier GitHub-adressen hierboven zijn alleen voor GitHub Pages.

## Bestanden die je meestal niet aanraakt

| Bestand | Rol |
| --- | --- |
| `css/styles.css` | Kleuren, lettertypen, indeling |
| `js/site.js` | Menu, fotoviewer, e-mailknop |
| `fonts/` | Lettertypen, licentie in `fonts/OFL.txt` |
| `sitemap.xml` en `robots.txt` | Voor zoekmachines |
| `favicon.svg` | Icoon in het browsertabblad |
| `og.jpg` | Plaatje dat Facebook en WhatsApp tonen bij een link |
| `netlify.toml` | Instelling voor Netlify |
