# 🖥️ Portfolio BTS SIO / BACHELOR AIS

> Portfolio statique développé en **HTML / CSS / JavaScript vanilla** — hébergé en **on-premise** avec Nginx.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat&logo=nginx&logoColor=white)

---

## 📋 Pages

| Page | Rôle |
|------|------|
| `index.html` | Accueil — hero, compétences, stats animées |
| `projets.html` | Projets techniques avec modales |
| `realisations.html` | Stages, compétences, certifications |
| `veille.html` | Flux RSS Google Alerts en temps réel |
| `contact.html` | Formulaire EmailJS + reCAPTCHA v3 |
| `404.html` | Page d'erreur personnalisée |

**Fonctionnalités :**
- 🌙 Dark / Light mode persistant
- 🖱️ Curseur personnalisé
- 📡 Flux RSS Google Alerts (proxy Nginx local)
- 📬 Formulaire de contact sans backend (EmailJS)
- ⚡ Animations au scroll
- 🔢 Compteurs animés
- 📱 Responsive mobile

---

## ⚙️ Configuration

### 1. Personnalisation

Recherche et remplace dans tous les fichiers :

| Placeholder | Remplacer par |
|-------------|---------------|
| `Votre Nom` | Ton nom complet |
| `VOTRE_NOM` | Ton nom en majuscules |
| `votre.email@gmail.com` | Ton adresse email |
| `VOTRE_DOMAINE` | Ton domaine (ex: monsite.fr) |
| `VOTRE_GITHUB` | Ton pseudo GitHub |
| `VOTRE_PROFIL_LINKEDIN` | Ton profil LinkedIn |
| `CV_VOTRE_NOM.pdf` | Le nom de ton CV |
| `Votre Région` | Ta région |
| `Votre Ville` | Ta ville |
| `Votre École` | Ton école |

### 2. EmailJS (formulaire de contact)

Dans `contact.html`, remplace :
```js
var EJS_PUBLIC_KEY  = 'VOTRE_PUBLIC_KEY';
var EJS_SERVICE_ID  = 'VOTRE_SERVICE_ID';
var EJS_TEMPLATE_ID = 'VOTRE_TEMPLATE_ID';
```
→ [emailjs.com](https://www.emailjs.com) pour obtenir tes clés

### 3. reCAPTCHA v3 (anti-spam)

Dans `contact.html`, remplace `VOTRE_RECAPTCHA_SITE_KEY` par ta clé publique.
→ [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)

### 4. Google Alerts RSS (veille)

Dans `veille.html`, remplace les URLs :
```js
var RSS_FEEDS = [
    { name: 'Google Alerts', url: '/rss-proxy/VOTRE_GOOGLE_ALERTS_ID/VOTRE_FEED_ID' },
];
```
→ [google.com/alerts](https://www.google.com/alerts) pour créer tes alertes RSS

---

## 🚀 Hébergement on-premise avec Nginx

### Prérequis
- Ubuntu Server
- Nginx
- Certbot (Let's Encrypt)
- UFW + Fail2Ban

### Déploiement rapide

```bash
# Copier les fichiers
sudo cp -r portfolio/ /var/www/html/portfolio/

# Droits
sudo chown -R www-data:www-data /var/www/html/portfolio/
sudo find /var/www/html/portfolio/ -type d -exec chmod 755 {} \;
sudo find /var/www/html/portfolio/ -type f -exec chmod 644 {} \;

# Recharger Nginx
sudo systemctl reload nginx
```

### Proxy RSS dans Nginx

Ajoute dans ton `server {}` pour le flux RSS Google Alerts :
```nginx
location /rss-proxy/ {
    proxy_pass https://www.google.com/alerts/feeds/;
    proxy_ssl_server_name on;
    proxy_set_header Host www.google.com;
    proxy_set_header User-Agent "Mozilla/5.0 ...";
    add_header Access-Control-Allow-Origin "https://VOTRE_DOMAINE";
}
```

---

## 📁 Structure

```
portfolio/
├── css/
│   └── style.css       ← Styles partagés
├── js/
│   └── main.js         ← Scripts partagés
├── index.html
├── projets.html
├── realisations.html
├── veille.html
├── contact.html
├── 404.html
├── robots.txt
├── sitemap.xml
└── CV_VOTRE_NOM.pdf
```

---

## 🔒 Sécurité

- Headers HTTP sécurité (CSP, HSTS, X-Frame-Options…)
- Rate limiting Nginx (30 req/min par IP)
- UFW pare-feu
- Fail2Ban (protection brute force SSH + Nginx)
- Droits fichiers 644/755
- Certificat SSL Let's Encrypt (auto-renouvellement)

---

> Projet réalisé dans le cadre du **BTS SIO SISR** / **BACHELOR AIS**.
