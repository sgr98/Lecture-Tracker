# Coding Style Guide

This document is a guide to the coding style used in this project which will help the project maintain a clean and standard code. This guide is a simplification of the [Google Javascript Style Guide](https://google.github.io/styleguide/jsguide.html). Most of the rules in this guide will be enforced via prettier and eslint.

`Note: As of right now, some of the rules are not implemented in the current .prettierrc and eslint.config.js files`

A .editorconfig file is also present, primarily for vscode to save files with `lf` endings. Other than that it contains a few default rules. The more defined rules will be present in prettier and eslint.

## 1. Installation (Getting Started)

To install the package dependencies just use the `npm install` command in terminal. All the necessary files are already added to the project's root directory, so there is no need to add them again. Just add the extensions if not already present and set them up.

### 1.1. Prettier
1. Install prettier to package.json using the command: `npm install --save-dev prettier`. Project Prettier version - 3.6.2
2. Add .prettierrc and .prettierignore files
3. Add rules in .prettierrc file
4. Add [Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) vscode extension. My current version is - 12.3.0
5. Set Prettier - Code Formatter as the default formatter for vscode (either workspace or user)
6. Try the command `Format Document` or the shortcut `Shift + Alt + f` to format any opened document.
7. If it doesn't work, then close and reopen vscode.

### 1.2. ESLint
1. Install eslint to package.json using the command: `npm init @eslint/config@latest` and do some basic configuration as prompted.
2. The manual setup goes like this: Use command to install eslint: `npm install --save-dev eslint@latest @eslint/js@latest`. Project ESLint version - ^10.0.0
3. Apart from this *globals* is also required. Use `npm install --save-dev globals`. Project globals version - ^17.3.0
4. Add eslint.config.js file
5. Add rules in above config file
6. Add *ESLint* vscode extension by Microsoft.
7. Setup ESLint in vscode settings.
8. It should show any errors or warnings, if exists, on any opened file.
9. If it doesn't work, then close and reopen vscode.

### 1.3 EditorConfig
1. Download and install the [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) vscode extension.
2. Add .editorconfig file.
3. Close and reopen vscode.

## 2. Standards

### 2.1. Cases

| **Sr. No.** | **Case** | **Example** |
|---|---|---|
| **1** | Upper case | HEREISSAMPLETEXT |
| **2** | Lower case | hereissampletext |
| **3** | Camel case | hereIsSampleText |
| **4** | Pascal case | HereIsSampleText |
| **5** | Snake case | here_is_sample_text |
| **6** | Title case | Hereissampletext |
| **7** | Kebab case | here-is-sample-text |

### 2.2. Short Forms / Abbreviations

These tables helps understand where to use shortforms in names. Use the exact case when using these short forms.

| **Sr. No.** | **Short form** | **Long form** | **Examples** |
|---|---|---|---|
| **1** | HTML | Hyper Text Markup Language | HTMLConstants, generateHTML, subjectSectionHTML |
| **2** | dom | Document Object Model | domManipulation, addHTMLElementToDomById, isElementInDom |
| **3** | DB | Database | localStorageDB, subjectDBArray |
| **4** | enum | enumeration | enum, HTMLInputTypeEnum |

Other times a short form is allowed when its a variable with a short lived scope and very common.

| **Sr. No.** | **Short form** | **Long form** | **Examples** |
|---|---|---|---|
| **1** | id | identification |  |
| **2** | ind | index |  |
| **3** | itr | iterator |  |
| **4** | arr | array |  |
| **5** |  |  |  |

## 3. Rules

### 3.1. Files

The project follows MVC architecture, which means that frontend and backend components are divided into models, views and componenets.

EXPLAIN HOW MVC IS BEING FOLLOWED HERE. MAKE DISTINCTION BETWEEN FRONTEND AND BACKEND.

### 3.2. File naming

1. File names must be in Camel case.

	**Exceptions:** 
	
	1. Files in src\constants will be in PascalCase.

2. The `components` directory consits of UI views and controllers denoted by following endings before extensions:
   1. <component_name>.controller.js for controller files.
   2. <component_name>.view.js for view files.
   3. <component_name>.format.html for the example format html files.
   4. <component_name>.api.js for the example format html files.