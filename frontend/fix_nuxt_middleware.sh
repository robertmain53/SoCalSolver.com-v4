#!/usr/bin/env bash
set -e

echo "🔧 Inizio correzioni..."

# Directory del frontend
DIR="frontend/pages"

# 1. Rimuove eventuali <script setup> duplicati nei file admin
for f in $DIR/admin/*.vue; do
  if grep -q "definePageMeta" "$f"; then
    # Rimuovi tutte le righe definePageMeta esistenti
    sed -i '/definePageMeta/d' "$f"
  fi

  if grep -q "<script setup" "$f"; then
    # Se non contiene già definePageMeta, aggiungilo dentro <script setup>
    sed -i '/<script setup>/a\
definePageMeta({ middleware: "checkAuth" })' "$f"
    echo "✅ Fixato middleware in: $f"
  fi
done

# 2. Rimuove middleware da pagine pubbliche
PUBLIC_FILES=(
  "$DIR/index.vue"
  "$DIR/_slug.vue"
  "$DIR/index.vue"
  "$DIR/*.vue"
)

for f in "${PUBLIC_FILES[@]}"; do
  if [ -f $f ]; then
    sed -i '/definePageMeta/d' "$f"
    echo "✅ Rimosso middleware da: $f"
  fi
done

# 3. Disabilita plugin server log-ssr.ts
PLUGIN="frontend/server/plugins/log-ssr.ts"
if [ -f "$PLUGIN" ]; then
  mv "$PLUGIN" "$PLUGIN.disabled"
  echo "✅ Disabilitato plugin: $PLUGIN"
fi

echo "🎉 Correzioni completate!"
