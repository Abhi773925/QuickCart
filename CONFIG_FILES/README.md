# QuickCart Theme Files - Copy Instructions

## Files to Copy

### 1. Configuration Files
Copy these files to your new project root:

- `.postcssrc.json` → Root directory
- `styles.css` → `src/` directory

### 2. Installation

```bash
npm install -D @tailwindcss/postcss tailwindcss postcss
```

### 3. Update `angular.json`

Ensure your `angular.json` includes the styles path:

```json
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "src/styles.css"
            ]
          }
        }
      }
    }
  }
}
```

### 4. That's It!

Now use Tailwind classes in your templates as documented in `THEME_AND_STYLING_GUIDE.md`

## Color Reference Quick Copy-Paste

```
Primary Dark:       bg-slate-900, text-slate-900
Secondary Gray:     bg-slate-600, text-slate-600
Light Background:   bg-slate-50
Card Background:    bg-white
Borders:            border-slate-200
Success:            text-green-500
Error:              text-red-500
Warning:            text-yellow-400
Info:               text-blue-600
```

## Common Patterns

### Primary Button
```html
<button class="px-4 py-2 bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors rounded cursor-pointer">
  Click Me
</button>
```

### Card
```html
<div class="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
  Content here
</div>
```

### Grid (Responsive)
```html
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  <!-- Cards go here -->
</div>
```

### Container
```html
<div class="max-w-6xl mx-auto p-4 md:p-8">
  <!-- Content -->
</div>
```

---

**Need more details?** Check the `THEME_AND_STYLING_GUIDE.md` file for comprehensive documentation.
