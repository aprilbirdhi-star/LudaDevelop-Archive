// ==========================================================================
// Vibe Learn - Application Logic & State Management
// ==========================================================================

// Seed Data mirroring the user's Day 10 layout and contents
const seedChapters = [
  {
    id: "chapter-10",
    num: 10,
    title: "영상 콘텐츠 자동화 - JSON 프롬프트와 Google Opal 에이전트로 쇼츠/롱폼 제작",
    desc: "JSON 프롬프트를 활용하여 고품질 영상을 생성하고, 22개의 Google Opal 에이전트로 자동화된 영상 제작 시스템을 구축하는 방법을 학습합니다.",
    duration: "약 63분",
    goals: [
      "JSON 프롬프트를 활용한 고품질 영상 생성 이해",
      "Google Opal에서 22개 에이전트로 자동화 워크플로우 구축하기",
      "제품 광고 영상(코카콜라, 환타 등) 시리즈 제작",
      "일관성 있는 영상 스토리텔링을 위한 에이전트 설계",
      "배경음악, 카메라 무빙 등 세부 요소 제어 방법"
    ],
    overviewTitle: "일관성 있고 이어지는 영상 시리즈 제작",
    overviewText: "오늘은 Google Opal로 스토리가 자연스럽게 연결되고, 같은 스타일과 캐릭터를 유지하는 영상 시리즈를 만드는 방법을 배웁니다!",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Fallback or template embed
    insights: [
      "JSON 프롬프트 구조: 영상의 모든 요소(카메라, 조명, 움직임)를 제어",
      "22개 에이전트 시스템: Google Opal로 자동화 워크플로우 구축",
      "일관성 있는 시리즈: 코카콜라/환타 광고 실습 프로젝트",
      "배경음악 & 카메라 무빙: 세부 요소 제어 방법"
    ],
    workflowUrl: "https://opal.google/?flow=drive:/1Tsa_QmjOFQXmtnPl8J6mLUnbMkjrOaOB&shared&mode=app",
    code: `{\n  "title": "Rise, lights string themselves, speakers assemble into air, sand shifts into a dance floor, a DJ booth builds from driftwood. Music kicks in. A beach rave is born. No text.",\n  "style": "cinematic, magical realism",\n  "camera": "starts ultra close, zooms out and cranes overhead as the world expands",\n  "lighting": "sunset turning to neon-golden hour into party glow",\n  "environment": "quiet beach transforms into high-energy beach rave",\n  "elements": [\n    "Corona bottle (label visible, condensation dripping)",\n    "pop-top cap in slow motion",\n    "exploding citrus slice",\n    "sand morphing into dance floor",\n    "palm trees rising",\n    "neon lights snapping on",\n    "DJ booth building itself",\n    "crowd materializing mid-dance",\n    "surfboards as signage"\n  ]\n}`
  }
];

// App State
let chapters = [];
let activeChapterId = "chapter-10";

// DOM Elements
const chaptersList = document.getElementById("chaptersList");
const themeToggleBtn = document.getElementById("themeToggle");

// Main Content Elements
const lectureBadge = document.getElementById("lectureBadge");
const lectureTitle = document.getElementById("lectureTitle");
const lectureDesc = document.getElementById("lectureDesc");
const lectureDuration = document.getElementById("lectureDuration");
const lectureGoals = document.getElementById("lectureGoals");
const chapterPrefix = document.getElementById("chapterPrefix");
const overviewTitle = document.getElementById("overviewTitle");
const overviewBox = document.getElementById("overviewBox");
const videoPlayerBox = document.getElementById("videoPlayerBox");
const lectureInsights = document.getElementById("lectureInsights");
const workflowUrlInput = document.getElementById("workflowUrlInput");
const btnLaunchWorkflow = document.getElementById("btnLaunchWorkflow");
const codeBlockContent = document.getElementById("codeBlockContent");
const btnCopyCode = document.getElementById("btnCopyCode");

