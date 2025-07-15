# Déploiement d'une Application Angular sur une VM Google Cloud (Ubuntu 22.04)

## 1. Création de la VM

- **Fournisseur** : Google Cloud Platform (GCP)
- **Image** : Ubuntu 22.04 LTS
- **Pare-feu** : cocher les cases :
  - Autoriser le trafic HTTP
  - Autoriser le trafic HTTPS

## 2. Connexion à la VM avec une clé SSH

### 2.1 Génération de la clé SSH (sur la machine locale)

```
ssh-keygen -t rsa -b 4096 -C "alexandre@gcp"
```

- Fichier généré : `~/.ssh/id_gcp` et `~/.ssh/id_gcp.pub`

### 2.2 Ajout de la clé publique à la VM

- Console GCP > Compute Engine > VM > Modifier > Clés SSH
- Ajouter le contenu de `id_gcp.pub`

### 2.3 Connexion SSH à la VM

```
ssh -i ~/.ssh/id_gcp alexandre@[IP_PUBLIC_VM]
```

---

## 3. Préparation de l'application Angular

### 3.1 Build de production

```
ng build --configuration=production
```

- Le dossier `dist/` est généré.

### 3.2 Création d’une archive ZIP

```
zip -r dist.zip dist/
```

---

## 4. Transfert du projet sur la VM

```
scp -i ~/.ssh/id_gcp dist.zip alexandre@[IP_PUBLIC_VM]:/tmp/
```

---

## 5. Installation d’Apache

Sur la VM :

```
sudo apt update && sudo apt upgrade -y
sudo apt install apache2 unzip curl -y
```

---

## 6. Déploiement de l'application sur Apache

### 6.1 Suppression des fichiers par défaut

```
sudo rm -rf /var/www/html/*
```

### 6.2 Extraction du projet Angular

```
sudo unzip /tmp/dist.zip -d /var/www/html
```

- Si les fichiers sont dans `dist/mon-app`, les déplacer :
  ```
  sudo mv /var/www/html/dist/mon-app/* /var/www/html/
  sudo rm -rf /var/www/html/dist
  ```

### 6.3 Attribution des permissions

```
sudo chown -R www-data:www-data /var/www/html
```

---

## 7. Configuration Apache pour Angular

### 7.1 Activation du module `mod_rewrite`

```
sudo a2enmod rewrite
sudo systemctl restart apache2
```

### 7.2 Autoriser les fichiers `.htaccess`

```
sudo nano /etc/apache2/sites-available/000-default.conf
```

Ajouter dans le bloc `<VirtualHost *:80>` :

```apache
<Directory /var/www/html>
    AllowOverride All
</Directory>
```

Puis :

```
sudo systemctl restart apache2
```

---

## 8. Configuration du fichier `.htaccess`

Créer le fichier `.htaccess` :

```
sudo nano /var/www/html/.htaccess
```

Ajouter :

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

Appliquer les permissions :

```
sudo chown www-data:www-data /var/www/html/.htaccess
sudo chmod 644 /var/www/html/.htaccess
```

---

## Accès à l'application

L'application Angular est maintenant accessible via :

```
http://[IP_PUBLIC_VM]
```

---

## Bonus

- Pour un nom de domaine : configure un enregistrement A pointant vers l'IP de la VM.
- Pour HTTPS : installe Let's Encrypt avec Certbot.

---

# MyBadLocation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.20.

## Development server

Run `npm i --f` to install deps ( tailwind need force )
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
![alt text](<Capture d'écran 2025-07-15 094501.png>)
