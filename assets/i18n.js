/* Langue du site : français (texte source des pages) ou anglais.
   Le choix est partagé avec les outils par localStorage['lang'], comme le thème.
   - ?lang=en ou ?lang=fr dans l'adresse force la langue (lien à partager).
   - Sans choix enregistré : français si le navigateur est en français, anglais sinon.
   Traduction : chaque nœud texte (et title, aria-label, alt, meta) dont le texte français
   figure dans le dictionnaire EN est remplacé. Un élément portant data-en="…" voit tout son
   contenu remplacé (cas où l'ordre des mots change, ex. « Outils<br>qualité »).
   Ajouter une phrase française sur une page = ajouter sa traduction ci-dessous ;
   sinon elle reste en français en mode anglais. ?i18n-debug liste les textes non traduits. */
(function () {
  'use strict';

  var KEY = 'lang';

  var EN = {
    /* ── commun ─────────────────────────────────────────── */
    "Aller au contenu": "Skip to content",
    "Navigation principale": "Main navigation",
    "Liens de pied de page": "Footer links",
    "Passer en mode sombre": "Switch to dark mode",
    "Passer en mode clair": "Switch to light mode",
    "Mode clair / sombre": "Light / dark mode",
    "Tout déplier": "Expand all",
    "Tout replier": "Collapse all",
    "Sommaire": "Contents",
    "N°": "No.",
    "Statut": "Status",
    "Domaine": "Field",
    "Rôle": "Role",
    "Volume": "Volume",
    "Contexte": "Context",
    "Problème": "Problem",
    "Approche": "Approach",
    "Livrable": "Deliverable",
    "Résultat": "Result",
    "Usage": "Use",
    "Méthode": "Method",
    "Exports": "Exports",
    "Données": "Data",
    "E-mail": "Email",
    "Outils": "Tools",
    "Outil": "Tool",
    "Profil": "Profile",
    "Auteur": "Author",
    "Principes": "Principles",

    /* ── accueils (avec et sans profil) ─────────────────── */
    "Outils qualité · Edân Colak": "Quality tools · Edân Colak",
    "Outils qualité": "Quality tools",
    "Recueil d'outils qualité génériques développés par Edân Colak : arbre des causes, audit interne ISO 19443, visite terrain Gemba. Autonomes, hors ligne, sans compte, données conservées dans le navigateur.":
      "A collection of generic quality tools developed by Edân Colak: cause tree, ISO 19443 internal audit, Gemba walk. Standalone, offline, no account, data kept in the browser.",
    "Recueil d'outils qualité génériques : arbre des causes, audit interne ISO 19443, visite terrain Gemba. Autonomes, hors ligne, sans compte, données conservées dans le navigateur.":
      "A collection of generic quality tools: cause tree, ISO 19443 internal audit, Gemba walk. Standalone, offline, no account, data kept in the browser.",
    "Outils qualité génériques et autonomes : analyse de causes, audit interne ISO 19443, visite terrain Gemba, exports Word, Excel, PDF et Visio.":
      "Generic, standalone quality tools: cause analysis, ISO 19443 internal audit, Gemba walk, Word, Excel, PDF and Visio exports.",
    "Accueil, outils qualité": "Home, quality tools",
    "EC · Outils qualité": "EC · Quality tools",
    "03 outils": "03 tools",
    "Recueil d'outils": "Tool collection",
    "Des outils génériques pour le système qualité, construits pour des besoins rencontrés en projet et pensés pour être réutilisés d'un contexte à l'autre.":
      "Generic tools for the quality management system, built for needs met on real projects and designed to be reused from one context to the next.",
    "Format": "Format",
    "Application web autonome": "Standalone web application",
    "Accès": "Access",
    "Libre · sans compte ni installation": "Open · no account, no installation",
    "Conservées sur l'appareil · aucun envoi par défaut": "Kept on the device · nothing sent by default",
    "· Gestionnaire Système Qualité": "· Quality Systems Manager",
    "Outils disponibles": "Available tools",
    "Accès direct": "Quick access",
    "Arbre des causes": "Cause tree",
    "Audit interne ISO 19443": "ISO 19443 internal audit",
    "Visite terrain Gemba": "Gemba walk",
    "Ouvrir →": "Open →",
    "Catalogue des outils": "Tool catalogue",
    "Analyse de causes · 5M / 8M": "Cause analysis · 5M / 8M",
    "Disponible": "Available",
    "Ouvrir l'outil": "Open the tool",
    "Télécharger le fichier": "Download the file",
    "Fonctionnalités": "Features",
    "D'autres outils viendront compléter ce recueil au fil des projets.": "More tools will join this collection as new projects come along.",

    /* outil 01 */
    "Arbre des causes · 5M / 8M": "Cause tree · 5M / 8M",
    "FNC · CAPA · réclamation · audit": "NCR · CAPA · complaint · audit",
    "Conduire l'analyse d'une non-conformité, d'une réclamation ou d'un écart d'audit jusqu'à la cause racine, l'associer à des actions correctives et préventives, puis capitaliser les causes d'une analyse à l'autre.":
      "Take the analysis of a nonconformity, a complaint or an audit finding down to the root cause, link it to corrective and preventive actions, then build on known causes from one analysis to the next.",
    "Arbre éditable : glisser-déposer, repli des branches, trois orientations, annuler / rétablir.":
      "Editable tree: drag and drop, collapsible branches, three layouts, undo / redo.",
    "Typologie des causes (immédiate, contributive, organisationnelle, humaine, technique, documentaire, managériale, racine) et des actions (corrective, préventive).":
      "Cause types (immediate, contributing, organisational, human, technical, documentary, managerial, root) and action types (corrective, preventive).",
    "Classification 5M ou 8M, statut et élément de preuve par cause ; responsable, échéance et efficacité par action.":
      "5M or 8M classification, status and evidence for each cause; owner, due date and effectiveness for each action.",
    "Questions guides à chaque niveau et suggestions issues d'une bibliothèque de causes enrichissable.":
      "Guiding questions at each level and suggestions from a cause library that grows with use.",
    "Versions enregistrées et restaurables, analyses modèles, comparaison de deux analyses.":
      "Saved, restorable versions, template analyses, side-by-side comparison of two analyses.",
    "Contrôle de l'analyse": "Analysis check",
    "Trois scores (complétude, robustesse, traçabilité) et des alertes ciblées : cause racine sans action, formulation trop générique (« erreur humaine »), cause sans preuve, action sans responsable ou sans échéance, action en retard.":
      "Three scores (completeness, robustness, traceability) and targeted alerts: root cause without an action, wording too generic (“human error”), cause without evidence, action without an owner or due date, overdue action.",
    "Retour d'expérience": "Lessons learned",
    "Synthèse multi-analyses : causes racines récurrentes, répartition par famille, taux de clôture et efficacité des actions, filtres par année, site et processus. Exportable vers Excel pour une revue de direction ou de processus.":
      "Cross-analysis summary: recurring root causes, breakdown by category, action closure rate and effectiveness, filters by year, site and process. Exportable to Excel for a management or process review.",
    "Tout reste dans le navigateur de l'utilisateur. La base s'exporte et s'importe en JSON pour être sauvegardée ou partagée. Des analyses d'exemple fictives permettent de découvrir l'outil.":
      "Everything stays in the user's browser. The database is exported and imported as JSON for backup or sharing. Fictitious sample analyses let you explore the tool.",
    "FAIT": "FACT",
    "CAUSES RACINES": "ROOT CAUSES",
    "ÉVÉNEMENT": "EVENT",
    "Écart constaté": "Observed deviation",
    "IMMÉDIATE · MÉTHODE": "IMMEDIATE · METHOD",
    "Document périmé": "Outdated document",
    "DOCUMENTAIRE · MÉTHODE": "DOCUMENTARY · METHOD",
    "Retrait non tracé": "Withdrawal not logged",
    "HUMAINE · MAIN D'ŒUVRE": "HUMAN · MANPOWER",
    "Révision non connue": "Revision not known",
    "RACINE": "ROOT",
    "Contrôle absent": "No control in place",
    "Diffusion incomplète": "Incomplete distribution",
    "Formation lacunaire": "Training gaps",
    "PRÉVENTIVE": "PREVENTIVE",
    "Audit de poste": "Workstation audit",
    "Liste de retrait": "Withdrawal list",
    "Former, habiliter": "Train, qualify",
    "Chaque cause racine doit porter au moins une action · preuve, responsable et échéance contrôlés":
      "Every root cause must carry at least one action · evidence, owner and due date checked",
    "Fig. 01 - Structure d'une analyse : du fait observé aux actions (exemple fictif)":
      "Fig. 01 - Structure of an analysis: from the observed fact to the actions (fictitious example)",

    /* outil 02 */
    "Audit de processus · ISO 19011": "Process audit · ISO 19011",
    "Réf.": "Ref.",
    "DOCX · PDF · JSON · import XLSX / CSV": "DOCX · PDF · JSON · XLSX / CSV import",
    "Préparer, conduire et rédiger un audit interne de bout en bout, du choix des exigences jusqu'au rapport émis : audit de processus, de produit, de suivi, fournisseur ou à blanc. Le suivi des constats et des actions reste dans l'outil CAPA de l'organisme.":
      "Prepare, conduct and write up an internal audit end to end, from choosing the requirements to issuing the report: process, product, follow-up, supplier or mock audit. Findings and actions are then tracked in the organisation's own CAPA tool.",
    "Programme des audits et dossier par audit : périmètre, objectifs, personnes rencontrées, statut de la préparation jusqu'à l'émission.":
      "Audit programme and one file per audit: scope, objectives, people met, status from preparation to issue.",
    "Référentiel ISO 9001 / ISO 19443 intégré avec questions d'audit par exigence ; référentiel interne importable depuis Excel ou CSV.":
      "Built-in ISO 9001 / ISO 19443 requirements with audit questions for each one; internal requirements can be imported from Excel or CSV.",
    "Plan d'audit proposé à partir des exigences retenues (durée par exigence, horaires, pause), exportable en Word pour l'audité.":
      "Audit plan proposed from the selected requirements (time per requirement, schedule, break), exportable to Word for the auditee.",
    "Terrain : checklist imprimable, évaluation par exigence (conforme, point fort, piste de progrès, observation, NC mineure ou majeure) et preuves.":
      "On site: printable checklist, assessment per requirement (compliant, strength, opportunity for improvement, observation, minor or major NC) and evidence.",
    "Rapport Word ou PDF : page de garde, visas, synthèse et constats rattachés aux exigences.":
      "Word or PDF report: cover page, sign-offs, summary and findings linked to the requirements.",
    "Contrôle avant émission": "Check before issue",
    "Trois scores (préparation, exécution, constats) et des alertes : exigence non évaluée, écart sans constat rédigé, évaluation sans preuve, champs manquants. Une aide à la rédaction signale les constats imprécis, sans quantité ni référence, ou qui imposent une solution au lieu de décrire l'écart.":
      "Three scores (preparation, execution, findings) and alerts: requirement not assessed, nonconformity without a written finding, assessment without evidence, missing fields. A writing aid flags findings that are vague, lack a quantity or a reference, or prescribe a solution instead of describing the gap.",
    "Tout reste dans le navigateur de l'utilisateur. Un audit se transfère en JSON vers un autre poste ou un co-auditeur. Trois audits d'exemple fictifs permettent de découvrir l'outil.":
      "Everything stays in the user's browser. An audit can be transferred as JSON to another computer or a co-auditor. Three fictitious sample audits let you explore the tool.",
    "CYCLE D'UN AUDIT": "AUDIT CYCLE",
    "Dossier": "File",
    "Préparation": "Preparation",
    "Plan d'audit": "Audit plan",
    "Terrain": "On site",
    "Constats": "Findings",
    "Rapport": "Report",
    "Périmètre · objectifs": "Scope · objectives",
    "Exigences · questions": "Requirements · questions",
    "Déroulé · horaires": "Agenda · times",
    "Checklist · preuves": "Checklist · evidence",
    "Écart · exigence": "Gap · requirement",
    "VÉRIFICATION AVANT ÉMISSION": "CHECK BEFORE ISSUE",
    "exigence non évaluée · écart sans constat · évaluation sans preuve · constat imprécis":
      "requirement not assessed · NC without finding · no evidence · vague finding",
    "ÉCHELLE D'ÉVALUATION": "ASSESSMENT SCALE",
    "PF": "S",
    "PP": "OFI",
    "NCm": "mNC",
    "NCM": "MNC",
    "NA": "N/A",
    "Le suivi des constats et des actions reste dans l'outil CAPA de l'organisme":
      "Findings and actions are tracked in the organisation's CAPA tool",
    "Fig. 02 - Cycle d'un audit dans l'outil, de la préparation au rapport":
      "Fig. 02 - Audit cycle in the tool, from preparation to report",

    /* outil 03 */
    "Gemba walk · qualité et sûreté": "Gemba walk · quality and safety",
    "Gemba walk · atelier et bureau": "Gemba walk · shop floor and office",
    "Support": "Device",
    "Téléphone · tablette · poste": "Phone · tablet · computer",
    "DOCX · PDF · XLSX · JSON · import XLSX / CSV": "DOCX · PDF · XLSX · JSON · XLSX / CSV import",
    "Conduire une visite terrain qualité et sûreté en atelier ou en bureau, depuis un téléphone : observer des pratiques plutôt que des personnes, relever écarts et bonnes pratiques avec photos, restituer à chaud, puis suivre la culture qualité dans la durée.":
      "Run a quality and safety walk on the shop floor or in the office, from a phone: observe practices rather than people, record gaps and good practices with photos, debrief on the spot, then follow the quality culture over time.",
    "Grille de 67 points d'observation répartis en 15 thèmes (culture de sûreté, documents de travail, traçabilité, points d'arrêt, procédés spéciaux, moyens de mesure, corps étrangers, CFSI…), avec questions d'ouverture et références ISO 19443.":
      "A checklist of 67 observation points across 15 themes (safety culture, work documents, traceability, hold points, special processes, measuring equipment, foreign material, CFSI…), with open questions and ISO 19443 references.",
    "Visite rapide sur les points essentiels, complète ou ciblée sur des thèmes ; observations hors grille.":
      "Quick walk on the key points, full walk or walk focused on chosen themes; observations outside the checklist.",
    "Cotation par point (conforme, bonne pratique, à améliorer, écart), photos prises sur place, action immédiate et suite donnée : traité sur place, FNC, CAPA, suspicion CFSI.":
      "Rating per point (compliant, good practice, to improve, gap), photos taken on site, immediate action and follow-up: fixed on the spot, NCR, CAPA, suspected CFSI.",
    "Synthèse, compte rendu Word ou PDF et message court prêt à coller dans Teams ou un courriel.":
      "Summary, Word or PDF report and a short message ready to paste into Teams or an email.",
    "Grille, zones et annuaire modifiables, importables depuis Excel ou CSV.":
      "Editable checklist, areas and directory, importable from Excel or CSV.",
    "Pilotage": "Monitoring",
    "Consolidation des visites, y compris celles reçues des collègues : pratiques conformes par thème, écarts récurrents, couverture des zones par rapport à la fréquence cible, écarts sans suite ou sans référence. Export Excel pour Power BI ou la revue de direction.":
      "Consolidation of walks, including those received from colleagues: compliant practices by theme, recurring gaps, area coverage against the target frequency, gaps without follow-up or reference. Excel export for Power BI or the management review.",
    "Visites et photos restent sur l'appareil. Le transfert entre appareils se fait en JSON. Seule option d'envoi : les comptes rendus peuvent partir par un flux Power Automate que l'organisation configure elle-même, désactivé par défaut. Des visites d'exemple fictives permettent de découvrir l'outil.":
      "Walks and photos stay on the device. Transfer between devices uses JSON. The only sending option: reports can go through a Power Automate flow that the organisation sets up itself, off by default. Fictitious sample walks let you explore the tool.",
    "GRILLE SUR LE TÉLÉPHONE": "CHECKLIST ON THE PHONE",
    "SUITE D'UN ÉCART": "FOLLOW-UP OF A GAP",
    "PILOTAGE · PRATIQUES CONFORMES": "MONITORING · COMPLIANT PRACTICES",
    "DOC · DOCUMENTS DE TRAVAIL": "DOC · WORK DOCUMENTS",
    "Document à l'indice en vigueur": "Document at current revision",
    "Plan au poste = indice de l'OF": "Drawing rev. = work order rev.",
    "Annotations visées et datées": "Annotations signed and dated",
    "Instruction comprise au poste": "Instruction understood on site",
    "BP": "GP",
    "AM": "TI",
    "E": "G",
    "Traité sur place": "Fixed on the spot",
    "Information du responsable": "Manager informed",
    "CAPA à proposer": "CAPA to propose",
    "Suspicion CFSI à signaler": "Suspected CFSI to report",
    "FNC à ouvrir · réf. à reporter": "NCR to open · ref. to record",
    "Action immédiate notée sur place": "Immediate action noted on site",
    "Suivi dans l'outil CAPA de l'organisme": "Tracked in the organisation's CAPA tool",
    "Écarts récurrents · zones à revisiter": "Recurring gaps · areas to revisit",
    "Export Excel pour Power BI": "Excel export for Power BI",
    "On observe des pratiques, pas des personnes · photos et données restent sur l'appareil":
      "We observe practices, not people · photos and data stay on the device",
    "Fig. 03 - Une observation sur le terrain, sa suite et sa consolidation (valeurs fictives)":
      "Fig. 03 - An observation on site, its follow-up and consolidation (fictitious values)",

    /* principes et auteur */
    "Autonome": "Standalone",
    "Un seul fichier HTML, sans dépendance ni installation. Il s'ouvre dans Edge, Chrome ou Firefox, y compris téléchargé sur le poste.":
      "A single HTML file, with no dependencies and nothing to install. It opens in Edge, Chrome or Firefox, including when downloaded to the computer.",
    "Hors ligne": "Offline",
    "Aucune connexion n'est nécessaire une fois l'outil ouvert : il reste utilisable sur un poste isolé ou sur le terrain.":
      "No connection is needed once the tool is open: it stays usable on an isolated computer or in the field.",
    "Données locales": "Local data",
    "Les données restent sur l'appareil et rien n'est envoyé par défaut. Sauvegarde et partage passent par un export JSON.":
      "Data stays on the device and nothing is sent by default. Backup and sharing go through a JSON export.",
    "Exports bureautiques": "Office exports",
    "Les livrables sortent en Word, Excel, PDF ou Visio, prêts à rejoindre le système documentaire.":
      "Deliverables come out in Word, Excel, PDF or Visio, ready to join the document system.",
    "Profil complet →": "Full profile →",
    "Gestionnaire Système Qualité": "Quality Systems Manager",
    "Ces outils sont conçus et maintenus par un gestionnaire système qualité en industries réglementées (nucléaire, oil & gas, biotechnologie). Chacun part d'un besoin rencontré en projet, puis a été rendu générique pour servir d'un contexte à l'autre.":
      "These tools are designed and maintained by a quality systems manager working in regulated industries (nuclear, oil & gas, biotechnology). Each one started from a need met on a project, then was made generic to serve from one context to the next.",
    "Profil & réalisations": "Profile & achievements",
    "Edân Colak · Outils qualité": "Edân Colak · Quality tools",

    /* ── profil ─────────────────────────────────────────── */
    "Edân Colak · Profil & réalisations · Gestionnaire Système Qualité": "Edân Colak · Profile & achievements · Quality Systems Manager",
    "Edân Colak · Profil & réalisations": "Edân Colak · Profile & achievements",
    "Edân Colak, Gestionnaire Système Qualité en industries réglementées (nucléaire, oil & gas, biotechnologie). Parcours, expertise et réalisations : digitalisation du SMQ, CAPA, GED, audit.":
      "Edân Colak, Quality Systems Manager in regulated industries (nuclear, oil & gas, biotechnology). Background, expertise and achievements: QMS digitalisation, CAPA, EDMS, audit.",
    "Gestionnaire Système Qualité : parcours, expertise et réalisations (digitalisation QMS, CAPA, GED, audit).":
      "Quality Systems Manager: background, expertise and achievements (QMS digitalisation, CAPA, EDMS, audit).",
    "Réalisations": "Achievements",
    "Parcours": "Background",
    "06 projets": "06 projects",
    "Profil · Dossier de réalisations": "Profile · Record of achievements",
    "Je structure et digitalise des systèmes qualité en industries réglementées, de l'exigence normative jusqu'à l'indicateur de pilotage.":
      "I structure and digitalise quality management systems in regulated industries, from the requirement in the standard to the performance indicator.",
    "Fonction": "Position",
    "Secteur": "Sector",
    "Nucléaire · Oil & Gas · Maritime · Biotechnologie": "Nuclear · Oil & Gas · Maritime · Biotechnology",
    "Employeur": "Employer",
    "Index des projets": "Project index",
    "Titre": "Title",
    "Déployé": "Deployed",
    "Archivé": "Archived",

    /* projet 01 */
    "Dashboard CAPA / Coût de Non-Qualité": "CAPA / Cost of Poor Quality dashboard",
    "Concepteur & pilote qualité": "Designer & quality lead",
    "Le pilotage des non-conformités (CAPA) et du Coût de Non-Qualité reposait sur des extractions manuelles depuis la GED Fabasoft. Chaque reporting mensuel nécessitait plusieurs heures de consolidation.":
      "Monitoring of nonconformities (CAPA) and of the Cost of Poor Quality relied on manual extractions from the Fabasoft EDMS. Each monthly report took several hours of consolidation.",
    "Données fragmentées entre Fabasoft et SAP. Absence de suivi des délais en jours ouvrés. Pas de date de clôture exploitable dans la GED. Reporting non reproductible.":
      "Data split between Fabasoft and SAP. No tracking of lead times in working days. No usable closure date in the EDMS. Reporting could not be reproduced.",
    "Extraction et transformation des données Fabasoft via Power Query/M pour calculer les délais en jours ouvrés. Modélisation en dashboard Power BI multi-vues (Données, Pilotage, Paramètres, Notice). Solution conçue pour pallier l'absence de date de clôture exploitable dans la GED.":
      "Extraction and transformation of Fabasoft data with Power Query/M to calculate lead times in working days. Modelled as a multi-view Power BI dashboard (Data, Monitoring, Settings, Guide). Designed to make up for the lack of a usable closure date in the EDMS.",
    "Dashboard Power BI déployé sur réseau interne. Reporting qualité mensuel accessible à la direction et aux gestionnaires.":
      "Power BI dashboard deployed on the internal network. Monthly quality reporting available to management and managers.",
    "Reporting mensuel automatisé. Indicateur CNQ opérationnel. Délais CAPA tracés. Suppression de la consolidation manuelle.":
      "Automated monthly reporting. Cost of Poor Quality indicator in operation. CAPA lead times tracked. Manual consolidation removed.",
    "PILOTAGE CAPA · COÛT DE NON-QUALITÉ": "CAPA MONITORING · COST OF POOR QUALITY",
    "CAPA EN COURS": "OPEN CAPA",
    "CLÔTURÉES": "CLOSED",
    "DÉLAI MOYEN": "AVERAGE LEAD TIME",
    "CNQ VS N−1": "COPQ VS Y−1",
    "14 j": "14 d",
    "22 j": "22 d",
    "8 j": "8 d",
    "31 j": "31 d",
    "Fév": "Feb",
    "Avr": "Apr",
    "Mai": "May",
    "Fig. 01 - Représentation schématique anonymisée du dashboard de pilotage CAPA":
      "Fig. 01 - Anonymised schematic of the CAPA monitoring dashboard",

    /* projet 02 */
    "Registre FNC/FA industrialisé": "Industrialised NCR / CA register",
    "Traçabilité · Qualité": "Traceability · Quality",
    "Gestionnaire qualité": "Quality manager",
    "Le registre des Fiches de Non-Conformité et d'Actions Correctives était structuré en architecture multi-onglets fragmentée : une fiche, un onglet. Tout pilotage transversal était impossible.":
      "The register of Nonconformity Reports and Corrective Actions was built as a fragmented multi-tab workbook: one report, one tab. No cross-cutting monitoring was possible.",
    "Architecture difficile à faire évoluer, ressaisies multiples, pas de vue consolidée. La structure devait évoluer pour répondre pleinement aux exigences de traçabilité de l'ISO 19443.":
      "A structure that was hard to evolve, repeated re-entry, no consolidated view. It had to change to fully meet the traceability requirements of ISO 19443.",
    "Migration vers table consolidée plate (1 enregistrement / fiche). Structure à 4 vues : Données, Pilotage, Paramètres, Journal d'audit. Formulaire de saisie standardisé. Journal d'audit automatique intégré.":
      "Migration to a flat consolidated table (1 record per report). Four-view structure: Data, Monitoring, Settings, Audit trail. Standardised entry form. Built-in automatic audit trail.",
    "Registre multi-vues déployé en production, intégrant pipeline de saisie, suivi des délais et reporting automatique.":
      "Multi-view register deployed in production, with an entry pipeline, lead-time tracking and automatic reporting.",
    "Zéro ressaisie. Traçabilité complète des non-conformités. Pilotage CAPA centralisé. Reporting transversal opérationnel. Conforme ISO 19443.":
      "No re-entry. Full traceability of nonconformities. Centralised CAPA monitoring. Cross-cutting reporting in operation. ISO 19443 compliant.",
    "RÉF.": "REF.",
    "STATUT": "STATUS",
    "DÉLAI": "LEAD TIME",
    "RESP.": "OWNER",
    "ORIGINE": "SOURCE",
    "CNQ (€)": "COPQ (€)",
    "EN COURS": "OPEN",
    "CLÔTURÉE": "CLOSED",
    "Client": "Customer",
    "Interne": "Internal",
    "Fournisseur": "Supplier",
    "1 250": "1,250",
    "1 enregistrement par fiche · pilotage transversal · journal d'audit intégré":
      "1 record per report · cross-cutting monitoring · built-in audit trail",
    "Conforme ISO 19443 · traçabilité ALCOA+": "ISO 19443 compliant · ALCOA+ traceability",
    "Fig. 02 - Structure schématique du registre FNC/FA consolidé (anonymisé)":
      "Fig. 02 - Schematic structure of the consolidated NCR / CA register (anonymised)",

    /* projet 03 */
    "Interconnexion GED → Reporting": "EDMS → Reporting integration",
    "Intégration · Automatisation": "Integration · Automation",
    "Pilote qualité · Architecte données": "Quality lead · Data architect",
    "La GED Fabasoft ne proposait pas d'export structuré natif. Les données nécessaires aux KPI qualité devaient être extraites manuellement, colonne par colonne, depuis l'interface web.":
      "The Fabasoft EDMS offered no native structured export. The data needed for quality KPIs had to be extracted by hand, column by column, from the web interface.",
    "Données GED non exploitables directement dans les pipelines BI. Extraction manuelle chronophage et source d'erreurs.":
      "EDMS data could not be used directly in BI pipelines. Manual extraction was time-consuming and error-prone.",
    "Mise en place d'une chaîne d'extraction structurée depuis l'interface Fabasoft. Pipeline Power Query/M connecté aux exports SAP QM11/QM15/QM19. Assemblage des deux flux pour alimenter automatiquement les dashboards KPI sans saisie manuelle.":
      "Set-up of a structured extraction chain from the Fabasoft interface. Power Query/M pipeline connected to SAP QM11/QM15/QM19 exports. The two flows are combined to feed the KPI dashboards automatically, with no manual entry.",
    "Pipeline d'extraction GED opérationnel, alimentant automatiquement les indicateurs de suivi CAPA et reporting qualité.":
      "EDMS extraction pipeline in operation, automatically feeding the CAPA tracking indicators and quality reporting.",
    "Interconnexion GED ↔ BI opérationnelle. Données exploitables sans intervention manuelle. Alimentation automatique des dashboards KPI.":
      "EDMS ↔ BI integration in operation. Data usable without manual intervention. KPI dashboards fed automatically.",
    "GED": "EDMS",
    "structurée": "structured",
    "Jours ouvrés · Délais": "Working days · Lead times",
    "Consolidation multi-sources": "Multi-source consolidation",
    "alimentation": "automatic",
    "automatique": "feed",
    "Dashboards KPI": "KPI dashboards",
    "Direction · Gestion": "Management · Operations",
    "- données exploitables sans ressaisie manuelle": "- data usable without manual re-entry",
    "- KPI qualité actualisés en continu": "- quality KPIs updated continuously",
    "Fig. 03 - Flux d'extraction GED → BI (schéma d'architecture)": "Fig. 03 - EDMS → BI extraction flow (architecture diagram)",

    /* projet 04 */
    "Migration référentiel VDOC → SAP DMS": "VDOC → SAP DMS document system migration",
    "GED · Référentiel documentaire": "EDMS · Document system",
    "GED · Référentiel": "EDMS · Document system",
    "Chef de projet qualité": "Quality project manager",
    "900+ références": "900+ references",
    "La GED historique (VDOC) faisait l'objet d'une migration vers SAP DMS. Le référentiel documentaire qualité (900+ références) devait être standardisé dans le cadre de cette migration.":
      "The legacy EDMS (VDOC) was being migrated to SAP DMS. The quality document system (900+ references) had to be standardised as part of this migration.",
    "Nomenclature documentaire hétérogène héritée : préfixes inconsistants, numérotations multiples, versions non standardisées. Incompatible avec la structure SAP DMS.":
      "Inherited, inconsistent document naming: mismatched prefixes, several numbering schemes, non-standard versions. Incompatible with the SAP DMS structure.",
    "Définition d'une nomenclature unifiée (préfixe type + numérotation séquentielle) et d'un versioning numérique strict. Mapping des 900+ références VDOC vers la nouvelle nomenclature. Migration et vérification systématique.":
      "Definition of a unified naming scheme (type prefix + sequential number) and strict numeric versioning. Mapping of the 900+ VDOC references to the new scheme. Migration and systematic verification.",
    "Référentiel documentaire migré et unifié dans SAP DMS. Nomenclature documentée. Procédure de gestion des nouveaux documents.":
      "Document system migrated and unified in SAP DMS. Naming scheme documented. Procedure for managing new documents.",
    "900+ documents migrés. Référentiel documentaire unique couvrant l'ensemble du système qualité. Versioning strict appliqué. Principes ALCOA+ respectés.":
      "900+ documents migrated. A single document system covering the whole quality management system. Strict versioning applied. ALCOA+ principles respected.",
    "VDOC - état initial": "VDOC - initial state",
    "900+ références hétérogènes": "900+ inconsistent references",
    "+ normalisation": "+ standardisation",
    "SAP DMS - nomenclature unifiée": "SAP DMS - unified naming",
    "900+ références · nomenclature unifiée": "900+ references · unified naming",
    "Versioning numérique strict · Référentiel documentaire unique": "Strict numeric versioning · Single document system",
    "ALCOA+ · Traçabilité SAP DMS": "ALCOA+ · SAP DMS traceability",
    "Fig. 04 - Migration VDOC → SAP DMS : standardisation de la nomenclature (schéma)":
      "Fig. 04 - VDOC → SAP DMS migration: naming standardisation (diagram)",

    /* projet 05 */
    "Système d'audit interne ISO 19011": "ISO 19011 internal audit system",
    "Audit qualité · Métrologie": "Quality audit · Metrology",
    "Audit qualité · ISO 19011": "Quality audit · ISO 19011",
    "Assistant manager qualité": "Assistant quality manager",
    "TransCure bioServices, laboratoire de recherche contractuelle spécialisé dans les modèles murins humanisés. Aucun processus d'audit interne formalisé n'existait à mon arrivée en alternance.":
      "TransCure bioServices, a contract research laboratory specialising in humanised mouse models. No formal internal audit process existed when I joined on a work-study contract.",
    "Absence de processus d'audit interne conforme ISO 19011 : pas de trames de rapport standardisées, pas d'indicateurs de suivi. Contrôle métrologique des balances de précision non systématisé, risque sur la fiabilité des mesures en environnement préclinique.":
      "No internal audit process in line with ISO 19011: no standard report templates, no tracking indicators. Metrological checks on precision balances were not systematic, a risk to measurement reliability in a preclinical setting.",
    "Conception et déploiement d'un processus d'audit interne conforme ISO 19011 : procédures, trames de rapport, indicateurs de suivi. Réalisation d'audits en autonomie sur trois domaines (cytométrie, culture cellulaire, histologie). Mise en place d'un contrôle métrologique quotidien des balances de précision par vérification externe à étalons standardisés. Suivi des CAPA associées aux écarts constatés.":
      "Design and roll-out of an internal audit process in line with ISO 19011: procedures, report templates, tracking indicators. Independent audits in three areas (cytometry, cell culture, histology). Daily metrological check of precision balances by external verification with standard weights. Follow-up of the CAPAs linked to the gaps found.",
    "Système d'audit interne opérationnel (procédures, trames, indicateurs) et programme de contrôle métrologique quotidien des équipements critiques.":
      "Internal audit system in operation (procedures, templates, indicators) and a daily metrological check programme for critical equipment.",
    "Structuration complète d'un processus auparavant informel. Trois domaines audités en autonomie. Fiabilité des mesures renforcée en environnement préclinique. CAPA associées suivies jusqu'à clôture.":
      "A previously informal process fully structured. Three areas audited independently. Stronger measurement reliability in a preclinical setting. Related CAPAs followed through to closure.",
    "PROGRAMME D'AUDIT INTERNE · ISO 19011": "INTERNAL AUDIT PROGRAMME · ISO 19011",
    "DOMAINE": "AREA",
    "ÉCARTS": "GAPS",
    "Cytométrie": "Cytometry",
    "RÉALISÉ": "DONE",
    "Culture cellulaire": "Cell culture",
    "Histologie": "Histology",
    "CONTRÔLE MÉTROLOGIQUE - BALANCES DE PRÉCISION": "METROLOGICAL CHECK - PRECISION BALANCES",
    "Vérification quotidienne par étalons standardisés": "Daily verification with standard weights",
    "Conforme ISO 19011 · BPL": "ISO 19011 compliant · GLP",
    "Fig. 05 - Programme d'audit interne et contrôle métrologique quotidien": "Fig. 05 - Internal audit programme and daily metrological check",

    /* projet 06 */
    "Validation automate I-Track10 - Immunodosage": "I-Track10 analyser validation - Immunoassay",
    "Validation analytique · ISO 15189": "Analytical validation · ISO 15189",
    "Technicien de laboratoire - stage": "Laboratory technician - internship",
    "Plateforme d'immunologie du CHU de Saint-Étienne, dans le contexte de la certification ISO 15189. Toute nouvelle méthode analytique devait être validée avant intégration en routine.":
      "Immunology platform of Saint-Étienne University Hospital, in the context of ISO 15189 certification. Every new analytical method had to be validated before routine use.",
    "L'automate I-Track10 (Theradiag), destiné à l'immunodosage de biothérapies (adalimumab, infliximab) pour le suivi thérapeutique de maladies inflammatoires chroniques, devait être validé selon les exigences ISO 15189 avant mise en routine.":
      "The I-Track10 analyser (Theradiag), used for immunoassays of biotherapies (adalimumab, infliximab) in the therapeutic monitoring of chronic inflammatory diseases, had to be validated against ISO 15189 requirements before routine use.",
    "Validation d'une méthode d'immunofluorescence indirecte (anti-actine F) et de l'automate I-Track10. Évaluation des critères de performance analytique : sensibilité, spécificité, fidélité, reproductibilité, linéarité, limites de détection - validation intra- et inter-série. Analyse statistique des résultats.":
      "Validation of an indirect immunofluorescence method (anti-F-actin) and of the I-Track10 analyser. Assessment of analytical performance criteria: sensitivity, specificity, precision, reproducibility, linearity, limits of detection - within-run and between-run validation. Statistical analysis of the results.",
    "Dossier de validation analytique documenté, conforme ISO 15189, appuyant l'intégration de l'automate en routine.":
      "Documented analytical validation file, compliant with ISO 15189, supporting routine use of the analyser.",
    "Automate validé et intégré en routine pour le suivi thérapeutique des maladies inflammatoires chroniques. Traçabilité documentaire des validations renforcée.":
      "Analyser validated and in routine use for the therapeutic monitoring of chronic inflammatory diseases. Stronger documentary traceability of validations.",
    "VALIDATION ANALYTIQUE · AUTOMATE I-TRACK10": "ANALYTICAL VALIDATION · I-TRACK10 ANALYSER",
    "Sensibilité": "Sensitivity",
    "Spécificité": "Specificity",
    "Fidélité": "Precision",
    "Linéarité": "Linearity",
    "intra/inter": "within/between",
    "Reproductibilité": "Reproducibility",
    "LOD basse": "Low LOD",
    "Limite détect.": "Detect. limit",
    "Adalimumab · Infliximab - validation intra- et inter-série": "Adalimumab · Infliximab - within-run and between-run validation",
    "Fig. 06 - Critères de performance analytique validés (schéma illustratif - valeurs indicatives)":
      "Fig. 06 - Validated analytical performance criteria (illustrative diagram - indicative values)",

    /* parcours, expertise, contact */
    "Gestionnaire Système Qualité avec plus de 3 ans d'expérience en industries hautement réglementées - nucléaire, oil & gas, biotechnologie et plasturgie. Mon travail relie les exigences des référentiels ISO à des indicateurs et des outils utiles aux équipes au quotidien.":
      "Quality Systems Manager with more than 3 years of experience in highly regulated industries - nuclear, oil & gas, biotechnology and plastics. My work connects the requirements of ISO standards with indicators and tools that teams use every day.",
    "J'interviens sur l'ensemble du cycle qualité : structuration documentaire, CAPA, audits internes et fournisseurs, conformité réglementaire et digitalisation des processus.":
      "I work across the whole quality cycle: document structure, CAPA, internal and supplier audits, regulatory compliance and process digitalisation.",
    "Chez Celeros Flow Technology, j'ai piloté l'obtention de la certification ISO 19443 sur le site pilote et conduit la rationalisation du référentiel documentaire, ramené de 3 200 à 950 documents. Les outils qualité rassemblés sur ce site prolongent ce travail : chacun répond à un besoin rencontré en projet.":
      "At Celeros Flow Technology, I led ISO 19443 certification at the pilot site and the streamlining of the document system, reduced from 3,200 to 950 documents. The quality tools gathered on this site extend that work: each one answers a need met on a project.",
    "Formation": "Education",
    "Master - Amélioration de la Performance Industrielle · IAE Savoie Mont-Blanc": "Master's degree - Industrial Performance Improvement · IAE Savoie Mont-Blanc",
    "Licence pro - Qualité des Produits et des Processus · USMB / Tétras": "Professional bachelor's degree - Product and Process Quality · USMB / Tétras",
    "BTS Bioanalyses et Contrôles · Lycée Honoré d'Urfé, Saint-Étienne": "BTS (two-year higher diploma) Bioanalysis and Testing · Lycée Honoré d'Urfé, Saint-Étienne",
    "Bac STL Biotechnologie · ENILV, La Roche-sur-Foron": "Baccalauréat STL Biotechnology · ENILV, La Roche-sur-Foron",
    "Langues": "Languages",
    "Français - natif": "French - native",
    "Turc - natif": "Turkish - native",
    "Anglais - B2 professionnel": "English - B2 professional",
    "Italien - A2 notions": "Italian - A2 basic",
    "Expertise & Référentiels": "Expertise & Standards",
    "Normes & référentiels": "Standards & frameworks",
    "BPL": "GLP",
    "Méthodes": "Methods",
    "CAPA / FNC / NCR": "CAPA / NCR",
    "Audit interne & fournisseurs": "Internal & supplier audit",
    "Coût de Non-Qualité": "Cost of Poor Quality",
    "Métrologie": "Metrology",
    "Conduite du changement": "Change management",
    "Données & pilotage": "Data & monitoring",
    "Excel 365 avancé": "Advanced Excel 365",
    "Analyse de données": "Data analysis",
    "Modélisation stochastique": "Stochastic modelling",
    "Systèmes & GED": "Systems & EDMS",
    "Migration GED": "EDMS migration",
    "Secteurs": "Sectors",
    "Nucléaire": "Nuclear",
    "Biotechnologie (CRO préclinique)": "Biotechnology (preclinical CRO)",
    "Biologie médicale": "Medical biology",
    "Plasturgie": "Plastics",
    "Pompes industrielles (haute pression)": "Industrial pumps (high pressure)",

    /* ── sport ──────────────────────────────────────────── */
    "Sport · Projets": "Sport · Projects",
    "Projets personnels autour du sport : modélisation, statistiques et simulations.": "Personal projects around sport: modelling, statistics and simulations.",
    "Accueil, sport": "Home, sport",
    "Projets": "Projects",
    "Projet": "Project",
    "01 projet": "01 project",
    "Projets personnels": "Personal projects",
    "Modélisation, statistiques et simulations appliquées au sport.": "Modelling, statistics and simulations applied to sport.",
    "Coupe du Monde 2026": "2026 World Cup",
    "Projets sport": "Sport projects",
    "Simulation Monte-Carlo - Coupe du Monde 2026": "Monte Carlo simulation - 2026 World Cup",
    "Projet personnel": "Personal project",
    "Analyste · Modélisateur": "Analyst · Modeller",
    "150 000 itérations": "150,000 iterations",
    "Simulation du bracket complet de la Coupe du Monde 2026 par modélisation probabiliste, de la phase de groupes à la finale.":
      "Simulation of the full 2026 World Cup bracket with a probabilistic model, from the group stage to the final.",
    "Modéliser la complexité d'un tournoi à 48 équipes avec phase de groupes et phases éliminatoires, en intégrant la force relative des équipes et la variance des résultats.":
      "Model the complexity of a 48-team tournament with a group stage and knockout rounds, taking into account the relative strength of the teams and the variance of results.",
    "Modèle de scoring basé sur loi de Poisson avec pondération Elo. Force offensive et défensive calculée par équipe. 150 000 itérations Monte-Carlo couvrant le bracket complet (groupes + élimination directe). Distribution des probabilités de victoire par équipe calculée sur l'ensemble du bracket.":
      "Poisson-based scoring model with Elo weighting. Attacking and defensive strength calculated for each team. 150,000 Monte Carlo iterations covering the full bracket (groups + knockout). Win probability distribution for each team calculated over the whole bracket.",
    "Modèle de simulation complet (phase de groupes + élimination directe). Distribution de probabilité de victoire finale par équipe. Résultats agrégés sur 150 000 itérations.":
      "Complete simulation model (group stage + knockout). Probability distribution of winning the final for each team. Results aggregated over 150,000 iterations.",
    "Modèle fonctionnel : 150k itérations, bracket 48 équipes complet. Approche transposable à des problèmes d'ingénierie : fiabilité, risque, qualité.":
      "Working model: 150k iterations, full 48-team bracket. The approach carries over to engineering problems: reliability, risk, quality.",
    "DISTRIBUTION · P(victoire finale) · 150 000 itérations · loi de Poisson · pondération Elo":
      "DISTRIBUTION · P(winning the final) · 150,000 iterations · Poisson law · Elo weighting",
    "P(victoire) par équipe · 48 équipes simulées": "P(win) per team · 48 teams simulated",
    "Rang ELO →": "ELO rank →",
    "n = 150 000": "n = 150,000",
    "Fig. 01 - Distribution de probabilité de victoire (schéma illustratif - Poisson · Elo · 150 000 itérations)":
      "Fig. 01 - Win probability distribution (illustrative diagram - Poisson · Elo · 150,000 iterations)"
  };

  var has = Object.prototype.hasOwnProperty;
  var root = document.documentElement;
  var norm = function (s) { return String(s).replace(/\s+/g, ' ').trim(); };
  var lookup = function (s) { var k = norm(s); return k && has.call(EN, k) ? EN[k] : null; };

  var pick = function () {
    var q = /[?&]lang=(fr|en)\b/.exec(location.search);
    if (q) { try { localStorage.setItem(KEY, q[1]); } catch (e) { /* storage blocked */ } return q[1]; }
    var s = null;
    try { s = localStorage.getItem(KEY); } catch (e) { /* storage blocked */ }
    if (s === 'fr' || s === 'en') return s;
    return /^fr\b/i.test(navigator.language || 'fr') ? 'fr' : 'en';
  };

  var lang = pick();
  var applied = 'fr';            /* the HTML is written in French */
  var undo = [];                 /* how to go back to the French source */
  root.lang = lang;

  /* hide the page until the English text is in place, to avoid a French flash */
  if (lang === 'en') {
    root.classList.add('i18n-wait');
    var st = document.createElement('style');
    st.textContent = '.i18n-wait body{visibility:hidden}';
    document.head.appendChild(st);
    setTimeout(function () { root.classList.remove('i18n-wait'); }, 1500);
  }

  var ATTRS = ['title', 'aria-label', 'alt', 'placeholder'];

  var setAttr = function (el, name, value) {
    var old = el.getAttribute(name);
    el.setAttribute(name, value);
    undo.push(function () { el.setAttribute(name, old); });
  };

  var translate = function () {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (n.nodeType !== 1) return NodeFilter.FILTER_ACCEPT;
        if (n.nodeName === 'SCRIPT' || n.nodeName === 'STYLE' || n.getAttribute('translate') === 'no') return NodeFilter.FILTER_REJECT;
        for (var i = 0; i < ATTRS.length; i++) {
          var v = n.getAttribute(ATTRS[i]);
          var t = v && lookup(v);
          if (t) setAttr(n, ATTRS[i], t);
        }
        if (n.hasAttribute('data-en')) {
          var html = n.innerHTML;
          n.innerHTML = n.getAttribute('data-en');
          undo.push(function () { n.innerHTML = html; });
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_SKIP;
      }
    });
    var node;
    while ((node = walker.nextNode())) {
      if (node.nodeType !== 3) continue;
      var t = lookup(node.data);
      if (t === null) continue;
      (function (n, old) {
        var m = /^(\s*)[\s\S]*?(\s*)$/.exec(old);
        n.data = m[1] + t + m[2];
        undo.push(function () { n.data = old; });
      })(node, node.data);
    }
    var title = lookup(document.title);
    if (title) {
      var oldTitle = document.title;
      document.title = title;
      undo.push(function () { document.title = oldTitle; });
    }
    document.querySelectorAll('meta[name="description"], meta[property^="og:"], meta[name="apple-mobile-web-app-title"]').forEach(function (m) {
      var t2 = lookup(m.getAttribute('content') || '');
      if (t2) setAttr(m, 'content', t2);
    });
  };

  var restore = function () {
    while (undo.length) undo.pop()();
  };

  var debug = function () {
    if (!/[?&]i18n-debug\b/.test(location.search)) return;
    var missing = [];
    var done = {};
    Object.keys(EN).forEach(function (k) { done[norm(EN[k])] = 1; });
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var n;
    while ((n = w.nextNode())) {
      var p = n.parentElement;
      if (!p || p.closest('script, style, [translate="no"]')) continue;
      var k = norm(n.data);
      if (/[a-zàâçéèêëîïôûùüÿœ]{3,}/i.test(k) && !has.call(EN, k) && !done[k]) missing.push(k);
    }
    console.log('[i18n] textes sans traduction :', missing);
  };

  var button = null;

  var paintButton = function () {
    if (!button) return;
    button.setAttribute('aria-label', lang === 'en' ? 'Passer en français' : 'Switch to English');
    button.title = lang === 'en' ? 'Français' : 'English';
    button.querySelectorAll('[data-l]').forEach(function (s) {
      s.classList.toggle('on', s.getAttribute('data-l') === lang);
    });
  };

  var apply = function () {
    if (applied === lang) return;
    if (lang === 'en') translate(); else restore();
    applied = lang;
    root.lang = lang;
    paintButton();
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  };

  var set = function (l) {
    if (l !== 'fr' && l !== 'en') return;
    lang = l;
    try { localStorage.setItem(KEY, l); } catch (e) { /* storage blocked */ }
    /* drop ?lang= from the address so a reload keeps the language just chosen */
    if (/[?&]lang=/.test(location.search)) {
      var u = new URL(location.href);
      u.searchParams.delete('lang');
      history.replaceState(null, '', u.pathname + u.search + u.hash);
    }
    apply();
  };

  var addButton = function () {
    var holder = document.querySelector('.doc-header-right');
    if (!holder) return;
    button = document.createElement('button');
    button.type = 'button';
    button.className = 'lang-toggle';
    button.setAttribute('translate', 'no');
    button.innerHTML = '<span data-l="fr">FR</span><span class="lang-sep" aria-hidden="true">/</span><span data-l="en">EN</span>';
    button.addEventListener('click', function () { set(lang === 'en' ? 'fr' : 'en'); });
    holder.insertBefore(button, holder.querySelector('.theme-toggle'));
    paintButton();
  };

  window.I18N = {
    get lang() { return lang; },
    t: function (s) { if (lang !== 'en') return s; var r = lookup(s); return r === null ? s : r; },
    set: set
  };

  /* another tab (or a tool) changed the language */
  window.addEventListener('storage', function (e) {
    if (e.key === KEY && (e.newValue === 'fr' || e.newValue === 'en') && e.newValue !== lang) { lang = e.newValue; apply(); }
  });

  var start = function () {
    addButton();
    apply();
    root.classList.remove('i18n-wait');
    debug();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
