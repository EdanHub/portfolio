# Outils qualité

Recueil d'outils qualité génériques, développés au fil des projets et pensés pour être
réutilisés d'un contexte à l'autre. Chaque outil est un fichier HTML autonome : il
fonctionne dans le navigateur, hors ligne, sans compte ni installation, et ses données
restent sur le poste de l'utilisateur.

## Outils

| N° | Outil | Usage | Dossier |
|----|-------|-------|---------|
| 01 | **Arbre des causes** | Analyse de causes (5M / 8M), contrôle de l'analyse, bibliothèque de causes, retour d'expérience. Exports PDF, Word, Visio, Excel, SVG, PNG. | [`outils/arbre-des-causes/`](outils/arbre-des-causes/) |
| 02 | **Audit interne ISO 19443** | Préparation, plan d'audit, checklist terrain, constats, vérification avant émission et rapport Word ou PDF. Référentiel ISO 9001 / ISO 19443 intégré, import Excel / CSV. | [`outils/audit-iso19443/`](outils/audit-iso19443/) |
| 03 | **Visite terrain Gemba** | Gemba walk qualité et sûreté sur téléphone : grille de 67 points en 15 thèmes, photos, suites données aux écarts, compte rendu Word ou PDF, pilotage multi-visites et export Excel. | [`outils/visite-gemba/`](outils/visite-gemba/) |

## Utilisation

- **En ligne** : ouvrir la page d'accueil du site, puis l'outil voulu.
- **Hors ligne** : télécharger le fichier `index.html` de l'outil et l'ouvrir dans Edge,
  Chrome ou Firefox.
- **Sauvegarde et partage** : chaque outil exporte et importe sa base en JSON.

Par défaut, aucune donnée n'est envoyée : tout est stocké dans le navigateur (`localStorage`,
et IndexedDB pour les photos de la visite Gemba). Seule exception, facultative : la visite
Gemba peut envoyer ses comptes rendus vers un flux Power Automate configuré par l'organisation.

## Deux points d'entrée

| Adresse | Contenu | Usage |
|---------|---------|-------|
| `/outils/` | Catalogue des outils seul, sans nom ni profil | Lien à donner aux collaborateurs |
| `/` | Catalogue des outils, section Auteur et lien vers le profil | Lien pour le CV ou un partage plus personnel |
| `/profil/` | Profil, réalisations, expertise, contact | Accessible depuis `/` |

Les pages des outils sont communes aux deux versions et ne citent pas l'auteur. Leur lien
« ← Outils » ramène à la page d'accueil d'où vient le visiteur.

## Structure

```
index.html              accueil avec profil : catalogue + auteur
outils/index.html       accueil sans profil : catalogue seul
outils/<outil>/         un dossier par outil (index.html autonome)
profil/                 profil et réalisations de l'auteur
assets/                 feuille de style, script et icônes communs au site
```

Pour ajouter un outil : déposer son fichier dans `outils/<nom>/index.html`, puis ajouter
une ligne au catalogue (modèle `outil-NN`) dans **les deux** pages d'accueil,
`index.html` et `outils/index.html`, ainsi qu'à la table ci-dessus.

## Auteur

Edân Colak, Gestionnaire Système Qualité · [profil et réalisations](profil/) ·
[LinkedIn](https://www.linkedin.com/in/ed%C3%A2n/)
