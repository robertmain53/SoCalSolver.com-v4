#!/usr/bin/env bash

# Rimuove il middleware checkAuth da tutte le pagine
echo "🔹 Rimuovo checkAuth da tutte le pagine..."
grep -rl "middleware: 'checkAuth'" pages/ | while read -r file; do
  sed -i "/middleware: 'checkAuth'/d" "$file"
done

# Aggiunge checkAuth SOLO alle pagine admin
echo "�� Aggiungo checkAuth alle pagine admin..."

ADMIN_PAGES=(
  "pages/admin/analytics.vue"
  "pages/admin/index.vue"
  "pages/admin/settings.vue"
  "pages/admin/users.vue"
  "pages/admin/generator.vue"
  "pages/admin/feedback.vue"
  "pages/admin/translations.vue"
)

for file in "${ADMIN_PAGES[@]}"; do
  if [[ -f "$file" ]]; then
    # Controlla se esiste già definePageMeta
    if grep -q "definePageMeta" "$file"; then
      echo "⚠️  $file ha già definePageMeta. Controlla manualmente."
    else
      # Inserisce definePageMeta in cima
      sed -i "1s|^|<script setup lang=\"ts\">\ndefinePageMeta({ middleware: 'checkAuth' })\n</script>\n\n|" "$file"
      echo "✅ Aggiunto checkAuth a $file"
    fi
  else
    echo "ℹ️  File non trovato: $file (ignoro)"
  fi
done

echo "🎉 Fatto! Ora l'homepage e le pagine pubbliche sono libere dal middleware."
