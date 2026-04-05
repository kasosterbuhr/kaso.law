---
layout: default
title: Classroom
---

# **AI** *pro se* Classroom

Learn legal reasoning through organized course materials: PDFs, explainer videos, and NotebookLM podcasts.

---

## Course Library

<div id="classroom-loader" style="text-align: center; padding: 40px;">
  <p>Loading course library...</p>
</div>

<div id="classroom-content" style="display: none;">
  <!-- Course cards will be dynamically inserted here -->
</div>

<div id="classroom-error" style="display: none; color: #d32f2f; padding: 20px; background: #ffebee; border-radius: 4px;">
  <!-- Error message will appear here -->
</div>

---

## How to Use This Classroom

1. **Select a course** from the library below
2. **Choose a class date** to access materials
3. **Pick your format**: Read PDFs, watch videos, or listen to podcasts
4. **Learn at your own pace** with structured legal reasoning templates

All materials are **free and open-source**. No logins required.

---

<script>
// Dynamically fetch course structure from GitHub
async function loadClassroom() {
  const loader = document.getElementById('classroom-loader');
  const content = document.getElementById('classroom-content');
  const error = document.getElementById('classroom-error');
  
  try {
    // Repository details
    const owner = 'ai-prose';
    const repo = 'kaso.law';
    const coursePath = 'assets/courses';
    
    // GitHub API endpoint to list contents of /assets/courses
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${coursePath}`;
    
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    
    const courses = await response.json();
    
    if (!Array.isArray(courses)) {
      throw new Error('Invalid response format from GitHub API');
    }
    
    // Filter for directories only (courses)
    const courseDirectories = courses.filter(item => item.type === 'dir');
    
    if (courseDirectories.length === 0) {
      throw new Error('No courses found. Start by uploading course folders to /assets/courses/');
    }
    
    // Build HTML for courses
    let html = '<div class="classroom-grid">';
    
    for (const course of courseDirectories) {
      const courseName = course.name;
      
      // Fetch classes within each course
      const classesResponse = await fetch(course.url);
      const classes = await classesResponse.json();
      
      const classDirectories = classes
        .filter(item => item.type === 'dir')
        .sort((a, b) => b.name.localeCompare(a.name)); // Sort dates descending
      
      html += `
        <div class="course-card">
          <h3>${courseName}</h3>
          <div class="class-list">
      `;
      
      for (const classItem of classDirectories) {
        const className = classItem.name; // e.g., "2026.04.04"
        
        // Fetch materials within class
        const materialsResponse = await fetch(classItem.url);
        const materials = await materialsResponse.json();
        
        // Organize by type
        const pdfs = materials.filter(m => m.name.endsWith('.pdf'));
        const videos = materials.filter(m => m.name.match(/\.(mp4|webm|mov)$/i));
        const podcasts = materials.filter(m => m.name.match(/\.(mp3|wav|m4a)$/i));
        
        if (pdfs.length > 0 || videos.length > 0 || podcasts.length > 0) {
          html += `
            <div class="class-item">
              <h4>${className}</h4>
              <div class="materials">
          `;
          
          if (pdfs.length > 0) {
            html += `<div class="material-type"><strong>📄 PDFs:</strong><br>`;
            pdfs.forEach(pdf => {
              html += `<a href="${pdf.download_url}" target="_blank" rel="noopener noreferrer">${pdf.name}</a><br>`;
            });
            html += `</div>`;
          }
          
          if (videos.length > 0) {
            html += `<div class="material-type"><strong>🎥 Videos:</strong><br>`;
            videos.forEach(video => {
              html += `<a href="${video.download_url}" target="_blank" rel="noopener noreferrer">${video.name}</a><br>`;
            });
            html += `</div>`;
          }
          
          if (podcasts.length > 0) {
            html += `<div class="material-type"><strong>🎙️ Podcasts:</strong><br>`;
            podcasts.forEach(podcast => {
              html += `<a href="${podcast.download_url}" target="_blank" rel="noopener noreferrer">${podcast.name}</a><br>`;
            });
            html += `</div>`;
          }
          
          html += `</div></div>`;
        }
      }
      
      html += `
          </div>
        </div>
      `;
    }
    
    html += '</div>';
    
    // Display content
    loader.style.display = 'none';
    content.innerHTML = html;
    content.style.display = 'block';
    
  } catch (err) {
    console.error('Classroom loader error:', err);
    loader.style.display = 'none';
    error.textContent = `Error loading classroom: ${err.message}`;
    error.style.display = 'block';
  }
}

// Load classroom when page is ready
document.addEventListener('DOMContentLoaded', loadClassroom);
</script>

<style>
.classroom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.course-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.course-card h3 {
  color: #0056b3;
  margin-top: 0;
  border-bottom: 2px solid #0056b3;
  padding-bottom: 10px;
}

.class-list {
  max-height: 400px;
  overflow-y: auto;
}

.class-item {
  margin: 15px 0;
  padding: 10px;
  background: white;
  border-left: 3px solid #28a745;
  border-radius: 4px;
}

.class-item h4 {
  color: #28a745;
  margin: 0 0 10px 0;
  font-size: 14px;
  font-weight: 600;
}

.materials {
  font-size: 13px;
}

.material-type {
  margin: 8px 0;
  padding: 8px;
  background: #f0f0f0;
  border-radius: 4px;
}

.material-type strong {
  display: block;
  margin-bottom: 5px;
}

.material-type a {
  display: inline-block;
  margin: 3px 5px 3px 0;
  padding: 4px 8px;
  background: #0056b3;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  font-size: 12px;
  transition: background 0.2s;
}

.material-type a:hover {
  background: #003d82;
}

@media (max-width: 768px) {
  .classroom-grid {
    grid-template-columns: 1fr;
  }
}
</style>