// Editor Modal Elements
const chapterModal = document.getElementById("chapterModal");
const chapterForm = document.getElementById("chapterForm");
const editChapterIdInput = document.getElementById("editChapterId");
const formNum = document.getElementById("formNum");
const formDuration = document.getElementById("formDuration");
const formTitle = document.getElementById("formTitle");
const formDesc = document.getElementById("formDesc");
const formGoals = document.getElementById("formGoals");
const formOverviewTitle = document.getElementById("formOverviewTitle");
const formOverviewText = document.getElementById("formOverviewText");
const formVideoUrl = document.getElementById("formVideoUrl");
const formInsights = document.getElementById("formInsights");
const formWorkflowUrl = document.getElementById("formWorkflowUrl");
const formCode = document.getElementById("formCode");

// General Action Buttons
const btnAddChapter = document.getElementById("btnAddChapter");
const btnEditChapter = document.getElementById("btnEditChapter");
const btnDeleteChapter = document.getElementById("btnDeleteChapter");
const btnModalClose = document.getElementById("btnModalClose");
const btnCancelModal = document.getElementById("btnCancelModal");
const btnExportBackup = document.getElementById("btnExportBackup");
const btnImportBackup = document.getElementById("btnImportBackup");
const importFileInput = document.getElementById("importFileInput");

// ==========================================================================
// Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  loadData();
  initEventListeners();
  renderChaptersList();
  renderActiveChapter();
  createIconsSafe();
});

// Load / Save Local Storage
function loadData() {
  const stored = localStorage.getItem("vibe_learn_chapters");
  if (stored) {
    chapters = JSON.parse(stored);
    if (chapters.length > 0) {
      activeChapterId = chapters[0].id;
    }
  } else {
    // Seed Default Data
    chapters = [...seedChapters];
    saveData();
  }
}

function saveData() {
  localStorage.setItem("vibe_learn_chapters", JSON.stringify(chapters));
}

// ==========================================================================
// Theme Management
// ==========================================================================
function loadTheme() {
  const theme = localStorage.getItem("theme") || "light";
  document.body.setAttribute("data-theme", theme);
  updateThemeIcon(theme);
}

function toggleTheme() {
  const current = document.body.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  document.body.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const icon = themeToggleBtn.querySelector("i, svg");
  if (icon) {
    if (theme === "light") {
      icon.setAttribute("data-lucide", "moon");
    } else {
      icon.setAttribute("data-lucide", "sun");
    }
    createIconsSafe();
  }
}

// ==========================================================================
// Rendering Logic
// ==========================================================================
function renderChaptersList() {
  chaptersList.innerHTML = "";
  
  // Sort chapters by number ascending
  const sorted = [...chapters].sort((a, b) => a.num - b.num);
  
  sorted.forEach(ch => {
    const item = document.createElement("button");
    item.className = `nav-item ${ch.id === activeChapterId ? "active" : ""}`;
    item.innerHTML = `
      <span class="nav-badge">${ch.num}</span>
      <span class="nav-title" title="${ch.title}">${ch.title}</span>
    `;
    item.addEventListener("click", () => {
      activeChapterId = ch.id;
      renderChaptersList();
      renderActiveChapter();
    });
    chaptersList.appendChild(item);
  });
}

