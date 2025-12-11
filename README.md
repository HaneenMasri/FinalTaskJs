# JavaScript Blog Assignment

This repository contains my JavaScript assignment for managing blogs using `json-server`.

## Project Description
This project allows users to:
- View blogs stored in a `db.json` file.
- Add new blogs through a form.
- Delete existing blogs.
- Validate blog inputs using regular expressions.

## Features
- **Fetch and display blogs** from `db.json`.
- **Delete blogs** by clicking the delete icon.
- **Add new blogs** via the "New Blog" form.
- **Input validation rules**:
  - **Title**:
    - Only English characters
    - Maximum 50 characters
    - First letter must be capitalized
    - Special characters are not allowed except spaces
  - **Description**:
    - Only English characters
    - Maximum 1000 characters
    - Special characters are not allowed except spaces

## Setup Instructions
1. Install `json-server` globally if not already installed:
   ```bash
   npm install -g json-server
Run the JSON server:
bash
json-server --watch db.json
Open the HTML file in your browser to view and manage blogs.
Author
Haneen Masri