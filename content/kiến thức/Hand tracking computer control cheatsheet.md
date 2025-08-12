---
title: Hand tracking computer control cheatsheet
draft: false
date: 2025-05-10 21:31:47 +0700
tags:
  - comsci
description:
---
```bash
git clone https://github.com/sfatew/Hand-Tracking-Computer-Control.git
cd Hand-Tracking-Computer-Control
git checkout -b feature/ui-integration
git add .
git commit -m "Add ..."
git push origin feature/ui-integration
git status
git checkout main
git pull origin main
```

For frontend
```bash
npm create vite@latest frontend -- --template react
npm install socket.io-client react-webcam
npm run dev
```

For backend
```python
python -m venv venv
pip install tensorflow keyboard dearpygui scikit-learn torch torchvision mediapipe numpy opencv-python pandas
```

For git

```bash
git fetch
git checkout feature/registers
git pull
```

## Log for clinic management

API version:
- v0.1.2: new API for database-v2
- v0.1.3: add appointments API
- v0.1.4: add doctorAPI and update crud.create_user (when create user)