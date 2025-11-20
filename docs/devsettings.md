---
ia-translated: true
id: devsettings
title: DevSettings
---

O módulo `DevSettings` expõe métodos para customizar configurações de desenvolvedores em desenvolvimento.

---

# Referência

## Métodos

### `addMenuItem()`

```tsx
static addMenuItem(title: string, handler: () => any);
```

Adiciona um item de menu customizado ao Dev Menu.

**Parâmetros:**

| Nome                                                         | Tipo     |
| ------------------------------------------------------------ | -------- |
| title <div className="label basic required">Required</div>   | string   |
| handler <div className="label basic required">Required</div> | function |

**Exemplo:**

```tsx
DevSettings.addMenuItem('Show Secret Dev Screen', () => {
  Alert.alert('Showing secret dev screen!');
});
```

---

### `reload()`

```tsx
static reload(reason?: string): void;
```

Recarrega a aplicação. Pode ser invocado diretamente ou através da interação do usuário.

**Exemplo:**

```tsx
<Button title="Reload" onPress={() => DevSettings.reload()} />
```
