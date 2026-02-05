# Configuration du formulaire de contact

Le formulaire de contact utilise [Resend](https://resend.com) pour envoyer les emails.

## Configuration

### 1. Créer un compte Resend

1. Aller sur [https://resend.com](https://resend.com)
2. S'inscrire gratuitement (gratuit jusqu'à 3000 emails/mois)
3. Vérifier votre email

### 2. Obtenir une clé API

1. Se connecter au dashboard Resend
2. Aller dans **API Keys**
3. Cliquer sur **Create API Key**
4. Donner un nom (ex: "Portfolio Contact Form")
5. Copier la clé API (elle commence par `re_`)

### 3. Configurer les variables d'environnement

#### Option A : Fichier .env (local)

```bash
cd /srv/nathan-ferre.fr
cp .env.example .env
nano .env
```

Remplacer `your_resend_api_key_here` par votre clé API.

#### Option B : Variable d'environnement système (production)

```bash
# Ajouter au fichier de profil
echo 'export RESEND_API_KEY="re_votre_cle_ici"' >> ~/.bashrc
source ~/.bashrc
```

### 4. Vérifier les emails

Par défaut, avec un compte gratuit, vous pouvez uniquement envoyer des emails depuis `onboarding@resend.dev` vers des adresses que vous avez vérifiées.

Pour envoyer vers `nathanferrepro@gmail.com` :

1. Aller dans le dashboard Resend
2. Section **Domains** ou **Email addresses**
3. Ajouter et vérifier l'adresse email de destination

**OU** configurer votre propre domaine pour envoyer depuis (ex: `contact@nathan-ferre.fr`)

### 5. Rebuild et redéployer

```bash
cd /srv/nathan-ferre.fr
sudo docker-compose build azrael
sudo docker-compose up -d azrael
```

## Test

1. Aller sur https://nathan-ferre.fr/contact
2. Remplir le formulaire
3. Cliquer sur "Envoyer"
4. Vérifier la réception de l'email sur nathanferrepro@gmail.com

## Limitations du plan gratuit

- 3000 emails/mois
- 100 emails/jour
- Uniquement vers des adresses vérifiées (sauf si domaine configuré)

## Alternative sans Resend

Si vous préférez ne pas utiliser Resend, vous pouvez utiliser :
- **EmailJS** (frontend uniquement)
- **SendGrid** (15000 emails/mois gratuits)
- **Mailgun** (5000 emails/mois gratuits)
- **Nodemailer** avec SMTP Gmail/Outlook

Il faudra adapter le code dans `/srv/nathan-ferre.fr/azrael/pages/api/contact.ts`
