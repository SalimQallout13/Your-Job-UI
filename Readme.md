# Projet Your Job

Ce document fournit des instructions pour configurer et exécuter le projet Hexapol localement en utilisant pnpm.

## Prérequis

Avant de commencer, assurez-vous que les éléments suivants sont installés sur votre système :

- Node.js (version 21.x ou supérieure)
- pnpm (version 9.x ou supérieure)

### Pour Windows avec WSL (Windows Subsystem for Linux) :

1. **Installez WSL** :
    - Ouvrez PowerShell en tant qu'administrateur et exécutez :
      ```
      wsl --install
      ```
    - Redémarrez votre ordinateur après l'installation.

2. **Installez Node.js et npm** :
    - Ouvrez votre terminal WSL.
    - Exécutez les commandes suivantes :
      ```
      curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
      sudo apt-get install -y nodejs
      ```

3. **Installez pnpm** :
    - Dans le terminal WSL, exécutez :
      ```
      npm install -g pnpm
      ```


### Pour Windows :

1. **Node.js et npm** :
    - Téléchargez et installez Node.js depuis [le site officiel de Node.js](https://nodejs.org/).
    - npm (Node Package Manager) est inclus avec Node.js.

2. **pnpm** :
    - Ouvrez PowerShell en tant qu'administrateur.
    - Exécutez la commande suivante :
      ```
      npm install -g pnpm
      ```

### Pour macOS :

1. **Homebrew** (gestionnaire de paquets pour macOS) :
    - Ouvrez le Terminal.
    - Installez Homebrew en exécutant :
      ```
      /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
      ```

2. **Node.js et npm** :
    - Dans le Terminal, exécutez :
      ```
      brew install node
      ```

3. **pnpm** :
    - Dans le Terminal, exécutez :
      ```
      npm install -g pnpm
      ```

## Mise en Place

Pour configurer votre environnement de développement local, suivez ces étapes :

1. **Clonez le dépôt** :
   Clonez ce dépôt Git sur votre machine locale.

2. **Configurez le fichier `.env`** :
   Demandez le fichier `.env` nécessaire à l'administrateur du projet pour l'application.

3. **Installez les dépendances** :
   Dans le répertoire du projet, exécutez :
    ```
    pnpm install
    ```

## Démarrage du Projet

Utilisez la commande suivante pour lancer le projet :

```bash
pnpm dev
```

## Commandes

pnpm dev : Démarre l'application en mode développement.

pnpm build : Construit l'application en mode production.

pnpm lint : Vérifie les erreurs de syntaxe et des conventions dans le code.