# Configuração do Firebase para GitHub Actions

Este guia mostra como configurar corretamente a Service Account do Firebase para permitir deploy via GitHub Actions.

## Erro atual

```
Authorization failed. This account is missing the following required permissions:
  firebase.projects.get
  firebasehosting.sites.update
```

## Solução: Criar e Configurar Service Account

### 1. Criar Service Account no Google Cloud Console

1. Acesse: https://console.cloud.google.com/iam-admin/serviceaccounts?project=reactnativebrasil
2. Clique em **"+ CREATE SERVICE ACCOUNT"**
3. Preencha:
   - **Service account name**: `github-actions-deploy`
   - **Service account ID**: `github-actions-deploy` (gerado automaticamente)
   - **Description**: "Service Account para deploy do GitHub Actions"
4. Clique em **"CREATE AND CONTINUE"**

### 2. Adicionar Permissões/Roles

Na etapa "Grant this service account access to project", adicione os seguintes roles:

**Roles necessários:**
- ✅ **Firebase Hosting Admin** (`roles/firebasehosting.admin`)
- ✅ **Firebase Admin** (`roles/firebase.admin`)

**Opcional (caso use Firestore/Functions):**
- 🔧 **Cloud Datastore User** (se usar Firestore)
- 🔧 **Cloud Functions Developer** (se usar Functions)

**Como adicionar:**
1. No campo "Select a role", digite "Firebase Hosting Admin"
2. Selecione "Firebase Hosting Admin"
3. Clique em "+ ADD ANOTHER ROLE"
4. Digite "Firebase Admin"
5. Selecione "Firebase Admin"
6. Clique em **"CONTINUE"**

### 3. Criar Chave JSON

1. Clique em **"DONE"** para criar a service account
2. Na lista de Service Accounts, encontre a que você acabou de criar
3. Clique nos **três pontos** (⋮) à direita
4. Selecione **"Manage keys"**
5. Clique em **"ADD KEY"** → **"Create new key"**
6. Selecione **"JSON"**
7. Clique em **"CREATE"**
8. O arquivo JSON será baixado automaticamente - **GUARDE COM SEGURANÇA!**

### 4. Configurar Secret no GitHub

1. Acesse seu repositório no GitHub
2. Vá em **Settings** → **Secrets and variables** → **Actions**
3. Clique em **"New repository secret"**
4. Preencha:
   - **Name**: `FIREBASE_SERVICE_ACCOUNT`
   - **Value**: Cole **TODO O CONTEÚDO** do arquivo JSON baixado
5. Clique em **"Add secret"**

### 5. Verificar configuração do .firebaserc

Certifique-se que o arquivo `.firebaserc` na raiz do projeto contém:

```json
{
  "projects": {
    "default": "reactnativebrasil"
  }
}
```

## Testando o Deploy

### Via GitHub Actions (Push na Main)

Faça merge de qualquer PR para a branch `main` que modifique:
- `website/**`
- `docs/**`
- `packages/**`
- `plugins/**`
- `firebase.json` ou `.firebaserc`

### Via Workflow Manual

1. Acesse **Actions** no GitHub
2. Selecione o workflow **"Firebase Production Deploy"**
3. Clique em **"Run workflow"**
4. Selecione a branch `main`
5. Clique em **"Run workflow"**

## Estrutura dos Secrets

Para referência, você deve ter estes secrets configurados:

```
FIREBASE_SERVICE_ACCOUNT
  └─ Conteúdo completo do JSON da service account
     Exemplo: {"type": "service_account", "project_id": "reactnativebrasil", ...}
```

## Troubleshooting

### Erro: "Failed to get Firebase project reactnativebrasil"

**Causa**: Service account sem permissões ou projeto não existe

**Solução**:
1. Verifique se o projeto existe: https://console.firebase.google.com/project/reactnativebrasil
2. Verifique se a service account tem os roles corretos
3. Recrie a chave JSON e atualize o secret

### Erro: "No OAuth tokens found"

**Causa**: Secret `FIREBASE_SERVICE_ACCOUNT` não configurado ou inválido

**Solução**:
1. Verifique se o secret existe em Settings → Secrets
2. Verifique se copiou o conteúdo completo do JSON (incluindo `{` e `}`)
3. Recrie a chave se necessário

### Erro: "The caller does not have permission"

**Causa**: Service account sem as permissões necessárias

**Solução**:
1. Acesse https://console.cloud.google.com/iam-admin/iam?project=reactnativebrasil
2. Encontre a service account `github-actions-deploy`
3. Clique no ✏️ (lápis) para editar
4. Adicione os roles:
   - Firebase Hosting Admin
   - Firebase Admin

## Links Úteis

- 🔥 [Firebase Console - reactnativebrasil](https://console.firebase.google.com/project/reactnativebrasil)
- ☁️ [Google Cloud IAM](https://console.cloud.google.com/iam-admin/iam?project=reactnativebrasil)
- 🔑 [Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts?project=reactnativebrasil)
- 📖 [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)

## Segurança

⚠️ **IMPORTANTE**:
- NUNCA commite o arquivo JSON da service account no repositório
- NUNCA compartilhe o conteúdo do secret publicamente
- O arquivo JSON dá acesso total ao seu projeto Firebase
- Se comprometer a chave, delete-a imediatamente no Google Cloud Console e crie uma nova
