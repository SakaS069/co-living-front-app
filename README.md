Déploiement d'une application Angular sur une VM Google Cloud

1. Création de la VM :

   - Fournisseur : Google Cloud Platform (GCP)
   - Image utilisée : Ubuntu 22.04 LTS
   - Pare-feu configuré pour autoriser le trafic HTTP et HTTPS

2. Génération de la clé SSH :

   - Création de la clé SSH :
     ssh-keygen -t rsa -b 4096 -C "alexandre@gcp"

   - Connexion à la VM :
     ssh -i ~/.ssh/id_gcp alexandre@34.76.212.175

3. Préparation du projet Angular :

   - Build de production :
     ng build --configuration=production
   - Un dossier dist/ est généré

4. Transfert du projet vers la VM :

   - Zippage du dossier dist/
   - Transfert du fichier zip vers la VM :
     scp -i ~/.ssh/id_gcp dist.zip alexandre@34.76.212.175:/tmp/
   - Extraction dans le dossier Apache :
     sudo unzip /tmp/dist.zip -d /var/www/html

5. Installation d'Apache et des dépendances :
   sudo apt update && sudo apt upgrade -y
   sudo apt install apache2 php php-mysql mysql-server unzip curl -y

6. Vérification de la présence des fichiers :
   ls -l /tmp/

7. Nettoyage des fichiers Apache par défaut :
   sudo chown -R www-data:www-data /var/www/html

8. Activation de mod_rewrite :
   sudo a2enmod rewrite
   sudo systemctl restart apache2

9. Configuration Apache pour autoriser .htaccess :

   - Modifier le fichier :
     sudo nano /etc/apache2/sites-available/000-default.conf
   - Ajouter le bloc :
     <Directory /var/www/html>
     AllowOverride All
     </Directory>

10. Redémarrage d'Apache :
    sudo systemctl restart apache2

11. Création du fichier .htaccess :
    sudo nano /var/www/html/.htaccess

    Contenu :
    <IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
    </IfModule>

12. Attribution des permissions :
    sudo chown www-data:www-data /var/www/html/.htaccess
    sudo chmod 644 /var/www/html/.htaccess

Conclusion :
L'application Angular est maintenant accessible via Apache sur la VM GCP.

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
