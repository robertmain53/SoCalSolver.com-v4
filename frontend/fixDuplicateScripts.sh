#!/usr/bin/env bash

# 📂 Cartella di lavoro: modifica se serve
ROOT_DIR="./frontend/pages/admin"

# ✨ Lista dei file da correggere
FILES=(
  "index.vue"
  "feedback.vue"
  "analytics.vue"
  "generator.vue"
  "translations.vue"
)

# 🔧 Loop su ciascun file
for FILE in "${FILES[@]}"; do
  TARGET="$ROOT_DIR/$FILE"

  echo "🔍 Fixing: $TARGET"

  # Controlla se esiste
  if [ -f "$TARGET" ]; then
    # Rimuove il blocco script aggiunto dallo script precedente
    sed -i '/<script setup lang="ts">/,/<\/script>/d' "$TARGET"

    # Aggiunge definePageMeta dentro l'altro <script setup>
    # Solo se non è già presente
    if ! grep -q "definePageMeta" "$TARGET"; then
      sed -i '/<script setup>/a definePageMeta({ middleware: "checkAuth" })' "$TARGET"
      echo "✅ Added definePageMeta to $FILE"
    else
      echo "ℹ️ Already has definePageMeta: $FILE"
    fi
  else
    echo "⚠️ File not found: $TARGET"
  fi
done

echo "🎉 All done!"
