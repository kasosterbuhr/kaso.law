# Course Assets Structure

This directory holds all course materials for the **AI** *pro se* Classroom.

## Folder Organization

```
/assets/courses/
├── CivPro/
│   ├── 2026.04.15/
│   │   ├── pdfs/
│   │   │   └── CivPro_2026.04.15_Summary.pdf
│   │   ├── videos/
│   │   │   └── CivPro_2026.04.15_Explainer.mp4
│   │   └── podcasts/
│   │       └── CivPro_2026.04.15_NotebookLM.mp3
│   └── 2026.04.08/
│       ├── pdfs/
│       ├── videos/
│       └── podcasts/
├── AnimalLaw/
│   ├── 2026.04.10/
│   │   ├── pdfs/
│   │   ├── videos/
│   │   └── podcasts/
└── ConLaw/
    └── 2026.04.20/
        ├── pdfs/
        ├── videos/
        └── podcasts/
```

## Upload Instructions

1. **Create Course Folder**: Add a new folder with the course name (e.g., `CivPro`, `AnimalLaw`, `ConLaw`)
2. **Create Date Subfolder**: Inside the course folder, create a folder with the date in `YYYY.MM.DD` format (e.g., `2026.04.15`)
3. **Add Materials**: Inside the date folder, create subfolders:
   - `pdfs/` — Course summaries and handouts
   - `videos/` — MP4, WebM, or MOV explainer videos
   - `podcasts/` — MP3, M4A, or WAV audio from NotebookLM
4. **Upload Files**: Add your materials to the appropriate subfolder
5. **Commit and Push**: The classroom page will automatically scan GitHub and display all materials

## Naming Convention

- **PDFs**: `CourseName_YYYY.MM.DD_TopicDescription.pdf`
- **Videos**: `CourseName_YYYY.MM.DD_TopicDescription.mp4`
- **Podcasts**: `CourseName_YYYY.MM.DD_TopicDescription.mp3`

Example:
- `CivPro_2026.04.15_JoinerAndCompulsoryParties.pdf`
- `AnimalLaw_2026.04.10_PropertyRightsFramework.mp4`
- `ConLaw_2026.04.20_FirstAmendment.mp3`

## How It Works

The **Classroom** page uses GitHub's API to:
1. Scan the `/assets/courses/` directory
2. Read all course folders
3. Find date-organized subfolders (newest first)
4. Locate PDFs, videos, and podcasts
5. Generate clickable links for direct download

**No manual updates needed** — just upload files and they appear automatically.

## File Size Notes

- **PDFs**: No limit (GitHub allows files up to 100MB)
- **Videos**: Keep under 100MB for fast loading (or host externally and link)
- **Podcasts**: Typically 20-100MB depending on length

## Supported Formats

- **PDFs**: `.pdf`
- **Videos**: `.mp4`, `.webm`, `.mov`
- **Podcasts**: `.mp3`, `.wav`, `.m4a`

---

*Last Updated: 2026.04.04*
