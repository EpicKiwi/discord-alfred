#!/bin/bash
API_FOLDER="doc/api"
BASE_DOC_FOLDER="."
SOURCE_FOLDER="src"
GITHUB_REPOSITORY="https://github.com/EpicKiwi/discord-alfred"

DOC_FOLDER=${BASE_DOC_FOLDER}/${API_FOLDER}
LAST_WORKING_DIRECTORY=$(pwd)
CURRENT_COMMIT=$(git log --oneline | head -n1 | cut -d' ' -f1)

echo "Netoyage de la documentation"
rm -Rf "$DOC_FOLDER"/*

apihomecontent="# API doc

> Documentation générée le $(date '+%d/%m/%Y à %R') sur le commit [$CURRENT_COMMIT](${GITHUB_REPOSITORY}/commit/$CURRENT_COMMIT)

La documentation d'API est une documentation complète des modules composant le bot en fonction de la documentation [JSDoc](http://usejsdoc.org/) de ces modules.
Ci dessous, vous trouverez tout les fichiers contenant une documentation du projet.

"

for file in $(find src | grep ".js$")
do
    docfile=$(echo $file | sed "s#$SOURCE_FOLDER#$DOC_FOLDER#" | sed "s/\.js/.md/")
    doccontent=$(jsdoc2md -f "$file")
    docfolder=$(echo "$docfile" | sed "s/\/[^/]*$//")

    if [ -z "$doccontent" ]
    then
        echo "Aucune documentation dans $file"
    else
        if [ ! -d "$docfolder" ]
        then
            mkdir -p "$docfolder"
        fi
        echo "$doccontent" > "$docfile"
        apihomecontent="${apihomecontent}* [${file}](${docfile})
"
        echo "Généré $docfile"
    fi
done

echo "$apihomecontent" > "$DOC_FOLDER/apidoc-home.md"
echo "Généré $DOC_FOLDER/apidoc-home.md"

cd "$DOC_FOLDER"

git add -A
git commit -am "Mise a jour de l'API doc"

cd "$LAST_WORKING_DIRECTORY"