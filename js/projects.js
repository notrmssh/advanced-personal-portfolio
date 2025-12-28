const projects = [
  {
    id: 1,
    title: "Personal Portfolio Website",
    description: "A personal website to present my background, work and interests.",
    category: "Web Development",
    technologies: ["HTML", "CSS"],
    image: "images/Ger1.jpg",
    link: "#"
  },
  {
    id: 2,
    title: "Responsive Layout",
    description: "A fully responsive layout that works on mobile and desktop.",
    category: "Web Development",
    technologies: ["HTML", "CSS", "Media Queries"],
    image: "images/spa1.jpg",
    link: "#"
  },
  {
    id: 3,
    title: "Travel Photo Gallery",
    description: "A gallery showing travel photos in an organized layout.",
    category: "Design",
    technologies: ["HTML", "CSS", "Grid"],
    image: "images/spa2.jpg",
    link: "#"
  },
  {
    id: 4,
    title: "School Assignment Project",
    description: "A structured school assignment demonstrating web fundamentals.",
    category: "School Projects",
    technologies: ["HTML"],
    image: "images/kitty1.jpg.jpg",
    link: "#"
  },
  {
    id: 5,
    title: "Mini UI Design",
    description: "A small creative UI design exercise.",
    category: "Design",
    technologies: ["CSS"],
    image: "images/kitty2.jpg.JPG",
    link: "#"
  },
  {
    id: 6,
    title: "Basic Web Page",
    description: "Simple webpage practicing structure and layout.",
    category: "School Projects",
    technologies: ["HTML", "CSS"],
    image: "images/hol1.jpg",
    link: "#"
  }
];

const container = document.getElementById("projectsContainer");
const buttons = document.querySelectorAll(".filter-btn");
const counter = document.getElementById("projectCount");


function displayProjects(list) {
  container.innerHTML = "";

  list.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <span class="badge">${project.category}</span>
      <br>
      <a href="${project.link}" target="_blank" class="btn">View Project</a>
    `;

    container.appendChild(card);
  });

  counter.textContent = `Showing ${list.length} of ${projects.length} projects`;
}


buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");

    if (category === "all") {
      displayProjects(projects);
    } else {
      const filtered = projects.filter(p => p.category === category);
      displayProjects(filtered);
    }
  });
});

displayProjects(projects);