function renderActiveChapter() {
  const ch = chapters.find(c => c.id === activeChapterId);
  if (!ch) {
    // Fallback if empty state
    document.getElementById("lectureContent").style.display = "none";
    return;
  }
  
  document.getElementById("lectureContent").style.display = "flex";
  
  // Header Info
  lectureBadge.textContent = ch.num;
  lectureTitle.textContent = ch.title;
  lectureDesc.textContent = ch.desc;
  lectureDuration.textContent = ch.duration;
  
  // Goals
  lectureGoals.innerHTML = ch.goals.map(g => `<li>${escapeHTML(g)}</li>`).join("");
  
  // Overview Box
  chapterPrefix.textContent = `Chapter ${ch.num}`;
  overviewTitle.textContent = ch.overviewTitle;
  overviewBox.querySelector(".highlight-content h3").textContent = ch.overviewTitle;
  overviewBox.querySelector(".highlight-content p").innerHTML = escapeHTML(ch.overviewText).replace(/\n/g, "<br>");
  
  // Video Player rendering
  if (ch.videoUrl) {
    document.getElementById("videoContainer").style.display = "block";
    
    // Check if it is a generic YouTube/Vimeo embed URL or needs a mock fallback cover
    if (ch.videoUrl.includes("embed") || ch.videoUrl.includes("youtube.com") || ch.videoUrl.includes("vimeo.com")) {
      videoPlayerBox.innerHTML = `
        <iframe src="${ch.videoUrl}" 
                title="Video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen></iframe>`;
    } else {
      // Mock custom design cover if it is not an embeddable URL
      videoPlayerBox.innerHTML = `
        <div class="mock-video-player" style="background-image: linear-gradient(135deg, #1e293b 0%, #0f172a 100%)">
          <div class="mock-video-overlay">
            <div class="play-button-icon">▶</div>
            <div class="video-title-overlay">${escapeHTML(ch.title)} 데모 시청하기</div>
            <p style="font-size:12px; opacity:0.7; margin-top:8px;">${escapeHTML(ch.videoUrl)}</p>
          </div>
        </div>
      `;
    }
  } else {
    document.getElementById("videoContainer").style.display = "none";
  }
  
  // Insights
  lectureInsights.innerHTML = ch.insights.map(ins => `<li>${escapeHTML(ins)}</li>`).join("");
  
  // Workflow Launcher
  if (ch.workflowUrl) {
    document.getElementById("workflowContainer").style.display = "block";
    workflowUrlInput.value = ch.workflowUrl;
    btnLaunchWorkflow.href = ch.workflowUrl;
  } else {
    document.getElementById("workflowContainer").style.display = "none";
  }
  
  // Code Prompt Block
  if (ch.code) {
    document.getElementById("codeContainer").style.display = "block";
    codeBlockContent.textContent = ch.code;
  } else {
    document.getElementById("codeContainer").style.display = "none";
  }
  
  createIconsSafe();
}

// ==========================================================================
// Event Listeners & Modal Control
// ==========================================================================
function initEventListeners() {
  themeToggleBtn.addEventListener("click", toggleTheme);
  
  // Copy to Clipboard Action
  btnCopyCode.addEventListener("click", () => {
    navigator.clipboard.writeText(codeBlockContent.textContent)
      .then(() => {
        btnCopyCode.innerHTML = `<i data-lucide="check"></i> 복사 완료!`;
        createIconsSafe();
        setTimeout(() => {
          btnCopyCode.innerHTML = `<i data-lucide="copy"></i> 복사하기`;
          createIconsSafe();
        }, 2000);
      })
      .catch(err => {
        alert("복사 실패: " + err);
      });
  });
  
  // Open Add Modal
  btnAddChapter.addEventListener("click", () => {
    openModal(null);
  });
  
  // Open Edit Modal
  btnEditChapter.addEventListener("click", () => {
    const ch = chapters.find(c => c.id === activeChapterId);
    if (ch) openModal(ch);
  });
  
  // Delete Chapter
  btnDeleteChapter.addEventListener("click", () => {
    if (chapters.length <= 1) {
      alert("최소 한 개의 챕터는 유지되어야 합니다.");
      return;
    }
    if (confirm("정말로 이 챕터를 삭제하시겠습니까?")) {
      chapters = chapters.filter(c => c.id !== activeChapterId);
      activeChapterId = chapters[0].id;
      saveData();
      renderChaptersList();
      renderActiveChapter();
    }
  });

  // Modal Buttons
  btnModalClose.addEventListener("click", closeModal);
  btnCancelModal.addEventListener("click", closeModal);
  chapterForm.addEventListener("submit", handleFormSubmit);

  // Backup & Import
  btnExportBackup.addEventListener("click", exportBackup);
  btnImportBackup.addEventListener("click", () => importFileInput.click());
  importFileInput.addEventListener("change", handleImportBackup);
}

function openModal(chapter = null) {
  chapterModal.classList.add("active");
  
  if (chapter) {
    // Edit Mode
    document.getElementById("modalTitleText").textContent = "챕터 수정하기";
    editChapterIdInput.value = chapter.id;
    formNum.value = chapter.num;
    formDuration.value = chapter.duration;
    formTitle.value = chapter.title;
    formDesc.value = chapter.desc;
    formGoals.value = chapter.goals.join("\n");
    formOverviewTitle.value = chapter.overviewTitle;
    formOverviewText.value = chapter.overviewText;
    formVideoUrl.value = chapter.videoUrl || "";
    formInsights.value = chapter.insights.join("\n");
    formWorkflowUrl.value = chapter.workflowUrl || "";
    formCode.value = chapter.code || "";
  } else {
    // Add Mode
    document.getElementById("modalTitleText").textContent = "새 챕터 추가하기";
    chapterForm.reset();
    editChapterIdInput.value = "";
    // Auto-fill next chapter number
    const maxNum = chapters.reduce((max, ch) => ch.num > max ? ch.num : max, 0);
    formNum.value = maxNum + 1;
    formDuration.value = "약 60분";
  }
}

function closeModal() {
  chapterModal.classList.remove("active");
  chapterForm.reset();
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const id = editChapterIdInput.value;
  const num = parseInt(formNum.value);
  const duration = formDuration.value.trim();
  const title = formTitle.value.trim();
  const desc = formDesc.value.trim();
  
  const goals = formGoals.value.split("\n").map(g => g.trim()).filter(g => g.length > 0);
  const overviewTitleVal = formOverviewTitle.value.trim();
  const overviewTextVal = formOverviewText.value.trim();
  const videoUrlVal = formVideoUrl.value.trim();
  const insights = formInsights.value.split("\n").map(ins => ins.trim()).filter(ins => ins.length > 0);
  const workflowUrlVal = formWorkflowUrl.value.trim();
  const codeVal = formCode.value.trim();
  
  if (id) {
    // Update existing chapter
    const index = chapters.findIndex(ch => ch.id === id);
    if (index !== -1) {
      chapters[index] = {
        id,
        num,
        duration,
        title,
        desc,
        goals,
        overviewTitle: overviewTitleVal,
        overviewText: overviewTextVal,
        videoUrl: videoUrlVal,
        insights,
        workflowUrl: workflowUrlVal,
        code: codeVal
      };
    }
  } else {
    // Add new chapter
    const newId = "chapter-" + Date.now();
    chapters.push({
      id: newId,
      num,
      duration,
      title,
      desc,
      goals,
      overviewTitle: overviewTitleVal,
      overviewText: overviewTextVal,
      videoUrl: videoUrlVal,
      insights,
      workflowUrl: workflowUrlVal,
      code: codeVal
    });
    activeChapterId = newId;
  }
  
  saveData();
  closeModal();
  renderChaptersList();
  renderActiveChapter();
}

// ==========================================================================
// Backup / Recovery Utilities
// ==========================================================================
function exportBackup() {
  if (chapters.length === 0) return;
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(chapters, null, 2));
  const dlAnchor = document.createElement("a");
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", `vibe_learn_backup_${new Date().toISOString().split("T")[0]}.json`);
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();
}

function handleImportBackup(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const imported = JSON.parse(evt.target.result);
      if (!Array.isArray(imported)) throw new Error("배열 형식이 아닙니다.");
      
      const valid = imported.every(ch => ch.id && ch.num && ch.title && ch.goals && ch.insights);
      if (!valid) throw new Error("유효한 Vibe Learn 데이터 포맷이 아닙니다.");
      
      if (confirm(`총 ${imported.length}개의 챕터 데이터를 불러와 병합하시겠습니까?`)) {
        const chapterMap = {};
        chapters.forEach(c => { chapterMap[c.id] = c; });
        imported.forEach(c => { chapterMap[c.id] = c; });
        
        chapters = Object.values(chapterMap);
        saveData();
        renderChaptersList();
        renderActiveChapter();
        alert("백업 데이터를 성공적으로 불러왔습니다!");
      }
    } catch(err) {
      alert("백업 복구 실패: " + err.message);
    }
  };
  reader.readAsText(file);
  importFileInput.value = "";
}

// ==========================================================================
// Helper Utilities
// ==========================================================================
function escapeHTML(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function createIconsSafe() {
  if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  } else {
    console.warn("Lucide library is not loaded.");
  }
}
